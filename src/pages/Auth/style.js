import styled from 'styled-components'
import styles from '../../assets/styles/common'

export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: ${styles['background-color']};
  z-index: 99;

  h3 {
    padding: 10px 0 20px 0;
    font-size: ${styles['font-h3']};
    color: #fff;
  }

  .login-content {
    width: 500px;
    padding: 20px;
    background-color: ${styles['background-color-dark']};
    box-shadow: ${styles['box-background-color-shadow']};
    .login-form {
      p {
        font-size: ${styles['font-small']};
      }
    }
  }
`
