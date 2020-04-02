import React from 'react'
import { renderRoutes } from 'react-router-config'

const BlankLayout = ({ route }) => <div>{renderRoutes(route.routes)}</div>

export default BlankLayout
