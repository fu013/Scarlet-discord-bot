import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import getRates from "../../scraper/getRates";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ark-rate")
    .setDescription("Provides information about the rate.")
    .addStringOption((option) =>
      option
        .setName("server-type")
        .setDescription("The Server-type")
        .setRequired(false)
        .addChoices({ name: "official", value: "official" })
    ),
  async execute(interaction: any) {
    await interaction.reply(makeCodeBlock(await getRates()));
  },
};
