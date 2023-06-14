use super::parameter::LcuParameter;
use base64::prelude::*;
use log::debug;
use serde_json::Value;
use std::{
    error::Error as StdError,
    thread::{spawn, JoinHandle},
};
use tauri::Runtime;

type Error = Box<dyn StdError + Send + Sync>;

static mut RUNNING: Option<JoinHandle<Result<(), String>>> = None;

fn message_handler<R: Runtime>(msg: String, window: &tauri::Window<R>) {
    if msg.is_empty() {
        return;
    }
    let v: Value = serde_json::from_str(&msg).unwrap();
    let uri = v[2]["uri"].to_string();
    let uri = uri
        .strip_prefix(r#"""#)
        .unwrap()
        .strip_suffix(r#"""#)
        .unwrap();

    debug!("uri: {:#?}", uri);

    if uri == "/lol-gameflow/v1/gameflow-phase" {
        debug!("{}", v[2]["data"]);
        match v[2]["data"].to_string().as_str() {
            "\"None\"" => {
                window.emit("Gameflow", "None").unwrap();
            }
            "\"Lobby\"" => {
                window.emit("Gameflow", "Lobby").unwrap();
            }
            "\"Matchmaking\"" => {
                window.emit("Gameflow", "Matchmaking").unwrap();
            }
            "\"CheckedIntoTournament\"" => {
                window.emit("Gameflow", "CheckedIntoTournament").unwrap();
            }
            "\"ReadyCheck\"" => {
                window.emit("Gameflow", "ReadyCheck").unwrap();
            }
            "\"ChampSelect\"" => {
                window.emit("Gameflow", "ChampSelect").unwrap();
            }
            "\"GameStart\"" => {
                window.emit("Gameflow", "GameStart").unwrap();
            }
            "\"FailedToLaunch\"" => {
                window.emit("Gameflow", "FailedToLaunch").unwrap();
            }
            "\"InProgress\"" => {
                window.emit("Gameflow", "InProgress").unwrap();
            }
            "\"Reconnect\"" => {
                window.emit("Gameflow", "Reconnect").unwrap();
            }
            "\"WaitingForStats\"" => {
                window.emit("Gameflow", "WaitingForStats").unwrap();
            }
            "\"PreEndOfGame\"" => {
                window.emit("Gameflow", "PreEndOfGame").unwrap();
            }
            "\"EndOfGame\"" => {
                window.emit("Gameflow", "EndOfGame").unwrap();
            }
            "\"TerminatedInError\"" => {
                window.emit("Gameflow", "TerminatedInError").unwrap();
            }
            _ => {
                debug!("遇到未知事件");
            }
        }
    } else if uri.starts_with("/lol-champ-select/v1/grid-champions/") {
        debug!("选择英雄: ");
        debug!("{}:{}", v[2]["data"]["id"], v[2]["data"]["name"]);
        window
            .emit("ChampSelect", v[2]["data"]["id"].to_string())
            .unwrap();
    }
}

pub async fn connect<R: Runtime>(window: tauri::Window<R>) -> Result<(), Error> {
    // 检查 websocket 连接是否存在
    unsafe {
        if let Some(r) = &RUNNING {
            if !r.is_finished() {
                debug!("websocket 连接已存在");
                return Ok(());
            }
        }
    }

    // 创建一个 websocket 连接
    debug!("新建 websocket 连接");
    let lp = LcuParameter::get().await?;

    let u = tungstenite::handshake::client::Request::builder()
        .uri(std::format!("wss://127.0.0.1:{}", lp.port))
        .header("Sec-WebSocket-Version", "13")
        .header(
            "Sec-WebSocket-Key",
            tungstenite::handshake::client::generate_key(),
        )
        .header("Connection", "Upgrade")
        .header("Upgrade", "websocket")
        .header(
            "Authorization",
            std::format!(
                "Basic {}",
                BASE64_STANDARD.encode(std::format!("riot:{}", lp.token))
            ),
        )
        .header("Host", std::format!("127.0.0.1:{}", lp.port))
        .body(())?;

    let (mut ws, _) = tungstenite::connect(u)?;
    // 订阅事件
    ws.write_message(tungstenite::Message::Text(
        r#"[5,"OnJsonApiEvent",{"uri":"/lol-gameflow/v1/gameflow-phase"}]"#.into(),
    ))?;
    // 启动监听线程
    unsafe {
        RUNNING = Some(spawn(move || -> Result<(), String> {
            loop {
                // let msg = ws.read_message().expect("读取消息失败");
                let msg = ws.read_message().map_or_else(
                    |e| {
                        window.emit_and_trigger("ConnectionClosed", "").unwrap();
                        tauri::async_runtime::block_on(LcuParameter::abandon());
                        Err(e).unwrap()
                    },
                    |v| v,
                );
                message_handler(msg.to_string(), &window);
            }
        }));
    }
    Ok(())
}
