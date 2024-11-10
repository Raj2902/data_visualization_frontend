import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; //import useSelector to get the value stored in the store
import { Chart as ChartJS } from "chart.js/auto";
import { Scatter } from "react-chartjs-2";

function Relevance() {
  const dataInStore = useSelector((state) => state.data); //data from the store.
  const [time, setTime] = useState(true); //years or months
  const [labelValues, setLabelValues] = useState(); //labels and values of the chart

  //to make a seprate object for relevance in terms of diffrent filters

  var addedRelevance = {},
    end_yearRelevance = {},
    topicsRelevance = {},
    sectorRelevance = {},
    regionRelevance = {},
    pestleRelevance = {},
    sourceRelevance = {},
    countryRelevance = {},
    //labels and values for the chart in a global scope local variable.

    added_date_relevance = [],
    end_year_relevance = [],
    topics_relevance = [],
    sector_relevance = [],
    region_relevance = [],
    pestle_relevance = [],
    source_relevance = [],
    country_relevance = [];
  // Define the options as an array
  const options = [
    "Added Date",
    "End Year",
    "Topics",
    "Sector",
    "Region",
    "PEST",
    "Source",
    "Country",
  ];

  // Use useState to manage the selected Relevance filter
  const [selectedRelevanceFilter, setSelectedRelevanceFilter] =
    useState("Added Date");

  //Relevance in terms of added date
  function handleLineChartData() {
    if (selectedRelevanceFilter === "Added Date") {
      if (time) {
        //check for year or month true for year and false for the month
        addedRelevance = {};
        added_date_relevance = [];
        dataInStore.forEach((data) => {
          //iterate over all of the data from the store
          if (
            //check if the key is already there
            addedRelevance[data.added.split(" ")[2]]
          ) {
            addedRelevance[
              data.added.split(" ")[2] //if the key is already there add the relevance
            ] += data.relevance === "" ? 0 : data.relevance;
          } else {
            addedRelevance[
              data.added.split(" ")[2] //if its a new key take it as a new relevance value
            ] = data.relevance === "" ? 0 : data.relevance;
          }
        });
        for (const key in addedRelevance) {
          added_date_relevance.push({ x: key, y: addedRelevance[key] }); //my lables for the  x axis of the chart gathered from added date
        }
        setLabelValues(added_date_relevance); //put the lables and values in a state for rendering  them on the screen
      } else {
        addedRelevance = {};
        added_date_relevance = [];
        dataInStore.forEach((data) => {
          if (
            addedRelevance[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ]
          ) {
            addedRelevance[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] += data.relevance === "" ? 0 : data.relevance;
          } else {
            addedRelevance[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] = data.relevance === "" ? 0 : data.relevance;
          }
        });
        for (const key in addedRelevance) {
          added_date_relevance.push({ x: key, y: addedRelevance[key] });
        }
        setLabelValues(added_date_relevance.reverse());
      }
    } else if (selectedRelevanceFilter === "End Year") {
      end_yearRelevance = {};
      end_year_relevance = [];
      end_year_relevance = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          end_yearRelevance[data.end_year]
        ) {
          end_yearRelevance[
            data.end_year //if the key is already there add the relevance
          ] += data.relevance === "" ? 0 : data.relevance;
        } else {
          end_yearRelevance[
            data.end_year //if its a new key take it as a new relevance value
          ] = data.relevance === "" ? 0 : data.relevance;
        }
      });
      for (const key in end_yearRelevance) {
        end_year_relevance.push({ x: key, y: end_yearRelevance[key] }); //my lables for the  x axis of the bar chart gathered from end_year
      }
      setLabelValues(end_year_relevance); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedRelevanceFilter === "Topics") {
      topicsRelevance = {};
      topics_relevance = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          topicsRelevance[data.topic]
        ) {
          topicsRelevance[
            data.topic //if the key is already there add the relevance
          ] += data.relevance === "" ? 0 : data.relevance;
        } else {
          topicsRelevance[
            data.topic //if its a new key take it as a new relevance value
          ] = data.relevance === "" ? 0 : data.relevance;
        }
      });
      for (const key in topicsRelevance) {
        topics_relevance.push({ x: key, y: topicsRelevance[key] }); //my lables for the  x axis of the bar chart gathered from end_year
      }
      setLabelValues(topics_relevance); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedRelevanceFilter === "Sector") {
      sectorRelevance = {};
      sector_relevance = [];
      sector_relevance = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sectorRelevance[data.sector]
        ) {
          sectorRelevance[
            data.sector //if the key is already there add the relevance
          ] += data.relevance === "" ? 0 : data.relevance;
        } else {
          sectorRelevance[
            data.sector //if its a new key take it as a new relevance value
          ] = data.relevance === "" ? 0 : data.relevance;
        }
      });
      for (const key in sectorRelevance) {
        sector_relevance.push({ x: key, y: sectorRelevance[key] }); //my lables for the  x axis of the bar chart gathered from end_year
      }
      setLabelValues(sector_relevance); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedRelevanceFilter === "Region") {
      regionRelevance = {};
      region_relevance = [];
      region_relevance = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          regionRelevance[data.region]
        ) {
          regionRelevance[
            data.region //if the key is already there add the relevance
          ] += data.relevance === "" ? 0 : data.relevance;
        } else {
          regionRelevance[
            data.region //if its a new key take it as a new relevance value
          ] = data.relevance === "" ? 0 : data.relevance;
        }
      });
      for (const key in regionRelevance) {
        region_relevance.push({ x: key, y: regionRelevance[key] }); //my lables for the  x axis of the bar chart gathered from end_year
      }
      setLabelValues(region_relevance); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedRelevanceFilter === "PEST") {
      pestleRelevance = {};
      pestle_relevance = [];
      pestle_relevance = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          pestleRelevance[data.pestle]
        ) {
          pestleRelevance[
            data.pestle //if the key is already there add the relevance
          ] += data.relevance === "" ? 0 : data.relevance;
        } else {
          pestleRelevance[
            data.pestle //if its a new key take it as a new relevance value
          ] = data.relevance === "" ? 0 : data.relevance;
        }
      });
      for (const key in pestleRelevance) {
        pestle_relevance.push({ x: key, y: pestleRelevance[key] }); //my lables for the  x axis of the bar chart gathered from end_year
      }
      setLabelValues(pestle_relevance); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedRelevanceFilter === "Source") {
      sourceRelevance = {};
      source_relevance = [];
      source_relevance = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sourceRelevance[data.source]
        ) {
          sourceRelevance[
            data.source //if the key is already there add the relevance
          ] += data.relevance === "" ? 0 : data.relevance;
        } else {
          sourceRelevance[
            data.source //if its a new key take it as a new relevance value
          ] = data.relevance === "" ? 0 : data.relevance;
        }
      });
      for (const key in sourceRelevance) {
        source_relevance.push({ x: key, y: sourceRelevance[key] }); //my lables for the  x axis of the bar chart gathered from end_year
      }
      setLabelValues(source_relevance); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedRelevanceFilter === "Country") {
      countryRelevance = {};
      country_relevance = [];
      country_relevance = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          countryRelevance[data.country]
        ) {
          countryRelevance[
            data.country //if the key is already there add the relevance
          ] += data.relevance === "" ? 0 : data.relevance;
        } else {
          countryRelevance[
            data.country //if its a new key take it as a new relevance value
          ] = data.relevance === "" ? 0 : data.relevance;
        }
      });
      for (const key in countryRelevance) {
        country_relevance.push({ x: key, y: countryRelevance[key] }); //my lables for the  x axis of the bar chart gathered from end_year
      }
      setLabelValues(country_relevance); //put the lables and values in a state for rendering  them on the screen
    }
  }
  function changeTime() {
    setTime(() => !time); //handling the year and month change
  }

  // Function to handle change event
  const handleRelevanceSelectChange = (event) => {
    setSelectedRelevanceFilter(event.target.value);
  };

  useEffect(() => {
    handleLineChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore, time, selectedRelevanceFilter]);
  /*useEffect(() => {
    handleBarChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore]);*/
  return (
    <>
      <div style={{ background: "#f0f8ff" }} className="line_chart charts">
        {selectedRelevanceFilter === "Added Date" ? (
          <button onClick={changeTime}>{time ? "Y" : "M"}</button>
        ) : (
          ""
        )}
        <div style={{ textAlign: "center", padding: "20px" }}>
          <label htmlFor="select">Select an Option:</label>
          <select
            id="select"
            value={selectedRelevanceFilter}
            onChange={handleRelevanceSelectChange}
          >
            {/* Map through options and create option elements */}
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/*conditional rendering for year and month option*/}
        <div style={{ textAlign: "center" }}>
          {labelValues ? "" : "Loading..."}
        </div>
        <Scatter
          options={{
            scales: {
              x: {
                type: "category", // Specify category scale for x-axis
                ticks: {
                  // Hide labels but call a callback function to maintain space (i have done this because because there are too many labels so its better to hide them)
                  callback: (tickValue, index, ticks) => "",
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
          data={{
            datasets: [
              {
                label: "Relevance", // Optional label for the dataset
                data: labelValues,
                backgroundColor: "rgba(255, 99, 132, 0.2)", // Background color (optional)
                borderColor: "rgba(255, 99, 132, 1)", // Border color (optional)
              },
              // You can add multiple datasets for comparison
            ],
          }}
        />

        <p style={{ textAlign: "center" }}>
          {selectedRelevanceFilter}{" "}
          {selectedRelevanceFilter === "Added Date"
            ? time
              ? "(year)"
              : "(month)"
            : ""}{" "}
          {/*Relevance in terms of added date (year/months)*/}
        </p>
      </div>
    </>
  );
}

export default Relevance;
