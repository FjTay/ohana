import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Errorpage from './ErrorPage.jsx';
import Home from './Home.jsx';
import Category from './Category.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element : <App />,
    errorElement: <Errorpage />,
    children : [
      {
        path: "/home",
        element : <Home />
      },
      {
        path: "/products/:category",
        element : <Category />,
        children : [
          {
            path: ":subCategory",
          }
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
    </RouterProvider>
)
