import { Link } from "react-router-dom";
import { SiGoogleads } from "react-icons/si";
import { BsPeopleFill } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { IoSettingsSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
function SidebarNav() {
    
  return (
    <>
    
    <div className=" sidenav ">      
      <Link className="navbar-nav navbar-brand marginStartSidenav" to="/" >Dashboard</Link>
      <div className="hr-gray"><hr /></div>
      {location.pathname === "/" ? (
          <div >        
          <Link className="navbar-nav marginStartSidenav" to='/' ><FaHome /> Home</Link>
          <Link className="navbar-nav marginStartSidenav" to='/leads' ><SiGoogleads /> Leads</Link>
         <Link className="navbar-nav marginStartSidenav"  to="/sales"> <BsPeopleFill /> Sales Agents</Link>
          <Link className="navbar-nav marginStartSidenav" to="/reports"><VscGraph/> Reports</Link>
          <Link className="navbar-nav marginStartSidenav" to="/settings"><IoSettingsSharp/> Settings</Link>
          </div>
        ) : (
          <div><Link className="navbar-nav marginStartSidenav" style={{marginLeft:"40px"}} to="/">Back to Dashboard</Link></div>
        )}  
     
    </div>
    </>
  );
}

export default SidebarNav;
