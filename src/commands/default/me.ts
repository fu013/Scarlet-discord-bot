import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("me")
    .setDescription("Provides information about the user."),
  async execute(interaction: any) {
    await interaction.reply(
      makeCodeBlock(
        `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
      )
    );
  },
};
