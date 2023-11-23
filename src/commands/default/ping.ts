import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("핑")
    .setDescription("연결 상태를 확인합니다."),
  async execute(interaction: any) {
    await interaction.reply({
      content: makeCodeBlock("pong"),
      ephemeral: false,
    });
  },
};
