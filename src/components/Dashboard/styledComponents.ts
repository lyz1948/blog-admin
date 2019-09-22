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
	padding: 1.5em;
	margin: 0 1.5em;
	border-radius: 3px;
	box-sizing: border-box;
`

export const GridCardDark = styled(GridCard)`
	background: #202a3b;
`

export const GridCardParagraph = styled.p`
	font-size: 1rem;
	color: ${props => props.color || '#fcfcfc'};
`

export const GridCardCount = styled.div`
	font-size: 1rem;
	color: ${props => props.color || '#fcfcfc'};
`
