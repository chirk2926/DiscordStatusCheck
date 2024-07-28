const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] });

client.once('ready', () => {
    console.log('Start DiscordStatusCheckBOT');
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    const user = newPresence.member.user;
    const channelID = 'ステータス変更の送信先チャンネルID';

    if (oldPresence.status !== newPresence.status) {
        let statusMessage;
        let statusColor;

        switch (newPresence.status) {
            case 'online':
                statusMessage = 'オンライン';
                statusColor = '#00FF00';
                break;
            case 'idle':
                statusMessage = '退席中';
                statusColor = '#FFA500';
                break;
            case 'dnd':
                statusMessage = '取り込み中';
                statusColor = '#FF0000';
                break;
            case 'offline':
                statusMessage = 'オフライン';
                statusColor = '#808080';
                break;
            default:
                statusMessage = '不明';
                statusColor = '#FFFFFF';
        }

        const embed = new MessageEmbed()
            .setColor(statusColor)
            .setTitle(`${user.tag} がステータスを更新しました`)
            .setDescription(`ステータス : ${statusMessage}`)
            .setTimestamp();

        const channel = client.channels.cache.get(channelID);
        if (channel) {
            channel.send({ embeds: [embed] });
        }
    }
});

client.login('BOTのトークンを入力');
