import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Provides information about the user.")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The gif category")
        .setRequired(true)
        .addChoices(
          { name: "Funny", value: "gif_funny" },
          { name: "Meme", value: "gif_meme" },
          { name: "Movie", value: "gif_movie" }
        )
    ),
  async execute(i: any) {
    await i.reply(data);
  },
};
