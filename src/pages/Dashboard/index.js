import React, { memo } from 'react'
import { Col, Row } from 'antd'
import { GridCardDark } from './style'
import { Container } from './style'
// import Header from '../../components/Header'
// import Sidebar from '../../components/Sidebar'
// import { Container, Main, HeaderWrap, SideWrap } from '../../Layout/style'

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
} from '../../config'

ReactFC.fcRoot(FusionCharts, FusionMaps, World, Widgets, Column2D, CandyTheme)

function Dashboard(props) {
  return (
    <Container>
      <div className="module">
        <Row gutter={[24, 32]}>
          <Col span={6}>
            <GridCardDark>
              <p>今日访问人数</p>
              <span>20081</span>
            </GridCardDark>
          </Col>
          <Col span={6}>
            <GridCardDark>
              <p>文章数量</p>
              <span>20081</span>
            </GridCardDark>
          </Col>
          <Col span={6}>
            <GridCardDark>
              <p>标签数量</p>
              <span>20081</span>
            </GridCardDark>
          </Col>
          <Col span={6}>
            <GridCardDark>
              <p>评论数量</p>
              <span>20081</span>
            </GridCardDark>
          </Col>
        </Row>

        <Row gutter={[24, 32]}>
          <Col span={8}>
            <ReactFC {...gaugeConfigs} />
          </Col>
          <Col span={8}>
            <ReactFC {...doughuntConfigs} />
          </Col>
          <Col span={8}>
            <ReactFC {...doughuntConfigs} />
          </Col>
        </Row>

        <Row gutter={[24, 32]}>
          <Col span={12}>
            <ReactFC {...mapConfigs} />
          </Col>
          <Col span={12}>
            <ReactFC {...chartConfigs} />
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default memo(Dashboard)
