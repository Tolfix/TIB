const Ticket_Setup = {
    "name": "ticket-setup",
    "description": "Creates a button for ticket support",
    "options": [
      {
        "type": 7,
        "name": "channel",
        "description": "The channel which the button should be sent to.",
        "required": true
      }
    ]
  }


const SlashCommandsArray = [Ticket_Setup]

export default SlashCommandsArray;