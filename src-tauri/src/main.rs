#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cer;
mod lcu;

use env_logger::Env;
use lcu::Summoner;
use lcu::{http::LcuClient, parameter::LcuParameter};
use log::{debug, error, info, trace, warn};
use tauri::{Manager, Runtime, State};
use tokio::sync::Mutex;
use window_shadows::set_shadow;

#[tauri::command]
fn test_and_set_cer() -> Result<(), String> {
    cer::test_and_set().map_err(|e| e.to_string())
}

#[tauri::command]
fn get_lcu_parameter() -> Result<lcu::parameter::LcuParameter, String> {
    lcu::parameter::LcuParameter::get().map_err(|e| e.to_string())
}

#[tauri::command]
fn get_command_line() -> Result<(String, String), String> {
    let lp = LcuParameter::get().map_err(|e| e.to_string())?;
    Ok((lp.token, lp.port))
}

#[tauri::command]
fn connect<'r, R: Runtime>(
    window: tauri::Window<R>,
    lc: State<'r, Mutex<LcuClient>>,
) -> Result<(), String> {
    lcu::websocket::connect(window).map_err(|e| e.to_string())?;
    lc.blocking_lock().refresh().map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_current_summoner<'r>(lc: State<'r, Mutex<LcuClient>>) -> Result<Summoner, String> {
    lc.blocking_lock()
        .get_current_summoner()
        .map_err(|e| e.to_string())
}

fn main() {
    env_logger::Builder::from_env(Env::default().default_filter_or("debug")).init();

    error!("error");
    warn!("warn");
    info!("info");
    debug!("debug");
    trace!("trace");

    let lc = Mutex::new(LcuClient::default());

    tauri::Builder::default()
        .manage(lc)
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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
