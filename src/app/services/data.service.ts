import { Injectable } from '@angular/core';
import { DbService } from "./db.service";

@Injectable()
export class DataService {
  constructor(private _dbService: DbService) {

  }
}
