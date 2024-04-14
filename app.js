const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia, Buttons } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
});

const COMMANDS = {
    TEXT: 'Simple text message',
    IMAGE: 'Send image',
    DOCUMENT: 'Send document',
}

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  const command = Object.keys(COMMANDS)[+message.body.trim() - 1];
  switch (command) {
    case 'TEXT': {
        message.reply(`Sun of the sleepless! Melancholy star!\n
        Whose tearful beam glows tremulously far,\n
        That show’st the darkness thou canst not dispel,\n
        How like art thou to joy remember’d well!\n
        \n
        So gleams the past, the light of other days,\n
        Which shines, but warms not with its powerless rays;\n
        A night-beam Sorrow watcheth to behold,\n
        Distinct, but distant — clear, but oh, how cold! \n`);
        break;
    }
    case 'IMAGE': {
        const media = await MessageMedia.fromUrl(
            'https://user-images.githubusercontent.com/41937681/162612030-11575069-33c2-4df2-ab1b-3fb3cb06f4cf.png');
            message.reply(media);
        break;
    }
    
    case 'DOCUMENT': {
        const media = MessageMedia.fromFilePath('./assets/file-example_PDF_500_kB.pdf');
            message.reply(media);

        break;
    }
    default: { 
        message.reply('Hi, iam Daniil. I can do some commands. Please write me number of comand you wont that i did \n\n' +
            Object.values(COMMANDS).map((text, i) => `${i + 1}. ${text}`).join('\n'));
    }
}
});