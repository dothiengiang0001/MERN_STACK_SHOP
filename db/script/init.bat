@echo off
echo Waiting for MongoDB to start...

:waitForMongo
ping -n 1 localhost > nul
if %errorlevel% neq 0 (
  timeout /t 1 /nobreak > nul
  goto waitForMongo
)

echo Checking if MongoDB is available on port 27017...

:checkPort
powershell -Command "try { $tcp = [System.Net.Sockets.TcpClient]::new('localhost', 27017); $tcp.Close(); exit 0 } catch { exit 1 }"
if %errorlevel% neq 0 (
  timeout /t 1 /nobreak > nul
  goto checkPort
)

echo Running seed script...
node \seed.js
