import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("나")
    .setDescription("사용자의 정보를 출력합니다."),
  async execute(interaction: any) {
    await interaction.reply(
      makeCodeBlock(
        `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
      )
    );
  },
};
