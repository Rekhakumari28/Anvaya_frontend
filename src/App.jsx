import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./Routes/Home/Home";
import LeadsList from "./Routes/Leads/LeadsList";
import LeadDetailsManagement from "./Routes/LeadDetails/LeadDetailsManagement";
import SalesAgentManagement from "./Routes/SalesAgents/SalesAgentManagement";
import Reports from "./Routes/Reports/Reports";
import AddLeadForm from "./Routes/AddLead/AddLeadForm";
import LeadsByStatus from "./Routes/LeadsView/LeadsByStatus";
import LeadsBySalesAgents from "./Routes/LeadsView/LeadsBySalesAgents";
import Settings from "./Routes/Settings/Settings";


function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/leads" element={<LeadsList />} />
        <Route path="/leadDetails/:leadId" element={<LeadDetailsManagement />}/>
        <Route path="/sales" element={<SalesAgentManagement />} />
        <Route path="/reports" element={<Reports />} />
       <Route path="/addLead/:leadId" element={<AddLeadForm/>} />
       <Route path="/addLead" element={<AddLeadForm/>} />
       <Route path="/leadsByStatus/:status" element={<LeadsByStatus/>} />
       <Route path="/leadsBySalesAgent/:agentName" element={<LeadsBySalesAgents/>} />   
       <Route path="/settings"  element={<Settings/>}/>    
    
      </Routes>
    </Router>
  );
}

export default App;
