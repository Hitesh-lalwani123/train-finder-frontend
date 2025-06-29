// DatePickerComponent.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RouteUI from "./RouteUI";
import TrainCard from "./TrainCard";
import { ClipLoader, ScaleLoader } from "react-spinners";
import "../App.css";
import ShimmerWrapper from "./ShimmerWrapper";

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromStation, setFromstation] = useState("sc");
  const [toStation, setTostation] = useState("bpl");
  const [shadow, setShadow] = useState("shadow-black");
  const [trainData, setTraindata] = useState([]);
  const [dataValid, setDatavalid] = useState(true);
  const [availableTrains, setTrains] = useState([]);
  const [currTrain, setCurrTrain] = useState("12649");
  const [loading, setLoading] = useState(false);

  const [allowedDateStrings, setallowedDates] = useState([
    "10-07-2025",
    "08-08-2025",
  ]);
  const stations = [
    "SBC",
    "RC",
    "GTL",
    "DHNE",
    "KRNT",
    "YG",
    "MBNR",
    "SEM",
    "SC",
    "KZJ",
    "RDM",
    "SKZR",
    "BPQ",
    "NGP",
    "ET",
    "BPL",
    "VGLJ",
    "GWL",
    "AGC",
    "HZM",
  ];
  const baseUrl = "https://train-finder-backend.onrender.com/";

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}get-all-dates`).then((res) => {
      let datesarr = [];

      let response = res.data;
      for (let i = 0; i < response.length; i++) {
        datesarr.push(response[i].split(",")[0]);
      }
      console.log(datesarr);
      setallowedDates(datesarr);
      setLoading(false);
    });
  }, []);
  const handleFromChange = (e) => {
    // e.preventDefault();
    const station = e.target.value;
    setFromstation(station);
  };
  const handleToChange = (e) => {
    const station = e.target.value;
    setTostation(station);
  };
  const handleTrainChange = (e) => {
    const train = e.target.value;
    setCurrTrain(train);
  };

  const templist = [...Array(20).keys()];
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleClick = () => {
    setLoading(true);
    setShadow("");
    if (selectedDate) {
      console.log(formatDate(selectedDate));
      axios.get(baseUrl).then((res) => {
        if (res.status == 200) {
          console.log("backend running...");
        } else {
          console.log("problem with backend");
        }
      });

      axios
        .post(`${baseUrl}get-train-avl`, {
          train_number: currTrain,
          date: formatDate(selectedDate),
          from_station: fromStation,
          to_station: toStation,
        })
        .then((res) => {
          let response = res.data[currTrain];
          console.log(response);
          if (response == "Data not available for current date. Scrape")
            setTraindata([]);
          else {
            setTraindata(response);
          }
          setLoading(false);
        });
      setDatavalid(true);
    } else {
      setDatavalid(false);
    }
  };

  const allowedDates = allowedDateStrings.map((dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`);
  });
  return (
    <>
      <ScaleLoader color="green" loading={loading} />

      <div className="flex flex-row">
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md w-fit">
          <label className="text-lg font-semibold">Select a Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setLoading(true);
              setSelectedDate(date);
              console.log(formatDate(date));
              axios
                .post(`${baseUrl}get-all-trains`, { date: formatDate(date) })
                .then((res) => {
                  console.log(res.data);
                  setTrains(res.data || []);
                  setLoading(false);
                });
            }}
            includeDates={allowedDates}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Click to select a date"
            dateFormat="dd/MM/yyyy"
          />

          {selectedDate && (
            <div className="text-green-600">
              You picked: {selectedDate.toDateString()}
            </div>
          )}
          {/* select train */}
          <div className="flex flex-col gap-2 w-full max-w-md p-4">
            <label className="text-gray-700 font-medium">Select train:</label>
            <select
              value={currTrain}
              onChange={handleTrainChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Choose a train --
              </option>
              {availableTrains.map((train) => (
                <option key={train} value={train}>
                  {train}
                </option>
              ))}
            </select>

            {fromStation && (
              <div className="text-green-600">Selected: {currTrain}</div>
            )}
          </div>
          {/* select from station */}
        </div>
        <div className="flex flex-col gap-2 w-full max-w-md p-4">
          <label className="text-gray-700 font-medium">
            Select from Station:
          </label>
          <select
            value={fromStation}
            onChange={handleFromChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Choose a station --
            </option>
            {stations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>

          {fromStation && (
            <div className="text-green-600">Selected: {fromStation}</div>
          )}
        </div>
        {/* select to station */}
        <div className="flex flex-col gap-2 w-full max-w-md p-4">
          <label className="text-gray-700 font-medium">
            Select from Station:
          </label>
          <select
            value={toStation}
            onChange={handleToChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Choose a station --
            </option>
            {stations.map((station) => (
              <option
                key={station}
                value={station}
                disabled={station == fromStation}
              >
                {station}
              </option>
            ))}
          </select>

          {toStation && (
            <div className="text-green-600">Selected: {toStation}</div>
          )}
        </div>
        <ShimmerWrapper isLoading={loading}>
          <button
            className={`bg-green-400 px-2 m-4 w-40 h-20 text-md font-medium hover:text-xl hover:bg-green-500 transition-all duration-200 rounded-md shadow-md ${shadow} hover:cursor-pointer`}
            onClick={handleClick}
          >
            Find Trains
          </button>
        </ShimmerWrapper>
      </div>
      <div>Train data</div>
      <div className="flex flex-col">
        {trainData.map((item, ind) => {
          let route_details = item[0];
          let fare_details = item[1];
          return (
            <div key={ind} className=" h-auto w-auto m-2 p-2 flex flex-col">
              <TrainCard>
                <div>
                  Route: {ind}, Fare: {fare_details}
                </div>
                <div className="flex flex-col justify-between p-1 m-2">
                  {route_details.map((curr_item, key) => {
                    let from_st = curr_item["from_station"];
                    let to_st = curr_item["to_station"];
                    let fare_cls = curr_item["fare_class"];
                    return (
                      <div
                        key={key}
                        className="flex flex-row justify-between p-1 m-1"
                      >
                        <div className="m-1 p-1 bg-green-700 text-white">
                          {fare_cls}:{" "}
                        </div>
                        {templist.map((itm, key) => {
                          return (
                            <div
                              key={key}
                              className={`h-2 w-full border border-black ${
                                (key >= from_st) & (key <= to_st - 1)
                                  ? "bg-green-700"
                                  : ""
                              }`}
                            >
                              <span className="text-sm">{stations[key]}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </TrainCard>
            </div>
          );
        })}
      </div>
      <div>{dataValid ? "" : "Set Date First"}</div>
      {/* <RouteUI/> */}
    </>
  );
};

export default DatePickerComponent;
