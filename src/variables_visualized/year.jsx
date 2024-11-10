import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; //import useSelector to get the value stored in the store
import { Chart as ChartJS } from "chart.js/auto";
import { Radar } from "react-chartjs-2";

function Year() {
  const dataInStore = useSelector((state) => state.data); //data from the store.
  const [time, setTime] = useState(true); //years or months
  const [labelValues, setLabelValues] = useState([]); //labels and values of the chart

  //to make a seprate object for end_year in terms of diffrent filters

  var addedYear = {},
    topicsYear = {},
    sectorYear = {},
    regionYear = {},
    pestleYear = {},
    sourceYear = {},
    countryYear = {},
    //labels and values for the chart in a global scope local variable.

    added_date_end_year_labels = [],
    added_date_end_year_values = [],
    topics_end_year_labels = [],
    topics_end_year_values = [],
    sector_end_year_labels = [],
    sector_end_year_values = [],
    region_end_year_labels = [],
    region_end_year_values = [],
    pestle_end_year_labels = [],
    pestle_end_year_values = [],
    source_end_year_labels = [],
    source_end_year_values = [],
    country_end_year_labels = [],
    country_end_year_values = [];
  // Define the options as an array
  const options = [
    "Added Date",
    "Topics",
    "Sector",
    "Region",
    "PEST",
    "Source",
    "Country",
  ];

  // Use useState to manage the selected Year filter
  const [selectedYearFilter, setSelectedYearFilter] = useState("Added Date");

  //Year in terms of added date
  function handleLineChartData() {
    if (selectedYearFilter === "Added Date") {
      if (time) {
        //check for year or month true for year and false for the month
        addedYear = {};
        added_date_end_year_labels = [];
        added_date_end_year_values = [];
        dataInStore.forEach((data) => {
          //iterate over all of the data from the store
          if (
            //check if the key is already there
            addedYear[data.added.split(" ")[2]]
          ) {
            addedYear[
              data.added.split(" ")[2] //if the key is already there add the end_year
            ] += 1;
          } else {
            addedYear[
              data.added.split(" ")[2] //if its a new key take it as a new end_year value
            ] = 1;
          }
        });
        for (const key in addedYear) {
          added_date_end_year_labels.push(key); //my lables for the  x axis of the chart gathered from added date
          added_date_end_year_values.push(addedYear[key]); //my values for the  y axis of the chart gathered from end_year
        }
        setLabelValues([
          added_date_end_year_labels,
          added_date_end_year_values,
        ]); //put the lables and values in a state for rendering  them on the screen
      } else {
        addedYear = {};
        added_date_end_year_labels = [];
        added_date_end_year_values = [];
        dataInStore.forEach((data) => {
          if (
            addedYear[data.added.split(" ")[0] + " " + data.added.split(" ")[2]]
          ) {
            addedYear[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] += 1;
          } else {
            addedYear[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] = 1;
          }
        });
        for (const key in addedYear) {
          added_date_end_year_labels.push(key);
          added_date_end_year_values.push(addedYear[key]);
        }
        setLabelValues([
          added_date_end_year_labels.reverse(),
          added_date_end_year_values.reverse(),
        ]);
      }
    } else if (selectedYearFilter === "Topics") {
      topicsYear = {};
      topics_end_year_labels = [];
      topics_end_year_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          topicsYear[data.topic]
        ) {
          topicsYear[
            data.topic //if the key is already there add the end_year
          ] += 1;
        } else {
          topicsYear[
            data.topic //if its a new key take it as a new end_year value
          ] = 1;
        }
      });
      for (const key in topicsYear) {
        topics_end_year_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        topics_end_year_values.push(topicsYear[key]); //my values for the  y axis of the bar chart gathered from end_year
      }
      setLabelValues([topics_end_year_labels, topics_end_year_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedYearFilter === "Sector") {
      sectorYear = {};
      sector_end_year_labels = [];
      sector_end_year_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sectorYear[data.sector]
        ) {
          sectorYear[
            data.sector //if the key is already there add the end_year
          ] += 1;
        } else {
          sectorYear[
            data.sector //if its a new key take it as a new end_year value
          ] = 1;
        }
      });
      for (const key in sectorYear) {
        sector_end_year_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        sector_end_year_values.push(sectorYear[key]); //my values for the  y axis of the bar chart gathered from end_year
      }
      setLabelValues([sector_end_year_labels, sector_end_year_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedYearFilter === "Region") {
      regionYear = {};
      region_end_year_labels = [];
      region_end_year_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          regionYear[data.region]
        ) {
          regionYear[
            data.region //if the key is already there add the end_year
          ] += 1;
        } else {
          regionYear[
            data.region //if its a new key take it as a new end_year value
          ] = 1;
        }
      });
      for (const key in regionYear) {
        region_end_year_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        region_end_year_values.push(regionYear[key]); //my values for the  y axis of the bar chart gathered from end_year
      }
      setLabelValues([region_end_year_labels, region_end_year_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedYearFilter === "PEST") {
      pestleYear = {};
      pestle_end_year_labels = [];
      pestle_end_year_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          pestleYear[data.pestle]
        ) {
          pestleYear[
            data.pestle //if the key is already there add the end_year
          ] += 1;
        } else {
          pestleYear[
            data.pestle //if its a new key take it as a new end_year value
          ] = 1;
        }
      });
      for (const key in pestleYear) {
        pestle_end_year_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        pestle_end_year_values.push(pestleYear[key]); //my values for the  y axis of the bar chart gathered from end_year
      }
      setLabelValues([pestle_end_year_labels, pestle_end_year_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedYearFilter === "Source") {
      sourceYear = {};
      source_end_year_labels = [];
      source_end_year_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sourceYear[data.source]
        ) {
          sourceYear[
            data.source //if the key is already there add the end_year
          ] += 1;
        } else {
          sourceYear[
            data.source //if its a new key take it as a new end_year value
          ] = 1;
        }
      });
      for (const key in sourceYear) {
        source_end_year_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        source_end_year_values.push(sourceYear[key]); //my values for the  y axis of the bar chart gathered from end_year
      }
      setLabelValues([source_end_year_labels, source_end_year_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedYearFilter === "Country") {
      countryYear = {};
      country_end_year_labels = [];
      country_end_year_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          countryYear[data.country]
        ) {
          countryYear[
            data.country //if the key is already there add the end_year
          ] += 1;
        } else {
          countryYear[
            data.country //if its a new key take it as a new end_year value
          ] = 1;
        }
      });
      for (const key in countryYear) {
        country_end_year_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        country_end_year_values.push(countryYear[key]); //my values for the  y axis of the bar chart gathered from end_year
      }
      setLabelValues([country_end_year_labels, country_end_year_values]); //put the lables and values in a state for rendering  them on the screen
    }
  }
  function changeTime() {
    setTime(() => !time); //handling the year and month change
  }

  // Function to handle change event
  const handleYearSelectChange = (event) => {
    setSelectedYearFilter(event.target.value);
  };

  useEffect(() => {
    handleLineChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore, time, selectedYearFilter]);
  /*useEffect(() => {
    handleBarChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore]);*/
  return (
    <>
      <div style={{ background: "#f0f8ff" }} className="line_chart charts">
        {selectedYearFilter === "Added Date" ? (
          <button onClick={changeTime}>{time ? "Y" : "M"}</button>
        ) : (
          ""
        )}
        <div style={{ textAlign: "center", padding: "20px" }}>
          <label htmlFor="select">Select an Option:</label>
          <select
            id="select"
            value={selectedYearFilter}
            onChange={handleYearSelectChange}
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
        {/*<h1 style={{ textAlign: "center" }}>Year</h1>*/}
        <Radar
          datasetIdKey="id"
          data={{
            labels: labelValues[0], //labels are the first array of a double dimmensional array
            datasets: [
              {
                id: 1,
                label: "Year",
                data: labelValues[1], //values are the second array of a double dimmensional array
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: "category", // Specify category scale for x-axis
                display: false,
              },
            },
          }}
        />
        <p style={{ textAlign: "center" }}>
          {selectedYearFilter}{" "}
          {selectedYearFilter === "Added Date"
            ? time
              ? "(year)"
              : "(month)"
            : ""}{" "}
          {/*Year in terms of added date (year/months)*/}
        </p>
      </div>
    </>
  );
}

export default Year;
