
  execute: async (conn, m, args) => {

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, { text: "❌ Cette commande fonctionne seulement dans un groupe." }, { quoted: m });
    }

    let user = m.mentionedJid?.[0];

    if (!user) {
      return conn.sendMessage(m.chat, { text: "⚠️ Mentionne la personne à expulser." }, { quoted: m });
    }

    try {
      await conn.groupParticipantsUpdate(
        m.chat,
        [user],
        "remove"
      );

      let msg = `
╭━━━〔 🚫 𝐊𝐈𝐂𝐊 𝐁𝐘 𝐀𝐊𝐀𝐍𝐄 𝐗𝐎 〕━━━⬣
┃
┃ 👤 Utilisateur : @${user.split("@")[0]}
┃
┃ ❌ A été expulsé du groupe
┃ par un administrateur.
┃
┃ ⚠️ Merci de respecter les règles.
┃
╰━━━━━━━━━━━━⬣
`;

      await conn.sendMessage(
        m.chat,
        {
          text: msg,
          mentions: [user]
        },
        { quoted: m }
      );

    } catch (err) {
      conn.sendMessage(m.chat, { text: "❌ Impossible d'expulser cet utilisateur." }, { quoted: m });
    }
  }
};
