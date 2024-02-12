import "./App.css";
import { Home } from "./Components/Home";
import React from "react";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Standings } from "./Components/Standings";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Standings" element={<Standings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
