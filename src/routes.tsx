import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Outlet />
    </nav>
  )
}

const Home = () => {
  console.log('Home');
  return (
    <h1>Home</h1>
  )
}

const About = () => {
  console.log('About');
  return (
    <h1>About</h1>
  )
}

export const routes = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  }
]