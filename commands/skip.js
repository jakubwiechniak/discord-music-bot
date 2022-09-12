const Dispatcher = require('../commandDispatcher')

module.exports = {
    name: 'skip',
    description: 'Skips current song.',
    example: 'skip',
    async execute(message, args) {
        const play = Dispatcher.getCommand("play")
        const queue = Dispatcher.getCommand("queue")

        if (queue.getAll(message).length > 0) {
            play.playing = false
            let next = queue.getNext(message, args).query
            play.playMusic(message, next)
            queue.shift(message)
        } else {
            if (play.playing) {
                play.stopMusic(message, args)
            } else {
                return message.channel.send("There is nothing to skip.")
            }
        }
    }
}