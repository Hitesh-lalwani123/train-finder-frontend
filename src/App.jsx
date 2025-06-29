
import React from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Page from './components/Page'
import WrapperComponent from './components/WrapperComponent'

function App() {

  return (
    <>
      <WrapperComponent>
        
        <div className='flex flex-col'></div>
        <Header/>
        <Page/>
      </WrapperComponent>
    </>
  )
}

export default App
