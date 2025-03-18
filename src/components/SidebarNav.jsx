import { Link } from "react-router-dom";

function SidebarNav() {
    
  return (
    <>
    <div className=" pt-5 mt-5 navbar ">
      <div className="p-3 ms-2 mt-2 border rounded" style={{height: "500px" , width: "100%"}}>
      <Link to="/"  className="navbar-brand">Dashboard</Link>
    <hr />
      {location.pathname === "/" ? (
          <div className="navbar-nav">        
          <div className="nav-item border-dashed"><Link to='/leads' className="nav-link">Leads</Link></div>
          <div className="nav-item"><Link className="nav-link" to="/sales">Sales</Link></div>
          <div className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></div>
          </div>
        ) : (
          <div><Link to="/">Back to Dashboard</Link></div>
        )}
     
     </div>
    </div>
    </>
  );
}

export default SidebarNav;
