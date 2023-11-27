### Seungchan-Bot-Project

#### Reference

- https://discord.com/developers/applications => 봇 리스트 확인
- https://discordjs.guide => 봇 제작 가이드
- https://www.writebots.com/discord-text-formatting => 봇 텍스트 컬러 포맷 이름
- https://ark.wiki.gg/wiki/ARK_Wiki/ko => 아크 공식 위키

#### Todo

- 오라클 클라우드 계정 생성 시도
- Response data JSON Beautify 할 방법 찾기

### BOT 기능 정리

#### MessageFormat

- Embed 형태
- CodeBlock 형태

#### docker pm2

- 컨테이너가 살아있으려면 forground process가 필요함
- foreground process : 쉘(shell)에서 해당 프로세스 실행을 명령한 후, 해당 프로세스 수행 종료까지 사용자가 다른 입력을 하지 못하는 프로세스
- 즉 pm2로 돌리려면 pm2 start가 아닌 pm2-runtime으로 구동시켜줘야함
