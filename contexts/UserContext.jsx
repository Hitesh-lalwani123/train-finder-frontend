  

    // src/contexts/UserContext.js
import { createContext, useState } from "react";

// Step 1: Create context object
export const UserContext = createContext();

// Step 2: Create Provider
export const UserProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromStation, setFromstation] = useState("sc");
  const [toStation, setTostation] = useState("bpl");
  const [trainData, setTraindata] = useState([]);
  const [dataValid, setDatavalid] = useState(true);
  const [availableTrains, setTrains] = useState([]);
  const [currTrain, setCurrTrain] = useState("12649");
  const [allowedDateStrings, setallowedDates] = useState([
          "10-07-2025",
          "08-08-2025",
  ]);

  return (
    <UserContext.Provider value={{ selectedDate,
        setSelectedDate,fromStation, setFromstation,
        toStation, setTostation,
        trainData, setTraindata,
        dataValid, setDatavalid,
        availableTrains, setTrains,
        currTrain, setCurrTrain,
        allowedDateStrings, setallowedDates}}>
      {children}
    </UserContext.Provider>
  );
};
