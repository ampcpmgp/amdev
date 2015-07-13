SET version=electron-v0.29.1-win32-x64

SET project_path=%~dp0
cd ../
SET atom_shell_path=%cd%\%version%
cd %project_path%
start %atom_shell_path%\electron.exe %project_path%electron/lib/browser
