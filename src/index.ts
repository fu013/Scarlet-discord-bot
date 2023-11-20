const fs = require("node:fs");
const path = require("node:path");
const {
  Discord,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

require("dotenv").config();
console.log(process.env);

/**
 * 봇 환경 설정
 */
const prefix = "!";
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
});

/**
 * 봇 연결 및 상태 확인
 */
client.login(process.env.BOT_TOKEN);
client.once(Events.ClientReady, (c: any) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

/**
 * 봇 메세지 수신/발신
 */
client.on("messageCreate", (msg: any) => {
  console.log("msg event triggered: " + msg.content);

  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const commandBody = msg.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    msg.reply(`pong!`);
  }
});

/**
 * 명령어 파일을 봇이 읽을 수 있도록 설정
 */
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: any) =>
    file.endsWith(process.env.NODE_ENV === "test" ? ".ts" : ".js")
  );

console.log(commandFiles);

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

console.log(client.commands);

/**
 * 컬렉션을 기반으로 일치하는 명령을 수행
 */
client.on(Events.InteractionCreate, async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});
