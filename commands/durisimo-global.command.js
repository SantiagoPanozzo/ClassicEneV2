const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('durisimo')
    .setDescription('durisimo ermano'),
  async execute(interaction) {
    await interaction.reply('durisimo ermano');
  },
};