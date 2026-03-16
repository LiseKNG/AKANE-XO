
  execute: async (conn, m, args) => {

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, {
        text: "❌ Cette commande fonctionne seulement dans un groupe."
      }, { quoted: m });
    }

    try {

      await conn.groupSettingUpdate(
        m.chat,
        "not_announcement"
      );

      let msg = `
╭━━━〔 🔊 𝐆𝐑𝐎𝐔𝐏𝐄 𝐎𝐔𝐕𝐄𝐑𝐓 𝐁𝐘 𝐀𝐊𝐀𝐍𝐄 𝐗𝐎 〕━━━⬣
┃
┃ ✅ Le groupe est maintenant ouvert.
┃
┃ 👥 Tous les membres peuvent
┃ envoyer des messages.
┃
┃ 🎉 Bonne discussion !
┃
╰━━━━━━━━━━━━━━━━⬣
`;

      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

    } catch (err) {
      conn.sendMessage(m.chat, { text: "❌ Impossible d'ouvrir le groupe." }, { quoted: m });
    }

  }
};
