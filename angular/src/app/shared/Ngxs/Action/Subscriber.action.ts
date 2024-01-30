import { Subscriber } from '../../Interface/Model/Subscriber';
export class SetSubscriber {
  static readonly type = '[SUBSCRIBERS] set Subscriber';
  constructor(public payload: Subscriber[]) { }
}

export class AddSubscriber {
  static readonly type = '[SUBSCRIBERS] Add Subscriber';
  constructor(public payload: Subscriber) { }
}

export class EditSubscriber {
  static readonly type = '[SUBSCRIBERS] edit';
  constructor(public payload: Subscriber) { }
}

export class DeleteSubscriber {
  static readonly type = '[SUBSCRIBERS] delete';
  constructor(public payload: number) { }
}
export class UpsertSubscriber {
  static readonly type = '[SUBSCRIBERS] upsert';
  constructor(public payload: Subscriber[]) { }
}