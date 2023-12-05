import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import getServerInfoById_nt from "../../api/nitrado/getServerInfo";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("사설서버-상태")
    .setDescription("사설서버의 상태를 출력합니다."),
  async execute(interaction: any) {
    await interaction.reply(
      makeCodeBlock(await getServerInfoById_nt(process.env.NITRADO_SERVER_ID))
    );
  },
};
