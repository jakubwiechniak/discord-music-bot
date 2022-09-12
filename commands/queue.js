const Dispatcher = require('../commandDispatcher')

module.exports = {
    name: 'queue',
    aliases: [],
    description: 'Music queue',
    example: 'queue [subcommand]\nSubcommands:\n[none] - Displays queue.\nclear - Clears queue.\nremove [digit] - Removes song from queue.',
    queue: [],
    loop: false,
    async execute(message, args) {
        if (args[0] == "clear") {
            Dispatcher.init()
            const leave = Dispatcher.getCommand('leave')
            this.queue = []
            leave.execute(message)
            return
        }

        if (args[0] == "remove") {
            let regex = /[0-9]*/
            if (!regex.test(args[1])) {
                message.channel.send(`Argument must be a number.`)
                return
            } else {
                let id = parseInt(args[1])
                if (this.get(id) != undefined) {
                    message.channel.send("Song " + this.get(id).title + " has been deleted.")
                    this.queue.splice(id, 1)
                    return
                } else {
                    return message.channel.send("This element does not exist in queue.")
                }

            }
        }

        if (!args[0]) {
            if (this.queue.length > 0) {
                let output = ""
                const play = Dispatcher.getCommand("play")
                for (const [index, phrase] of this.queue.entries()) {
                    output += index + " - " + phrase.title + "\n"
                }
                message.channel.send(output)
            } else {
                message.channel.send("Queue is empty")
            }
        }
    },
    shift(message, args) {
        this.queue.shift()
        return
    },
    append(message, query, title) {
        if (query != undefined && title != undefined) {
            this.queue.push({ query: query, title: title })
            return "Song " + title + " is now in queue."
        } else {
            return "Something went wrong"
        }
    },
    get(index) {
        return this.queue[index]
    },
    getAll(message, args) {
        return this.queue
    },
    getNext(message, args) {
        return this.queue[0]
    },
    changeLoop(message, args) {
        this.loop = !this.loop
        message.channel.send("Loop is now " + (this.loop ? "on" : "off") + ".")
    },
    checkLoop(message, args) {
        return this.loop
    }
}