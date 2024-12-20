const { exec } = require('child_process');
require('dotenv').config({ path: './.env.development' });

const command = `npx knex migrate:down --knexfile ./src/knexfile.ts --env development`;


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
