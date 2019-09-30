import * as React from 'react'
// Fusion
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import FusionMaps from 'fusioncharts/fusioncharts.maps'
import Column2D from 'fusioncharts/fusioncharts.charts'
import Widgets from 'fusioncharts/fusioncharts.widgets'
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy'
import World from 'fusioncharts/maps/fusioncharts.world'

// Fusion config
import {
	chartConfigs,
	mapConfigs,
	gaugeConfigs,
	doughuntConfigs,
} from '@app/config'

// styled components
import {
	Container,
	GridCardDark,
	Row,
	TextXLarge,
	GridCardParagraph,
} from './styledComponents'

// use fusion
ReactFC.fcRoot(FusionCharts, FusionMaps, World, Widgets, Column2D, CandyTheme)

export class Dashboard extends React.Component {
	render() {
		return (
			<Container>
				<Row className="pdt20">
					<Container className="col-lg-3 col-sm-6">
						<GridCardDark className="card">
							<Container className="card-heading">
								<GridCardParagraph>今日访问人数</GridCardParagraph>
							</Container>
							<Container mt="20px">
								<TextXLarge>20081</TextXLarge>
							</Container>
						</GridCardDark>
					</Container>
					<Container className="col-lg-3 col-sm-6">
						<GridCardDark className="card">
							<Container className="card-heading">
								<GridCardParagraph>文章数量</GridCardParagraph>
							</Container>
							<Container mt="20px">
								<TextXLarge>2008</TextXLarge>
							</Container>
						</GridCardDark>
					</Container>
					<Container className="col-lg-3 col-sm-6">
						<GridCardDark className="card">
							<Container className="card-heading">
								<GridCardParagraph>标签数量</GridCardParagraph>
							</Container>
							<Container mt="20px">
								<TextXLarge>2008</TextXLarge>
							</Container>
						</GridCardDark>
					</Container>
					<Container className="col-lg-3 col-sm-6">
						<GridCardDark className="card">
							<Container className="card-heading">
								<GridCardParagraph>评论数量</GridCardParagraph>
							</Container>
							<Container mt="20px">
								<TextXLarge>2008</TextXLarge>
							</Container>
						</GridCardDark>
					</Container>
				</Row>
				<Row className="pdt20">
					<Container className="col-md-4">
						<ReactFC {...gaugeConfigs} />
					</Container>
					<Container className="col-md-4">
						<ReactFC {...doughuntConfigs} />
					</Container>
					<Container className="col-md-4">
						<ReactFC {...doughuntConfigs} />
					</Container>
				</Row>
				<Row className="pdt20">
					<Container className="col-md-6">
						<Container className="chart-div">
							<ReactFC {...chartConfigs} />
						</Container>
					</Container>
					<Container className="col-md-6">
						<Container className="map-div">
							<ReactFC {...mapConfigs} />
						</Container>
					</Container>
				</Row>
			</Container>
		)
	}
}
