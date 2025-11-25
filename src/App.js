import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/header"
import Navbar from "./components/navbar"
import RecordList from "./components/recordList"
import Edit from "./components/edit"
import Create from "./components/create"
import Calendar from "./components/calendar"
import Cleaning from "./components/cleaning"
import 'react-big-calendar/lib/css/react-big-calendar.css';


function App() {
  return (
    <div className="pageContainer">
            <Header />
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/cleaning" element={<Cleaning />} />
            </Routes>
            <div>test</div>
    </div>
  );
}

export default App;
