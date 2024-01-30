import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddSubscriber, DeleteSubscriber, EditSubscriber, SetSubscriber, UpsertSubscriber  } from '../Action/Subscriber.action';
import { Subscriber } from '../../Interface/Model/Subscriber';
import { Injectable } from '@angular/core';
import { IndexedDBService } from '../../Service/indexed-db.service';
const table = 'subscriber';
export interface SubscriberStateModel {
  subscribers: Subscriber[];
}
@Injectable()
@State<SubscriberStateModel>({
  name: 'subscriber',
  defaults: {
    subscribers: []
  }
})
export class SubscriberState {
  constructor(private indexeddb: IndexedDBService) { }
  ngxsOnInit(): void { }
  @Selector()
  static Getsubscribers(state: SubscriberStateModel) {
    return state;
  }
  @Action(SetSubscriber)
  SetSubscriber({ setState }: StateContext<SubscriberStateModel>, { payload }: SetSubscriber) {
    this.indexeddb.The_setData(table, payload);
    setState({ subscribers: payload });
  }
  @Action(AddSubscriber)
  AddSubscriber({ getState, patchState }: StateContext<SubscriberStateModel>, { payload }: AddSubscriber) {
    this.indexeddb.The_putSomeData(table, payload);
    patchState({ subscribers: [...getState().subscribers, payload] });
  }
  @Action(UpsertSubscriber)
  UpsertSubscriber({ getState, setState, patchState }: StateContext<SubscriberStateModel>, { payload }: UpsertSubscriber) {
    if (getState().subscribers?.length == 0) {
      this.indexeddb.The_setData(table, payload);
      setState({ subscribers: payload });
    }  else {
      payload.forEach(i => {
        this.indexeddb.The_putSomeData(table, payload);
        patchState({
          subscribers: getState().subscribers.filter(a => a.id != i.id)
        });
        patchState({
          subscribers: [...getState().subscribers, i]
        })
      });
    }
  }
  @Action(EditSubscriber)
  EditSubscriber({ getState, patchState }: StateContext<SubscriberStateModel>, { payload }: EditSubscriber) {
    this.indexeddb.The_putSomeData(table, payload);
    let reservices = getState().subscribers.filter(a => a.id != payload.id);
    patchState({ subscribers: [...reservices, payload] });
  }
  @Action(DeleteSubscriber)
  DeleteSubscriber({ getState, patchState }: StateContext<SubscriberStateModel>, { payload }: DeleteSubscriber) {
    this.indexeddb.The_delSomeData(table, payload);
    patchState({
      subscribers: getState().subscribers.filter(a => a.id != payload)
    })
  }
}
