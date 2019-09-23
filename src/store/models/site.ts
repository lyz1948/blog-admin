interface IBlacklist {
  ips?: string[]
  mails?: string[]
  keywords?: string[]
}

export interface SiteModel {
	title: string
	sub_title: string
	keywords: string[]
  email: string
  domain: string
  icp: string
  blacklist: IBlacklist
  description?: string
}
