@echo off
setlocal

set "SCRIPT=%~dp0updater.ps1"

echo Installation de Spicetify Auto-Updater...
echo.

:: Enregistrement au demarrage Windows (sans droits admin)
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" ^
  /v "SpicetifyAutoUpdater" ^
  /t REG_SZ ^
  /d "powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -NonInteractive -File \"%SCRIPT%\"" ^
  /f >nul 2>&1

if %errorlevel% neq 0 (
    echo [ERREUR] Impossible d'ecrire dans le registre.
    pause
    exit /b 1
)

echo [OK] Demarre automatiquement a chaque connexion Windows.

:: Lancement immediat en arriere-plan
start "" powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -NonInteractive -File "%SCRIPT%"

echo [OK] Updater lance en arriere-plan.
echo.
echo Termine. Tu peux fermer cette fenetre.
pause
