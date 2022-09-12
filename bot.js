const Discord = require('discord.js');
const client = new Discord.Client();
const Dispatcher = require('./commandDispatcher')
const prefix = Dispatcher.prefix

Dispatcher.init()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase()

    Dispatcher.dispatch(commandName, message, args)
});

client.login('NzkwMjYwMjE3MjY1OTEzODk2.GRx2VR.0u_r1fjv3Yu22Ky2ltIBP9SVcQ1tcTAzpDPYzE');