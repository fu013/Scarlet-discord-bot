import { SlashCommandBuilder } from "discord.js";
import getUser from "../../api/getUser";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("player")
    .setDescription("Provides information about the server."),
  async execute(interaction: any) {
    await interaction.reply(await getUser());
  },
};
