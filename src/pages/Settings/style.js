import styled from 'styled-components'
import styles from '../../assets/styles/common'

export const Container = styled.div`
  overflow-y: auto;

  .avatar-wrapper {
    width: 200px;
    height: 200px;
    border-radius: 4px;
    border: 1px dashed #fff;
  }
`

export const UploadWrap = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;

  input[type='file'] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }

  .thumb {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 50px;
    .image {
      width: 100%;
      height: 200px;
      ${styles.imageContain()}
    }
  }
`
