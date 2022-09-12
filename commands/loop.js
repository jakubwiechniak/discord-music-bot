const Dispatcher = require('../commandDispatcher')

module.exports = {
    name: 'loop',
    description: 'Changes loop mode.',
    example: 'loop',
    execute(message, args) {
        Dispatcher.init()
        const queue = Dispatcher.getCommand('queue')
        queue.changeLoop(message, args)
    }
}