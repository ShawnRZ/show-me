mod data;

use data::CERT_DATA;
use log::info;
use std::fs::remove_file;
use std::fs::File;
use std::io::IoSlice;
use std::io::Write;
use std::process::Command;

type Error = Box<dyn std::error::Error>;

// 释放证书文件
fn writ_to_file() -> Result<(), Error> {
    let mut cer_file = File::create("riot.cer")?;
    cer_file.write_vectored(&[IoSlice::new(&CERT_DATA)])?;
    Ok(())
}

// 检测证书是否安装
fn test_cer() -> Result<bool, Error> {
    let output = Command::new("powershell")
        .arg("/c")
        .arg("certutil")
        .args([
            "-verifystore",
            "Root",
            r#""LoL Game Engineering Certificate Authority""#,
        ])
        .output()
        .or(Err("检测命令执行异常"))?
        .stdout;

    if String::from_utf8_lossy(&output).contains("e685683bea79cbd35adebcb98d40a0cb8de016ca") {
        Ok(true)
    } else {
        Ok(false)
    }
}

// 安装证书
fn set_cer() -> Result<(), Error> {
    writ_to_file()?;
    let output = Command::new("powershell")
        .arg("/c")
        .arg("certutil")
        .args(["-addstore", "Root", "riot.cer"])
        .output()
        .or(Err("证书安装命令执行异常"))?
        .stdout;
    remove_file("riot.cer")?;
    if String::from_utf8_lossy(&output).contains("LoL Game Engineering Certificate Authority") {
        Ok(())
    } else {
        Err("证书安装结果异常")?
    }
}

pub fn test_and_set() -> Result<(), Error> {
    if !test_cer()? {
        info!("证书未安装");
        set_cer()?;
        info!("证书安装成功");
    } else {
        info!("证书已经安装");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use crate::cer::test_and_set;
    #[test]
    fn test_and_set_test() {
        test_and_set().unwrap();
    }
}
