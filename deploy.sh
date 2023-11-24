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

echo "Docker 컨테이너&이미지 삭제(용량 비우기)"
docker rm -f $(docker ps -qa)
killall containerd-shim
docker rmi -f $(docker images -q)

echo "Docker 컨테이너 로그&볼륨 삭제(용량 비우기)"
docker system prune -af
docker volume rm $(docker volume ls -qf dangling=true)

echo "사용 포트 초기화"
sudo kill `lsof -t -i:3306`

echo "사용 포트 초기화2"
sudo fuser -k 3306/tcp

echo "도커 컨테이너 배포"
docker compose up -d