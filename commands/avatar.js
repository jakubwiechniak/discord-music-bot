const Discord = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Create an embed message with mentioned person\'s avatar.',
    example: "avatar [mention]",
    async execute(msg, args) {
        let user = msg.mentions.users.first()
        let avatarEmbed = new Discord.MessageEmbed()
            .setColor(0x333333)
            .setAuthor(user.username)
            .setImage(user.avatarURL({ format: 'png', size: 1024 }));
        msg.channel.send(avatarEmbed)
    }
}