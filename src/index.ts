import logger from "./config/winston";
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
} = require("discord.js");
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
  partials: [Partials.Channel],
});

/**
 * 봇 연결 및 상태 확인
 */
client.login(process.env.BOT_TOKEN);
client.once(Events.ClientReady, (c: any) => {
  logger.debug(`Ready! Logged in as ${c.user.tag}`);
});

/**
 * 모든 메세지 수신/발신시 발생하는 이벤트
 */
client.on("messageCreate", (msg: any) => {
  logger.debug("msg event triggered: " + msg.content);

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

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    logger.debug(command.data.name);
    client.commands.set(command.data.name, command);
  } else {
    logger.error(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

/**
 * (/)으로 등록된 명령을 수행할 때 발생하는 이벤트(상호작용)
 */

client.on("interactionCreate", async (i: any) => {
  logger.debug("interaction event triggered: " + i);
  if (!i.isChatInputCommand()) return;
  const command = i.client.commands.get(i.commandName);
  if (!command) {
    logger.error(`No command matching ${i.commandName} was found.`);
    return;
  }
  try {
    await command.execute(i);
  } catch (error) {
    logger.error(error);
    if (i.replied || i.deferred) {
      await i.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await i.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

/**
 * 봇 명령어 등록(/)
 */
const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: client.commands.data }
    );

    logger.debug(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    logger.debug(error);
  }
})();
