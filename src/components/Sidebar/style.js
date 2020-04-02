import styled from 'styled-components'
import styles from '../../assets/styles/common'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const NavItem = styled.div`
  color: ${styles['text-color']};
`

export const Profile = styled.div`
  padding: 20px;
  .brand {
    font-size: ${styles['font-h1']};
    color: ${styles['text-color-light']};
  }
  .slogan {
    font-size: ${styles['font-medium']};
    color: ${styles['text-color-light']};
  }
  .avatar {
    padding: 10px 0;
  }
`
