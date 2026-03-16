
  execute: async (conn, m, args) => {

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, {
        text: "❌ Cette commande fonctionne seulement dans un groupe."
      }, { quoted: m });
    }

    const metadata = await conn.groupMetadata(m.chat);
    const participants = metadata.participants;

    // récupérer les membres qui ne sont pas admin
    const toKick = participants
      .filter(p => !p.admin)
      .map(p => p.id);

    if (toKick.length === 0) {
      return conn.sendMessage(m.chat, {
        text: "⚠️ Aucun membre à expulser."
      }, { quoted: m });
    }

    let msg = `
╭━━━〔 ⚠️ 𝐊𝐈𝐂𝐊 𝐀𝐋𝐋 𝐁𝐘 𝐀𝐊𝐀𝐍𝐄 𝐗𝐎 〕━━━⬣
┃
┃ 🧹 Nettoyage du groupe en cours...
┃
┃ 👥 Membres supprimés : ${toKick.length}
┃
┃ 🔒 Les administrateurs sont
┃ conservés dans le groupe.
┃
╰━━━━━━━━━━━━━━━━⬣
`;

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

    await conn.groupParticipantsUpdate(
      m.chat,
      toKick,
      "remove"
    );

  }
};