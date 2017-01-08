/**
 * This script spawns a detached child process that starts a webserver running the sample, and kills it when the parent process dies.
 * The reason to spawn a different process and kill it when the parent process exits is that we need a hook into the process running the 
 * e2e tests, and want to stop the server once the e2e tests end. 
 * 
 * Receives the folder of the sample to run as paramater.
 * Usage example: "node run-sample.js samples/photo_album"
 */
const spawn = require('child_process').spawn;
const path = require('path');

const target = process.argv[2];
const child = spawn('npm', ['start'], {cwd: path.resolve(process.cwd(), target), detached: true, stdio: [0,1,2]});

function exitHandler(options, err) {
    console.log(JSON.stringify(options));
    // Kill detached process with the webserver running the sample
    if (options.cleanup) {
        console.log('cleanup', child.pid);
        process.kill(-child.pid);        
    }
    if (err) {
        console.error(err.stack);
    }
    if (options.exit) {
        process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
