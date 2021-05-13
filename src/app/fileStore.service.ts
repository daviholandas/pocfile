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
    
}

export interface FileSave{
    name: string;
    file: File;
}