import { createAction } from 'redux-actions'

export namespace DialogActions {
  export enum Type {
    DIALOG_SHOW = 'DIALOG_SHOW',
    DIALOG_HIDE = 'DIALOG_HIDE',
  }

  export const dialogShow = createAction(Type.DIALOG_SHOW)
  export const dialogHide = createAction(Type.DIALOG_HIDE)
}

export type DialogActions = omit<typeof DialogActions, 'Type'>
