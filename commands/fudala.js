module.exports = {
    name: 'fudala',
    description: 'Create a random, readable string starting from F',
    example: 'fudala [length of string]',
    async execute(msg, args) {
        if (parseInt(args[0]) > 50) {
            msg.reply("Length protection.")
        } else {
            let output = "F"
            let single = "aoieuy"
            let double = "wrtpsdfghjklzcbnm"
            for (let i = 0; i < parseInt(args[0]) - 1; i++) {
                if (i % 2 == 0) {
                    output += single[Math.floor(Math.random() * single.length)]
                } else {
                    output += double[Math.floor(Math.random() * double.length)]
                }
            }
            msg.reply(output)
        }
    }
}