#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn run_server() -> String {
    std::process::Command::new("../nexe/textlint.exe")
        // .spawn()
        .spawn()
        .expect("failed to execute process");

    // if process. {
    //     "textlint server is runnning".to_string()
    // } else {
    //     "failed server".to_string()
    // }
    "textlint server is runnning".to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, run_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
