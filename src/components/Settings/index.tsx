import * as React from 'react'
import * as styles from './style.css'
import { Base64 } from 'js-base64'
import { Button, Image } from 'react-bootstrap'
import { Notication, FancyInput, FancyTextarea, TextInput } from '../index'
import { INotice } from '@app/interfaces/notice'
import { UserActions, ArticleActions } from '@app/store/actions'
import { UserModel } from '@app/store/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { prefixUrl } from '../../utils'

export namespace SettingComp {
	export interface IProps {
		user: UserModel
		updateUser: typeof UserActions.updateUser
		uploadAvatar: typeof ArticleActions.uploadAvatar
	}

	export interface IState {
		userinfo?: any
		name?: string
		avatar?: string
		slogan?: string
		formData?: any
		showModal: boolean
		showNotice: boolean
		type: string
		content: string
	}
}

export class Settings extends React.Component<
	SettingComp.IProps,
	SettingComp.IState
> {
	private inputTitle = React.createRef<HTMLInputElement>()
	private inputSubTitle = React.createRef<HTMLInputElement>()
	private inputSEO = React.createRef<HTMLInputElement>()
	private inputSiteName = React.createRef<HTMLInputElement>()
	private inputEmail = React.createRef<HTMLInputElement>()
	private inputICP = React.createRef<HTMLInputElement>()
	private inputDescription = React.createRef<HTMLInputElement>()
	private inputBlackListIp = React.createRef<HTMLInputElement>()
	private inputBlackListEmail = React.createRef<HTMLInputElement>()

	// private inputName = React.createRef<HTMLInputElement>()
	// private inputSlogan = React.createRef<HTMLInputElement>()
	private inputPassword = React.createRef<HTMLInputElement>()
	private inputPasswordNew = React.createRef<HTMLInputElement>()
	private inputPasswordConfirm = React.createRef<HTMLInputElement>()

	constructor(props: SettingComp.IProps, context?: any) {
		super(props, context)

		this.state = {
			userinfo: this.props.user || null,
			name: 'aa',
			avatar: '',
			slogan: 'bb',
			formData: null,
			showNotice: false,
			showModal: false,
			type: 'info',
			content: '添加成功',
		}
	}

	// 选择上传头像
	async chooseImage(event: React.ChangeEvent<HTMLInputElement>) {
		const formData = new FormData()
		const fileEl = document.getElementById('file') as HTMLInputElement

		if (fileEl.files) {
			const avatar = URL.createObjectURL(fileEl.files[0])

			formData.append('image', fileEl.files[0])
			const res = await this.props.uploadAvatar(formData)
			console.log('upload avatar', res)
			this.setState({
				avatar,
				formData,
			})
		}
	}

	inputNameChange(text: string) {
		this.setState({
			name: text,
		})
	}

	inputSloganChange(text: string) {
		this.setState({
			slogan: text,
		})
	}

	// 更新用户信息
	async handleUpdate() {
		// const username = this.inputName.current!.value
		// const slogan = this.inputSlogan.current!.value
		const { name, slogan, avatar, formData } = this.state
		let password = this.inputPassword.current!.value
		let passwordNew = this.inputPasswordNew.current!.value
		let passwordNewConfirm = this.inputPasswordConfirm.current!.value

		if (!name) {
			this.notice({ type: 'warn', content: '您的江湖称呼是？' })
			return
		}
		if (!slogan) {
			this.notice({ type: 'warn', content: '您的口号是?' })
			return
		}
		if (password && !passwordNew) {
			this.notice({ type: 'warn', content: '新密码未输入！' })
			return
		}

		if (passwordNew && !passwordNewConfirm) {
			this.notice({ type: 'warn', content: '确认密码不能为空！' })
			return
		}
		if (
			passwordNew.length !== passwordNewConfirm.length ||
			passwordNew.trim() !== passwordNewConfirm.trim()
		) {
			this.notice({
				type: 'warn',
				content: '手抖了吧，两次密码不一致啊！',
			})
			return
		}

		password = Base64.encode(password)
		passwordNew = Base64.encode(passwordNew)
		passwordNewConfirm = Base64.encode(passwordNewConfirm)
		let userInfo = {
			username: name,
			slogan,
			password,
			avatar,
			password_new: passwordNew,
		}
		// 先上传缩略图
		if (formData) {
			const res = await this.props.uploadAvatar(formData)
			if (res && res.payload && res.payload.result) {
				userInfo.avatar = res.payload.result
			}
		}
		this.props.updateUser(userInfo)

		const { error, message } = this.props.user

		let type = 'success'
		if (error) {
			type = 'error'
		}

		this.notice({
			type,
			content: message,
		})
	}

	openModal(id: string) {
		this.setState({
			showModal: true,
		})
	}

	notice(obj: INotice) {
		const { type, content } = obj
		this.setState({
			showNotice: true,
			type,
			content,
		})
	}

	renderSiteSetting(): JSX.Element | void {
		return (
			<div className="module flex60">
				<div className="title">
					<h3>全局设置</h3>
				</div>
				<div className="content">
					<div className="inputWrap">
						<span className="label">网站标题</span>
						<FancyInput ref={this.inputTitle} tip="网站的标题" />
					</div>
					<div className="inputWrap">
						<span className="label">网站副标题</span>
						<FancyInput ref={this.inputSubTitle} tip="网站副标题" />
					</div>
					<div className="inputWrap">
						<span className="label">网站关键字</span>
						<FancyInput ref={this.inputSEO} tip="网站关键字" />
					</div>
					<div className="inputWrap">
						<span className="label">网站域名</span>
						<FancyInput ref={this.inputSiteName} tip="网站域名" />
					</div>
					<div className="inputWrap">
						<span className="label">网站电子邮件</span>
						<FancyInput ref={this.inputEmail} tip="admin@ykpine.com" />
					</div>
					<div className="inputWrap">
						<span className="label">网站备案号</span>
						<FancyInput ref={this.inputICP} tip="网站ICP备案号" />
					</div>
					<div className="inputWrap">
						<span className="label">网站描述</span>
						<FancyTextarea ref={this.inputDescription} tip="网站简介描述" />
					</div>
					<div className="inputWrap">
						<span className="label">黑名单 - IP</span>
						<FancyTextarea ref={this.inputBlackListIp} tip="网站IP黑名单列表" />
					</div>
					<div className="inputWrap">
						<span className="label">黑名单 - 邮箱</span>
						<FancyTextarea
							ref={this.inputBlackListEmail}
							tip="网站邮箱黑名单列表"
						/>
					</div>
					<div className="inputWrap">
						<span className="label"></span>
						<Button variant="info">保存修改</Button>
					</div>
				</div>
			</div>
		)
	}

	renderUserSetting(): JSX.Element | void {
		const { user } = this.props
		const avatar = user.avatar || this.state.avatar

		return (
			<div className="module flex1 pdl0">
				<div className="title">
					<h3>用户设置</h3>
				</div>
				<div className="content">
					<div className="inputWrap">
						<span className="label">头像</span>
						<div className={styles.avatar}>
							<input
								type="file"
								id="file"
								onChange={(e: any) => this.chooseImage(e)}
							/>
							{avatar ? (
								<Image src={prefixUrl(avatar)} thumbnail />
							) : (
								<div className={styles.thumbIcon}>
									<FontAwesomeIcon icon={faCloudUploadAlt} size="4x" />
								</div>
							)}
						</div>
					</div>
					<div className="inputWrap">
						<span className="label">姓名</span>
						{user.username ? (
							<TextInput
								text={user.username}
								onSave={(text: string) => this.inputNameChange(text)}
							/>
						) : (
							<div>no user</div>
						)}

						{/* <FancyInput ref={this.inputName} value={userinfo && userinfo.username} tip="用户姓名" onChange={(e: any) => this.inputNameChange(e) }/> */}
					</div>
					<div className="inputWrap">
						<span className="label">口号</span>
						{user.slogan ? (
							<TextInput
								text={user.slogan}
								onSave={(text: string) => this.inputSloganChange(text)}
							/>
						) : (
							<div>no slogan</div>
						)}
						{/* <FancyInput
							ref={this.inputSlogan}
							tip="用户个人签名"
						/> */}
					</div>
					<div className="inputWrap">
						<span className="label">旧密码</span>
						<FancyInput ref={this.inputPassword} tip="旧密码" type="password" />
					</div>
					<div className="inputWrap">
						<span className="label">新密码</span>
						<FancyInput
							ref={this.inputPasswordNew}
							tip="新密码"
							type="password"
						/>
					</div>
					<div className="inputWrap">
						<span className="label">确认密码</span>
						<FancyInput
							ref={this.inputPasswordConfirm}
							tip="确认新密码"
							type="password"
						/>
					</div>
					<div className="inputWrap">
						<span className="label"></span>
						<Button variant="info" onClick={() => this.handleUpdate()}>
							保存修改
						</Button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { showNotice, type, content } = this.state
		return (
			<div>
				<Notication
					show={showNotice}
					type={type}
					content={content}
					onClose={() => {
						this.setState({ showNotice: false })
					}}
					autohide
				/>
				<div className="flex">
					{this.renderSiteSetting()}
					{this.renderUserSetting()}
				</div>
			</div>
		)
	}
}
