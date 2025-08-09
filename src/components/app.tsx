import * as React from 'react'
import { useEffect } from 'react'
import {
  createHashRouter,
  createMemoryRouter,
  Outlet,
  type RouteObject,
  RouterProvider,
  useNavigate,
  useNavigation,
  useNavigationType
} from 'react-router-dom'
import { onHashStateUpdate } from 'hash_state'
import Homepage from 'pages/homepage'
import SpiralPage from 'pages/spiral_page'
import FirstTimeSafetyPage from 'pages/first_time_safety'
import CustomizePage from 'pages/customize'
import CustomizeSpiralPage from 'features/spiral_canvas/customize'
import CustomizeSpiralTimingPage from 'features/spiral_canvas/customize/timing'
import CustomizeSubliminalPage from 'features/subliminal/customize'
import CustomizeSubliminalMessagesPage from 'features/subliminal/customize/messages'
import CustomizeSubliminalTimingPage from 'features/subliminal/customize/timing'
import CustomizeSubliminalFontPage from 'features/subliminal/customize/font'
import CustomizeOverlayPage from 'features/overlay/customize'
import AboutPage from 'pages/about'
import AboutSafetyPage from 'pages/safety'

function HistoryManager () {
  // Special short-circuit for the server-side renderer
  if (typeof window === 'undefined') return <Outlet/>

  const navType = useNavigationType()
  const navigation = useNavigation()
  const navigate = useNavigate()

  useEffect(() => {
    if (navType === 'PUSH') {
      // For hash routing, we don't need to manage browser history manually
      // The hash router handles this automatically
    }
  }, [navType, navigation])

  useEffect(() => {
    const handler = () => {
      // For hash routing, we can still allow back navigation
      navigate(-1)
      onHashStateUpdate()
    }

    window.addEventListener('popstate', handler)
    return () => { window.removeEventListener('popstate', handler) }
  }, [navigate])

  return <Outlet/>
}

const routes: RouteObject[] = [
  {
    element: <HistoryManager/>,
    children: [
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: '/spiral',
        element: <SpiralPage/>
      },
      {
        path: '/first-time-safety',
        element: <FirstTimeSafetyPage/>
      },
      {
        path: '/customize',
        element: <CustomizePage/>
      },
      {
        path: '/customize/spiral',
        element: <CustomizeSpiralPage/>
      },
      {
        path: '/customize/spiral/timing',
        element: <CustomizeSpiralTimingPage/>
      },
      {
        path: '/customize/subliminal',
        element: <CustomizeSubliminalPage/>
      },
      {
        path: '/customize/subliminal/messages',
        element: <CustomizeSubliminalMessagesPage/>
      },
      {
        path: '/customize/subliminal/timing',
        element: <CustomizeSubliminalTimingPage/>
      },
      {
        path: '/customize/subliminal/font',
        element: <CustomizeSubliminalFontPage/>
      },
      {
        path: '/customize/overlay',
        element: <CustomizeOverlayPage/>
      },
      {
        path: '/share'
      },
      {
        path: '/about',
        element: <AboutPage/>
      },
      {
        path: '/about/safety',
        element: <AboutSafetyPage/>
      }
    ]
  }
]

// Use createMemoryRouter for server-side rendering, createHashRouter for client-side
const createAppRouter = () => {
  if (typeof window === 'undefined') {
    // Server-side: use memory router
    return createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0
    })
  } else {
    // Client-side: use hash router for static hosting
    return createHashRouter(routes)
  }
}

const router = createAppRouter()

const App = () => (<RouterProvider router={router}/>)
export default App
