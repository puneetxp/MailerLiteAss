import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AddSubscriber, DeleteSubscriber, EditSubscriber, SetSubscriber , UpsertSubscriber } from '../../Ngxs/Action/Subscriber.action';
import { Subscriber } from '../../Interface/Model/Subscriber';
import { SubscriberStateModel } from '../../Ngxs/State/Subscriber.state';
import { AsyncPipe } from '@angular/common';
import { IndexedDBService } from '../indexed-db.service';
import { FormDataService } from 'the-angular/lib/service/Form/FormData.service';
type keys = 'id' | 'created_at' | 'updated_at' | 'name' | 'lastname' | 'email' | 'phone' | 'status_id';
interface find {
  key?: keys;
  value: number | string
};
@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  @Select() subscriber$!: Observable<SubscriberStateModel>;
  constructor(private AsyncPipe: AsyncPipe, private indexdb: IndexedDBService, private store: Store, private form: FormDataService) { }
  private model = 'subscriber';
  private table = 'subscribers';
  prefix(prefix: string) {
    this.url = '/api/' + prefix + '/' + this.model
    return this;
  }
  async checkinit() {
    await this.indexdb.The_getall<Subscriber[]>(this.model).then(i => {
      this.store.dispatch(new SetSubscriber(i));
    });
  }
  public url = '/api/' + this.model;
  create(_value: any): void {
    this.form.post<Subscriber>(this.url, _value).subscribe(i => this.store.dispatch(new AddSubscriber(i)));
  }
  get(slug: string): Observable<Subscriber> {
    return this.form.get<Subscriber>(this.url + '/' + slug);
  }
  getState(id: number | string, key: keys = 'id'): Observable<Subscriber[]> {
    return this.subscriber$.pipe(map(i => { return i.subscribers.filter(a => a[key] == id) }));
  }
  addState(data: any) {
    this.store.dispatch(new AddSubscriber(data));
  }
  upsertState(data: any[]) {
    this.store.dispatch(new UpsertSubscriber(data));
  }
  array() {
    return this.AsyncPipe.transform(this.allState());
  }
  all(): void {
    const subscribers: Subscriber[] = this.AsyncPipe.transform(this.subscriber$.pipe(map(i => i.subscribers))) || [];
    if (subscribers.length > 0) {
      this.refresh(subscribers);
    } else {
      this.fresh();
    }
  }
  fresh() {
    this.form.get<Subscriber[]>(this.url).subscribe((i) =>
      this.store.dispatch(new SetSubscriber(i))
    );
  }
  
  refresh(subscribers: Subscriber[]) {
    subscribers.sort((x, y) =>
      new Date(x.updated_at) < new Date(y.updated_at) ? 1 : -1
    );
    this.form.get<Subscriber[]>(this.url, { 'latest': subscribers[0].updated_at }).subscribe((i) => this.store.dispatch(new UpsertSubscriber(i)));
  }
  allState() {
    return this.subscriber$.pipe(map((i) => {
      return i.subscribers;
    }));
  }
  mutlifind(find: find[]) {
    let x = this.allState();
    find.forEach(r => x = x.pipe(map(i => i.filter(a => a[r.key || 'id'] == r.value))))
    return x.pipe(map(i => i[0]));
  }
  find(id: number | string, key: keys = 'id'): Observable<Subscriber | undefined> {
    return this.subscriber$.pipe(map((i) => { return i.subscribers.find((a: Subscriber) => a[key] == id) }));
  }
  update(id: number, _update: any) {
    return this.form.patch<Subscriber>(this.url + '/' + id, _update).subscribe(i => this.store.dispatch(new EditSubscriber(i)));
  }
  upsert(_upsert: any) {
    _upsert.length > 0 && this.form.put<Subscriber[]>(this.url, { [this.table]: _upsert }).subscribe(i => this.store.dispatch(new UpsertSubscriber(i)));
  }
  del(id: number) {
    return this.form.delete<number>(this.url + '/' + id).subscribe(i => this.store.dispatch(new DeleteSubscriber(i)));
  }
}