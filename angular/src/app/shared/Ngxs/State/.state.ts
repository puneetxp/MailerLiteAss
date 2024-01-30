import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Add, Delete, Edit, Set, Upsert  } from '../Action/.action';
import {  } from '../../Interface/Model/';
import { Injectable } from '@angular/core';
import { IndexedDBService } from '../../Service/indexed-db.service';
const table = '';
export interface StateModel {
  : [];
}
@Injectable()
@State<StateModel>({
  name: '',
  defaults: {
    : []
  }
})
export class State {
  constructor(private indexeddb: IndexedDBService) { }
  ngxsOnInit(): void { }
  @Selector()
  static Get(state: StateModel) {
    return state;
  }
  @Action(Set)
  Set({ setState }: StateContext<StateModel>, { payload }: Set) {
    this.indexeddb.The_setData(table, payload);
    setState({ : payload });
  }
  @Action(Add)
  Add({ getState, patchState }: StateContext<StateModel>, { payload }: Add) {
    this.indexeddb.The_putSomeData(table, payload);
    patchState({ : [...getState()., payload] });
  }
  @Action(Upsert)
  Upsert({ getState, setState, patchState }: StateContext<StateModel>, { payload }: Upsert) {
    if (getState().?.length == 0) {
      this.indexeddb.The_setData(table, payload);
      setState({ : payload });
    }  else {
      payload.forEach(i => {
        this.indexeddb.The_putSomeData(table, payload);
        patchState({
          : getState()..filter(a => a.id != i.id)
        });
        patchState({
          : [...getState()., i]
        })
      });
    }
  }
  @Action(Edit)
  Edit({ getState, patchState }: StateContext<StateModel>, { payload }: Edit) {
    this.indexeddb.The_putSomeData(table, payload);
    let reservices = getState()..filter(a => a.id != payload.id);
    patchState({ : [...reservices, payload] });
  }
  @Action(Delete)
  Delete({ getState, patchState }: StateContext<StateModel>, { payload }: Delete) {
    this.indexeddb.The_delSomeData(table, payload);
    patchState({
      : getState()..filter(a => a.id != payload)
    })
  }
}
