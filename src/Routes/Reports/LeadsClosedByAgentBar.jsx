import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJs , CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js/auto";
import { reportLeadClosedByAgent } from "../../features/reportSlice";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
  const dispatch = useDispatch();
  const leadsClosedByAgent = useSelector((state) => {
    return state.report;
  });
  useEffect(() => {
    dispatch(reportLeadClosedByAgent());
  }, []);


const barData =   Array.isArray(leadsClosedByAgent?.reportLeadClosedByAgent?.grouped) &&
leadsClosedByAgent?.reportLeadClosedByAgent?.grouped?.map(lead=>lead.length);   

const labelsData =  Array.isArray(leadsClosedByAgent?.reportLeadClosedByAgent?.grouped) &&
leadsClosedByAgent?.reportLeadClosedByAgent?.grouped?.map(lead=>lead[0].salesAgent.name); 

const barChartData = {
  labels: labelsData,
  datasets: [
    {
      label:"Leads",
      data: barData,
      backgroundColor:"rgb(204,255,229,0.9)",
      borderColor: "rgb(195, 155, 211 ,0.9)",
      borderWidth: 1,
    }
  ]
}

const options = {}

    return (
      <div className="container  "   style={{ textAlign: "center", maxWidth: "600px" }}>
         <h4 className="text-center" >Leads Closed by Sales Agent:</h4>
        <Bar
          data={barChartData}
          options={options}
        />
      </div>
    );
  };