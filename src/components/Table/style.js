import styled from 'styled-components'
import styles from '../../assets/styles/common'

export const Container = styled.div`
  table {
    table-layout: auto;
    width: 100%;
    tr {
      height: 40px;
      line-height: 40px;
      td,
      th {
        padding: 16px;
      }
    }
    thead tr {
      font-weight: 500;
      border-radius: 2px;
      font-size: ${styles['font-medium']};
      color: ${styles['text-color']};
    }
    tbody tr {
      font-size: ${styles['font-medium']};
      color: ${styles['text-color-desc']};
      &:nth-of-type(2n + 1) {
        background: ${styles['background-color-dark']};
      }
      &:hover {
        background: ${styles['background-color-shadow']};
      }
    }
    .column {
      width: 100px;
    }
    .column1 {
      width: 40px;
    }
    .column3 {
      width: 120px;
    }
    .column11 {
      width: 300px;
    }
    .column12 {
      width: 200px;
    }
  }
`
