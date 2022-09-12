const Dispatcher = require('../commandDispatcher')

module.exports = {
    name: 'kick',
    aliases: ['wygoń'],
    description: 'Disconnect mentioned user from voice channel.',
    example: 'kick [mention]',
    async execute(message, args) {

        let memberToKick = message.mentions.members.first()
        if (memberToKick.id == '790260217265913896') {
            const leave = Dispatcher.getCommand('leave')
            leave.execute(message, args)
        } else {
            memberToKick.voice.kick()
            return message.channel.send(memberToKick.user.username + " was kicked.")
        }

    }
}