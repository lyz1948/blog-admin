import styled from 'styled-components'
import styles from '../../assets/styles/common'



export const Container = styled.div`
  display: flex;
  .left {
    width: 60%;
    flex: 0 0 60%;
  }
  .right {
    flex: 1;
  }

  // .input-wrapper {
  //   display: flex;
  //   flex-wrap: wrap;
  //   padding: 15px 0;
  //   .label {
  //     width: 100px;
  //     flex: 0 0 100px;
  //     line-height: 38px;
  //     font-size: 14px;
  //     font-weight: 500;
  //     color: #a6c3dc;
  //   }
  //   .form-input {
  //     flex: 1;
  //     ${styles.formInput()}
  //   }
  //   .text-area {
  //     flex: 1;
  //     ${styles.formTextarea()}
  //   }
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
