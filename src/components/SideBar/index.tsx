import * as React from 'react'
import * as styles from './style.css'
import { NavModel, UserModel } from '../../store/models'
import { Nav } from 'react-bootstrap'
import { Image, Accordion } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { SIDER_MENU } from '../../config'

export namespace Nav {
  export interface IProps {
    user: UserModel
    onClickFilter: (filter: NavModel.Filter) => void
  }
}

export class SideBar extends React.Component<Nav.IProps> {
  constructor(props: any, context?: any) {
    super(props, context)
    this.state = {
      open: false,
    }
  }

  renderProfile(): JSX.Element | void {
    const { user } = this.props
    {
      return user ? (
        <div className={styles.profile}>
          <h1 className="textXLarge">YKPINE</h1>
          <Image
            className={styles.avatar}
            src={user.avatar}
            alt="用户头像"
            roundedCircle
            style={{ width: '120px', height: '120px' }}
          />
          <div className={styles.name}>{user.username}</div>
          <div className={styles.slogan}>{user.slogan}</div>
        </div>
      ) : (
        <div>用户不见了</div>
      )
    }
  }

  renderMenu(): JSX.Element | void {
    const dropIcon = <FontAwesomeIcon icon={faAngleDown} />
    const { onClickFilter } = this.props

    return (
      <div className={styles.siderMenu}>
        <Accordion defaultActiveKey={SIDER_MENU[1].name}>
          {SIDER_MENU.map(it => (
            <div className={styles.navItem} key={it.name}>
              {it.child ? (
                <Accordion.Toggle
                  as="div"
                  eventKey={it.name}
                  className={styles.content}
                >
                  <FontAwesomeIcon
                    icon={it.icon}
                    style={{ marginRight: '5px' }}
                  />
                  <span className={styles.text}>{it.text}</span>
                  {it.child && it.child.length > 0 ? (
                    <span className={styles.dropIcon}>{dropIcon}</span>
                  ) : null}
                </Accordion.Toggle>
              ) : (
                <div
                  className={styles.content}
                  onClick={e => {
                    e.stopPropagation()
                    onClickFilter(NavModel.Filter[it.name])
                  }}
                >
                  <FontAwesomeIcon
                    icon={it.icon}
                    style={{ marginRight: '5px' }}
                  />
                  <span className={styles.text}>{it.text}</span>
                </div>
              )}
              {it.child &&
                it.child.map(child => (
                  <Accordion.Collapse
                    eventKey={it.name}
                    className={styles.subNav}
                    key={child.name}
                  >
                    <div
                      className={styles.content}
                      onClick={e => {
                        e.stopPropagation()
                        onClickFilter(child.name)
                      }}
                    >
                      <FontAwesomeIcon
                        icon={child.icon}
                        style={{ marginRight: '5px', color: 'white' }}
                      />
                      <span className={styles.text}>{child.text}</span>
                    </div>
                  </Accordion.Collapse>
                ))}
            </div>
          ))}
        </Accordion>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.siderNav}>
        {this.renderProfile()}
        {this.renderMenu()}
      </div>
    )
  }
}
