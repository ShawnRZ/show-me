use super::parameter;
use super::Summoner;
use reqwest::blocking::{Client, RequestBuilder};
use tauri::utils::debug_eprintln;

type Error = Box<dyn std::error::Error>;
pub struct LcuClient {
    client: Client,
    port: String,
    token: String,
    abandon: bool,
}

impl LcuClient {
    // pub fn new() -> Result<LcuClient, Error> {
    //     let lp = parameter::LcuParameter::get()?;
    //     Ok(LcuClient {
    //         client: Client::new(),
    //         port: lp.port,
    //         token: lp.token,
    //         abandon: false,
    //     })
    // }

    fn get(&mut self, url: &str) -> Result<RequestBuilder, Error> {
        self.refresh()?;
        Ok(self.client.get(url).basic_auth("riot", Some(&self.token)))
    }

    pub fn refresh(&mut self) -> Result<(), Error> {
        if self.abandon {
            let lp = parameter::LcuParameter::get()?;
            self.port = lp.port;
            self.token = lp.token;
        }
        Ok(())
    }
}

impl LcuClient {
    pub fn get_current_summoner(&mut self) -> Result<Summoner, Error> {
        let res = self
            .get(&std::format!(
                "https://127.0.0.1:{}/lol-summoner/v1/current-summoner",
                &self.port
            ))?
            .send()?;

        if let Err(e) = res.error_for_status_ref() {
            Err(e)?;
        }

        let s: Summoner = serde_json::from_str(&res.text()?)?;

        debug_eprintln!("{:#?}", &s);

        Ok(s)
    }
}

impl Default for LcuClient {
    fn default() -> Self {
        LcuClient {
            client: Client::new(),
            port: "".to_string(),
            token: "".to_string(),
            abandon: true,
        }
    }
}

// #[cfg(test)]
// mod tests {
//     use super::LcuClient;

//     #[test]
//     fn get_current_summoner() {
//         let c = LcuClient::new().unwrap();
//         let _ = tokio_test::block_on(c.get_current_summoner()).unwrap();
//     }
// }
