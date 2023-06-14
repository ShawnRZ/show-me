#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use env_logger::Env;
use log::{debug, error, info, trace, warn};
use show_me::{
    cer,
    lcu::{http, parameter::LcuParameter, websocket, Summoner},
    sgp,
};
use tauri::{Manager, Runtime};
use window_shadows::set_shadow;

#[tauri::command]
fn test_and_set_cer() -> Result<(), String> {
    debug!("test_and_set_cer()");
    cer::test_and_set().map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_command_line() -> Result<(String, String), String> {
    debug!("get_command_line()");
    LcuParameter::abandon().await;
    let lp = LcuParameter::get().await.map_err(|e| e.to_string())?;
    Ok((lp.token.clone(), lp.port.clone()))
}

#[tauri::command]
async fn connect<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    debug!("connect()");
    LcuParameter::abandon().await;
    websocket::connect(window)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn get_lcu_parameter() -> Result<LcuParameter, String> {
    debug!("get_lcu_parameter()");
    LcuParameter::get().await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_current_summoner() -> Result<Summoner, String> {
    debug!("get_current_summoner()");
    http::get_current_summoner()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_summoners_by_name(name: String) -> Result<(), String> {
    debug!("get_summoners_by_name()");
    sgp::get_summoners_by_name(&name)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn get_match_history_by_puuid(
    puuid: String,
    region: String,
    start: u64,
    count: u64,
) -> Result<String, String> {
    debug!("get_match_history_by_puuid()");
    let res = sgp::get_match_history_by_puuid(&puuid, &region, start, count)
        .await
        .map_err(|e| e.to_string())?;
    Ok(res)
}

fn main() {
    env_logger::Builder::from_env(Env::default().default_filter_or("debug")).init();

    error!("error");
    warn!("warn");
    info!("info");
    debug!("debug");
    trace!("trace");

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            test_and_set_cer,
            get_lcu_parameter,
            connect,
            get_current_summoner,
            get_command_line,
            get_summoners_by_name,
            get_match_history_by_puuid,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
