import styled from 'styled-components'
import styles from '../assets/styles/common'

export const Container = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
`

export const HeaderWrap = styled.div`
  background-color: ${styles['header-background']};
  box-shadow: 0 0px 1px ${styles['background-color-shadow']};
`

export const SideWrap = styled.div`
  width: 200px;
  background-color: ${styles['sider-background']};
`

export const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${styles['background-color']};
`

export const Content = styled.div`
  padding: 20px;
`
