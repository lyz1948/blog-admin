// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

const formInput = () => {
  return `
    display: block;
    width: 100%;
    flex: 1;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #d3e5f7;
    background-color: #4d5b69;
    border: 1px solid transparent;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  `
}

const formTextarea = () => {
  return `
    width: 100%;
    flex: 1;
    height: 120px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 400;
    color: #d3e5f7;
    background-color: #4d5b69;
    background-clip: padding-box;
    border: 1px solid transparent;
    resize: none;
  `
}

const imageContain = () => {
  return `
    object-fit: contain;
    object-position: center;
  `
}

const imageCover = () => {
  return `
    object-fit: cover;
    object-position: right top;
  `
}

export default {
  'font-mini': '10px',
  'font-small': '12px',
  'font-medium': '14px',
  'font-large': '16px',
  'font-h1': '36px',
  'font-h2': '32px',
  'font-h3': '28px',
  'font-h4': '24px',
  'font-h5': '20px',
  'font-h6': '18px',
  'theme-color': '#89fdec',
  'theme-color-shadow': 'rgba(212, 68, 57, .5)',
  'input-color': '#4e5b69',
  'text-color': '#a6bed8',
  'text-color-light': '#d5e4f7',
  'text-color-desc': '#a2a8b0',
  'border-color': '#303e50',
  'header-background': '#303f50',
  'sider-background': '#293747',
  'content-background': '#2d3b4c',
  'background-color': '#3d4a5a',
  'background-color-dark': '#283647',
  'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
  extendClick,
  noWrap,
  formInput,
  formTextarea,
  imageContain,
  imageCover,
}
