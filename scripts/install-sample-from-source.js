/**
 * This script packs the SDK module into a tgz and installs it in the given sample folder.
 * 
 * Usage example: "node install-form-source.js samples/photo_album"
 */

const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

console.log('Running TypeScript compiler');
const tsc = execSync('npm run tsc', {stdio:[0,1,2]});

console.log('Packing module');
const packedFileName = execSync('npm pack');

const target = process.argv[2];
console.log(`Installing packed module into ${target}` )
// Run npm install from the target folder & install SDK module from the root folder
execSync(`npm install ../../${packedFileName}`, {cwd: path.resolve(process.cwd(), target), stdio:[0,1,2]});

const resolvedPack = path.resolve(packedFileName.toString().trim());
console.log(`Deleting local pack ${resolvedPack}`);
fs.unlinkSync(resolvedPack);
