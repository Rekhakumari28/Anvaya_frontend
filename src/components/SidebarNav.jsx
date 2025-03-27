import { Link } from "react-router-dom";

function SidebarNav() {
    
  return (
    <>
    
    <div className=" pt-5 mt-4 navbar  " style={{position: "fixed", width: "300px" }}>
      <div className="p-2 mt-4 ms-2 rounded border " style={{height: "550px" , width: "100%"}}>
      <h2 className="navbar-brand text-center  pt-2">Dashboard</h2>
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
