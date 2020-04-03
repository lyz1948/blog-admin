import React, { lazy, Suspense} from 'react'
import { Redirect } from 'react-router-dom'

import BlankLayout from '../Layout/BlankLayout'
import AdminLayout from '../Layout/AdminLayout'

const Auth = lazy(() => import('../pages/Auth'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Settings = lazy(() => import('../pages/Settings'))
const ArticleAdd = lazy(() => import('../components/Article/ArticleAdd'))
const ArticleList = lazy(() => import('../components/Article/ArticleList'))
const CategoryAdd = lazy(() => import('../components/Category/CategoryAdd'))
const CategoryList = lazy(() => import('../components/Category/CategoryList'))

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  {
    component: BlankLayout,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (<Redirect to={"/dashboard"} />)
      },
      {
        path: '/dashboard',
        component: AdminLayout,
        routes: [
          {
            path: '/',
            component: SuspenseComponent(Dashboard),
          },
        ]
      },
      {
        path: '/article',
        component: AdminLayout,
        routes: [
          {
            path: '/article/add',
            component: SuspenseComponent(ArticleAdd),
          },
          {
            path: '/article/list',
            component: SuspenseComponent(ArticleList),
          },
        ],
      },
      {
        path: '/category',
        component: AdminLayout,
        routes: [
          {
            path: '/category/add',
            component: SuspenseComponent(CategoryAdd),
          },
          {
            path: '/category/list',
            component: SuspenseComponent(CategoryList),
          },
        ],
      },
      {
        path: '/settings',
        component: AdminLayout,
        routes: [
          {
            path: '/',
            component: SuspenseComponent(Settings),
          },
        ],
      },
      {
        path: '/login',
        component: SuspenseComponent(Auth),
      },
    ],
  },
]
