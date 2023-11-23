import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeGreeting = () => {
  const greeting = [
    "안녕하세요!", // 대한민국
    "Hello!", // 미국
    "Bonjour!", // 프랑스
    "Hola!", // 스페인
    "Ciao!", // 이탈리아
    "Hallo!", // 독일
    "こんにちは!", // 일본
    "你好!", // 중국 (간체자)
    "Привет!", // 러시아
    "Merhaba!", // 터키
    "Sawubona!", // 남아프리카 공화국
    "Salam!", // 아랍 언어
    "Jambo!", // 스와힐리어 (동아프리카)
    "Salamat!", // 필리핀
    "Szia!", // 헝가리
    "Hallo!", // 네덜란드
    "Olá!", // 포르투갈
    "Hej!", // 스웨덴
    "Aloha!", // 하와이
    "Sawadee!", // 태국
    "Namaste!", // 인도
    "Salve!", // 라틴어
    "Merhaba!", // 아제르바이잔
    "Mingalaba!", // 미얀마
    "Shalom!", // 이스라엘
    "Konnichiwa!", // 일본
    "Hallo!", // 벨기에
    "Halo!", // 인도네시아
    "Zdravo!", // 크로아티아
    "Dia dhuit!", // 아일랜드
    "Sveiki!", // 라트비아
    "Merhaba!", // 타지키스탄
    "Selamat pagi!", // 말레이시아.
    "상진",
    "영훈",
    "석구",
    "성준",
    "석주",
    "야리",
    "상현",
  ];
  return makeCodeBlock(greeting[getRandomNumber(0, greeting.length)]);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("안녕")
    .setDescription("랜덤 언어의 인사말을 출력합니다."),
  async execute(interaction: any) {
    await interaction.reply({ content: makeGreeting(), ephemeral: false });
  },
};
