const fs = require('fs');

const Dispatcher = {
    prefix: "sudo ",
    commands: [],
    init() {
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`)

            this.commands.push(command)
        }
    },
    dispatch(commandName, message, args) {
        for (const command of this.commands) {
            const aliases = command.aliases || []
            if (command.name === commandName || aliases.includes(commandName)) {
                command.execute(message, args)
                break
            }
        }
    },
    getCommand(commandName) {
        for (const command of this.commands) {
            if (command.name === commandName) {
                return command
            }
        }
        return undefined
    }
}

module.exports = Dispatcher