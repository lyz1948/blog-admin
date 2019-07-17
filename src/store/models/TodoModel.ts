export interface TodoModel {
  id: number
  text: string
  completed: boolean
}

export namespace TodoModel {
  export enum Filter {
    SHOW_ALL = 'ALL',
    SHOW_ACTIVE = 'ACTINVE',
    SHOW_COMPLETED = 'COMPLETED'
  }
}
