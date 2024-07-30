import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  pathBuku,
  pathCustomer,
  pathPeminjaman,
  pathPengembalian,
} from "./constantPath";
import Dashboard from "../pages/Dashboard";
import Pengembalian from "../pages/pengembalian";
import Peminjaman from "../pages/peminjaman";
import Buku from "../pages/buku";
import Customer from "../pages/customer";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>404</div>,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Dashboard />,
        }
    ],
  },
  {
    path: pathCustomer,
    element: <Customer />,
  },
  {
    path: pathBuku,
    element: <Buku />,
  },
  {
    path: pathPeminjaman,
    element: <Peminjaman />,
  },
  {
    path: pathPengembalian,
    element: <Pengembalian />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
