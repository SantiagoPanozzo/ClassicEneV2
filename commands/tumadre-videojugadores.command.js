const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tumadre')
    .setDescription('Tu madre'),
  async execute(interaction) {
    await interaction.reply('tiene una pollaaaaa');
  },
};