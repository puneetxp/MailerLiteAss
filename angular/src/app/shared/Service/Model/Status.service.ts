import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AddStatus, DeleteStatus, EditStatus, SetStatus , UpsertStatus } from '../../Ngxs/Action/Status.action';
import { Status } from '../../Interface/Model/Status';
import { StatusStateModel } from '../../Ngxs/State/Status.state';
import { AsyncPipe } from '@angular/common';
import { IndexedDBService } from '../indexed-db.service';
import { FormDataService } from 'the-angular/lib/service/Form/FormData.service';
type keys = 'id' | 'created_at' | 'updated_at' | 'name';
interface find {
  key?: keys;
  value: number | string
};
@Injectable({
  providedIn: 'root'
})
export class StatusService {
  @Select() status$!: Observable<StatusStateModel>;
  constructor(private AsyncPipe: AsyncPipe, private indexdb: IndexedDBService, private store: Store, private form: FormDataService) { }
  private model = 'status';
  private table = 'statuses';
  prefix(prefix: string) {
    this.url = '/api/' + prefix + '/' + this.model
    return this;
  }
  async checkinit() {
    await this.indexdb.The_getall<Status[]>(this.model).then(i => {
      this.store.dispatch(new SetStatus(i));
    });
  }
  public url = '/api/' + this.model;
  create(_value: any): void {
    this.form.post<Status>(this.url, _value).subscribe(i => this.store.dispatch(new AddStatus(i)));
  }
  get(slug: string): Observable<Status> {
    return this.form.get<Status>(this.url + '/' + slug);
  }
  getState(id: number | string, key: keys = 'id'): Observable<Status[]> {
    return this.status$.pipe(map(i => { return i.statuses.filter(a => a[key] == id) }));
  }
  addState(data: any) {
    this.store.dispatch(new AddStatus(data));
  }
  upsertState(data: any[]) {
    this.store.dispatch(new UpsertStatus(data));
  }
  array() {
    return this.AsyncPipe.transform(this.allState());
  }
  all(): void {
    const statuses: Status[] = this.AsyncPipe.transform(this.status$.pipe(map(i => i.statuses))) || [];
    if (statuses.length > 0) {
      this.refresh(statuses);
    } else {
      this.fresh();
    }
  }
  fresh() {
    this.form.get<Status[]>(this.url).subscribe((i) =>
      this.store.dispatch(new SetStatus(i))
    );
  }
  
  refresh(statuses: Status[]) {
    statuses.sort((x, y) =>
      new Date(x.updated_at) < new Date(y.updated_at) ? 1 : -1
    );
    this.form.get<Status[]>(this.url, { 'latest': statuses[0].updated_at }).subscribe((i) => this.store.dispatch(new UpsertStatus(i)));
  }
  allState() {
    return this.status$.pipe(map((i) => {
      return i.statuses;
    }));
  }
  mutlifind(find: find[]) {
    let x = this.allState();
    find.forEach(r => x = x.pipe(map(i => i.filter(a => a[r.key || 'id'] == r.value))))
    return x.pipe(map(i => i[0]));
  }
  find(id: number | string, key: keys = 'id'): Observable<Status | undefined> {
    return this.status$.pipe(map((i) => { return i.statuses.find((a: Status) => a[key] == id) }));
  }
  update(id: number, _update: any) {
    return this.form.patch<Status>(this.url + '/' + id, _update).subscribe(i => this.store.dispatch(new EditStatus(i)));
  }
  upsert(_upsert: any) {
    _upsert.length > 0 && this.form.put<Status[]>(this.url, { [this.table]: _upsert }).subscribe(i => this.store.dispatch(new UpsertStatus(i)));
  }
  del(id: number) {
    return this.form.delete<number>(this.url + '/' + id).subscribe(i => this.store.dispatch(new DeleteStatus(i)));
  }
}