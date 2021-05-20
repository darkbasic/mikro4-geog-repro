import {MikroORM} from '@mikro-orm/core';
import config from './mikro-orm/config';
import {addSampleData} from './db';

const batchInsert: boolean = process.argv.includes('--batch-insert');

(async () => {
  const orm = await MikroORM.init(config);
  await addSampleData(orm, batchInsert);
})();
