const path = require('path');

const getAllFiles = require('../utils/getAllFiles');
const { eventNames } = require('process');

module.exports = (Client) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);
    console.log(eventFiles);

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    Client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventfunction = require(eventFile);
        await eventfunction(Client, arg);
      }
    });
  }
};
