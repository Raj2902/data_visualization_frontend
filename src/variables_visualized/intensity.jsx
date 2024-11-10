import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; //import useSelector to get the value stored in the store
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

function Intensity() {
  const dataInStore = useSelector((state) => state.data); //data from the store.
  const [time, setTime] = useState(true); //years or months
  const [labelValues, setLabelValues] = useState([]); //labels and values of the chart
  const [bar_labelValues, setBarLabelValues] = useState([]); //labels and values of the chart

  //to make a seprate object for intensity in terms of diffrent filters

  var addedIntensity = {},
    end_yearIntensity = {},
    topicsIntensity = {},
    sectorIntensity = {},
    regionIntensity = {},
    pestleIntensity = {},
    sourceIntensity = {},
    countryIntensity = {},
    //labels and values for the chart in a global scope local variable.

    added_date_intensity_labels = [],
    added_date_intensity_values = [],
    end_year_intensity_labels = [],
    end_year_intensity_values = [],
    topics_intensity_labels = [],
    topics_intensity_values = [],
    sector_intensity_labels = [],
    sector_intensity_values = [],
    region_intensity_labels = [],
    region_intensity_values = [],
    pestle_intensity_labels = [],
    pestle_intensity_values = [],
    pestle_intensity_labels = [],
    pestle_intensity_values = [],
    source_intensity_labels = [],
    source_intensity_values = [],
    country_intensity_labels = [],
    country_intensity_values = [],
    bar_labels = [],
    bar_values = [];
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

  // Use useState to manage the selected Intensity filter
  const [selectedIntensityFilter, setSelectedIntensityFilter] =
    useState("Added Date");

  //Intensity in terms of end year
  /*function handleBarChartData() {
    end_yearIntensity = {};
    bar_labels = [];
    bar_values = [];
    dataInStore.forEach((data) => {
      //iterate over all of the data from the store
      if (
        //check if the key is already there
        end_yearIntensity[data.end_year]
      ) {
        end_yearIntensity[
          data.end_year //if the key is already there add the intensity
        ] += data.intensity === "" ? 0 : data.intensity;
      } else {
        end_yearIntensity[
          data.end_year //if its a new key take it as a new intensity value
        ] = data.intensity === "" ? 0 : data.intensity;
      }
    });
    for (const key in end_yearIntensity) {
      bar_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
      bar_values.push(end_yearIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
    }
    setBarLabelValues([bar_labels, bar_values]); //put the lables and values in a state for rendering  them on the screen
  }*/

  //Intensity in terms of added date
  function handleLineChartData() {
    if (selectedIntensityFilter === "Added Date") {
      if (time) {
        //check for year or month true for year and false for the month
        addedIntensity = {};
        added_date_intensity_labels = [];
        added_date_intensity_values = [];
        dataInStore.forEach((data) => {
          //iterate over all of the data from the store
          if (
            //check if the key is already there
            addedIntensity[data.added.split(" ")[2]]
          ) {
            addedIntensity[
              data.added.split(" ")[2] //if the key is already there add the intensity
            ] += data.intensity === "" ? 0 : data.intensity;
          } else {
            addedIntensity[
              data.added.split(" ")[2] //if its a new key take it as a new intensity value
            ] = data.intensity === "" ? 0 : data.intensity;
          }
        });
        for (const key in addedIntensity) {
          added_date_intensity_labels.push(key); //my lables for the  x axis of the chart gathered from added date
          added_date_intensity_values.push(addedIntensity[key]); //my values for the  y axis of the chart gathered from intensity
        }
        setLabelValues([
          added_date_intensity_labels,
          added_date_intensity_values,
        ]); //put the lables and values in a state for rendering  them on the screen
      } else {
        addedIntensity = {};
        added_date_intensity_labels = [];
        added_date_intensity_values = [];
        dataInStore.forEach((data) => {
          if (
            addedIntensity[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ]
          ) {
            addedIntensity[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] += data.intensity === "" ? 0 : data.intensity;
          } else {
            addedIntensity[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] = data.intensity === "" ? 0 : data.intensity;
          }
        });
        for (const key in addedIntensity) {
          added_date_intensity_labels.push(key);
          added_date_intensity_values.push(addedIntensity[key]);
        }
        setLabelValues([
          added_date_intensity_labels.reverse(),
          added_date_intensity_values.reverse(),
        ]);
      }
    } else if (selectedIntensityFilter === "End Year") {
      end_yearIntensity = {};
      end_year_intensity_labels = [];
      end_year_intensity_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          end_yearIntensity[data.end_year]
        ) {
          end_yearIntensity[
            data.end_year //if the key is already there add the intensity
          ] += data.intensity === "" ? 0 : data.intensity;
        } else {
          end_yearIntensity[
            data.end_year //if its a new key take it as a new intensity value
          ] = data.intensity === "" ? 0 : data.intensity;
        }
      });
      for (const key in end_yearIntensity) {
        end_year_intensity_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        end_year_intensity_values.push(end_yearIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
      }
      setLabelValues([end_year_intensity_labels, end_year_intensity_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedIntensityFilter === "Topics") {
      topicsIntensity = {};
      topics_intensity_labels = [];
      topics_intensity_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          topicsIntensity[data.topic]
        ) {
          topicsIntensity[
            data.topic //if the key is already there add the intensity
          ] += data.intensity === "" ? 0 : data.intensity;
        } else {
          topicsIntensity[
            data.topic //if its a new key take it as a new intensity value
          ] = data.intensity === "" ? 0 : data.intensity;
        }
      });
      for (const key in topicsIntensity) {
        topics_intensity_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        topics_intensity_values.push(topicsIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
      }
      setLabelValues([topics_intensity_labels, topics_intensity_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedIntensityFilter === "Sector") {
      sectorIntensity = {};
      sector_intensity_labels = [];
      sector_intensity_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sectorIntensity[data.sector]
        ) {
          sectorIntensity[
            data.sector //if the key is already there add the intensity
          ] += data.intensity === "" ? 0 : data.intensity;
        } else {
          sectorIntensity[
            data.sector //if its a new key take it as a new intensity value
          ] = data.intensity === "" ? 0 : data.intensity;
        }
      });
      for (const key in sectorIntensity) {
        sector_intensity_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        sector_intensity_values.push(sectorIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
      }
      setLabelValues([sector_intensity_labels, sector_intensity_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedIntensityFilter === "Region") {
      regionIntensity = {};
      region_intensity_labels = [];
      region_intensity_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          regionIntensity[data.region]
        ) {
          regionIntensity[
            data.region //if the key is already there add the intensity
          ] += data.intensity === "" ? 0 : data.intensity;
        } else {
          regionIntensity[
            data.region //if its a new key take it as a new intensity value
          ] = data.intensity === "" ? 0 : data.intensity;
        }
      });
      for (const key in regionIntensity) {
        region_intensity_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        region_intensity_values.push(regionIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
      }
      setLabelValues([region_intensity_labels, region_intensity_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedIntensityFilter === "PEST") {
      pestleIntensity = {};
      pestle_intensity_labels = [];
      pestle_intensity_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          pestleIntensity[data.pestle]
        ) {
          pestleIntensity[
            data.pestle //if the key is already there add the intensity
          ] += data.intensity === "" ? 0 : data.intensity;
        } else {
          pestleIntensity[
            data.pestle //if its a new key take it as a new intensity value
          ] = data.intensity === "" ? 0 : data.intensity;
        }
      });
      for (const key in pestleIntensity) {
        pestle_intensity_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        pestle_intensity_values.push(pestleIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
      }
      setLabelValues([pestle_intensity_labels, pestle_intensity_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedIntensityFilter === "Source") {
      sourceIntensity = {};
      source_intensity_labels = [];
      source_intensity_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sourceIntensity[data.source]
        ) {
          sourceIntensity[
            data.source //if the key is already there add the intensity
          ] += data.intensity === "" ? 0 : data.intensity;
        } else {
          sourceIntensity[
            data.source //if its a new key take it as a new intensity value
          ] = data.intensity === "" ? 0 : data.intensity;
        }
      });
      for (const key in sourceIntensity) {
        source_intensity_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        source_intensity_values.push(sourceIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
      }
      setLabelValues([source_intensity_labels, source_intensity_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedIntensityFilter === "Country") {
      countryIntensity = {};
      country_intensity_labels = [];
      country_intensity_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          countryIntensity[data.country]
        ) {
          countryIntensity[
            data.country //if the key is already there add the intensity
          ] += data.intensity === "" ? 0 : data.intensity;
        } else {
          countryIntensity[
            data.country //if its a new key take it as a new intensity value
          ] = data.intensity === "" ? 0 : data.intensity;
        }
      });
      for (const key in countryIntensity) {
        country_intensity_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        country_intensity_values.push(countryIntensity[key]); //my values for the  y axis of the bar chart gathered from intensity
      }
      setLabelValues([country_intensity_labels, country_intensity_values]); //put the lables and values in a state for rendering  them on the screen
    }
  }
  function changeTime() {
    setTime(() => !time); //handling the year and month change
  }

  // Function to handle change event
  const handleIntensitySelectChange = (event) => {
    setSelectedIntensityFilter(event.target.value);
  };

  useEffect(() => {
    handleLineChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore, time, selectedIntensityFilter]);
  /*useEffect(() => {
    handleBarChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore]);*/
  return (
    <>
      <div style={{ background: "#f0f8ff" }} className="line_chart charts">
        {selectedIntensityFilter === "Added Date" ? (
          <button onClick={changeTime}>{time ? "Y" : "M"}</button>
        ) : (
          ""
        )}
        <div style={{ textAlign: "center", padding: "20px" }}>
          <label htmlFor="select">Select an Option:</label>
          <select
            id="select"
            value={selectedIntensityFilter}
            onChange={handleIntensitySelectChange}
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
        {/*<h1 style={{ textAlign: "center" }}>Intensity</h1>*/}
        <Line
          datasetIdKey="id"
          data={{
            labels: labelValues[0], //labels are the first array of a double dimmensional array
            datasets: [
              {
                id: 1,
                label: "Intensity",
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
                ticks: {
                  // Hide labels but call a callback function to maintain space (i have done this because because there are too many labels so its better to hide them)
                  callback: (tickValue, index, ticks) => "",
                },
              },
            },
          }}
        />
        <p style={{ textAlign: "center" }}>
          {selectedIntensityFilter}{" "}
          {selectedIntensityFilter === "Added Date"
            ? time
              ? "(year)"
              : "(month)"
            : ""}{" "}
          {/*Intensity in terms of added date (year/months)*/}
        </p>
      </div>
      {/*<div className="bar_chart charts">
          <div style={{ textAlign: "center", paddingTop: "10px" }}>
            <label htmlFor="select">Select an Option:</label>
            <select
              id="select"
              value={selectedIntensityFilter}
              onChange={handleIntensitySelectChange}
            >
              {/* Map through options and create option elements */}
      {/*
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            {bar_labelValues ? "" : "Loading..."}
          </div>
          <h1 style={{ textAlign: "center" }}>Intensity</h1>
          <Bar
            data={{
              labels: bar_labelValues[0],
              datasets: [
                {
                  label: "Intensity",
                  backgroundColor: "#EC932F", // Orange
                  borderColor: "rgba(255,99,132,1)", // Red with opacity
                  borderWidth: 1,
                  hoverBackgroundColor: "rgba(255,99,132,0.4)", // Transparent orange on hover
                  hoverBorderColor: "rgba(255,99,132,1)", // Red on hover
                  data: bar_labelValues[1],
                },
              ],
            }}
            options={{
              plugins: {
                datalabels: {
                  display: true,
                  color: "black",
                  formatter: (value) => Math.round(value), // Round to nearest integer
                  anchor: "end",
                  offset: -20,
                  align: "start",
                },
              },
              legend: { display: false }, // Hide legend
            }}
            width={800}
            height={400}
          />
          <p style={{ textAlign: "center" }}>{selectedIntensityFilter}</p>
        </div>*/}
    </>
  );
}

export default Intensity;
