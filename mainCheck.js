const express = require("express");
const app = express();

app.listen(6969, () => {
  console.log("Quase lá...");
});

app.get("/", (req, res) => {
  res.send("O Bot do Discord que arruina tudo MUAHAHA");
});

const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ActivityType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Importar comandos
const { convencer } = require('./comandos/convincente.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const token = process.env.token;
const clientId = process.env.clientId;

const invitedUsers = new Map();

const commands = [
  {
    name: "convincente",
    description: "Um jogo onde você tenta convencer alguém de algo!",
    options: [
      {
        name: "usuário",
        description: "Vai jogar com quem?",
        type: 6,
        required: true,
      },
      {
        name: "objeto",
        description: "O que você quer convencer?",
        type: 3,
        required: false,
      }
    ],
  },
];

client.on("ready", async () => {
  console.log('Ah sim! Saber se eu estou online! Mas é claro que tô, oxente!');

  client.user.setPresence({
    activities: [
      {
        name: "A sensação de ser rejeitado, e abandonado",
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
    ],
    status: "online",
  });
});

const rest = new REST({ version: '10' }).setToken(token);

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    const invitedUserId = invitedUsers.get(interaction.message.id);

    if (invitedUserId === interaction.user.id) {
      if (interaction.customId === 'aceitar_button') {
        await interaction.update({ content: 'Você aceitou o convite!', components: [] });
      } else if (interaction.customId === 'rejeitar_button') {
        const inviterId = interaction.message.interaction.user.id;
        const inviter = await client.users.fetch(inviterId);

        const rejectedEmbed = new EmbedBuilder()
          .setColor(0xFF0000) // Red color
          .setTitle('Convite de Jogo')
          .setDescription(`Convite rejeitado por ${interaction.user.tag}.`);

        await interaction.update({ embeds: [rejectedEmbed], components: [] });

        // Send a DM to the inviter
        inviter.send(`${interaction.user.tag} rejeitou seu convite para jogar C.O.N.V.I.N.C.E.N.T.E em ${interaction.guild.name}`);
      }
    } else {
      await interaction.reply({ content: 'Quem você acha que é, mano? Você não consegue tomar decisões pelos outros, cara!!', ephemeral: true });
    }
  } else if (interaction.isCommand()) {
    if (interaction.commandName === 'convincente') {
      convencer(interaction, options)
    }
  }
});

(async () => {
  try {
    console.log('Tô atualizando meus comandos, pera um pouco...');

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log('Atualizei eles, o que tu queria mesmo?');
  } catch (error) {
    console.error(error);
  }
})();

client.login(token);