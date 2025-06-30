// src/pages/SearchResults.js
import Navbar from "./Navbar";
import Banner from "./Banner";
export default function SearchResults() {

  return (
    <>
      <Navbar color = "green"/>
      <Banner msg = {"Trains found for current date"}/>
    </>
  );
}
