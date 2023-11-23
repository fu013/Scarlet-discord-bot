import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import { putCommands } from "../../index";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("명령어")
    .setDescription("모든 명령어를 보여줍니다."),
  async execute(interaction: any) {
    await interaction.reply({
      content: makeCodeBlock(JSON.stringify(putCommands, null, 2)),
      ephemeral: false,
    });
  },
};
