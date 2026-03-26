import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import configs from "../utils/configmanager.js";
import { getDevice } from "baileys";
import stylizedChar from "../utils/fancy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MENU TEMPLATE =================
const menuTemplate = ({ prefix, userName, uptime, usedRam, totalRam, platform, date, day }) => `
╭━━━〔 ✨ AKANE XO ✨ 〕━━━⬣
┃ 👤 User : ${stylizedChar(userName)}
┃ ⚡ Prefix : ${prefix}
┃ 🕒 Uptime : ${uptime}
┃ 💾 RAM : ${usedRam}/${totalRam} MB
┃ 📱 Platform : ${platform}
┃ 📅 Date : ${date} (${day})
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 🔥 MENU PRINCIPAL 〕━━━⬣
┃ ➤ ${stylizedChar("menu")}
┃ ➤ ${stylizedChar("ping")}
┃ ➤ ${stylizedChar("help")}
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 🎵 MEDIA 〕━━━⬣
┃ ➤ ${stylizedChar("play")}
┃ ➤ ${stylizedChar("video")}
┃ ➤ ${stylizedChar("lyrics")}
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 👥 GROUPE 〕━━━⬣
┃ ➤ ${stylizedChar("kick")}
┃ ➤ ${stylizedChar("add")}
┃ ➤ ${stylizedChar("promote")}
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 👑 OWNER 〕━━━⬣
┃ ➤ ${stylizedChar("ban")}
┃ ➤ ${stylizedChar("unban")}
┃ ➤ ${stylizedChar("restart")}
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 🎗 AKANE XO 🎗〕━━━⬣
┃ Bot ultra stylé 🫦
╰━━━━━━━━━━━━━━━━⬣
`;
// =================================================

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

export default async function info(client, message) {
  try {
    const remoteJid = message.key.remoteJid;
    const userName = message.pushName || "Unknown";

    const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(1);
    const uptime = formatUptime(process.uptime());
    const platform = os.platform();

    const botId = client.user.id.split(":")[0];
    const prefix = configs.config.users?.[botId]?.prefix || "!";

    const now = new Date();
    const daysFR = [
      "Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"
    ];

    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const day = daysFR[now.getDay()];

    // ===== MENU FINAL =====
    let menu = menuTemplate({
      prefix,
      userName,
      uptime,
      usedRam,
      totalRam,
      platform,
      date,
      day
    });

    try {
      const device = getDevice(message.key.id);

      if (device === "android") {
        await client.sendMessage(remoteJid, {
          image: { url: "database/menu.jpg" },
          caption: stylizedChar(menu),
          contextInfo: {
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            quotedMessage: { conversation: " AKANE-XO" },
            isForwarded: true
          }
        });
      } else {
        await client.sendMessage(
          remoteJid,
          {
            video: { url: "database/DigiX.mp3" },
            caption: stylizedChar(menu)
          },
          { quoted: message }
        );
      }
    } catch (err) {
      await client.sendMessage(
        remoteJid,
        { text: "❌ Erreur lors de l'envoi du menu : " + err.message },
        { quoted: message }
      );
    }

    console.log(menu);

  } catch (err) {
    console.log("error while displaying menu:", err);
  }
}