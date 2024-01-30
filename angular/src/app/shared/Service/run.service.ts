import { Injectable } from '@angular/core';import { StatusService } from './Model/Status.service';
import { SubscriberService } from './Model/Subscriber.service';
import { IndexedDBService } from './indexed-db.service';
import { tables } from '../db/tables';
@Injectable({
  providedIn: 'root'
})
export class RunService {
  constructor(private indexdb: IndexedDBService,private statuses : StatusService,
private subscribers : SubscriberService) { }
  async run() {
    this.indexdb.setDb('mailerlite');
    this.indexdb.setTable(tables);
    await this.statuses.checkinit();
await this.subscribers.checkinit()
  }
}
