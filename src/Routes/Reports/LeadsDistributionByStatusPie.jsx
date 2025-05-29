import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { getGroupedLead } from '../../features/leadsSlice';
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";


ChartJs.register(Tooltip, Legend, ArcElement);

export function LeadsDistributionByStatusPie() {

const dispatch = useDispatch()
const {statusGrouped, status, error} = useSelector((state)=>{
    return state.leads
})
useEffect(()=>{
dispatch(getGroupedLead())
},[])


const labelsData = statusGrouped?.leadsByStatus  &&  Object.keys(statusGrouped?.leadsByStatus)

const datasetData =   statusGrouped?.leadsByStatus  && 
Object.entries(statusGrouped?.leadsByStatus).map(([key,value])=>  value.length)

const paiChartData = {
  labels: labelsData,
  datasets: [
    {
      label: "Total Leads",
      data: datasetData,
      backgroundColor:[ "rgb(255,204,153,0.9)", "rgb(224,224,224,0.9)", "rgb(204,255,229,0.9)", "rgb(247, 220, 111, 0.9)" , "rgb(195, 155, 211 , 0.9)"],
      hoverOffset: 4,
    },
  ],
};
const options = {};

  return (
   <div className="container text-center"   style={{  maxWidth: "400px" }}
   >
         <h4 >Lead Status Distribution:</h4>
          {status === "Loading" ? <p>Pie char is loading...</p>: <Pie data={paiChartData} options={options} /> }
                {error && <p>{error}</p> }      
       </div>
  )
}

