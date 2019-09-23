import styled from 'styled-components'
export {
	Container,
	Row,
	CardDard,
	TextLarge,
	TextMedium,
	TextXLarge,
} from '../index'

export const GridCard = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: space-around;
	padding: 1rem 20px;
	border-radius: 3px;
	box-sizing: border-box;
`

export const GridCardDark = styled(GridCard)`
	background: rgb(38, 42, 51);
`

export const GridCardParagraph = styled.p`
	font-size: 1rem;
	color: ${props => props.color || '#fcfcfc'};
`

export const GridCardCount = styled.div`
	font-size: 1rem;
	color: ${props => props.color || '#fcfcfc'};
`
