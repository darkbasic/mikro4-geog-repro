import {PrimaryKey, Property} from '@mikro-orm/core';

export interface BaseIdEntityConstructor {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseIdEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({onUpdate: () => new Date()})
  updatedAt = new Date();

  constructor({id, createdAt, updatedAt}: BaseIdEntityConstructor = {}) {
    if (id) {
      this.id = id;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
  }
}
