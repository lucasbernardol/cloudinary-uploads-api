import 'dotenv/config';

import { DatabaseConnection } from '@database/DatabaseConnection';
import { app } from '@api/app';

import env from '@config/env';

async function loadApplication() {
  app.listen(env.port, () => console.log(`\nHOST: ${env.host}`));
}

/** Database connection  */
DatabaseConnection.connect().then(async () => {
  await loadApplication();
});
