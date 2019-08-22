import * as React from 'react'
import * as styles from './style.css'

// Fusion
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import FusionMaps from 'fusioncharts/fusioncharts.maps'
import Column2D from 'fusioncharts/fusioncharts.charts'
import Widgets from 'fusioncharts/fusioncharts.widgets'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import World from 'fusioncharts/maps/fusioncharts.world'

// Fusion config
import {
  chartConfigs,
  mapConfigs,
  // gaugeConfigs,
  doughuntConfigs,
} from '../../config'

// styled components
import {
  Container,
  GridCard,
  GridCardDark,
  Row,
  TextXLarge,
  TextMedium,
  GridCardParagraph,
} from './styledComponents'

// use fusion
ReactFC.fcRoot(FusionCharts, FusionMaps, World, Widgets, Column2D, FusionTheme)

export class DashboardComp extends React.Component {
  render() {
    return (
      <Container className={styles.module}>
        <Row>
          <Container className="col-lg-3 col-sm-6">
            <GridCardDark className="card">
              <Container className="card-heading">
                <GridCardParagraph>Total Revenue</GridCardParagraph>
              </Container>
              <Container mt="20px">
                <TextMedium>$</TextMedium>
                <TextXLarge>10.5</TextXLarge>
              </Container>
            </GridCardDark>
          </Container>
          <Container className="col-lg-3 col-sm-6">
            <GridCardDark>
              <Container className="card-heading">
                <Container>Total Revenue</Container>
              </Container>
              <Container mt="20px">
                <TextMedium>$</TextMedium>
                <TextXLarge>10.5</TextXLarge>
              </Container>
            </GridCardDark>
          </Container>
          <Container className="col-lg-3 col-sm-6">
            <GridCardDark>
              <Container className="card-heading">
                <Container>Total Revenue</Container>
              </Container>
              <Container mt="20px">
                <TextMedium>$</TextMedium>
                <TextXLarge>10.5</TextXLarge>
              </Container>
            </GridCardDark>
          </Container>
          <Container className="col-lg-3 col-sm-6">
            <GridCardDark>
              <Container className="card-heading">
                <Container>Total Revenue</Container>
              </Container>
              <Container mt="20px">
                <TextMedium>$</TextMedium>
                <TextXLarge>10.5</TextXLarge>
              </Container>
            </GridCardDark>
          </Container>
        </Row>
        <Row>
          <Container className="col-md-4 col-lg-3">
            <GridCard className="card">
              <Container className="card-heading">
                <Container>Total Revenue</Container>
              </Container>
              <Container>
                <TextMedium>$</TextMedium>
                <TextXLarge>10.5</TextXLarge>
              </Container>
            </GridCard>
          </Container>
          <Container className="row col-md-8">
            <GridCard className="card">
              <ReactFC {...doughuntConfigs} />
            </GridCard>
          </Container>
        </Row>
        <Row>
          <Container className="col-md-6">
            <GridCard className="card">
              <Container className="chart-div">
                <ReactFC {...chartConfigs} />
              </Container>
            </GridCard>
          </Container>
          <Container className="col-md-6">
            <GridCard className="card">
              <Container className="map-div">
                <ReactFC {...mapConfigs} />
              </Container>
            </GridCard>
          </Container>
        </Row>
      </Container>
    )
  }
}
