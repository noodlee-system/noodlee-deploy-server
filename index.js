const express = require('express');
const app = express();
const configureDeployment = require('./functions/configure-deployment');

// Prepare server configuration
const serverConfig = configureDeployment();

// Prepare server description
const serverName = serverConfig.serverName;
const serverPort = serverConfig.port;

// Prepare deploy server jobs
if (Array.isArray(serverConfig.jobs) && serverConfig.jobs.length > 0) {
    const runDeployJob = require('./functions/run-deploy-job');

    serverConfig.jobs.forEach((jobObject) => {
        app.get(`/job/${jobObject.id}`, (req, res) => {
            res.send(`${jobObject.name} job started...`);

            runDeployJob(jobObject);
        });
    });
} else {
    console.error("ERROR: Deployment configuration is not an object array!");
}

app.listen(serverPort, "127.0.0.1", () => console.log(`${serverName} listening on port ${serverPort}!`));
