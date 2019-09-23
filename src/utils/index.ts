export * from './token'
import * as CONFIG from '../config/app.config'

const toDouble = (s: number) => {
	const str = s + ''
	return ('00' + str).substring(str.length)
}

export const prefixUrl = (url: string) => {
	return url && ~url.indexOf('http') ? url : CONFIG.APP.baseUrl + url
}

export const getStatus = (response: any) =>
	!!response.status &&
	response.data &&
	Object.is(response.status, CONFIG.APP.errno)

export const formatDate = (d: Date) => {
	const myDate = new Date(d)
	const year = myDate.getUTCFullYear()
	const month = myDate.getUTCMonth()
	const date = myDate.getUTCDate()
	const h = myDate.getUTCHours()
	const min = myDate.getUTCMinutes()
	const sec = myDate.getUTCSeconds()

	return `${year}-${month + 1}-${date} ${h > 12 ? '下午' : '上午'} ${toDouble(
		h,
	)}:${toDouble(min)}:${toDouble(sec)}`
}

export function omit<T extends object, K extends keyof T>(
	target: T,
	...names: K[]
): Omit<T, K> {
	return (Object.keys(target) as K[]).reduce(
		(res, key) => {
			if (!names.includes(key)) {
				res[key] = target[key]
			}
			return res
		},
		{} as any,
	)
}
