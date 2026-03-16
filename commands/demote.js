
  execute: async (conn, m, args) => {

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, {
        text: "❌ Cette commande fonctionne seulement dans un groupe."
      }, { quoted: m });
    }

    let user = m.mentionedJid?.[0];

    if (!user) {
      return conn.sendMessage(m.chat, {
        text: "⚠️ Mentionne la personne à rétrograder."
      }, { quoted: m });
    }

    try {

      await conn.groupParticipantsUpdate(
        m.chat,
        [user],
        "demote"
      );

      let msg = `
╭━━━〔 ⬇️ DEMOTE 〕━━━⬣
┃
┃ ⚠️ @${user.split("@")[0]}
┃ n'est plus acteur ou actrice.
┃
┃ 👤 Tu me mérites pas t'as place d'actueur ou d'actrice.
┃ 
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
      conn.sendMessage(m.chat, { text: "❌ Impossible de retirer les droits admin." }, { quoted: m });
    }

  }
};
