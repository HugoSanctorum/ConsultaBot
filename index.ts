import {MessageActionRow, MessageButton, MessageEmbed} from "discord.js";

require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'init') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('private')
                    .setLabel('🤫 Consultation Privée')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('public')
                    .setLabel('👀 Consultation Publique')
                    .setStyle('PRIMARY'),
            );

        const embed = new MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Commencer une consultation')
            .setThumbnail(String(process.env.HOSPITAL_ICON))
            .setDescription('Choisissez un type de consultation')
            .addField("Consultation privée", `Uniquement les <@&${process.env.DOCTOR_ROLE}> peuvent participer`)
            .addField("Consultation publique", `Tout le monde peut participer`);


        await interaction.reply({ embeds: [embed], components: [row] });
    }
});

client.login(process.env.TOKEN);