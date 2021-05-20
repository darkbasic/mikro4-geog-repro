import {Entity, Property} from '@mikro-orm/core';
import {BaseIdEntity} from './BaseIdEntity';
import {GeographyType} from '../types/Geography';
import {Point} from 'geojson';

interface LocationContructor {
  id?: number;
  city: string;
  latitude: number;
  longitude: number;
}

@Entity()
export class Location extends BaseIdEntity {
  @Property()
  city: string;

  @Property({type: 'float'})
  latitude: number;

  @Property({type: 'float'})
  longitude: number;

  @Property({type: GeographyType, nullable: true})
  geog: Point;

  constructor({id, city, latitude, longitude}: LocationContructor) {
    super({id});
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.geog = {type: 'Point', coordinates: [longitude, latitude]};
  }
}
