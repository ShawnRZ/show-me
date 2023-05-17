#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use env_logger::Env;
use log::{debug, error, info, trace, warn};
use show_me;
use tauri::Manager;
use window_shadows::set_shadow;

#[tauri::command]
fn get_command_line() -> (String, String) {
    show_me::get_command_line()
}

fn main() {
    env_logger::Builder::from_env(Env::default().default_filter_or("trace")).init();

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
        .invoke_handler(tauri::generate_handler![greet, get_command_line])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
