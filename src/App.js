import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/header"
import Navbar from "./components/navbar"
import RecordList from "./components/recordList"
import Create from "./components/create"
import Cleaining from "./components/cleaning"


function App() {
  return (
    <div className="pageContainer">
            <Header />
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/create" element={<Create />} />
                <Route path="/create" element={<Cleaning />} />
            </Routes>
            <div>test</div>
    </div>
  );
}

export default App;
