import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: any) {
    await interaction.reply({
      content: makeCodeBlock("pong"),
      ephemeral: false,
    });
  },
};
