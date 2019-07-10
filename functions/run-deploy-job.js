const { exec } = require('child_process');

function runDeployJob(jobObject) {
    console.log(`${jobObject.name} job with id ${jobObject.id} started...`);

    exec(`git clone ${jobObject.repoUrl} -b ${jobObject.deploymentBranch} ../${jobObject.directoryName}`, (err) => {
        if (err) {
            // node couldn't execute the command
            console.error(`${jobObject.name} job with id ${jobObject.id} was executed with error...`);
            return;
        }
        
        exec(`cd ../${jobObject.directoryName} && docker-compose up --build`, (err) => {
            if (err) {
                // node couldn't execute the command
                console.error(`${jobObject.name} job with id ${jobObject.id} was executed with error...`);
                return;
            }

            console.log(`${jobObject.name} job with id ${jobObject.id} was executed successfully...`);
        });
    });
}

module.exports = runDeployJob;
