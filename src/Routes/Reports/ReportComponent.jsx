import React from "react";

import { PieChart } from "./LeadsClosedAndPipelinePai.jsx";
import { BarChart } from "./LeadsClosedByAgentBar.jsx";
import {LeadsDistributionByStatusPie} from "./LeadsDistributionByStatusPie.jsx";



function ReportComponent() {
  
  return (
    <div className="sections">
      <h2 className="content-heading">Report Overview</h2>

      <div className="hr-gray "> <hr /></div>
      <div >
     
        <PieChart/>
      </div>

      <div className="hr-gray "> <hr /></div>
      <div >
       
        <BarChart/>
      </div>

      <div className="hr-gray "> <hr /></div>
      <div >
       
       <LeadsDistributionByStatusPie />
      </div>
    </div>
  );
}

export default ReportComponent;
