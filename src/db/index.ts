import {IDatabaseDriver, Connection, MikroORM} from '@mikro-orm/core';
import {Location} from '../mikro-orm/entities/Location';

export async function wipeDatabasePostgreSql({
  orm,
  wrap = false,
  dropDb,
}: {
  orm: MikroORM<IDatabaseDriver<Connection>>;
  wrap?: boolean;
  dropDb?: string;
}) {
  const generator = orm.getSchemaGenerator();

  if (dropDb) {
    await generator.dropDatabase(dropDb);
    await generator.createDatabase(dropDb);
  } else {
    await generator.dropSchema(wrap);
  }

  try {
    await orm.em.getConnection().execute('CREATE EXTENSION postgis;');
  } catch (e) {
    console.log(e.message);
  }

  await generator.createSchema(wrap);

  orm.em.clear();
}

export async function addSampleData({
  orm,
  wrap = false,
  dropDb,
  batchInsert = false,
}: {
  orm: MikroORM<IDatabaseDriver<Connection>>;
  wrap?: boolean;
  dropDb?: string;
  batchInsert?: boolean;
}) {
  await wipeDatabasePostgreSql({orm, dropDb, wrap});
  const {em} = orm;

  for (const {city, latitude, longitude} of locations) {
    em.persist(
      new Location({
        city,
        latitude,
        longitude,
      })
    );
    if (!batchInsert) {
      await em.flush();
    }
  }

  await em.flush();
  em.clear();
}

export type LocationDb = {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
};

export const locations: LocationDb[] = [
  {
    id: 1,
    city: 'Falconara Marittima',
    latitude: 43.624125,
    longitude: 13.369619,
  },
  {
    id: 2,
    city: 'Ancona',
    latitude: 43.61715,
    longitude: 13.51599,
  },
  {
    id: 3,
    city: 'Chiaravalle',
    latitude: 43.60005,
    longitude: 13.32537,
  },
];
