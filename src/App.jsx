// import React from 'react'
// import './App.css'
// import Footer from './components/Footer'
// import Header from './components/Header'
// import Page from './components/Page'
// import WrapperComponent from './components/WrapperComponent'

// function App() {

//   return (
//     <div className='h-screen p-2 m-2'>
//         <div className='flex flex-col'></div>
//         <Header/>
//         <Page/>
//     </div>
//   )
// }

// export default App

// src/App.js

import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import BookingForm from "./components/BookingForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./components/SearchResults";

function Home() {
  
  
  return (
    <>
      <Navbar color={"black"} />
      <Banner msg={"Train Route Finder"} />
      <BookingForm/>
    </>
  );
}

function App() {
  return (
     
    <Router>
      <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
