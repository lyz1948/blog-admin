import * as React from 'react'
import * as styles from './style.css'
import { Base64 } from 'js-base64'
import { Button, Image } from 'react-bootstrap'
import {
  /* Notication, ConfirmModal, */ FancyInput,
  FancyTextarea,
} from '../index'
import { INotice } from '@app/interfaces/notication'
import { UserActions } from '@app/store/actions'
import * as CONFIG from '../../config'
import { UserModel } from '@app/store/models';

export namespace TagComp {
  export interface IProps {
    user: UserModel
    updateUser: typeof UserActions.updateUser
  }

  export interface IState {
    userInfo?: any
    showModal: boolean
    showNotice: boolean
    type: string
    content: string
  }
}

export class Settings extends React.Component<TagComp.IProps, TagComp.IState> {
  private inputTitle = React.createRef<HTMLInputElement>()
  private inputSubTitle = React.createRef<HTMLInputElement>()
  private inputSEO = React.createRef<HTMLInputElement>()
  private inputSiteName = React.createRef<HTMLInputElement>()
  private inputEmail = React.createRef<HTMLInputElement>()
  private inputICP = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()
  private inputBlackListIp = React.createRef<HTMLInputElement>()
  private inputBlackListEmail = React.createRef<HTMLInputElement>()

  private inputName = React.createRef<HTMLInputElement>()
  private inputSlogan = React.createRef<HTMLInputElement>()
  private inputPassword = React.createRef<HTMLInputElement>()
  private inputPasswordNew = React.createRef<HTMLInputElement>()
  private inputPasswordConfirm = React.createRef<HTMLInputElement>()

  constructor(props: TagComp.IProps, context?: any) {
    super(props, context)

    this.state = {
      userInfo: null,
      showNotice: false,
      showModal: false,
      type: 'info',
      content: '添加成功',
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentWillMount() {
    let userInfo = localStorage.getItem(CONFIG.APP.TOKEN_KEY) as any
    try {
      userInfo = JSON.parse(userInfo)
      this.setState({
        userInfo,
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  componentWillUpdate() {
    console.log('update');
    console.log(this.props.user);
  }
  
  getUserInfo() {
    const { name, slogan } = this.state.userInfo
    this.inputName.current!.value = name
    this.inputSlogan.current!.value = slogan
  }

  openModal(id: string) {
    this.setState({
      showModal: true,
    })
  }

  showNotice(obj: INotice) {
    const { type, content } = obj
    this.setState({
      showNotice: true,
      type,
      content,
    })
  }

  handleEdit(tag: any, e: React.MouseEvent<HTMLButtonElement>) {}

  // 更新用户信息
  updateUser() {
    const { _id } = this.state.userInfo
    const name = this.inputName.current!.value
    const slogan = this.inputSlogan.current!.value
    let password = this.inputPassword.current!.value
    let passwordNew = this.inputPasswordNew.current!.value
    let passwordNewConfirm = this.inputPasswordConfirm.current!.value

    if (!name) {
      this.showNotice({ type: 'warn', content: '您的江湖称呼是？' })
      return
    }
    if (!slogan) {
      this.showNotice({ type: 'warn', content: '您的口号是?' })
      return
    }
    if (password && !passwordNew) {
      this.showNotice({ type: 'warn', content: '新密码是不是该填一下！' })
      return
    }

    if (passwordNew && passwordNewConfirm) {
      if ((passwordNew.length !== passwordNewConfirm.length) || passwordNew.trim() !== passwordNewConfirm.trim()) {
        this.showNotice({ type: 'warn', content: '手抖了吧，两次密码不一致啊！' })
        return
      }
    }

    password = Base64.encode(password)
    passwordNew = Base64.encode(passwordNew)
    passwordNewConfirm = Base64.encode(passwordNewConfirm)
    
    let userInfo = {
      _id,
      name,
      slogan,
      avatar: 'https://avatars1.githubusercontent.com/u/15190827?s=460&v=4',
      password,
      password_new: passwordNew,
    }
    this.props.updateUser(userInfo)
  }

  handleDelete() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  renderSiteSetting(): JSX.Element | void {
    return (
      <div className="site flex60">
        <div className="title">
          <h3>全局设置</h3>
        </div>
        <div className="content">
          <div className={styles.inputWrap}>
            <span className={styles.label}>网站标题</span>
            <FancyInput ref={this.inputTitle} tip="网站的标题" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>网站副标题</span>
            <FancyInput ref={this.inputSubTitle} tip="网站副标题" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>网站关键字</span>
            <FancyInput ref={this.inputSEO} tip="网站关键字" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>网站域名</span>
            <FancyInput ref={this.inputSiteName} tip="网站域名" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>网站电子邮件</span>
            <FancyInput ref={this.inputEmail} tip="admin@ykpine.com" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>网站备案号</span>
            <FancyInput ref={this.inputICP} tip="网站ICP备案号" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>网站描述</span>
            <FancyTextarea ref={this.inputDescription} tip="网站简介描述" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>黑名单 - IP</span>
            <FancyTextarea ref={this.inputBlackListIp} tip="网站IP黑名单列表" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>黑名单 - 邮箱</span>
            <FancyTextarea
              ref={this.inputBlackListEmail}
              tip="网站邮箱黑名单列表"
            />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}></span>
            <Button variant="info">保存修改</Button>
          </div>
        </div>
      </div>
    )
  }

  renderUserSetting(): JSX.Element | void {
    return (
      <div className="user flex40 pdl20">
        <div className="title">
          <h3>用户设置</h3>
        </div>
        <div className="content">
          <div className={styles.inputWrap}>
            <span className={styles.label}>头像</span>
            <div className={styles.avatar}>
              <Image
                src="https://avatars1.githubusercontent.com/u/15190827?s=460&v=4"
                thumbnail
              />
            </div>
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>姓名</span>
            <FancyInput 
            ref={this.inputName} 
            tip="用户姓名"
            />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>口号</span>
            <FancyInput
              ref={this.inputSlogan}
              tip="用户个人签名"
            />
          </div>
          <div className={styles.line}></div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>旧密码</span>
            <FancyInput ref={this.inputPassword} tip="旧密码" type="password" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>新密码</span>
            <FancyInput ref={this.inputPasswordNew} tip="新密码" type="password" />
          </div>
          <div className={styles.inputWrap}>
            <span className={styles.label}>确认密码</span>
            <FancyInput ref={this.inputPasswordConfirm} tip="确认新密码" type="password" />
          </div>
          <div className={styles.line}></div>
          <div className={styles.inputWrap}>
            <span className={styles.label}></span>
            <Button variant="info" onClick={this.updateUser}>
              保存修改
            </Button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="module">
        {this.renderSiteSetting()}
        {this.renderUserSetting()}
      </div>
    )
  }
}
