@echo off
echo ========================================================
echo       P&K Consulting Website Deployment Assistant
echo ========================================================
echo.
echo This script will help you deploy your website in seconds.
echo.
echo Steps:
echo 1. A folder named "_deploy" will open on your screen.
echo 2. The Netlify Drop website will open in your browser.
echo 3. Drag the ENTIRE "_deploy" folder onto the Netlify page.
echo.
echo That's it! Your site will be live.
echo.
pause

:: Open the folder
start "" "c:\Users\junbe\Goods\_deploy"

:: Open the browser
start https://app.netlify.com/drop

echo.
echo opened folder and browser. Drag and drop to deploy!
pause
