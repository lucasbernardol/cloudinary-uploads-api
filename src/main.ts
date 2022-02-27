import 'dotenv/config';

import { DatabaseConnection } from '@database/DatabaseConnection';
import { app } from '@api/app';

async function load() {
  app.listen(3333, () => console.log('\nHOST: http://localhost:3333'));
}

/** Database connection  */
DatabaseConnection.connect().then(async (connection) => {
  console.log(`\nDATABASE: ${connection.options.type}`);

  await load();
});
