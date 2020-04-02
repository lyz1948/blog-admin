  
import styled from 'styled-components'
import styles from '../../assets/styles/common'

export const Container = styled.div`
  width: 100%;
`

export const GridCard = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem 20px;
  border-radius: 3px;
  box-sizing: border-box;
  background: ${styles['background-color']};
  & > p {
    font-size: ${styles['font-small']};
    color: ${styles['text-color-desc']};
  }
  & > span {
    margin-top: 20px;
    font-size: ${styles['font-large']};
  }
`

export const GridCardDark = styled(GridCard)`
  background: ${styles['background-color-dark']};
`
