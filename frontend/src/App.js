import { 
  RouterProvider, 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout"
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditBlog from "./pages/EditBlog";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect } from "react";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="create" element={<CreateBlog />} />
      <Route path=":id" element={<BlogDetails />} />
      <Route path=":id/edit" element={<EditBlog />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  ))

function App() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault()
    }
    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
