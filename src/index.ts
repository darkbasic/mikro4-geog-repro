import {MikroORM} from '@mikro-orm/core';
import config from './mikro-orm/config';
import {addSampleData} from './db';

const batchInsert: boolean = process.argv.includes('--batch-insert');

const useDocker =
  process.env.DOCKER === 'true' ||
  process.env.DOCKER === 'TRUE' ||
  process.env.DOCKER === '1';

(async () => {
  const orm = await MikroORM.init({
    ...config,
    ...(useDocker && {port: 5433}),
  });
  await addSampleData({
    orm,
    wrap: useDocker,
    batchInsert,
    dropDb: config.dbName,
  });
})();
