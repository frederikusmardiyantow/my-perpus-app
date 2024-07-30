import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// eslint-disable-next-line react/prop-types
function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children ? children : <Outlet />}
    </div>
  );
}

export default MainLayout;
