
  execute: async (conn, m, args) => {

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, {
        text: "❌ Cette commande fonctionne seulement dans un groupe."
      }, { quoted: m });
    }

    let user = m.mentionedJid?.[0];

    if (!user) {
      return conn.sendMessage(m.chat, {
        text: "⚠️ Mentionne la personne à promouvoir."
      }, { quoted: m });
    }

    try {

      await conn.groupParticipantsUpdate(
        m.chat,
        [user],
        "promote"
      );

      let msg = `
╭━━━〔 👑 PROMOTION 〕━━━⬣
┃
┃ 🎉 @${user.split("@")[0]}
┃ est maintenant administrateur.
┃
┃ 🔧 Utilise ce pouvoir
┃ avec responsabilité !
┃
╰━━━━━━━━━━━━━━━━⬣
`;

      await conn.sendMessage(
        m.chat,
        {
          text: msg,
          mentions: [user]
        },
        { quoted: m }
      );

    } catch {
      conn.sendMessage(m.chat, { text: "❌ Impossible de promouvoir cet utilisateur." }, { quoted: m });
    }

  }
};
