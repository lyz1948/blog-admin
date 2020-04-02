import styled from 'styled-components'
// import styles from '../../assets/styles/common'

export const Container = styled.div`
  flex: 1;
  background-color: #4d5b69;

  .bar {
    padding: 10px;
    border-bottom: 1px solid #9c9c9c;
    a {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid #bbb;
        border-radius: 4px;
      }
    }
    i.separator {
      display: inline-block;
      width: 0;
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #2f4050;
      color: transparent;
      text-indent: -10px;
      margin: 0 6px;
    }
  }
  .box {
    display: flex;

    .form-textarea {
      background-color: #4d5b69 !important;
      color: #d3e5f7 !important;
      font-size: 1.2rem;
      border-radius: 0;
      border: 1px solid #515963 !important;
    }
  }

  .preview {
    flex: 0 0 50%;
    padding: 10px;
    box-sizing: border-box;
    background: #4d5b69;
    border-radius: 4px;
  }
`
