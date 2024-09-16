async function rejeitarConvincente(interaction, options) {
  const inviter = await client.users.fetch(interaction.user.id);

  const rejectedEmbed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setTitle('Convite de Jogo')
    .setDescription(`Convite rejeitado por ${interaction.user.tag}.`);

  await interaction.update({ embeds: [rejectedEmbed], components: [] });

  inviter.send(`😭 ${interaction.user.tag} rejeitou seu convite para jogar C.O.N.V.I.N.C.E.N.T.E em ${interaction.guild.name}! 😭`);

  
  inviter.send('Psiu? Será que eu já arruinei uma amizade?')

  
  inviter.send('Fica a dica: Se você quiser, você pode jogar convincente comigo! 😉')
}

module.exports = { rejeitarConvincente }