async function convencer(interaction, options) {
  const userToInvite = interaction.options.getUser('usuário');
  const userInvoking = interaction.user;
  const object = interaction.options.getString("objeto")

  const embed = new EmbedBuilder()
    .setColor(0x4EF111) // Lime color
    .setTitle('Convite de Jogo')
    .setDescription(`${userToInvite}, ${userInvoking} te convidou a uma partida de C.O.N.V.I.N.C.E.N.T.E ` +
      '(**Completamente e Onipotentemente Na Verdadeira Intelectualidade Na Cabeça Estranha Na Tua Esperteza**)');

  if (object) {
    embed.setFooter(`Ele quer te convencer a ${object}`);
  }

  const acceptButton = new ButtonBuilder()
    .setCustomId('aceitar_button')
    .setLabel('✅')
    .setStyle(ButtonStyle.Success);

  const rejectButton = new ButtonBuilder()
    .setCustomId('rejeitar_button')
    .setLabel('❌')
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(acceptButton, rejectButton);

  invitedUsers.set(interaction.id, userToInvite.id);

  await interaction.reply({ embeds: [embed], components: [row] });
}

module.exports = { convencer };