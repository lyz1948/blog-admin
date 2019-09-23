import * as React from 'react'
import * as styles from './style.css'
import className from 'classnames'

export function LoadingProgress(props: any): JSX.Element {
	return (
		<div className={className(styles.container, styles.progress)}>
			<div className={styles.loading}>
				<span></span>
			</div>
		</div>
	)
}

export function LoadingRandCircle(props: any): JSX.Element {
	return (
		<div className={className(styles.container, styles.rangCircel)}>
			<div className={styles.loading}>
				<div>
					<span></span>
				</div>
				<div>
					<span></span>
				</div>
				<div>
					<span></span>
				</div>
			</div>
		</div>
	)
}
