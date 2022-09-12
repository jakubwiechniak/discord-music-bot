const ytdl = require('ytdl-core')
const ytSearch = require('yt-search');

const Dispatcher = require('../commandDispatcher')

module.exports = {
    name: "play",
    description: "Plays a youtube music.",
    example: "play [search query or link]",
    playing: false,
    loop: false,
    currentStream: {},
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.reply("You must join voice channel first")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has("CONNECT")) return message.channel.send("I don't have permission to connect.")
        if (!permissions.has("SPEAK")) return message.channel.send("I don't have permission to speak.")

        if (args.length == 0) return message.channel.send("There is no arguments.")
        console.log(args)
        this.playMusic(message, args.join(' '))
    },

    async playMusic(message, query) {
        Dispatcher.init()
        const queue = Dispatcher.getCommand('queue')
        let voiceChannel = message.member.voice.channel
        const connection = await voiceChannel.join()
        let target = await this.videoFinder(query)
        if (target) {
            if (this.playing) {
                message.channel.send(queue.append(message, query, target.title))
                return
            }

            let stream = ytdl(target.url, { filter: "audioonly" })
            this.currentStream = connection.play(stream, { seek: 0, volume: 1 })
                .on('start', () => {
                    this.playing = true
                })
                .on('finish', () => {
                    this.playing = false
                    if (queue.checkLoop(message)) {
                        this.playMusic(message, query)
                    } else {
                        if (queue.getAll(message).length) {
                            this.playMusic(message, queue.getNext(message).query)
                            queue.shift(message)
                        } else {
                            queue.execute(message, 'clear')
                            voiceChannel.leave();
                        }
                    }
                })
        } else {
            message.channel.send("Nothing was found.")
            return
        }
    },

    async stopMusic(message, args) {
        if (this.playing) {
            this.currentStream.destroy()
            this.playing = false
        } else {
            return message.channel.send("Nothing playing.")
        }
    },

    async videoFinder(query) {
        const result = await ytSearch(query);
        return (result.videos.length >= 1) ? result.videos[0] : null
    },

    validateURL(url) {
        let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return regex.test(str) ? true : false
    }
}