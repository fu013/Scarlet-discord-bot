#!/bin/bash

REPOSITORY=/home/ssm-user/Scarlet-discord-bot
PROJECT_NAME=_scarlet

cd $REPOSITORY

echo "가상 메모리 초기화"
swapoff -v /mnt/swapfile
rm /mnt/swapfile

echo "가상 메모리 설정(2GB)"
dd if=/dev/zero of=/mnt/swapfile bs=1M count=2048
mkswap /mnt/swapfile
swapon /mnt/swapfile

echo "메모리 조회"
free -h

echo "디스크 조회"
df -h

echo "사용 포트 초기화"
kill `lsof -t -i:3306`
kill `lsof -t -i:9999`

echo "Docker 컨테이너&이미지 삭제(용량 비우기)"
docker rmi -f $(docker images -q)
docker rm -f $(docker ps -qa)
killall containerd-shim

echo "Docker 네트워크 삭제"
docker network rm -f $(docker network ls -q)

echo "Docker 컨테이너 로그&볼륨 삭제(용량 비우기)"
docker system prune -af
docker volume rm $(docker volume ls -qf dangling=true)

echo "도커 컨테이너 배포"
docker compose up -d