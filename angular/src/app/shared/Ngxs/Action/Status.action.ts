import { Status } from '../../Interface/Model/Status';
export class SetStatus {
  static readonly type = '[STATUSES] set Status';
  constructor(public payload: Status[]) { }
}

export class AddStatus {
  static readonly type = '[STATUSES] Add Status';
  constructor(public payload: Status) { }
}

export class EditStatus {
  static readonly type = '[STATUSES] edit';
  constructor(public payload: Status) { }
}

export class DeleteStatus {
  static readonly type = '[STATUSES] delete';
  constructor(public payload: number) { }
}
export class UpsertStatus {
  static readonly type = '[STATUSES] upsert';
  constructor(public payload: Status[]) { }
}