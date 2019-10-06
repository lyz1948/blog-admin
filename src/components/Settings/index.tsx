import * as React from 'react'
import * as styles from './style.css'
import { Base64 } from 'js-base64'
import { Button, Image } from 'react-bootstrap'
import { INotice } from '@app/interfaces/notice'
import { UserActions, ArticleActions } from '@app/store/actions'
import { UserModel, SiteModel } from '@app/store/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { Notication, TextInput } from '@app/components'
import { prefixUrl } from '@app/utils'

export namespace SettingComp {
	export interface IProps {
		user: UserModel
		site: SiteModel
		updateSite: typeof ArticleActions.updateSiteInfo
		updateUser: typeof UserActions.updateUser
		uploadAvatar: typeof ArticleActions.uploadAvatar
	}

	export interface IState {
		userInfo?: any
		siteInfo?: any
		avatar?: string
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
	constructor(props: SettingComp.IProps, context?: any) {
		super(props, context)

		this.state = {
			userInfo: this.props.user || null,
			siteInfo: this.props.site || null,
			// avatar: '',
			formData: null,
			showNotice: false,
			showModal: false,
			type: 'info',
			content: '添加成功',
		}
	}

	componentDidMount() {
		const { site, user } = this.props
		this.setState({
			userInfo: user,
			siteInfo: site,
			avatar: user.avatar,
		})
	}

	// 选择上传头像
	async chooseImage(event: React.ChangeEvent<HTMLInputElement>) {
		const formData = new FormData()
		const fileEl = document.getElementById('file') as HTMLInputElement

		if (fileEl.files) {
			const { userInfo } = this.state
			userInfo['avatar'] = URL.createObjectURL(fileEl.files[0])

			formData.append('image', fileEl.files[0])

			this.setState({
				userInfo,
				formData,
			})
		}
	}

	// 用户信息修改
	userInfoChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		const { userInfo } = this.state

		userInfo[name] = value
		this.setState(userInfo)
	}

	// 网站信息修改
	siteInfoChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		const { siteInfo } = this.state

		// 切割成数组
		if (name === 'keywords') {
			siteInfo[name] = value.split(' ')
		} else if (name === 'mails' || name === 'ips') {
			siteInfo['blacklist'][name] = value.split(' ')
		} else {
			siteInfo[name] = value
		}
		this.setState(siteInfo)
	}

	// 更新用户信息
	async handleUpdate() {
		const { userInfo, formData } = this.state
		let {
			name,
			slogan,
			avatar,
			password,
			passwordNew,
			passwordNewConfirm,
		} = userInfo

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
			passwordNew &&
			passwordNewConfirm &&
			(passwordNew.length !== passwordNewConfirm.length ||
				passwordNew.trim() !== passwordNewConfirm.trim())
		) {
			this.notice({
				type: 'warn',
				content: '手抖了吧，两次密码不一致啊！',
			})
			return
		}

		password = password ? Base64.encode(password) : password
		passwordNew = passwordNew ? Base64.encode(passwordNew) : passwordNew
		passwordNewConfirm = passwordNewConfirm
			? Base64.encode(passwordNewConfirm)
			: passwordNewConfirm

		let userOpts = {
			name,
			slogan,
			password,
			avatar,
			password_new: passwordNew,
		}

		// 先上传缩略图
		if (formData) {
			const res = await this.props.uploadAvatar(formData)
			if (res && res.payload && res.payload.result) {
				userOpts.avatar = res.payload.result
			}
		}
		this.props.updateUser(userOpts)

		const { error, message } = this.props.user

		let type = 'success'
		let msg = '更新成功'
		if (error) {
			type = 'error'
			msg = message
		}

		this.notice({
			type,
			content: msg,
		})
	}

	// 更新站点
	async updateSiteInfo() {
		const {
			title,
			sub_title,
			domain,
			icp,
			email,
			description,
			keywords,
			blacklist,
		} = this.state.siteInfo

		const ips = blacklist.ips
		const mails = blacklist.mails
		const keywordAry = keywords

		const siteOpts = {
			title,
			sub_title,
			description,
			keywords: keywordAry,
			email,
			domain,
			icp,
			blacklist: {
				ips,
				mails,
				keywords,
			},
		}
		const res = await this.props.updateSite(siteOpts)
		console.log(res)
		// const { error, message } = this.props.site

		let type = 'success'
		let msg = '更新成功'
		// if (error) {
		// 	type = 'error'
		// 	msg = message
		// }

		this.notice({
			type,
			content: msg,
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
		const {
			title,
			sub_title,
			email,
			description,
			domain,
			icp,
			keywords,
			blacklist,
		} = this.props.site
		let { mails, ips } = blacklist

		let mailsStr = (mails || []).join(' ')
		let ipsStr = (ips || []).join(' ')
		let keywordsStr = (keywords || []).join(' ')

		return (
			<div className="module flex60">
				<div className="title">
					<h3>全局设置</h3>
				</div>
				<div className="content">
					<div className="inputWrap">
						<span className="label">网站标题</span>
						<TextInput
							text={title}
							name="title"
							placeholder="网站的标题"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">网站副标题</span>
						<TextInput
							text={sub_title}
							name="sub_title"
							placeholder="网站副标题"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">网站关键字</span>
						<TextInput
							text={keywordsStr}
							name="keywords"
							placeholder="网站关键字"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">网站域名</span>
						<TextInput
							text={domain}
							name="domain"
							placeholder="网站域名"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">网站电子邮件</span>
						<TextInput
							text={email}
							name="email"
							placeholder="admin@ykpine.com"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">网站备案号</span>
						<TextInput
							text={icp}
							name="icp"
							placeholder="网站ICP备案号"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">网站描述</span>
						<TextInput
							type="textarea"
							text={description}
							name="description"
							placeholder="网站简介描述"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">黑名单 - IP</span>
						<TextInput
							type="textarea"
							text={ipsStr}
							name="ips"
							placeholder="网站IP黑名单列表"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">黑名单 - 邮箱</span>
						<TextInput
							type="textarea"
							text={mailsStr}
							placeholder="网站邮箱黑名单列表"
							name="mails"
							valueChange={(name: string, e: any) =>
								this.siteInfoChange(name, e)
							}
							onSave={() => this.updateSiteInfo()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label"></span>
						<Button variant="info" onClick={() => this.updateSiteInfo()}>
							保存修改
						</Button>
					</div>
				</div>
			</div>
		)
	}

	renderUserSetting(): JSX.Element | void {
		const { name, avatar, slogan } = this.state.userInfo

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
						<TextInput
							text={name}
							name="name"
							valueChange={(name: string, e: any) =>
								this.userInfoChange(name, e)
							}
							onSave={() => this.handleUpdate()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">口号</span>
						<TextInput
							text={slogan}
							name="slogan"
							valueChange={(name: string, e: any) =>
								this.userInfoChange(name, e)
							}
							onSave={() => this.handleUpdate()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">旧密码</span>
						<TextInput
							type="password"
							name="password"
							valueChange={(name: string, e: any) =>
								this.userInfoChange(name, e)
							}
							onSave={() => this.handleUpdate()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">新密码</span>
						<TextInput
							type="password"
							name="passwordNew"
							valueChange={(name: string, e: any) =>
								this.userInfoChange(name, e)
							}
							onSave={() => this.handleUpdate()}
						/>
					</div>
					<div className="inputWrap">
						<span className="label">确认密码</span>
						<TextInput
							type="password"
							name="passwordNewConfirm"
							valueChange={(name: string, e: any) =>
								this.userInfoChange(name, e)
							}
							onSave={() => this.handleUpdate()}
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
