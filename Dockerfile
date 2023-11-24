# 노드 버전
FROM node:20.0.0 as builder

# 작업 폴더 - 컨테이너로 복사
WORKDIR /home/ssm-user/Scarlet-discord-bot
COPY . . 

# 모듈 설치 & 빌드
RUN npm install --silent
RUN npm install -g pm2
RUN npm run build

# 프로세스 시작 명령어
CMD ["./dist/index.js"]