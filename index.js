const express = require('express');
const bodyParser = require('body-parser');
const { Client, Events, GatewayIntentBits, ActivityType, REST, Routes, Colors, EmbedBuilder, Partials, Collection } = require('discord.js');
const db = require('quick.db');
const fs = require('fs');

const app = express();
const PORT = 3000;

const clientMap = new Map();

app.use(bodyParser.json());

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

async function createClient(userId, botData, attempts = 0) {
    if (attempts >= 3) {
        const disableReason = { reason: 'Multiple failed login attempts' };
        console.log(`Disabling bot for user ${userId} due to multiple failed login attempts.`);
        db.set(`users.${userId}.disabled`, disableReason);
        return null;
    }

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const commands = [];

    client.commands = new Collection();

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }

    client.once(Events.ClientReady, async () => {
        console.log(`Bot ${client.user.tag} for User: ${userId} is ready!`);

        const CLIENT_ID = client.user.id;
        const rest = new REST().setToken(botData.botToken);

        (async () => {
            try {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Commands have been added to Global Usage.")
            } catch (err) {
                console.error(err);
            }
        })();

        client.user.setPresence({
            activities: [{ name: `Custom BOT!`, type: ActivityType.Competing }],
            status: 'online',
        });
    });

    client.once('disconnect', () => {
        console.log(`Bot for user ${userId} has disconnected!`);
        setTimeout(() => {
            console.log(`Restarting bot for user ${userId}...`);
            createClient(userId, botData, attempts + 1);
        }, 5000);
    });

    client.on(Events.Error, async error => {
        console.error(`An error occurred for user ${userId}:`, error);
        setTimeout(() => {
            console.log(`Restarting bot for user ${userId}...`);
            createClient(userId, botData, attempts + 1);
        }, 5000);
    });

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.type === 2) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        await interaction.deferReply({ ephemeral: true });

        const ErrorEmbed = new EmbedBuilder()
            .setAuthor({ name: "Interaction Failed" })
            .setColor(Colors.Red)
            .setTimestamp()
            .setFooter({ text: "Custom Bot Test", iconURL: client.user.displayAvatarURL() })

        client.user.setPresence({
            activities: [{ name: `Custom Bot`, type: ActivityType.Competing }],
            status: 'online',
        });

        try {
            await command.execute(interaction);
        } catch (err) {
            if (err) console.error(err);

            await interaction.editReply({
                embeds: [ErrorEmbed],
                ephemeral: true
            })
        }
    });

    try {
        await client.login(botData.botToken);
    } catch (error) {
        console.error(`Error logging in the bot for user ${userId}:`, error);
        setTimeout(() => {
            console.log(`Restarting bot for user ${userId}...`);
            createClient(userId, botData, attempts + 1);
        }, 5000);
    }

    return client;
}

async function loadAllBots() {
    const allUsers = db.get('users') || {};

    for (const userId in allUsers) {
        const userBots = allUsers[userId].bots;
        if (!userBots || !Array.isArray(userBots)) {
            continue;
        }

        for (const botData of userBots) {
            if (!botData.disabled && !clientMap.has(botData.botToken)) {
                const client = await createClient(userId, botData);
                if (client) {
                    clientMap.set(botData.botToken, client);
                }
            }
        }
    }
}

// TODO: PROXY Request to Discord's API (POST)
app.post('/api/v1/discord', async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ success: false, message: 'Missing authorization header!' });
        return;
    }

    const botToken = authorization.split(' ')[1];
    if (!botToken) {
        res.status(401).json({ success: false, message: 'Missing bot token!' });
        return;
    }

    const uri = req.originalUrl.replace('/api/v1/discord/', '');
    const response = await fetch(`https://discord.com/api/v10/${uri}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${botToken}`,
        },
        body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
});

// TODO: PROXY Request to Discord's API (GET)
app.get('/api/v1/discord', async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ success: false, message: 'Missing authorization header!' });
        return;
    }

    const botToken = authorization.split(' ')[1];
    if (!botToken) {
        res.status(401).json({ success: false, message: 'Missing bot token!' });
        return;
    }

    const uri = req.originalUrl.replace('/api/v1/discord/', '');
    const response = await fetch(`https://discord.com/api/v10/${uri}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${botToken}`,
        },
        body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
});

// TODO: PROXY Request to Discord's API (DELETE)
app.delete('/api/v1/discord', async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ success: false, message: 'Missing authorization header!' });
        return;
    }

    const botToken = authorization.split(' ')[1];
    if (!botToken) {
        res.status(401).json({ success: false, message: 'Missing bot token!' });
        return;
    }

    const uri = req.originalUrl.replace('/api/v1/discord/', '');
    const response = await fetch(`https://discord.com/api/v10/${uri}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${botToken}`,
        },
        body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
});

// TODO: PROXY Request to Discord's API (PUT)
app.put('/api/v1/discord', async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ success: false, message: 'Missing authorization header!' });
        return;
    }

    const botToken = authorization.split(' ')[1];
    if (!botToken) {
        res.status(401).json({ success: false, message: 'Missing bot token!' });
        return;
    }

    const uri = req.originalUrl.replace('/api/v1/discord/', '');
    const response = await fetch(`https://discord.com/api/v10/${uri}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${botToken}`,
        },
        body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
});

// TODO: PROXY Request to Discord's API (PATCH)
app.patch('/api/v1/discord', async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ success: false, message: 'Missing authorization header!' });
        return;
    }

    const botToken = authorization.split(' ')[1];
    if (!botToken) {
        res.status(401).json({ success: false, message: 'Missing bot token!' });
        return;
    }

    const uri = req.originalUrl.replace('/api/v1/discord/', '');
    const response = await fetch(`https://discord.com/api/v10/${uri}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${botToken}`,
        },
        body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
});


app.post('/api/v1/bots/create', async (req, res) => {
    const { botName, clientId, botToken, botSecret, userId } = req.body;

    if (clientMap.has(botToken)) {
        res.status(400).json({ success: false, message: 'Bot with this token already exists!' });
        return;
    }

    const userBots = db.get(`users.${userId}.bots`) || [];

    if (userBots.some(bot => bot.botToken === botToken)) {
        res.status(400).json({ success: false, message: 'Bot with this token already exists for the user!' });
        return;
    }

    const newBotData = { botName, clientId, botToken, botSecret, disabled: false };
    userBots.push(newBotData);
    db.set(`users.${userId}.bots`, userBots);

    const client = await createClient(userId, newBotData);
    if (client) {
        clientMap.set(botToken, client);
        res.status(200).json({ success: true, message: 'Bot created successfully!', bot: newBotData });
    } else {
        res.status(500).json({ success: false, message: 'Failed to create bot after multiple attempts.' });
    }
});

app.get('/api/v1/bots/fetch', (req, res) => {
    const { userId } = req.query;
    const userBots = db.get(`users.${userId}.bots`) || [];
    if (userBots.length === 0) {
        res.status(404).json({ success: false, message: 'No bots found for the user!' });
        return;
    } else {
        res.status(200).json({
            success: true,
            message: 'Bots fetched successfully!',
            bots: userBots,
        });
    }
});

app.delete('/api/v1/bots/delete', (req, res) => {
    const { botToken, userId } = req.body;

    const userBots = db.get(`users.${userId}.bots`) || [];

    const botIndex = userBots.findIndex(bot => bot.botToken === botToken);
    if (botIndex !== -1) {
        if (clientMap.has(botToken)) {
            try {
                const rest = new REST().setToken(botToken);

                var clientId = userBots[botIndex]["clientId"];

                rest.put(Routes.applicationCommands(clientId), { body: [] })
                    .then(() => console.log('Successfully deleted all application commands.'))
                    .catch(console.error);
            } catch (error) {
                console.log(error)
            }

            const client = clientMap.get(botToken);
            client.destroy();
            clientMap.delete(botToken);
        }

        userBots.splice(botIndex, 1);
        db.set(`users.${userId}.bots`, userBots);

        console.log(`Bot for user ${userId} with token ${botToken} deleted successfully!`);
        res.status(200).json({ success: true, message: 'Bot deleted successfully!' });
    } else {
        res.status(404).json({ success: false, message: 'Bot with the provided token not found for the user!' });
    }
});

/* async function destroyAllBotsAndExit() {
    console.log('Destroying all bot instances...');
    for (const [botToken, client] of clientMap) {
        client.destroy();
        console.log(`Bot with token ${botToken} has been destroyed.`);
    }
    process.exit(0);
}
 */
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await loadAllBots();

    // TODO: Handle SIGINT and SIGTERM signals to destroy all bots before exiting the process
/*     process.on('SIGINT', async () => {
        console.log('\nReceived SIGINT signal. Stopping the server...');
        await destroyAllBotsAndExit();
    });

    process.on('SIGTERM', async () => {
        console.log('\nReceived SIGTERM signal. Stopping the server...');
        await destroyAllBotsAndExit();
    }); */
});
