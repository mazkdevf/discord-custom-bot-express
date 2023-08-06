const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help command for bot"),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`Custom Bot Help Menu!`);

        interaction.editReply({ embeds: [embed] })
    },
};