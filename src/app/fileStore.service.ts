import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({providedIn: 'root'})
export class FileStoreService extends Dexie {
    file: Dexie.Table<FileSave, number>;

    constructor() {
        super("TestDb");
        this.version(1)
        .stores({
            files: '++id, file, type'
        });

        this.file = this.table("files");
    }

    save(file: FileSave){
        return this.file.add(file);
    }

    getFile(id: number){
        return this.file.get(id);
    }

    deleteAll(){
      return this.file.clear();
    }

    getFiles(){
      return this.file.toArray();
    }

}

export interface FileSave{
    name: string;
    file: File;
    type: Type
}

export enum Type{
  Pdf,
  Excel,
  Doc,
  IMG
}
