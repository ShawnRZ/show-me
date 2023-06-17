use super::parameter::LcuParameter;
use super::Summoner;
use log::debug;
use reqwest::Method;
use reqwest::{Client, RequestBuilder};
use serde_json::Value;
use std::error::Error as StdError;

type Error = Box<dyn StdError + Send + Sync>;

async fn request(path: &str, method: Method) -> Result<RequestBuilder, Error> {
    let lp = LcuParameter::get().await?;
    Ok(Client::new()
        .request(
            method,
            std::format!("https://127.0.0.1:{}{}", &lp.port, path),
        )
        .basic_auth("riot", Some(lp.token)))
}

pub async fn get_current_summoner() -> Result<Summoner, Error> {
    debug!("lcu::http::get_current_summoner()");
    let res = request("/lol-summoner/v1/current-summoner", Method::GET)
        .await?
        .send()
        .await?;

    let s: Summoner = serde_json::from_str(&res.text().await?)?;

    debug!("{:#?}", &s);

    Ok(s)
}

pub async fn get_sgp_token() -> Result<String, Error> {
    debug!("get_sgp_token()");
    let res = request("/entitlements/v1/token", Method::GET)
        .await?
        // .send()?;
        .send()
        .await?;
    let res: Value = serde_json::from_str(&res.text().await?)?;
    let token = res["accessToken"].to_string();
    let token = token
        .strip_prefix(r#"""#)
        .unwrap()
        .strip_suffix(r#"""#)
        .unwrap()
        .to_string();
    debug!("{token}");
    Ok(token)
}

// #[cfg(test)]
// mod tests {
//     use super::LcuClient;
//     #[test]
//     fn get_current_summoner() {
//     }
// }
