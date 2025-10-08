import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/header"
import Navbar from "./components/navbar"
import Create from "./components/create"

function App() {
  return (
    <div className="pageContainer">
            <Header />
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/create" element={<Create />} />
            </Routes>
            <div>test</div>
    </div>
  );
}

export default App;
