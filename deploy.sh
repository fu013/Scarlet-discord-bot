#!/bin/bash

REPOSITORY=/home/ssm-user/Scarlet-discord-bot
PROJECT_NAME=_scarlet

cd $REPOSITORY

echo "가상 메모리 초기화"
sudo swapoff -v /mnt/swapfile
sudo rm /mnt/swapfile

echo "가상 메모리 설정(2GB)"
sudo dd if=/dev/zero of=/mnt/swapfile bs=1M count=2048
sudo mkswap /mnt/swapfile
sudo swapon /mnt/swapfile

echo "메모리 조회"
RUN free -h

echo "Docker 컨테이너&이미지 초기화"
sudo killall containerd-shim
docker rmi $(docker images -q)
docker rm -f $(docker ps -qa)

echo "Docker 컨테이너 로그&볼륨 초기화"
docker system prune -af
docker volume rm $(docker volume ls -qf dangling=true)

echo "도커 컨테이너 배포"
docker compose up -d