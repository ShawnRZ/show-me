pub mod cer;
pub mod lcu;
pub mod sgp;

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Summoner {
    #[serde(rename = "name", default)]
    name: String,
    #[serde(rename = "level", default)]
    level: u64,
    #[serde(rename = "puuid", default)]
    puuid: String,
    #[serde(rename = "profileIconId", default)]
    avatar: u64,
    #[serde(rename = "privacy")]
    privacy: Privaacy,
    #[serde(rename = "accountId", default)]
    account_id: u64,
    #[serde(rename = "region", default)]
    region: String,
    #[serde(rename = "regionName", default)]
    region_name: String,
    #[serde(rename = "rankedstats", default)]
    rankedstats: HashMap<String, RankedStats>,
}

#[derive(Debug, Serialize, Deserialize)]
struct RankedStats {
    #[serde(rename = "highestRank", default)]
    highest_rank: String,
    #[serde(rename = "highestTier", default)]
    highest_tier: String,
    #[serde(rename = "leaguePoints", default)]
    league_points: i32,
    #[serde(rename = "losses", default)]
    losses: i32,
    #[serde(rename = "premadeMmrRestricted", default)]
    premade_mmr_restricted: bool,
    #[serde(rename = "provisionalGameThreshold", default)]
    provisional_game_threshold: i32,
    #[serde(rename = "provisionalGamesRemaining", default)]
    provisional_games_remaining: i32,
    #[serde(rename = "queueType", default)]
    queue_type: String,
    #[serde(rename = "rank", default)]
    rank: String,
    #[serde(rename = "ratedRating", default)]
    rated_rating: i32,
    #[serde(rename = "tier", default)]
    tier: String,
    #[serde(rename = "wins", default)]
    wins: i32,
}

#[derive(Debug, Serialize, Deserialize)]
enum Privaacy {
    #[serde(rename = "PUBLIC")]
    Public,
    #[serde(rename = "PRIVATE")]
    Private,
}

#[derive(Debug, Serialize, Deserialize)]
struct Game {
    metadata: Metadata,
    json: GameDetail,
}

#[derive(Debug, Serialize, Deserialize)]
struct Metadata {
    product: String,
    tags: Vec<String>,
    participants: Vec<String>,
    timestamp: String,
    data_version: String,
    info_type: String,
    match_id: String,
    private: bool,
}

#[derive(Debug, Serialize, Deserialize)]
struct GameDetail {
    #[serde(rename = "gameCreation")]
    game_creation: u64,
    #[serde(rename = "gameDuration")]
    game_duration: u64,
    #[serde(rename = "gameEndTimestamp")]
    game_end_timestamp: u64,
    #[serde(rename = "gameId")]
    game_id: u64,
    #[serde(rename = "gameMode")]
    game_mode: String,
    #[serde(rename = "gameName")]
    game_name: String,
    #[serde(rename = "gameStartTimestamp")]
    game_start_timestamp: u64,
    #[serde(rename = "gameType")]
    game_type: String,
    #[serde(rename = "gameVersion")]
    game_version: String,
    #[serde(rename = "mapId")]
    map_id: u32,
    #[serde(rename = "participants")]
    participants: Vec<()>,
    #[serde(rename = "platformId")]
    platform_id: String,
    #[serde(rename = "queueId")]
    queue_id: u32,
    #[serde(rename = "seasonId")]
    season_id: u32,
    #[serde(rename = "teams")]
    teams: Vec<Team>,
    #[serde(rename = "tournamentCode")]
    tournament_code: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Team {
    bans: Vec<Ban>,
    objectives: Objective,
}

#[derive(Debug, Serialize, Deserialize)]
struct Ban {
    champion_id: u32,
    pick_turn: u8,
}

#[derive(Debug, Serialize, Deserialize)]
struct Objective {}

#[derive(Debug, Serialize, Deserialize)]
struct Baron {
    first: bool,
    kiils: u8,
}
#[derive(Debug, Serialize, Deserialize)]
struct Champion {
    first: bool,
    kiils: u8,
}
#[derive(Debug, Serialize, Deserialize)]
struct Dragon {
    first: bool,
    kiils: u8,
}
#[derive(Debug, Serialize, Deserialize)]
struct Inhibitor {
    first: bool,
    kiils: u8,
}
#[derive(Debug, Serialize, Deserialize)]
struct RiftHerald {
    first: bool,
    kiils: u8,
}
#[derive(Debug, Serialize, Deserialize)]
struct Tower {
    first: bool,
    kiils: u8,
}
