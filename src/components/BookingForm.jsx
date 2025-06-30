// src/components/BookingForm.js
import { useState, useEffect } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import TrainCard from "./TrainCard";
import axios from "axios";
import { ClipLoader, ScaleLoader } from "react-spinners";
export default function BookingForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectall, setSelectall] = useState(false);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromStation, setFromstation] = useState("sc");
  const [toStation, setTostation] = useState("bpl");
  const [shadow, setShadow] = useState("shadow-black");
  const [trainData, setTraindata] = useState([]);
  const [dataValid, setDatavalid] = useState(true);
  const [availableTrains, setTrains] = useState([]);
  const [currTrain, setCurrTrain] = useState("12649");
  const [loading, setLoading] = useState(false);
  const [bannerMargin, setBannermargin] = useState("-mt-10");
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
    let localDates = localStorage.getItem("dates");
    if (localDates) {
      let dates = JSON.parse(localDates);
      setallowedDates(dates);
    } else {
      setLoading(true);
      axios.get(`${baseUrl}get-all-dates`).then((res) => {
        let datesarr = [];

        let response = res.data;
        for (let i = 0; i < response.length; i++) {
          datesarr.push(response[i].split(",")[0]);
        }
        console.log(datesarr);
        setallowedDates(datesarr);
        localStorage.setItem("dates",JSON.stringify(datesarr))
        setLoading(false);
      });
    }
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
    // setBannermargin("-mt-50")
    // setBannerbg("bg-transparent backdrop-blur")
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
  const [bannerbg, setBannerbg] = useState("bg-white");
  return (
    <div
      className={`${bannerbg} ${bannerMargin} mx-auto max-w-5xl p-6 shadow-lg rounded-2xl transition-all duration-300`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
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
          className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
          placeholderText="Click to select a date"
          dateFormat="dd/MM/yyyy"
        />
        {/* <input
          type="text"
          placeholder="Select Train"
          className="border rounded-md p-3 w-full"
          value={fromStation}
          onChange={(e) => setFrom(e.target.value)}
        /> */}
        {/* select train */}
        <select
          value={currTrain}
          onChange={handleTrainChange}
          className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500  w-full"
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

        <select
          value={fromStation}
          onChange={handleFromChange}
          className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500  w-full"
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

        <select
          value={toStation}
          onChange={handleToChange}
          className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500  w-full"
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
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectall}
            onChange={() => setSelectall(!selectall)}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Select all Trains</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleClick}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full text-lg shadow"
        >
          🔍 Search Trains
        </button>
      </div>

      <div className="train-result h-max">
        <div>Train data</div>
        <div className="flex flex-col">
          {trainData.map((item, ind) => {
            let route_details = item[0];
            let fare_details = item[1];
            return (
              <div key={ind} className=" h-auto w-auto m-2 p-2 flex flex-col">
                <TrainCard>
                  <div>
                    Route: {ind + 1}, Fare: {fare_details}
                  </div>
                  <div className="overflow-x-auto whitespace-nowrap p-1 m-2">
                    <div className="flex flex-col gap-2 min-w-max">
                      {route_details.map((curr_item, key) => {
                        let from_st = curr_item["from_station"];
                        let to_st = curr_item["to_station"];
                        let fare_cls = curr_item["fare_class"];
                        return (
                          <div key={key} className="flex flex-row items-center">
                            <div className="m-1 px-2 py-1 bg-green-700 text-white text-sm rounded">
                              {fare_cls}:
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
                                  <span className="text-sm">
                                    {stations[key]}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TrainCard>
              </div>
            );
          })}
        </div>
        <div>{dataValid ? "" : "Set Date First"}</div>
        <ScaleLoader color="green" loading={loading} />
      </div>
    </div>
  );
}
