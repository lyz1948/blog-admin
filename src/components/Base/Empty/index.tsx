import * as React from 'react'

export function Empty(props: any) {
	return (
		<div className="empty">
			<div className="content posCenter">
				<div className="text">{props.text || '暂无数据'}</div>
			</div>
		</div>
	)
}
