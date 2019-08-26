import * as React from 'react'
import * as styles from './style.css'
import { NavModel, UserModel } from '../../store/models'
import { Nav } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { SIDER_MENU } from '../../config'

export namespace Nav {
  export interface IProps {
    userinfo: UserModel
    onClickFilter: (filter: NavModel.Filter) => void
  }
}

export class NavComp extends React.Component<Nav.IProps> {
  constructor(props: any, context?: any) {
    super(props, context)
    this.state = {
      open: false,
    }
  }

  render() {
    const dropIcon = <FontAwesomeIcon icon={faAngleDown} />
    const { userinfo, onClickFilter } = this.props

    return (
      <div className={styles.siderNav}>
        <div className={styles.profile}>
          <h1 className="textXLarge">YKPINE</h1>
          <Image className={styles.avatar} src={userinfo.avatar} alt="用户头像" thumbnail />
          <div className={styles.name}>{userinfo.name}</div>
          <div className={styles.slogan}>{userinfo.slogan}</div>
        </div>
        <div className={styles.siderMenu}>
          {SIDER_MENU.map((menu, idx) => (
            <div className={styles.navItem} key={idx}>
              <div
                className={styles.content}
                // onClick={e => {
                //   e.stopPropagation()
                //   onClickFilter(NavModel.Filter[menu.name])
                // }}
              >
                <FontAwesomeIcon
                  icon={menu.icon}
                  style={{ marginRight: '5px' }}
                />
                <span className={styles.text}>{menu.text}</span>
                {menu.child && menu.child.length > 0 ? (
                  <span className={styles.dropIcon}>{dropIcon}</span>
                ) : null}
              </div>
              {menu.child &&
                menu.child.map(child => (
                  <div className={styles.subNav}>
                    <div
                      className={styles.content}
                      key={child.text}
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
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
