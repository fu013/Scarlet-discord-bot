import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";
import setServerArkPVP from "../../api/setServerArkPVP";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("관리자-아크피브이피데이터수집")
    .setDescription("모든 아크 PVP서버의 데이터를 수집합니다."),
  async execute(interaction: any) {
    await interaction.reply(
      makeCodeBlock("모든 아크 PVP서버의 데이터를 수집합니다.")
    );
    await setServerArkPVP();
  },
};
