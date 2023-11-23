import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import { putCommands } from "../../index";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("All commands"),
  async execute(interaction: any) {
    await interaction.reply({
      content: makeCodeBlock(JSON.stringify(putCommands, null, 2)),
      ephemeral: false,
    });
  },
};
