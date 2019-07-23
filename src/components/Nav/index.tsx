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
  faTags,
  faToolbox,
  faTachometerAlt,
  faCalendarPlus,
  faSlidersH,
  faMailBulk,
  faSprayCan,
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
        name: NavModel.Filter.ARTICLE_MANAGE,
        text: '管理文章',
        icon: faSlidersH,
      },
    ],
  },
  {
    text: '分类',
    name: NavModel.Filter.CATEGORY,
    icon: faSprayCan,
    child: [
      {
        name: NavModel.Filter.CATEGORY_ADD,
        text: '添加分类',
        icon: faCalendarPlus,
      },
      {
        name: NavModel.Filter.CATEGORY_MANAGE,
        text: '管理分类',
        icon: faToolbox,
      },
    ],
  },
  {
    text: '标签',
    name: NavModel.Filter.TAG,
    icon: faTags,
    child: [
      { name: NavModel.Filter.TAG_ADD, text: '添加标签', icon: faCalendarPlus },
      { name: NavModel.Filter.TAG_MANAGE, text: '管理标签', icon: faWrench },
    ],
  },
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
              onClick={(e) => {
                e.stopPropagation()
                onClickFilter(NavModel.Filter[menu.name])
              }}
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
                      onClickFilter(NavModel.Filter[child.name])
                    }}
                  >
                    <FontAwesomeIcon
                      icon={child.icon}
                      style={{ marginRight: '5px', color: 'Tomato' }}
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
