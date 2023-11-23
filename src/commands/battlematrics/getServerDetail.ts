import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import setServerArkPVP from "../../api/setServerArkPVP";
import getServerInfoById from "../../api/getServerInfoById";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("아크-공식피브이피서버조회")
    .setDescription("공식 서버 넘버를 입력해주세요.")
    .addStringOption((option) =>
      option
        .setName("서버시리얼")
        .setDescription("서버 시리얼을 입력해주세요.")
        .setRequired(false)
    ),
  async execute(i: any) {
    await i.reply(
      makeCodeBlock(await getServerInfoById(i.options.getString("서버시리얼")))
    );
    await setServerArkPVP();
  },
};
