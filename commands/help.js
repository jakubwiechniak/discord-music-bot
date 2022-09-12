const Dispatcher = require('../commandDispatcher')

module.exports = {
    name: "help",
    aliases: ["?"],
    description: "Displays help message.",
    example: "help [command name]",
    execute(message, args) {
        if (args[0]) {
            const command = Dispatcher.getCommand(args[0])
            if (command != undefined) {
                return message.channel.send("Command name: " + command.name + "\nCommand syntax: " + Dispatcher.prefix + command.example + "\nCommand description: " + command.description)
            } else {
                return message.channel.send("There is no such a command.")
            }
        } else {
            let output = "Available commands:\n"
            Dispatcher.commands.forEach(command => {
                output += command.name + "\n"
            })
            return message.channel.send(output)
        }
    }
}