@echo off
setlocal
cd /d "%~dp0"

where python >nul 2>&1
if %errorlevel% neq 0 (
  echo Python 3 is required.
  echo Install it from https://www.python.org/ or run: winget install Python.Python.3
  exit /b 1
)

if exist requirements.txt (
  python -m pip install -r requirements.txt
) else (
  echo No pip requirements file found. Python is installed.
)

endlocal
