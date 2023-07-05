import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wordle from "./components/Wordle";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useCookies } from "react-cookie";
import Register from "./components/Register";
import AddWord from "./components/AddWord";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const ProtectedContent = ({ children }: { children?: JSX.Element }) => {
  const [cookies, setCookie] = useCookies(["sessionToken"]);

  return cookies.sessionToken ? children : <Login setCookie={setCookie} />;
};

export default function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <Layout>
            <ProtectedContent>
              <Wordle />
            </ProtectedContent>
          </Layout>
        ),
      },
      {
        path: "/login",
        element: (
          <Layout>
            <ProtectedContent>
              <div>You are already logged in!</div>
            </ProtectedContent>
          </Layout>
        ),
      },
      {
        path: "/register",
        element: (
          <Layout>
            <Register />
          </Layout>
        ),
      },
      {
        path: "/add-word",
        element: (
          <Layout>
            <ProtectedContent>
              <AddWord />
            </ProtectedContent>
          </Layout>
        ),
      },
    ],
    {
      basename: "/",
    },
  );

  return <RouterProvider router={router} />;
}
