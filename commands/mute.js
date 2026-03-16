
  execute: async (conn, m, args) => {

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, {
        text: "❌ Cette commande fonctionne seulement dans un groupe."
      }, { quoted: m });
    }

    try {

      await conn.groupSettingUpdate(
        m.chat,
        "announcement"
      );

      let msg = `
╭━━━〔 🔇 𝐆𝐑𝐎𝐔𝐏𝐄 𝐌𝐔𝐓𝐄́ 𝐁𝐘 𝐀𝐊𝐀𝐍𝐄 𝐗𝐎 〕━━━⬣
┃
┃ 🔒 Le groupe est maintenant fermé.
┃
┃ 👮 Seuls les administrateurs
┃ peuvent envoyer des messages.
┃
┃ ⚠️ Merci de respecter les règles.
┃
╰━━━━━━━━━━━━━━━━⬣
`;

      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

    } catch (err) {
      conn.sendMessage(m.chat, { text: "❌ Impossible de fermer le groupe." }, { quoted: m });
    }

  }
};
