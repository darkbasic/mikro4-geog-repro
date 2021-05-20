import {IDatabaseDriver, Connection, MikroORM} from '@mikro-orm/core';
import {Location} from '../mikro-orm/entities/Location';

async function wipeDatabasePostgreSql(
  orm: MikroORM<IDatabaseDriver<Connection>>,
  wrap = false
) {
  const generator = orm.getSchemaGenerator();

  await generator.dropSchema(wrap);
  await generator.createSchema(wrap);
  orm.em.clear();
}

export async function addSampleData(
  orm: MikroORM<IDatabaseDriver<Connection>>,
  batchInsert = false,
  wrap = false
) {
  await wipeDatabasePostgreSql(orm, wrap);
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
