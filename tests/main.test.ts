import {MikroORM} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {initORMPostgreSql, resetDatabase} from './bootstrap';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Backend', () => {
  jest.setTimeout(10e3);
  let orm: MikroORM<PostgreSqlDriver>;

  beforeAll(async () => {
    const init = await initORMPostgreSql();
    orm = init.orm;
    await resetDatabase(orm);
  });
  beforeEach(async () => {
    orm.em.clear();
    await sleep(100);
  });

  test('isConnected()', async () => {
    await expect(orm.isConnected()).resolves.toBe(true);
    await orm.close(true);
    await expect(orm.isConnected()).resolves.toBe(false);
    await orm.connect();
    await expect(orm.isConnected()).resolves.toBe(true);
  });

  afterAll(async () => {
    orm.close(true);
    await sleep(100);
  });
});
