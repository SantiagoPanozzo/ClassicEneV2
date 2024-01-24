const { SlashCommandBuilder } = require('@discordjs/builders');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Repite un mensaje hasta 10 veces')
        .addStringOption(
          option => option
          .setName("texto")
          .setDescription("Texto a repetir")
          .setRequired(true)
        )
        .addNumberOption(option => option
        .setName("veces")
        .setDescription("Cantidad de veces (<= 10)")
        .setRequired(true)
        ),
    async execute(interaction) {
        const veces = interaction.options.getNumber("veces");
        const texto = interaction.options.getString("texto");
        if(veces > 10)
          veces = 10;
        await interaction.reply(texto);
        for(let i = 1; i < veces; i++){
          sleep(1000 * i).then(() => interaction.followUp(texto));
        }
    },
};