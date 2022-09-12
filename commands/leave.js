module.exports = {
    name: 'leave',
    description: 'Stop the bot and leave a voice channel.',
    example: 'leave',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.channel.send("You must be on the same voice channel.")
        await voiceChannel.leave()
        await message.channel.send("Leaving... :wheelchair:")
        return
    }
}