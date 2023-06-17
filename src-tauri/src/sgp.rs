use crate::lcu::http::get_sgp_token;
use crate::Summoner;
use log::debug;
use reqwest::Client;
use serde_json::Value;
use std::{mem::MaybeUninit, sync::Once};
use tokio::sync::RwLock;

type Error = Box<dyn std::error::Error + Send + Sync>;

static SERVER_INFO: [(&str, &str, &str); 29] = [
    ("hn1", "https://hn1-cloud-sgp.lol.qq.com:21019", "艾欧尼亚"),
    ("hn1", "https://hn2-sgp.lol.qq.com:21019", "祖安"),
    ("hn3", "https://hn3-cloud-sgp.lol.qq.com:21019", "诺克萨斯"),
    ("hn4", "https://hn4new-sgp.lol.qq.com:21019", "班德尔城"),
    ("hn5", "https://hn5-sgp.lol.qq.com:21019", "皮尔特沃夫"),
    ("hn6", "https://hn6-sgp.lol.qq.com:21019", "战争学院"),
    ("hn7", "https://hn7-sgp.lol.qq.com:21019", "巨神峰"),
    ("hn8", "https://hn8-cloud-sgp.lol.qq.com:21019", "雷瑟守备"),
    ("hn9", "https://hn9-sgp.lol.qq.com:21019", "裁决之地"),
    (
        "hn10",
        "https://hn10-cloud-sgp.lol.qq.com:21019",
        "黑色玫瑰",
    ),
    ("hn11", "https://hn11-cloud-sgp.lol.qq.com:21019", "暗影岛"),
    ("hn12", "https://hn12-sgp.lol.qq.com:21019", "钢铁烈阳"),
    ("hn13", "https://hn13-sgp.lol.qq.com:21019", "水晶之痕"),
    ("hn14", "https://hn14new-sgp.lol.qq.com:21019", "均衡教派"),
    ("hn15", "https://hn15-sgp.lol.qq.com:21019", "影流"),
    ("hn16", "https://hn16new-sgp.lol.qq.com:21019", "守望之海"),
    (
        "hn17",
        "https://hn17-cloud-sgp.lol.qq.com:21019",
        "征服之海",
    ),
    (
        "hn18",
        "https://hn18-cloud-sgp.lol.qq.com:21019",
        "卡拉曼达",
    ),
    ("hn19", "https://hn19-sgp.lol.qq.com:21019", "皮城警备"),
    ("wt1", "https://wt1new-sgp.lol.qq.com:21019", "比尔吉沃特"),
    ("wt2", "https://wt2new-sgp.lol.qq.com:21019", "德玛西亚"),
    ("wt3", "https://wt3new-sgp.lol.qq.com:21019", "弗雷尔卓德"),
    ("wt4", "https://wt4new-sgp.lol.qq.com:21019", "无畏先锋"),
    ("wt5", "https://wt5-sgp.lol.qq.com:21019", "恕瑞玛"),
    ("wt6", "https://wt6-sgp.lol.qq.com:21019", "扭曲丛林"),
    ("wt7", "https://wt7-sgp.lol.qq.com:21019", "巨龙之巢"),
    ("edu1", "https://edu1-sgp.lol.qq.com:21019", "教育网专区"),
    ("sgp1", "https://bgp1-sgp.lol.qq.com:21019", "男爵领域"),
    ("sgp2", "https://bgp2-sgp.lol.qq.com:21019", "峡谷之巅"),
];

fn get_serrver_addr_by_region_name(region: &str) -> &'static str {
    match region {
        "hn1" => SERVER_INFO[0].1,
        "hn2" => SERVER_INFO[1].1,
        "hn3" => SERVER_INFO[2].1,
        "hn4" => SERVER_INFO[3].1,
        "hn5" => SERVER_INFO[4].1,
        "hn6" => SERVER_INFO[5].1,
        "hn7" => SERVER_INFO[6].1,
        "hn8" => SERVER_INFO[7].1,
        "hn9" => SERVER_INFO[8].1,
        "hn10" => SERVER_INFO[9].1,
        "hn11" => SERVER_INFO[10].1,
        "hn12" => SERVER_INFO[11].1,
        "hn13" => SERVER_INFO[12].1,
        "hn14" => SERVER_INFO[13].1,
        "hn15" => SERVER_INFO[14].1,
        "hn16" => SERVER_INFO[15].1,
        "hn17" => SERVER_INFO[16].1,
        "hn18" => SERVER_INFO[17].1,
        "hn19" => SERVER_INFO[18].1,
        "wt1" => SERVER_INFO[19].1,
        "wt2" => SERVER_INFO[20].1,
        "wt3" => SERVER_INFO[21].1,
        "wt4" => SERVER_INFO[22].1,
        "wt5" => SERVER_INFO[23].1,
        "wt6" => SERVER_INFO[24].1,
        "wt7" => SERVER_INFO[25].1,
        "edu1" => SERVER_INFO[26].1,
        "sgp1" => SERVER_INFO[27].1,
        "sgp2" => SERVER_INFO[28].1,
        _ => "",
    }
}

pub async fn get_match_history_by_puuid(
    puuid: &str,
    region: &str,
    start: u64,
    count: u64,
) -> Result<String, Error> {
    debug!("sgp::get_match_history_by_puuid({})", puuid);
    let path = std::format!("/match-history-query/v1/products/lol/player/{puuid}/SUMMARY");
    let host = std::format!("{}", get_serrver_addr_by_region_name(region));
    let url = std::format!("{host}{path}");
    let token = get_sgp_token().await?;
    let res = Client::new()
        .get(url)
        .query(&[("startIndex", start), ("count", count)])
        .bearer_auth(token)
        .send()
        .await?
        .error_for_status()?;

    // println!("{:#?}", res.text().await?);
    Ok(res.text().await?)
}

pub async fn get_summoners_by_name(name: &str) -> Result<Vec<Summoner>, Error> {
    debug!("sgp::get_summoners_by_name({})", name);

    let mut handles = Vec::new();
    let token = get_sgp_token().await?;
    let region_paths = get_region_paths().await?.read().await;
    for i in 0..SERVER_INFO.len() {
        let path = std::format!(
            "/summoner-ledge/v1/regions/{}/summoners/name/",
            region_paths[i]
        );

        let f = Client::new()
            .get(std::format!("{}{}{}", SERVER_INFO[i].1, path, name))
            .header("Authorization", std::format!("Bearer {}", token))
            .send();
        handles.push(tokio::spawn(f));
    }

    let mut summoners: Vec<Summoner> = Vec::new();

    for (i, handle) in handles.into_iter().enumerate() {
        let res = handle.await??;
        if !res.status().is_success() {
            continue;
        }
        let mut s: Summoner = serde_json::from_str(&res.text().await?)?;
        s.region = SERVER_INFO[i].0.to_string();
        s.region_name = SERVER_INFO[i].2.to_string();
        summoners.push(s);
    }
    Ok(summoners)
}

pub async fn get_summoner_by_name(name: &str, region: &str) -> Result<String, Error> {
    debug!("sgp::get_summoner_by_name({}, {})", name, region);
    let token = get_sgp_token().await?;
    let region_path = get_region_paths().await?.read().await;
    for (i, v) in SERVER_INFO.iter().enumerate() {
        if region != v.0 {
            continue;
        }
        let path = std::format!(
            "/summoner-ledge/v1/regions/{}/summoners/name/{}",
            region_path[i],
            name
        );
        let url = std::format!("{}{}", v.1, path);
        let res = Client::new()
            .get(url)
            .bearer_auth(&token)
            .send()
            .await?
            .error_for_status()?;

        return Ok(res.text().await?);
    }
    Err(std::format!("没有此服务器: {}", region))?
}

async fn get_region_paths() -> Result<&'static RwLock<Vec<String>>, Error> {
    debug!("sgp::get_regions()");
    static mut G_REGIONS: MaybeUninit<RwLock<Vec<String>>> = MaybeUninit::uninit();
    static ONCE: Once = Once::new();

    let res = Client::new()
        .get("https://prod-rso.lol.qq.com:3000/.well-known/openid-configuration")
        .send()
        .await?;
    let res: Value = serde_json::from_str(&res.text().await?)?;

    let res = res["riot_lol_regions_supported"].as_array().unwrap();

    let mut regions = Vec::new();
    for i in 1..res.len() {
        let s = res[i].to_string().clone();
        let s = s
            .strip_prefix(r#"""#)
            .unwrap()
            .strip_suffix(r#"""#)
            .unwrap();
        regions.push(s.to_string());
    }

    ONCE.call_once(|| unsafe {
        G_REGIONS.as_mut_ptr().write(RwLock::new(regions));
    });

    unsafe { Ok(&*G_REGIONS.as_ptr()) }
}

pub async fn get_ranked_stats_by_puuid(puuid: &str, region: &str) -> Result<String, Error> {
    let host = get_serrver_addr_by_region_name(region);
    let url = std::format!("{host}/leagues-ledge/v2/rankedStats/puuid/{puuid}");
    let token = get_sgp_token().await?;
    let res = Client::new().get(url).bearer_auth(token).send().await?;

    Ok(res.text().await?)
}

#[cfg(test)]
mod tests {

    #[test]
    fn get_summoners_by_name() {
        let s = tokio_test::block_on(super::get_summoners_by_name("ihuang")).unwrap();
        println!("{:#?}", s);
    }

    #[test]
    fn get_match_history_by_puuid() {
        let s = tokio_test::block_on(super::get_match_history_by_puuid(
            "517caff1-5ea2-5702-921b-72ef8644d183",
            "hn9",
            0,
            1,
        ))
        .unwrap();
        println!("{:#?}", s);
    }

    #[test]
    fn get_summoner_by_name() {
        let s = tokio_test::block_on(super::get_summoner_by_name("fyyyyk", "hn1")).unwrap();
        println!("{:#?}", s);
    }

    #[test]
    fn get_ranked_stats_by_puuid() {
        let s = tokio_test::block_on(super::get_ranked_stats_by_puuid(
            "cb7be6df-59fc-5618-b230-ad321ada241e",
            "hn9",
        )).unwrap();
        println!("{:#?}", s);
    }
}
