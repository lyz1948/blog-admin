import styled from 'styled-components'
import styles from '../../assets/styles/common'

export const Container = styled.div`
  // background-color: ${styles['background-color']};
  // box-shadow: 0 0px 1px ${styles['background-color-shadow']};

  .head-wrapper {
    padding: 10px 20px;
    line-height: 30px;
    display: flex;
    .icon {
      cursor: pointer;
    }
    .mate {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
      .mate-item {
        flex: 0 0 40px;
        padding: 0 10px;
      }
    }
  }


`
