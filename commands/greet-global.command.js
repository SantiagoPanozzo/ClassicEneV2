const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('greet')
        .setDescription('Hola!'),
    async execute(interaction) {
        await interaction.reply('Saludos! Soy EneV2, un bot creado por SnowieMischief#8543. Esta versión está incompleta, pero siéntete libre de utilizar mis comandos.');
    },
};