const shell = require('shelljs');

function runDeployJob(jobObject) {
    console.log(`${jobObject.name} job with id ${jobObject.id} started...`);

    if (!shell.which('git')) {
        console.error('ERROR: Sorry, deploy scripts requires git!');
        return;
    }

    shell.cd("..");

    if (shell.exec(`git clone ${jobObject.repoUrl} -b ${jobObject.deploymentBranch}`).code !== 0) {
        console.error('ERROR: Cloning repository failed!');
        return;
    }

    console.log(`${jobObject.name} job with id ${jobObject.id} ended successfully...`);
}

module.exports = runDeployJob;
