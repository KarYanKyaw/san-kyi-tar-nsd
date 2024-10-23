import React, { useEffect, useState } from "react";
import "fullpage.js/dist/fullpage.css";
import { Route, Routes } from "react-router-dom";
import AboutDashboard from "./dashboard/About.dashboard";
import ContactDashboard from "./dashboard/Contact.Dashboard";
import ReviewDashboard from "./dashboard/Reviews.dashboard";
import Layout from "./dashboard/Layout";
import Login from "./dashboard/LoginPage.dashboard";
import Banner from "./dashboard/Banner.dashboard";
import { databases } from "./lib/appwrite";
import HomePage from "./HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<Login />} path="/login" />
      <Route path="/dashboard" element={<Layout />}>
        <Route path="" element={<Banner />} />
        <Route path="about" element={<AboutDashboard />} />
        <Route path="contact" element={<ContactDashboard />} />
        <Route path="reviews" element={<ReviewDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
