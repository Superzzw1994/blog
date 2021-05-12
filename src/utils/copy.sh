#! /bin/sh
cd /Users/evil/Desktop/personalproject/blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
