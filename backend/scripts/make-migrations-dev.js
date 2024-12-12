const { exec } = require('child_process');
require('dotenv').config({ path: './.env.development' });

const migrationName = process.argv[2];
if (!migrationName) {
    console.error('Please provide a migration name.');
    process.exit(1);
}

const command = `npx knex migrate:make ${migrationName} --knexfile ./src/knexfile.ts --env development`;


exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error('Error executing migration:', err);
    return;
  }
  if (stderr) {
    console.error('stderr:', stderr);
    return;
  }
  console.log('stdout:', stdout);
});
