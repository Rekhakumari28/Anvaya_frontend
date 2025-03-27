import React from "react";

import { PieChart } from "./LeadsClosedAndPipelinePai.jsx";
import { BarChart } from "./LeadsClosedByAgentBar.jsx";
import {LeadsDistributionByStatusPie} from "./LeadsDistributionByStatusPie.jsx";



function ReportComponent() {
  
  return (
    <div className="border rounded p-4 m-2 text-center">
      <h2>Report Overview</h2>

      <hr />
      <div >
     
        <PieChart/>
      </div>

      <hr />
      <div >
       
        <BarChart/>
      </div>

      <hr />
      <div >
       
       <LeadsDistributionByStatusPie />
      </div>
    </div>
  );
}

export default ReportComponent;
