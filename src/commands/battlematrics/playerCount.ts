import {
  SlashCommandBuilder,
  EmbedBuilder,
  codeBlock,
  inlineCode,
  spoiler,
  underscore,
  blockQuote,
} from "discord.js";
import getUser from "../../api/getUser";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("player")
    .setDescription("Provides information about the server.")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The categories")
        .setRequired(false)
        .addChoices(
          { name: "A", value: "A" },
          { name: "B", value: "B" },
          { name: "C", value: "C" }
        )
    ),
  async execute(interaction: any) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Some title")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: "Some name",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
        url: "https://discord.js.org",
      })
      .setDescription("Some description here")
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .addFields(
        { name: "Regular field title", value: "Some value here" },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addFields({
        name: "Inline field title",
        value: await getUser(),
        inline: true,
      })
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
    const jsString = "```fix\n Hi Im blue *man!*```";
    // const exportThings = codeBlock(jsString);
    interaction.channel.send({ embeds: [exampleEmbed] });
    await interaction.reply({ content: jsString, ephemeral: false });
  },
};
