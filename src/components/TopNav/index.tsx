import * as React from 'react'
// import * as classNames from 'classnames'
import * as styles from './style.css'
import { Row, Col, Image, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faEnvelope,
  faBell,
  faLock,
  // faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import { UserModel } from '@app/store/models'

export namespace TopNav {
  export interface IProps {
    user: UserModel
    logout: () => void
  }
}

export class TopNav extends React.Component<TopNav.IProps> {
  
  constructor(props: TopNav.IProps, context: any) {
    super(props, context)
  }
  
  render() {
    const { user, logout } = this.props
    return (
      <div className={styles.topNav}>
        <Row>
          <Col md={1}>
            <div className={styles.navIcon}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Col>
          <Col md={11}>
            <ul className={styles.profile}>
              <li className={styles.item}>
                <span className={styles.message}>
                  <FontAwesomeIcon icon={faBell} />
                  <Badge className={styles.badge} variant="danger">
                    10
                  </Badge>
                </span>
                <span className={styles.message}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <Badge className={styles.badge} variant="danger">
                    10
                  </Badge>
                </span>
              </li>
              <li className={styles.item}>
                <Image
                  className={styles.avatar}
                  src={user.avatar}
                  roundedCircle
                />
              </li>
              <li className={styles.item}>
              <span className={styles.author} onClick={logout}>
              <FontAwesomeIcon icon={faLock} />
              </span>
                {/* <Dropdown>
                  <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                    <span className={styles.author}>Hello Man</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                {/* <FontAwesomeIcon icon={faAngleDown} /> */}
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}
