@echo off
setlocal enabledelayedexpansion

:: environment variable name
set ENV_VAR_NAME=NO_DE_SLEEP_INTERVAL

:: Check if the environment variable already exists in the system.
for /f "tokens=2 delims==" %%A in ('set %ENV_VAR_NAME% 2^>nul') do set CURRENT_VALUE=%%A

:: Main menu
:menu
cls
:: Check if the variable exists and display its value
if defined CURRENT_VALUE (
    echo The variable %ENV_VAR_NAME% already exists with the value: %CURRENT_VALUE%
) else (
    echo The variable %ENV_VAR_NAME% is not set yet.
)
echo.
echo Choose an option:
echo.
echo 1) Set the value of the environment variable (%ENV_VAR_NAME%)
echo 2) Remove the environment variable (%ENV_VAR_NAME%)
echo 3) Exit
:menu_choice
echo.
set /p choice="Enter your choice: "

if "%choice%"=="1" goto set_variable
if "%choice%"=="2" goto remove_variable
if "%choice%"=="3" goto exit_script
echo Invalid choice. Please try again.
goto menu_choice

:set_variable
cls
:input_value
set /p value="Enter a numeric value for %ENV_VAR_NAME%: "
:: Check that the entered value is numeric.
for /f "delims=0123456789" %%A in ("%value%") do (
    echo.
    echo Error: The value must be numeric.
    set /p retry="Do you want to try again? (y/n): "
    if /i "!retry!"=="n" goto menu
    echo.
    goto input_value
)
:: Set the environment variable and update its value for the session.
setx %ENV_VAR_NAME% %value% >nul
set CURRENT_VALUE=%value%
echo.
echo The variable %ENV_VAR_NAME% has been set to %value%.
echo Press any key to continue...
pause >nul
goto menu

:remove_variable
cls
echo Are you sure you want to remove the environment variable %ENV_VAR_NAME%?
set /p confirm="Type 'y' to confirm or any other key to cancel: "
echo.
if /i "!confirm!"=="y" (
    :: setx %ENV_VAR_NAME% "" >nul
    reg delete "HKCU\Environment" /F /V %ENV_VAR_NAME% >nul 2>&1
    set CURRENT_VALUE=
    echo The variable %ENV_VAR_NAME% has been removed.
) else (
    echo Operation cancelled.
)
echo Press any key to continue...
pause >nul
goto menu

:exit_script
echo Exiting the program...
endlocal
exit
