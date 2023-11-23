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
        .addChoices({ name: "official", value: "2" })
        .addChoices({ name: "Small Tribes", value: "3" })
        .addChoices({ name: "Arkpocalypse", value: "4" })
        .addChoices({ name: "New Arkpocalypse", value: "0" })
        .addChoices({ name: "New Small Tribes", value: "1" })
    ),
  async execute(i: any) {
    const type = i.options.getString("server-type");
    console.log(i.options._hoistedOptions[0].name);
    await i.reply(makeCodeBlock(await getRates(type)));
  },
};
