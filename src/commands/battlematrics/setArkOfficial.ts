import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import setServerOfficial from "../../api/setServerOfficial";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("관리자-아크공식서버최신화")
    .setDescription("공식서버DB를 최신화합니다."),
  async execute(interaction: any) {
    await interaction.reply(makeCodeBlock("공식 서버 데이터를 최신화합니다."));
    await setServerOfficial();
  },
};
