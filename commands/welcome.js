
  execute: async (conn, m, args) => {
    let user = m.mentionedJid?.[0] || m.sender;

    let welcomeMsg = `
╭━━━〔 🎉 BIENVENUE 🎉 〕━━━⬣
┃
┃ 👋 Salut @${user.split("@")[0]}
┃
┃ Nous sommes très heureux
┃ de t'accueillir dans le groupe !
┃
┃ 📜 *Règles importantes :*
┃ • Respecte tous les membres
┃ • Pas de spam
┃ • Pas de liens interdits
┃
┃ 💬 N'hésite pas à te présenter
┃ pour que tout le monde te connaisse.
┃
┃ ✨ Passe un excellent moment ici !
┃
╰━━━━━━━━━━━━━━━━⬣
`;

    await conn.sendMessage(
      m.chat,
      {
        text: welcomeMsg,
        mentions: [user]
      },
      { quoted: m }
    );
  }
};
