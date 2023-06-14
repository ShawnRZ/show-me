use log::debug;
use serde::{Deserialize, Serialize};
use std::{fmt, mem::MaybeUninit, sync::Once};
use sysinfo::{ProcessExt, System, SystemExt};
use tauri::async_runtime::Mutex;

#[derive(Debug, Serialize, Deserialize)]
pub struct LcuParameter {
    pub port: String,
    pub token: String,
}

impl LcuParameter {
    pub async fn get() -> Result<LcuParameter, ParameterError> {
        debug!("LcuParameter::get()");
        let mut lp = LcuParameterGlobal::get().lock().await;
        if !lp.working {
            lp.refresh()?;
        }
        Ok(LcuParameter {
            port: lp.port.to_string(),
            token: lp.token.to_string(),
        })
    }

    pub async fn abandon() {
        debug!("abandon()");
        LcuParameterGlobal::get().lock().await.working = false;
    }
}

struct LcuParameterGlobal {
    port: String,
    token: String,
    working: bool,
}

impl LcuParameterGlobal {
    fn get() -> &'static Mutex<LcuParameterGlobal> {
        debug!("LcuParameterGlobal::get()");
        static mut G_LCU_PARAMETER: MaybeUninit<Mutex<LcuParameterGlobal>> = MaybeUninit::uninit();
        static ONCE: Once = Once::new();

        ONCE.call_once(|| unsafe {
            debug!("初始化LCU_PARAMETER");
            G_LCU_PARAMETER
                .as_mut_ptr()
                .write(Mutex::new(LcuParameterGlobal {
                    port: String::new(),
                    token: String::new(),
                    working: false,
                }));
        });
        unsafe { &*G_LCU_PARAMETER.as_ptr() }
    }

    fn refresh(&mut self) -> Result<(), ParameterError> {
        debug!("LcuParameterGlobal::refresh()");
        let mut sys = System::new_all();
        sys.refresh_all();
        let processes: Vec<_> = sys.processes_by_exact_name("LeagueClientUx.exe").collect();
        if processes.len() > 1 {
            Err(ParameterError::MultipleClientProcessesFound)?
        } else if processes.len() < 1 {
            Err(ParameterError::ClientProcessNotFound)?
        }
        let process = processes[0];
        debug!("{:#?}", process.cmd());
        let args = process.cmd();

        let port = args
            .iter()
            .find(|arg| arg.starts_with("--app-port"))
            .map(|arg| arg.strip_prefix("--app-port=").unwrap())
            .ok_or(ParameterError::PortNotFound)?
            .to_string();
        let token = args
            .iter()
            .find(|arg| arg.starts_with("--remoting-auth-token"))
            .map(|arg| arg.strip_prefix("--remoting-auth-token=").unwrap())
            .ok_or(ParameterError::TokenNotFound)?
            .to_string();
        self.port = port;
        self.token = token;
        self.working = true;
        Ok(())
    }
}

#[derive(Debug)]
pub enum ParameterError {
    // 存在多个客户端进程
    MultipleClientProcessesFound,
    // 没有找到客户端进程
    ClientProcessNotFound,
    // 没有找到端口
    PortNotFound,
    // 没有找到令牌
    TokenNotFound,
}

impl fmt::Display for ParameterError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::MultipleClientProcessesFound => write!(f, "存在多个客户端进程"),
            Self::ClientProcessNotFound => write!(f, "没有找到客户端进程"),
            Self::PortNotFound => write!(f, "没有找到端口"),
            Self::TokenNotFound => write!(f, "没有找到令牌"),
        }
    }
}

impl std::error::Error for ParameterError {}

// #[cfg(test)]
// mod tests {
//     use crate::lcu::parameter::LcuParameter;
//     #[test]
//     fn get_lcu_parameter_test() {
//         println!("{:#?}", LcuParameter::get().unwrap());
//     }
// }
