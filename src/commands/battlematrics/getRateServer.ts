import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import getRates from "../../scraper/getRates";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("아크-배율")
    .setDescription("아크 서버의 현재 배율을 출력합니다.")
    .addStringOption((option) =>
      option
        .setName("서버-선택")
        .setDescription("서버 목록을 선택합니다.")
        .setRequired(false)
        .addChoices({ name: "official", value: "2" })
        .addChoices({ name: "Small Tribes", value: "3" })
        .addChoices({ name: "Arkpocalypse", value: "4" })
        .addChoices({ name: "New Arkpocalypse", value: "0" })
        .addChoices({ name: "New Small Tribes", value: "1" })
    ),
  async execute(i: any) {
    const type = i.options.getString("서버-선택");
    await i.reply(makeCodeBlock(await getRates(type)));
  },
};
