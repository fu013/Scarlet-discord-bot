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
sudo free -h

echo "디스크 조회"
sudo df -h

echo "사용 포트 초기화"
sudo fuser -k 3306/tcp
sudo fuser -k 9999/tcp

echo "Docker 컨테이너&이미지 삭제(용량 비우기)"
sudo killall containerd-shim
sudo docker rmi $(docker images -q)
sudo docker rm -f $(docker ps -qa)

echo "Docker 컨테이너 로그&볼륨 삭제(용량 비우기)"
sudo docker system prune -af
sudo docker volume rm $(docker volume ls -qf dangling=true)

echo "도커 컨테이너 배포"
sudo docker compose up -d