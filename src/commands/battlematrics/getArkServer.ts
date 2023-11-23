import { SlashCommandBuilder } from "discord.js";
import getServerAll from "../../api/getServerAll";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("아크-서버")
    .setDescription("설정에 맞는 아크 서버를 검색합니다."),
  /* .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setAutocomplete(true)
    ) */
  async execute(interaction: any) {
    await interaction.reply(makeCodeBlock(await getServerAll()));
  },
};
