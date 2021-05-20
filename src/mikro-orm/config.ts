import {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {TsMorphMetadataProvider} from '@mikro-orm/reflection';

const options: Options<PostgreSqlDriver> = {
  entities: ['./build/src/mikro-orm/entities'],
  entitiesTs: ['./src/mikro-orm/entities'],
  metadataProvider: TsMorphMetadataProvider,
  dbName: 'beach',
  user: 'beach',
  password: 'beach',
  type: 'postgresql' as const,
  forceUtcTimezone: true,
  debug: true,
};
export default options;
