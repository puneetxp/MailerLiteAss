import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddStatus, DeleteStatus, EditStatus, SetStatus, UpsertStatus  } from '../Action/Status.action';
import { Status } from '../../Interface/Model/Status';
import { Injectable } from '@angular/core';
import { IndexedDBService } from '../../Service/indexed-db.service';
const table = 'status';
export interface StatusStateModel {
  statuses: Status[];
}
@Injectable()
@State<StatusStateModel>({
  name: 'status',
  defaults: {
    statuses: []
  }
})
export class StatusState {
  constructor(private indexeddb: IndexedDBService) { }
  ngxsOnInit(): void { }
  @Selector()
  static Getstatuses(state: StatusStateModel) {
    return state;
  }
  @Action(SetStatus)
  SetStatus({ setState }: StateContext<StatusStateModel>, { payload }: SetStatus) {
    this.indexeddb.The_setData(table, payload);
    setState({ statuses: payload });
  }
  @Action(AddStatus)
  AddStatus({ getState, patchState }: StateContext<StatusStateModel>, { payload }: AddStatus) {
    this.indexeddb.The_putSomeData(table, payload);
    patchState({ statuses: [...getState().statuses, payload] });
  }
  @Action(UpsertStatus)
  UpsertStatus({ getState, setState, patchState }: StateContext<StatusStateModel>, { payload }: UpsertStatus) {
    if (getState().statuses?.length == 0) {
      this.indexeddb.The_setData(table, payload);
      setState({ statuses: payload });
    }  else {
      payload.forEach(i => {
        this.indexeddb.The_putSomeData(table, payload);
        patchState({
          statuses: getState().statuses.filter(a => a.id != i.id)
        });
        patchState({
          statuses: [...getState().statuses, i]
        })
      });
    }
  }
  @Action(EditStatus)
  EditStatus({ getState, patchState }: StateContext<StatusStateModel>, { payload }: EditStatus) {
    this.indexeddb.The_putSomeData(table, payload);
    let reservices = getState().statuses.filter(a => a.id != payload.id);
    patchState({ statuses: [...reservices, payload] });
  }
  @Action(DeleteStatus)
  DeleteStatus({ getState, patchState }: StateContext<StatusStateModel>, { payload }: DeleteStatus) {
    this.indexeddb.The_delSomeData(table, payload);
    patchState({
      statuses: getState().statuses.filter(a => a.id != payload)
    })
  }
}
