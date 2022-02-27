import 'dotenv/config';

import { DatabaseConnection } from '@database/DatabaseConnection';
import { app } from '@api/app';

import env from '@config/env';

async function load() {
  const { port, host } = env;

  app.listen(port, () => console.log(`\nHOST: ${host}`));
}

/** Database connection  */
DatabaseConnection.connect().then(async (connection) => {
  await load();

  const { type } = connection.options;

  console.log(`\nDATABASE: ${type.toUpperCase()}`);
});
