import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";

// eslint-disable-next-line react/prop-types
function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children ? children : <Outlet />}
      <Toaster richColors  />
    </div>
  );
}

export default MainLayout;
