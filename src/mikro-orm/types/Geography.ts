import {Type, Platform, ValidationError, EntityProperty} from '@mikro-orm/core';
//import {Knex} from '@mikro-orm/knex';
// eslint-disable-next-line node/no-extraneous-import
import Knex from 'knex';
import {Geometry} from 'wkx';

export class GeographyType extends Type {
  knex = Knex({client: 'pg'});

  constructor(private type = 'Point') {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  convertToDatabaseValue(value: any, platform: Platform): any {
    if (value === null) {
      return value;
    }

    if (
      value instanceof Object &&
      value.type === this.type &&
      value.coordinates instanceof Array
    ) {
      try {
        return this.knex.raw('ST_GeomFromGeoJSON(?)', [JSON.stringify(value)]);
      } catch (e) {
        throw ValidationError.invalidType(GeographyType, value, 'JS');
      }
    }

    throw ValidationError.invalidType(GeographyType, value, 'JS');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  convertToJSValue(value: any, platform: Platform): any {
    if (!value) {
      return value;
    }

    try {
      return Geometry.parse(Buffer.from(value, 'hex')).toGeoJSON({
        shortCrs: true,
      });
    } catch (e) {
      throw ValidationError.invalidType(GeographyType, value, 'database');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getColumnType(prop: EntityProperty, platform: Platform) {
    return `GEOGRAPHY(${this.type})`;
  }
}
