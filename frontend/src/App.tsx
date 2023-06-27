import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wordle from "./components/Wordle";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useCookies } from "react-cookie";

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
              <div>CHuj</div>
            </ProtectedContent>
          </Layout>
        ),
      },
    ],
    {
      basename: "/robsondle",
    },
  );
  return <RouterProvider router={router} />;
}
