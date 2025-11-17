import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/header"
import Navbar from "./components/navbar"
import RecordList from "./components/recordList"
import Edit from "./components/edit"
import Create from "./components/create"
import Calendar from "./components/calendar"
import Filter from "./components/filter"
import Cleaning from "./components/cleaning"


function App() {
  return (
    <div className="pageContainer">
            <Header />
            <Navbar />
            <Routes>
            <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/cleaning" element={<Cleaning />} />
                <Route path="/filter" element={<Filter />} />
            </Routes>
            <div>test</div>
    </div>
  );
}

export default App;
