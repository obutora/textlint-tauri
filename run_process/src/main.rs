use std::env;
use std::fs;
use std::process::Command;

fn main() {
    let tauri_path = fs::canonicalize("./textlint/textlint.exe").unwrap();
    let nexe_dir_path = fs::canonicalize("./nexe").unwrap();

    Command::new(tauri_path)
        .spawn()
        .expect("tauri : failed to execute process");

    // current dir を変更しないとサーバーがリソース読み込みに失敗する
    env::set_current_dir(nexe_dir_path).unwrap();
    Command::new("./textlint.exe")
        .spawn()
        .expect("nexe : failed to execute process");
}
