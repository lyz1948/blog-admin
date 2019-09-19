import * as React from 'react'
import classNames from 'classnames'
import Toast from 'react-bootstrap/Toast'
import * as styles from './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faInfo,
  faExclamationTriangle,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons'

enum IPosition {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

enum IType {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface IProps {
  type?: string
  position?: string
  content?: string
  show: boolean
  autohide?: boolean
  onClose?: () => void
  [propName: string]: any
}

function ToastIcon(props: any) {
  switch (props.type) {
    case 'success':
      return (
        <FontAwesomeIcon
          icon={faCheck}
          style={{ marginRight: '10px', color: '#fff' }}
        />
      )
    case 'warn':
      return (
        <FontAwesomeIcon
          icon={faExclamation}
          style={{ marginRight: '10px', color: '#fff' }}
        />
      )
    case 'error':
      return (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          style={{ marginRight: '10px', color: '#fff' }}
        />
      )
    default:
      return (
        <FontAwesomeIcon
          icon={faInfo}
          style={{ marginRight: '10px', color: '#fff' }}
        />
      )
  }
}

export function Notication(props: IProps) {
  const classes = classNames({
    [styles.posRight]: props.position === IPosition.RIGHT,
    [styles.posLeft]: props.position === IPosition.LEFT,
    [styles.posCenter]: !props.position,
  })

  const classesSuccess = classNames({
    [styles.toastBody]: true,
    [styles.success]: props.type === IType.SUCCESS,
    [styles.info]: props.type === IType.INFO,
    [styles.warn]: props.type === IType.WARN,
    [styles.error]: props.type === IType.ERROR,
  })

  return (
    <Toast
      className={classes}
      transition={false}
      show={props.show}
      autohide={props.autohide}
      onClose={props.onClose}
    >
      {/* <Toast.Header>
        <strong className="mr-auto">{props.title}</strong>
      </Toast.Header> */}
      <Toast.Body bsPrefix={classesSuccess}>
        <ToastIcon type={props.type} />
        {props.content}
      </Toast.Body>
    </Toast>
  )
}
