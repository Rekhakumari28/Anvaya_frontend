import { Link } from "react-router-dom";
import { SiGoogleads } from "react-icons/si";
import { BsPeopleFill } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { IoSettingsSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
function SidebarNav() {
  return (
    <>

         <nav className="navbar bg-body-tertiary  vh-100 d-flex flex-column align-items-center" >
        <div className="container ms-4">
                    <div>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
              {location.pathname === "/home" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " to="/home">
                      <FaHome /> Home
                    </Link><hr />
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link className="nav-link  " to="/leads">
                      <SiGoogleads /> Leads
                    </Link><hr />
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link className="nav-link  " to="/sales">
                      {" "}
                      <BsPeopleFill /> Sales 
                    </Link><hr />
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link className="nav-link  " to="/sales">
                      {" "}
                      <BsPeopleFill /> Agents 
                    </Link><hr />
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link className="nav-link  " to="/reports">
                      <VscGraph /> Reports
                    </Link><hr />
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link className="nav-link  " to="/settings">
                      <IoSettingsSharp /> Settings
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link  "
                    to="/home"
                  >
                    Back to Dashboard
                  </Link><hr />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SidebarNav;
