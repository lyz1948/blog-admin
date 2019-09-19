import styled from 'styled-components'

interface ISpacing {
  mt?: string
  mb?: string
  pd?: string
}

export const Container = styled.div<ISpacing>`
  margin-top: ${(props: any) => props.mt || '0'};
  margin-bottom: ${(props: any) => props.mb! || '0'};
  padding: ${(props: any) => props.pd! || '0'};
`

export const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export const Nav = styled.nav``

export const TextXLarge = styled.span`
  font-size: 2rem;
`

export const TextLarge = styled.span`
  font-size: 1.5rem;
`

export const TextMedium = styled.span`
  font-size: 1.125rem;
`

export const TextSmall = styled.span`
  font-size: 0.875rem;
`

export const TextXSmall = styled.span`
  font-size: 0.75rem;
`

export const ColorTextLight = styled.span`
  color: #fff;
`
export const ColorTextDard = styled.span`
  color: rgb(67, 68, 86);
`
export const ColorTextDard1 = styled.span`
  color: rgb(128, 145, 171);
`

export const CardDard = styled.div`
  background: #202a3b !important;
`

export const CardLight = styled.div`
  background: #fcfcfc !important;
`
