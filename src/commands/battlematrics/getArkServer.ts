import { SlashCommandBuilder } from "discord.js";
import getServerAll from "../../api/getServerAll";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ark-server")
    .setDescription("Provides information about the user."),
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
