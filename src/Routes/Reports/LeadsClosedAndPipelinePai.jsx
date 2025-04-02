import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { reportLastWeek, reportPipelineAsync } from "../../features/reportSlice";

ChartJs.register(Tooltip, Legend, ArcElement);

export function PieChart() {
  const dispatch = useDispatch();
  const lastWeek = useSelector((state) => {
    console.log(state.report)
    return state.report;
  });
  const {reportPipeline, status, error} = useSelector((state) => {
    return state.report;
  });

 

  useEffect(() => {
    dispatch(reportLastWeek());
    dispatch(reportPipelineAsync())
  }, []);


  const closedLeads =
    Array.isArray(lastWeek?.reportLastWeek?.reportLastWeek) &&
    lastWeek?.reportLastWeek?.reportLastWeek.length;    

    console.log(closedLeads)
const pipelineLeads =  reportPipeline?.totalLeads

  const paiChartData = {
    labels: ["Closed Leads Last Week", "Total Leads in Pipeline"],
    datasets: [
      {
        label: "Total Leads",
        data: [closedLeads, pipelineLeads],
        backgroundColor:[ "rgb(255,204,153,0.9)", "rgb(224,224,224,0.9)"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {};
  return (
    <div className="container " style={{width: "400px"}}
   >
      <h4  className="content-heading">Total closed and Pipeline Leads:</h4>
      {status === "Loading" ? <p>Pie char is loading...</p>: <Pie data={paiChartData} options={options} /> }
      {error && <p>{error}</p> }
    </div>
  );
}
