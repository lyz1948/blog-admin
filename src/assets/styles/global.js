import { createGlobalStyle } from 'styled-components'
import styles from './common'

export const GlobalStyle = createGlobalStyle`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
	}
	html, body {
		background: #f2f3f4;;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	a {
		text-decoration: none;
		color: #fff;
	}

	::placeholder {
		font-size: ${styles['font-medium']};
	}

	::-webkit-scrollbar {
    width: 5px;
    height: 5px;
	}
	::-webkit-scrollbar-track-piece {
		background-color: rgba(0, 0, 0, 0.2);
		-webkit-border-radius: 6px;
	}
	::-webkit-scrollbar-thumb:vertical {
		height: 5px;
		background-color: rgba(125, 125, 125, 0.7);
		-webkit-border-radius: 6px;
	}
	::-webkit-scrollbar-thumb:horizontal {
		width: 5px;
		background-color: rgba(125, 125, 125, 0.7);
		-webkit-border-radius: 6px;
	}
	
	.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
		background: transparent !important;
	}
	
	.ant-menu-dark .ant-menu-inline.ant-menu-sub {
		background: #303f51 !important;
	}

	.flex {
		display: flex;
	}

	.flex-middle {
		justify-content: center;
		align-items: center;
	}
	
	.flex-end {
		justify-content: flex-end;
	}

	.flex-1 {
		flex: 1;
	}

	.flex-60 {
		flex: 0 0 60%;
	}

	.pos-a {
		position: absolute;
	}

	.module {
    padding: 10px;
    .title {
      margin-bottom: 0;
      padding: 15px 20px;
      font-size: 15px;
      color: #79fded;
      background-color: ${styles['background-color-dark']};
    }
    .content {
      padding: 15px 10px;
      background-color: ${styles['content-background']};
    }
	}
	
	.input-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .label {
      width: 100px;
      flex: 0 0 100px;
      line-height: 38px;
      font-size: 14px;
      font-weight: 500;
      color: #a6c3dc;
    }
    .form-input {
      flex: 1;
			${styles.formInput()}
    }
    .text-area {
      flex: 1;
      ${styles.formTextarea()}
    }
    .radio-box {
      background-color: #6c757d;
      line-height: 36px;
      padding-right: ${styles['font-small']};
      font-size: ${styles['font-medium']};
      &.info {
        background-color: #17a2b8;
        border-color: #17a2b8;
      }
      &:first-child {
        border-radius: 3px 0 0 3px;
      }
      &:last-child {
        border-radius: 0 3px 3px 0;
      }
      input[type='radio'] {
        opacity: 0;
      }
      label {
        margin: 0;
        font-weight: 500;
        color: #f9f9f9;
        cursor: pointer;
      }
    }
  }
`
