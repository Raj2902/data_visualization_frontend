import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; //import useSelector to get the value stored in the store
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

function Likelihood() {
  const dataInStore = useSelector((state) => state.data); //data from the store.
  const [time, setTime] = useState(true); //years or months
  const [labelValues, setLabelValues] = useState([]); //labels and values of the chart
  const [bar_labelValues, setBarLabelValues] = useState([]); //labels and values of the chart

  //to make a seprate object for likelihood in terms of diffrent filters

  var addedLikelihood = {},
    end_yearLikelihood = {},
    topicsLikelihood = {},
    sectorLikelihood = {},
    regionLikelihood = {},
    pestleLikelihood = {},
    sourceLikelihood = {},
    countryLikelihood = {},
    //labels and values for the chart in a global scope local variable.

    added_date_likelihood_labels = [],
    added_date_likelihood_values = [],
    end_year_likelihood_labels = [],
    end_year_likelihood_values = [],
    topics_likelihood_labels = [],
    topics_likelihood_values = [],
    sector_likelihood_labels = [],
    sector_likelihood_values = [],
    region_likelihood_labels = [],
    region_likelihood_values = [],
    pestle_likelihood_labels = [],
    pestle_likelihood_values = [],
    pestle_likelihood_labels = [],
    pestle_likelihood_values = [],
    source_likelihood_labels = [],
    source_likelihood_values = [],
    country_likelihood_labels = [],
    country_likelihood_values = [],
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

  // Use useState to manage the selected likelihood filter
  const [selectedLikelihoodFilter, setSelectedLikelihoodFilter] =
    useState("Added Date");

  //Likelihood in terms of end year
  /*function handleBarChartData() {
    end_yearLikelihood = {};
    bar_labels = [];
    bar_values = [];
    dataInStore.forEach((data) => {
      //iterate over all of the data from the store
      if (
        //check if the key is already there
        end_yearLikelihood[data.end_year]
      ) {
        end_yearLikelihood[
          data.end_year //if the key is already there add the likelihood
        ] += data.likelihood === "" ? 0 : data.likelihood;
      } else {
        end_yearLikelihood[
          data.end_year //if its a new key take it as a new likelihood value
        ] = data.likelihood === "" ? 0 : data.likelihood;
      }
    });
    for (const key in end_yearLikelihood) {
      bar_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
      bar_values.push(end_yearLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
    }
    setBarLabelValues([bar_labels, bar_values]); //put the lables and values in a state for rendering  them on the screen
  }*/

  //Likelihood in terms of added date
  function handleBarChartData() {
    if (selectedLikelihoodFilter === "Added Date") {
      if (time) {
        //check for year or month true for year and false for the month
        addedLikelihood = {};
        added_date_likelihood_labels = [];
        added_date_likelihood_values = [];
        dataInStore.forEach((data) => {
          //iterate over all of the data from the store
          if (
            //check if the key is already there
            addedLikelihood[data.added.split(" ")[2]]
          ) {
            addedLikelihood[
              data.added.split(" ")[2] //if the key is already there add the likelihood
            ] += data.likelihood === "" ? 0 : data.likelihood;
          } else {
            addedLikelihood[
              data.added.split(" ")[2] //if its a new key take it as a new likelihood value
            ] = data.likelihood === "" ? 0 : data.likelihood;
          }
        });
        for (const key in addedLikelihood) {
          added_date_likelihood_labels.push(key); //my lables for the  x axis of the chart gathered from added date
          added_date_likelihood_values.push(addedLikelihood[key]); //my values for the  y axis of the chart gathered from likelihood
        }
        setBarLabelValues([
          added_date_likelihood_labels,
          added_date_likelihood_values,
        ]); //put the lables and values in a state for rendering  them on the screen
      } else {
        addedLikelihood = {};
        added_date_likelihood_labels = [];
        added_date_likelihood_values = [];
        dataInStore.forEach((data) => {
          if (
            addedLikelihood[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ]
          ) {
            addedLikelihood[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] += data.likelihood === "" ? 0 : data.likelihood;
          } else {
            addedLikelihood[
              data.added.split(" ")[0] + " " + data.added.split(" ")[2]
            ] = data.likelihood === "" ? 0 : data.likelihood;
          }
        });
        for (const key in addedLikelihood) {
          added_date_likelihood_labels.push(key);
          added_date_likelihood_values.push(addedLikelihood[key]);
        }
        setBarLabelValues([
          added_date_likelihood_labels.reverse(),
          added_date_likelihood_values.reverse(),
        ]);
      }
    } else if (selectedLikelihoodFilter === "End Year") {
      end_yearLikelihood = {};
      end_year_likelihood_labels = [];
      end_year_likelihood_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          end_yearLikelihood[data.end_year]
        ) {
          end_yearLikelihood[
            data.end_year //if the key is already there add the likelihood
          ] += data.likelihood === "" ? 0 : data.likelihood;
        } else {
          end_yearLikelihood[
            data.end_year //if its a new key take it as a new likelihood value
          ] = data.likelihood === "" ? 0 : data.likelihood;
        }
      });
      for (const key in end_yearLikelihood) {
        end_year_likelihood_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        end_year_likelihood_values.push(end_yearLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
      }
      setBarLabelValues([
        end_year_likelihood_labels,
        end_year_likelihood_values,
      ]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedLikelihoodFilter === "Topics") {
      topicsLikelihood = {};
      topics_likelihood_labels = [];
      topics_likelihood_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          topicsLikelihood[data.topic]
        ) {
          topicsLikelihood[
            data.topic //if the key is already there add the likelihood
          ] += data.likelihood === "" ? 0 : data.likelihood;
        } else {
          topicsLikelihood[
            data.topic //if its a new key take it as a new likelihood value
          ] = data.likelihood === "" ? 0 : data.likelihood;
        }
      });
      for (const key in topicsLikelihood) {
        topics_likelihood_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        topics_likelihood_values.push(topicsLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
      }
      setBarLabelValues([topics_likelihood_labels, topics_likelihood_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedLikelihoodFilter === "Sector") {
      sectorLikelihood = {};
      sector_likelihood_labels = [];
      sector_likelihood_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sectorLikelihood[data.sector]
        ) {
          sectorLikelihood[
            data.sector //if the key is already there add the likelihood
          ] += data.likelihood === "" ? 0 : data.likelihood;
        } else {
          sectorLikelihood[
            data.sector //if its a new key take it as a new likelihood value
          ] = data.likelihood === "" ? 0 : data.likelihood;
        }
      });
      for (const key in sectorLikelihood) {
        sector_likelihood_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        sector_likelihood_values.push(sectorLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
      }
      setBarLabelValues([sector_likelihood_labels, sector_likelihood_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedLikelihoodFilter === "Region") {
      regionLikelihood = {};
      region_likelihood_labels = [];
      region_likelihood_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          regionLikelihood[data.region]
        ) {
          regionLikelihood[
            data.region //if the key is already there add the likelihood
          ] += data.likelihood === "" ? 0 : data.likelihood;
        } else {
          regionLikelihood[
            data.region //if its a new key take it as a new likelihood value
          ] = data.likelihood === "" ? 0 : data.likelihood;
        }
      });
      for (const key in regionLikelihood) {
        region_likelihood_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        region_likelihood_values.push(regionLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
      }
      setBarLabelValues([region_likelihood_labels, region_likelihood_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedLikelihoodFilter === "PEST") {
      pestleLikelihood = {};
      pestle_likelihood_labels = [];
      pestle_likelihood_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          pestleLikelihood[data.pestle]
        ) {
          pestleLikelihood[
            data.pestle //if the key is already there add the likelihood
          ] += data.likelihood === "" ? 0 : data.likelihood;
        } else {
          pestleLikelihood[
            data.pestle //if its a new key take it as a new likelihood value
          ] = data.likelihood === "" ? 0 : data.likelihood;
        }
      });
      for (const key in pestleLikelihood) {
        pestle_likelihood_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        pestle_likelihood_values.push(pestleLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
      }
      setBarLabelValues([pestle_likelihood_labels, pestle_likelihood_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedLikelihoodFilter === "Source") {
      sourceLikelihood = {};
      source_likelihood_labels = [];
      source_likelihood_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          sourceLikelihood[data.source]
        ) {
          sourceLikelihood[
            data.source //if the key is already there add the likelihood
          ] += data.likelihood === "" ? 0 : data.likelihood;
        } else {
          sourceLikelihood[
            data.source //if its a new key take it as a new likelihood value
          ] = data.likelihood === "" ? 0 : data.likelihood;
        }
      });
      for (const key in sourceLikelihood) {
        source_likelihood_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        source_likelihood_values.push(sourceLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
      }
      setBarLabelValues([source_likelihood_labels, source_likelihood_values]); //put the lables and values in a state for rendering  them on the screen
    } else if (selectedLikelihoodFilter === "Country") {
      countryLikelihood = {};
      country_likelihood_labels = [];
      country_likelihood_values = [];
      dataInStore.forEach((data) => {
        //iterate over all of the data from the store
        if (
          //check if the key is already there
          countryLikelihood[data.country]
        ) {
          countryLikelihood[
            data.country //if the key is already there add the likelihood
          ] += data.likelihood === "" ? 0 : data.likelihood;
        } else {
          countryLikelihood[
            data.country //if its a new key take it as a new likelihood value
          ] = data.likelihood === "" ? 0 : data.likelihood;
        }
      });
      for (const key in countryLikelihood) {
        country_likelihood_labels.push(key); //my lables for the  x axis of the bar chart gathered from end_year
        country_likelihood_values.push(countryLikelihood[key]); //my values for the  y axis of the bar chart gathered from likelihood
      }
      setBarLabelValues([country_likelihood_labels, country_likelihood_values]); //put the lables and values in a state for rendering  them on the screen
    }
  }
  function changeTime() {
    setTime(() => !time); //handling the year and month change
  }

  // Function to handle change event
  const handleLikelihoodSelectChange = (event) => {
    setSelectedLikelihoodFilter(event.target.value);
  };

  useEffect(() => {
    handleBarChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore, time, selectedLikelihoodFilter]);
  /*useEffect(() => {
    handleBarChartData(); //call function on intial render dependency on time and dataInStore
  }, [dataInStore]);*/
  return (
    <>
      <div style={{ background: "#f0f8ff" }} className="bar_chart charts">
        {selectedLikelihoodFilter === "Added Date" ? (
          <button onClick={changeTime}>{time ? "Y" : "M"}</button>
        ) : (
          ""
        )}
        <div style={{ textAlign: "center", padding: "20px" }}>
          <label htmlFor="select">Select an Option:</label>
          <select
            id="select"
            value={selectedLikelihoodFilter}
            onChange={handleLikelihoodSelectChange}
          >
            {/* Map through options and create option elements */}

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
        {/*<h1 style={{ textAlign: "center" }}>Likelihood</h1>*/}
        <Bar
          data={{
            labels: bar_labelValues[0],
            datasets: [
              {
                label: "Likelihood",
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
            scales: {
              x: {
                type: "category", // Specify category scale for x-axis
                ticks: {
                  // Hide labels but call a callback function to maintain space (i have done this because because there are too many labels so its better to hide them)
                  callback: (tickValue, index, ticks) => "",
                },
              },
            },
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
        <p style={{ textAlign: "center" }}>
          {selectedLikelihoodFilter}{" "}
          {selectedLikelihoodFilter === "Added Date"
            ? time
              ? "(year)"
              : "(month)"
            : ""}{" "}
          {/*Likelihood in terms of added date (year/months)*/}
        </p>
      </div>
    </>
  );
}

export default Likelihood;
