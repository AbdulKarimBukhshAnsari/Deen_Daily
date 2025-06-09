import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboarad from "../../view/Dashboard/Dashoboard";
import Tracker from "../../view/Trackcer/Tracker";
import Reflections from "../../view/Reflections/Reflections";

function AppRouter(){
    return(
        <Routes>
            <Route path="/" element ={<Dashboarad />} />
            <Route path="/tracker" element ={<Tracker />} />
            <Route path="/reflections" element ={<Reflections />} />
        </Routes>
    )
};

export default AppRouter