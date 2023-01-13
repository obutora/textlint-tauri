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
    let path = std::fs::canonicalize("../nexe").unwrap();

    // current dir を変更しないとサーバーがリソース読み込みに失敗する
    std::env::set_current_dir(path).unwrap();

    println!("current dir: {:?}", std::env::current_dir().unwrap());

    let process = std::process::Command::new("./textlint.exe").spawn();

    match process {
        Ok(_process) => {
            println!("process is running");
            return "textlint server is runnning".to_string();
        }
        Err(e) => {
            println!("failed to execute process: {}", e);
            return "server error".to_string();
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, run_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
