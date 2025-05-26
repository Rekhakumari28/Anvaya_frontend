import React from "react";

import { PieChart } from "./LeadsClosedAndPipelinePai.jsx";
import { BarChart } from "./LeadsClosedByAgentBar.jsx";
import { LeadsDistributionByStatusPie } from "./LeadsDistributionByStatusPie.jsx";

function ReportComponent() {
  return (
    <div>
      <h2 className="mt-2">Report Overview</h2>

      <hr />
      <div className="p-3 shadow mb-4">
        <PieChart />
      </div>

      <div className="p-3 shadow mb-4">
        <BarChart />
      </div>

      <div className="p-3 shadow mb-4">
        <LeadsDistributionByStatusPie />
      </div>
    </div>
  );
}

export default ReportComponent;
