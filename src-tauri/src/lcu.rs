pub mod http;
pub mod parameter;
pub mod websocket;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Summoner {
    #[serde(rename = "displayName")]
    name: String,
    #[serde(rename = "summonerLevel")]
    level: i64,
    #[serde(rename = "puuid")]
    puuid: String,
    #[serde(rename = "profileIconId")]
    avatar: i64,
    #[serde(rename = "privacy")]
    privacy: Privaacy,
    #[serde(rename = "accountId")]
    account_id: i64,
    #[serde(rename = "xpSinceLastLevel")]
    xp_since_last_level: i64,
    #[serde(rename = "xpUntilNextLevel")]
    xp_until_next_level: i64,
    #[serde(rename = "region", default)]
    pub region: String,
}

#[derive(Debug, Serialize, Deserialize)]
enum Privaacy {
    #[serde(rename = "PUBLIC")]
    Public,
    #[serde(rename = "PRIVATE")]
    Private,
}
