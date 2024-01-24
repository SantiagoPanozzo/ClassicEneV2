const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pato')
        .setDescription('Pikapaty!'),
    async execute(interaction) {
        await interaction.reply('Puta!');
    },
};