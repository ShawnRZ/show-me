use serde::{Deserialize, Serialize};
use sysinfo::{ProcessExt, System, SystemExt};
use tauri::utils::debug_eprintln;

#[derive(Debug, Serialize, Deserialize)]
pub struct LcuParameter {
    pub port: String,
    pub token: String,
}

impl LcuParameter {
    fn new(port: String, token: String) -> Self {
        LcuParameter { port, token }
    }
    pub fn get() -> Result<Self, LcuParameterError> {
        let mut sys = System::new_all();
        sys.refresh_all();
        let processes: Vec<_> = sys.processes_by_exact_name("LeagueClientUx.exe").collect();
        if processes.len() > 1 {
            Err(LcuParameterError::MultipleClientProcessesFound)?
        } else if processes.len() < 1 {
            Err(LcuParameterError::ClientProcessNotFound)?
        }
        let process = processes[0];
        debug_eprintln!("{:#?}", process.cmd());
        let args = process.cmd();

        let port = args
            .iter()
            .find(|arg| arg.starts_with("--app-port"))
            .map(|arg| arg.strip_prefix("--app-port=").unwrap())
            .ok_or(LcuParameterError::PortNotFound)?
            .to_string();
        let token = args
            .iter()
            .find(|arg| arg.starts_with("--remoting-auth-token"))
            .map(|arg| arg.strip_prefix("--remoting-auth-token=").unwrap())
            .ok_or(LcuParameterError::TokenNotFound)?
            .to_string();

        Ok(Self::new(port, token))
    }
}

#[derive(Debug, Clone)]
pub enum LcuParameterError {
    // 存在多个客户端进程
    MultipleClientProcessesFound,
    // 没有找到客户端进程
    ClientProcessNotFound,
    // 没有找到端口
    PortNotFound,
    // 没有找到令牌
    TokenNotFound,
}

impl std::fmt::Display for LcuParameterError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::MultipleClientProcessesFound => write!(f, "存在多个客户端进程"),
            Self::ClientProcessNotFound => write!(f, "没有找到客户端进程"),
            Self::PortNotFound => write!(f, "没有找到端口"),
            Self::TokenNotFound => write!(f, "没有找到令牌"),
        }
    }
}

impl std::error::Error for LcuParameterError {}

#[cfg(test)]
mod tests {
    use crate::lcu::parameter::LcuParameter;
    #[test]
    fn get_lcu_parameter_test() {
        println!("{:#?}", LcuParameter::get().unwrap());
    }
}
