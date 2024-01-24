const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calla')
        .setDescription('Manda a callar a alguien.')
        .addUserOption(option=> option
            .setName("username")
            .setDescription("El usuario que quieres que se calle")
            .setRequired(true)),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild

        const selectedUser = (interaction.options.getUser("username") === null) ? interaction.user :
            interaction.options.getUser("username");
        let usertag = `<@${selectedUser.id}>`;
        if(interaction.user.id === '324916024036032512') {
          usertag = 'tu, pikaputa https://media.tenor.com/eKGAx_bpgs4AAAAC/kagerou-project.gif';
        } else
        if(selectedUser.id === '482234343331201034') {
          usertag = `tu, tont@ https://media.tenor.com/eKGAx_bpgs4AAAAC/kagerou-project.gif`;
        }
        await interaction.reply(`Calla ${usertag}.`);
    },
};