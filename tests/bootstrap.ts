import {MikroORM} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {BaseIdEntity} from '../src/mikro-orm/entities/BaseIdEntity';
import {Location} from '../src/mikro-orm/entities/Location';
import {addSampleData} from '../src/db';
import config from '../src/mikro-orm/config';

export async function initORMPostgreSql() {
  const orm = await MikroORM.init(config);
  /*const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: [
      BaseIdEntity,
      Location,
    ],
    metadataProvider: config.metadataProvider,
    dbName: config.dbName,
    user: config.user,
    password: config.password,
    type: config.type,
    forceUtcTimezone: config.forceUtcTimezone,
    debug: ['query'],
  });*/

  const connection = orm.em.getConnection();
  try {
    await connection.execute('CREATE EXTENSION postgis;');
  } catch (e) {
    console.log(e.message);
  }
  const generator = orm.getSchemaGenerator();
  await generator.ensureDatabase();

  return {orm};
}

export async function resetDatabase(
  orm: MikroORM<PostgreSqlDriver>
): Promise<void> {
  return addSampleData(orm);
}
