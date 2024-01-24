const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const path = require('node:path');
const keepAlive = require("./server");
const fs = require('fs');

const TOKEN = process.env['TOKEN'];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

require('./deploy-global.js');
require('./deploy-olimpo.js');  
require('./deploy-videojugadores.js');

client.commands = new Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
  }

  try {
      await command.execute(interaction);
  } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
  }
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('command.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

client.on("debug", (e) => console.log(e));

client.login(TOKEN);

keepAlive()