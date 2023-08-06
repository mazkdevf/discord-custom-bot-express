# discord-custom-bot-express
- This uses Express with different API Endpoints, to create Discord Bots that can be used for some purposes.

### Information:
1. Supports multiple bots, from one user to multiple users. (Tested on Scenario not real real test)
2. After 3 Failure attempts of Logging in it will but the token as Disabled that it doesn't start automatically when the script starts the bots. (Will be changed to none disabled when bot token and everything is right from user submit on API endpoint if future)
3. Supports like all kind of JS commands from ./commands folder
4. When bot fails or gets an error it will automatically restart, Will add in future like webhook what it will send to some management discord or some other webhook like telegram so that the issue can be fixed.

### Features

POST /api/v1/bots/create
GET /api/v1/bots/fetch
DELETE /api/v1/bots/delete

All endpoints use JSON as output with basic stuff for response, but DISCORD Prox doesn't use it.

```json
{
    "success": true or false,
    "message": "something here",
    // something additional....
}
```

![kuva](https://github.com/mazkdevf/discord-custom-bot-express/assets/79049205/ba46f1ec-e755-40af-be5a-caf01b3f0a3b)

![kuva](https://github.com/mazkdevf/discord-custom-bot-express/assets/79049205/ff091a65-0a49-4a51-91b7-e37151896eb1)
