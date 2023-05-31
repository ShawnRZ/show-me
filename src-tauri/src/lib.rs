pub mod cer;

use log::info;

use core::ffi::c_void;
use std::mem::size_of;
use std::ptr::null_mut;
use tauri::regex::Regex;
use windows_sys::Win32::Foundation::UNICODE_STRING;
use windows_sys::Win32::System::Diagnostics::Debug::ReadProcessMemory;
use windows_sys::Win32::System::ProcessStatus::EnumProcesses;
use windows_sys::Win32::System::ProcessStatus::GetProcessImageFileNameW;
use windows_sys::Win32::System::Threading::NtQueryInformationProcess;
use windows_sys::Win32::System::Threading::OpenProcess;
use windows_sys::Win32::System::Threading::PEB;
use windows_sys::Win32::System::Threading::PROCESS_BASIC_INFORMATION;
use windows_sys::Win32::System::Threading::PROCESS_QUERY_INFORMATION;
use windows_sys::Win32::System::Threading::PROCESS_VM_READ;
use windows_sys::Win32::System::Threading::RTL_USER_PROCESS_PARAMETERS;

pub fn get_command_line() -> (String, String) {
    info!("get_command_line()");
    let mut hprocess = [0 as u32; 1024];
    let mut lpcbneeded = 0;
    let mut command_line = String::new();
    unsafe {
        if EnumProcesses(hprocess.as_mut_ptr(), 4096, &mut lpcbneeded) == 0 {
            println!("调用失败");
        }
        for pid in hprocess {
            if pid == 0 {
                continue;
            }
            let p_hand = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, 0, pid);
            if p_hand == 0 {
                continue;
            }

            // 获取进程名称
            let mut name: [u16; 1024] = [0; 1024];
            if GetProcessImageFileNameW(p_hand, name.as_mut_ptr(), 1024) == 0 {
                println!("获取进程名称失败");
                continue;
            }
            let name = String::from_utf16_lossy(&name);
            if !name.contains("LeagueClientUx.exe") {
                continue;
            }

            // 读取 PROCESS_BASIC_INFORMATION
            let mut pbi: PROCESS_BASIC_INFORMATION = PROCESS_BASIC_INFORMATION {
                ExitStatus: 0,
                PebBaseAddress: null_mut(),
                AffinityMask: 0,
                BasePriority: 0,
                UniqueProcessId: 0,
                InheritedFromUniqueProcessId: 0,
            };
            let mut rl: u32 = 0;
            NtQueryInformationProcess(
                p_hand,
                0,
                std::ptr::addr_of_mut!(pbi) as *mut c_void,
                size_of::<PROCESS_BASIC_INFORMATION>() as u32,
                &mut rl,
            );
            if rl != size_of::<PROCESS_BASIC_INFORMATION>() as u32 {
                println!("{:?}", rl);
                println!("{:?}", size_of::<PROCESS_BASIC_INFORMATION>() as u32);
            }
            // 读取PEB
            let mut peb = PEB {
                Reserved1: [0; 2],
                BeingDebugged: 0,
                Reserved2: [0; 1],
                Reserved3: [null_mut(); 2],
                Ldr: null_mut(),
                ProcessParameters: null_mut(),
                Reserved4: [null_mut(); 3],
                AtlThunkSListPtr: null_mut(),
                Reserved5: null_mut(),
                Reserved6: 0,
                Reserved7: null_mut(),
                Reserved8: 0,
                AtlThunkSListPtr32: 0,
                Reserved9: [null_mut(); 45],
                Reserved10: [0; 96],
                PostProcessInitRoutine: None,
                Reserved11: [0; 128],
                Reserved12: [null_mut(); 1],
                SessionId: 0,
            };
            if ReadProcessMemory(
                p_hand,
                pbi.PebBaseAddress as *const c_void,
                std::ptr::addr_of_mut!(peb) as *mut c_void,
                size_of::<PROCESS_BASIC_INFORMATION>(),
                null_mut() as *mut usize,
            ) == 0
            {
                println!("读取PEB失败")
            }
            // 读取 RTL_USER_PROCESS_PARAMETERS
            let mut rupp = RTL_USER_PROCESS_PARAMETERS {
                Reserved1: [0; 16],
                Reserved2: [null_mut(); 10],
                ImagePathName: UNICODE_STRING {
                    Length: 0,
                    MaximumLength: 0,
                    Buffer: null_mut(),
                },
                CommandLine: UNICODE_STRING {
                    Length: 0,
                    MaximumLength: 0,
                    Buffer: null_mut(),
                },
            };
            if ReadProcessMemory(
                p_hand,
                peb.ProcessParameters as *const c_void,
                std::ptr::addr_of_mut!(rupp) as *mut c_void,
                size_of::<RTL_USER_PROCESS_PARAMETERS>(),
                null_mut() as *mut usize,
            ) == 0
            {
                println!("读取RTL_USER_PROCESS_PARAMETERS失败");
            };
            // 读取 CommandLine
            let mut cl: [u16; 2048] = [0; 2048];
            if ReadProcessMemory(
                p_hand,
                rupp.CommandLine.Buffer as *const c_void,
                cl.as_mut_ptr() as *mut c_void,
                rupp.CommandLine.Length as usize,
                null_mut() as *mut usize,
            ) == 0
            {
                println!("读取 CommandLine 失败");
            }
            command_line = String::from_utf16_lossy(&cl);
            // println!("{}", String::from_utf16_lossy(&cl));
        }
    }

    let regex = Regex::new(r#"(?m)\"--remoting-auth-token=(.*?)\""#).unwrap();
    let caps = regex.captures(&command_line);
    let token = match caps {
        None => String::new(),
        Some(c) => String::from(c.get(1).unwrap().as_str()),
    };

    let regex = Regex::new(r#"(?m)\"--app-port=(.*?)\""#).unwrap();
    let caps = regex.captures(&command_line);

    let port = match caps {
        Some(c) => String::from(c.get(1).unwrap().as_str()),
        None => String::new(),
    };

    (token, port)
}
#[cfg(test)]
mod tests {
    use crate::get_command_line;
    #[test]
    fn get_command_line_test() {
        get_command_line();
    }
}
