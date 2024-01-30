
export interface IPaginate {
  result: number,
  pageNumber: number,
  pageItems: number,
  totalpages: number,
  get: string
}
export interface ISubscriber {
  id: number,
  created_at: Date,
  updated_at: Date,
  name: string,
  lastname: string,
  email: string,
  phone: string,
  status_id: number
}
export interface IStatus {
  id: number,
  created_at: Date,
  updated_at: Date,
  name: string,
}
export interface IPaginateSubscriber extends IPaginate {
  item: ISubscriber[]
}
