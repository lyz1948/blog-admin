import * as React from 'react'
import * as styles from './style.css'

// model
import { NavModel } from '../../store/models'
// bootstrap
import { Nav } from 'react-bootstrap'
// Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faToolbox,
  faTachometerAlt,
  faCalendarPlus,
  faSlidersH,
  faMailBulk,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'

export namespace Nav {
  export interface IProps {
    onClickFilter: (filter: NavModel.Filter) => void
  }
}

const menus = [
  {
    text: '仪表盘',
    name: NavModel.Filter.DASHBOARD,
    icon: faTachometerAlt,
    child: [],
  },
  {
    text: '文章',
    name: NavModel.Filter.ARTICLE,
    icon: faMailBulk,
    child: [
      {
        name: NavModel.Filter.ARTICLE_ADD,
        text: '发布文章',
        icon: faCalendarPlus,
      },
      {
        name: NavModel.Filter.ARTICLE_LIST,
        text: '管理文章',
        icon: faSlidersH,
      },
      {
        name: NavModel.Filter.ARTICLE_CATEGORY,
        text: '文章分类',
        icon: faToolbox,
      },
      { name: 
        NavModel.Filter.ARTICLE_TAG, 
        text: '文章标签', 
        icon: faWrench,
      },
    ],
  }
]

export class NavComp extends React.Component<Nav.IProps> {
  constructor(props: any, context?: any) {
    super(props, context)
    this.state = {
      open: false,
    }
  }

  render() {
    const dropIcon = <FontAwesomeIcon icon={faAngleDown} />
    const { onClickFilter } = this.props

    return (
      <div className={styles.siderNav}>
        {menus.map((menu, idx) => (
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
            <div className={styles.subNav}>
              {menu.child &&
                menu.child.map(child => (
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
                ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}
