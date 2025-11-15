const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('dEjXrYnCjf_vxu1mhm3pYVx643JIe1si')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Traxxion_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function Traxxion_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Traxxion_Tech = Traxxion_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Traxxion_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Traxxion_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Traxxion_Tech.sendMessage(Qr_Code_By_Traxxion_Tech.user.id, { text: 'GAGA~' + b64data });
	
				   let Traxxion_MD_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨VolTah-XMD🔷
║ ✨Giddy Tennor 🔷
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN VolTah XMD 』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐎𝐰𝐧𝐞𝐫: 263716857999
║❍ 𝐑𝐞𝐩𝐨: https://github.com/LGT09/gaga09-xmd-wa-bot 
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/HKHFUb0ThuzKF8AoPztVjZ
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029Vb6njtcG3R3n7HS5Vs0P
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy GAGA MD 👽👻👾🤖🧠


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
	 await Qr_Code_By_Traxxion_Tech.sendMessage(Qr_Code_By_Traxxion_Tech.user.id,{text:Traxxion_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Traxxion_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Traxxion_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await Traxxion_MD_QR_CODE()
});
module.exports = router
