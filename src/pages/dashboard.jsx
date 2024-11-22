import React, { useEffect, useState } from "react";
import Intensity from "../variables_visualized/intensity"; //import the intensity component
import { useDispatch, useSelector } from "react-redux";
import { initialize } from "../Redux/action"; //import the action created
import Likelihood from "../variables_visualized/likelihood";
import Relevance from "../variables_visualized/relevance";
import Year from "../variables_visualized/year";

function Dashboard() {
  const dispatch = useDispatch();
  async function getallData() {
    //get all the data on server in one go.
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/data`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
      const data = await response.json();
      //console.log("Data fetched successfully:", data);
      dispatch(initialize(data)); //store the data using redux in the store
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getallData(); //get all of the data in the initial render
  }, []);

  return (
    <>
      {/*<h1
        style={{
          textAlign: "center",
          fontSize: "xxx-large",
          color: "#f0f8ff",
        }}
      >
        Insights
      </h1>*/}
      <div className="rowChart">
        <Intensity /> {/*the actual intensity component*/}
        <Likelihood /> {/*the actual likelihood component */}
        <Relevance /> {/*the actual relevance component*/}
        <Year /> {/*the actual year component */}
      </div>
    </>
  );
}

export default Dashboard;
