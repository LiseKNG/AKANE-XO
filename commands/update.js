export async function update(client, message) {
    const remoteJid = message.key.remoteJid
    const messageBody = message.message?.conversation || message.message?.extendedTextMessage?.text || ""

    const commandAndArgs = messageBody.slice(1).trim()
    const parts = commandAndArgs.split(/\s+/)
    const newText = parts.slice(1).join(' ')

    if (!newText) {
        return client.sendMessage(remoteJid, {
            text: `╭━━━〔 ⚙️ UPDATE SYSTEM 〕━━━⬣
┃ ❌ Aucun texte fourni
┃
┃ 📌 Utilisation :
┃ .update votre nouveau message
╰━━━⬣`
        })
    }

    // Sauvegarde temporaire (mémoire)
    global.AKANE_UPDATE_MESSAGE = newText

    await client.sendMessage(remoteJid, {
        text: `╭━━━〔 ✅ UPDATE RÉUSSI 〕━━━⬣
┃ 📝 Nouveau message défini :
┃
┃ ${newText}
┃
╰━━━〔 ⚡ AKANE-XO SYSTEM 〕━━━⬣`
    })
}