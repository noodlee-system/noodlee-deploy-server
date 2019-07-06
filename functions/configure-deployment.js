const fs = require('fs');

function configureDeployment() {
    const serverConfigFile = fs.readFileSync('./server-config.json', 'utf-8');

    const serverConfigObject = JSON.parse(serverConfigFile);

    return serverConfigObject;
}

module.exports = configureDeployment;
