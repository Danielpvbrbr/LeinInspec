@echo off

cd /d D:\Develop\leinInspec
start cmd /k "npm run dev"

cd /d D:\Develop\leinInspec\server
start cmd /k "npm run dev"
