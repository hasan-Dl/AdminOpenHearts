import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Specialists from './pages/Specialists'
import Direction from './pages/Direction'
import Support from './pages/Support'
import Stories from './pages/Stories'
import SingIn from './pagesAdmin/SingIn'
import Layout from '../layout/Layout'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutAdmin from '../layout/LayoutAdmin'
import Email from './componentsAdmin/SingIn/Email'
import StatisticAdmin from './pagesAdmin/StatisticAdmin'
import StoryAdmin from './pagesAdmin/StoryAdmin'
import PartnerAdmin from './pagesAdmin/PartnerAdmin'
import Code from './componentsAdmin/SingIn/Code'
import ProjectAdmin from './pagesAdmin/ProjectAdmin'
import Services from './pagesAdmin/Services'
import AddDoctor from './componentsAdmin/Doctor/AddDoctor'
import DoctorAdmin from './pagesAdmin/DoctorAdmin'
import ReportAdmin from './pagesAdmin/ReportAdmin'
import ServicesOne from './pagesAdmin/ServicesOne'


function App() {
  const routerPages = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/specialists',
          element: <Specialists />
        },
        {
          path: '/direction',
          element: <Direction />
        },
        {
          path: '/stories',
          element: <Stories />
        },
      ]
    },
    {
      path: '/login',
      element: <SingIn />
    },
    {
      path: '/email',
      element: <Email />
    },
    {
      path: '/code',
      element: <Code/>
    },
    {
      path: '/admin',
      element: <LayoutAdmin />,
      children: [
        {
          path: 'statisticAdmin',
          element: <StatisticAdmin />
        },
        {
          path: 'storyAdmin',
          element: <StoryAdmin />
        },
        {
          path: 'partnerAdmin',
          element: <PartnerAdmin />
        },
        {
          path: 'projectAdmin',
          element: <ProjectAdmin />
        },
        {
          path: 'servicesAdmin',
          element: < Services/>
        },
        {
          path: 'servicesAdmin/servicesOne:id',
          element: < ServicesOne/>
        },
        {
          path: 'doctorAdmin',
          element: < DoctorAdmin/>
        },
        {
          path: 'reportAdmin',
          element: < ReportAdmin/>
        },
      ]

    }
  ])

  return (
    <>
      <RouterProvider router={routerPages} />

    </>
  )
}

export default App