import { Injectable } from '@angular/core';
import { createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
addRxPlugin(RxDBDevModePlugin);
import { isDevMode } from '@angular/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
addRxPlugin(RxDBAttachmentsPlugin);
@Injectable({
  providedIn: 'root',
})
export class RxdbProvider {
  private rxDatabase!: RxDatabase;

  private dbSchema = {
    title: 'photo schema',
    version: 0,
    type: 'object',
    primaryKey: 'download_url',
    properties: {
      id: {
        type: 'string',
      },
      author: {
        type: 'string',
      },
      download_url: {
        type: 'string',
        primary: true,
        maxLength: 100,
      },
      height: {
        type: 'number',
      },
      url: {
        type: 'string',
      },
      width: {
        type: 'number',
      },
      alt: {
        type: 'string',
      },
    },
    attachments: {
      encrypted: false,
    },
  };
  constructor() {}

  public getDatabaseCollection(
    collectionName: string
  ): RxCollection<any, {}, { [key: string]: any }> {
    if (!this.rxDatabase) {
      throw new Error(
        'Database is not initialized. Please make sure the database is initialized before getting the collection'
      );
    }
    return this.rxDatabase[collectionName];
  }

  public async initDB(databaseName: string) {
    if (
      this.rxDatabase &&
      this.rxDatabase.name === databaseName &&
      !this.rxDatabase.destroyed
    ) {
      return this.rxDatabase;
    }

    this.rxDatabase = await createRxDatabase({
      name: databaseName, //'photo-lib',
      storage: getRxStorageDexie(),
      password: 'myLongAndStupidPassword',
    });

    await this.rxDatabase.addCollections({
      photos: {
        schema: this.dbSchema,
      },
    });

    return this.rxDatabase;
  }
}
