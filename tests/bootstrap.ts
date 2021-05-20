import {MikroORM} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {addSampleData, wipeDatabasePostgreSql} from '../src/db';
import config from '../src/mikro-orm/config';

const useDocker =
  process.env.DOCKER === 'true' ||
  process.env.DOCKER === 'TRUE' ||
  process.env.DOCKER === '1';

export async function initORMPostgreSql() {
  const orm = await MikroORM.init({
    ...config,
    ...(useDocker && {port: 5433}),
  });

  await wipeDatabasePostgreSql({
    orm,
    wrap: useDocker,
    dropDb: config.dbName,
  });

  return {orm};
}

export async function resetDatabase(
  orm: MikroORM<PostgreSqlDriver>
): Promise<void> {
  return addSampleData({orm, wrap: useDocker});
}
