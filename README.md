# Discord Custom Bots using Express API

## Overview:

This repository utilizes Express with various API endpoints to create Discord Bots capable of serving different purposes.

## Features:
1. Supports the management of multiple bots, from a single user to multiple users. (Tested in a simulated scenario, not in a real-world environment)
2. Implemented a security feature that disables the bot token after three consecutive login failure attempts. The token will remain disabled until corrected by the user through the API endpoint. (Future updates will allow automatic reactivation of the token upon successful user submission.)
3. Provides support for various JavaScript commands stored in the `"./commands"` folder.
4. Implemented an automatic restart mechanism for the bot in case of failures or errors.

**Future enhancements** will include webhook integration to notify designated management **Discord** or **Telegram** channels, facilitating prompt issue resolution.

## API Endpoints
### POST "/api/v1/bots/create"
Endpoint to create new Discord bots.

### GET "/api/v1/bots/fetch"
Endpoint to fetch information about existing Discord bots.

### DELETE "/api/v1/bots/delete"
Endpoint to delete Discord bots.

## TODO:

The following API endpoints will be implemented for Discord integration:
### POST "/api/v1/discord"
Endpoint to interact with Discord API using various HTTP methods.

#### For example:
- POST "/api/v1/discord/users/@me" will access "https://discord.com/api/v10/users/@me"
- PUT, GET, DELETE, PATCH endpoints will also be supported.

All endpoints return responses in JSON format, containing essential information. (EXCEPT Discord API)

```json
{
    "success": true or false,
    "message": "something here",
    // something additional....
}
```

## Images

![image](https://github.com/mazkdevf/discord-custom-bot-express/assets/79049205/ba46f1ec-e755-40af-be5a-caf01b3f0a3b)

![image](https://github.com/mazkdevf/discord-custom-bot-express/assets/79049205/ff091a65-0a49-4a51-91b7-e37151896eb1)
