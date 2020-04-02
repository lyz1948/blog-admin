import styled from 'styled-components'
import styles from '../../assets/styles/common'

export const UploadWrap = styled.div`
  position: relative;
  height: 200px;
  line-height: 200px;
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

export const ListContainer = styled.div`
  .table-wrapper {
    padding-top: 20px;
  }

  .condition {
    display: flex;
    .condition-item {
      display: flex;

      .select-item {
        width: 100px;
        padding: 6px 10px;
        margin-left: 10px;
        background: ${styles['background-color']};
        select {
          position: relative;
          font-size: 13px;
          background: transparent;
          border: none;
          outline: none;
          padding-top: 20px;
        }
      }
    }
    .select-wrapper {
      flex: 1;
      justify-content: flex-end;
    }

    .page-wrapper {
      padding-top: 5px;
    }
  }
`
