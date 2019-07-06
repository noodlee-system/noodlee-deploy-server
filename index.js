const express = require('express');
const app = express();
const configureDeployment = require('./functions/configure-deployment');
const { exec } = require('child_process');

// Prepare server configuration
const serverConfig = configureDeployment();

// Prepare server description
const serverName = serverConfig.serverName;
const serverPort = serverConfig.port;

// Prepare jobs to make
if (Array.isArray(serverConfig.jobs) && serverConfig.jobs.length > 0) {
    serverConfig.jobs.forEach((jobObject) => {
        app.get(`/job/${jobObject.id}`, (req, res) => {
            res.send(`${jobObject.name} job success!`);
            
            // Run deploy shell script
            exec('./deploy.sh', (err) => {
                if (err) {
                    // node couldn't execute the command
                    return;
                }

                console.log("Deploy process success!");
            });
        });
    });
} else {
    console.error("ERROR: Deployment configuration is not an array!");
}

app.listen(serverPort, () => console.log(`${serverName} listening on port ${serverPort}!`));
