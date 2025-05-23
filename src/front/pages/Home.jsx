import React from "react";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Banner from "../components/Banner";
import ServicesHome from "../components/ServicesHome";
import RatingsList from "../components/RatingsList";
import Search from "../components/Search";


const Home = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <Banner />
      <Search />
      <ServicesHome />
      <RatingsList />
      <Footer />
    </ScrollToTop>
  );
};

export default Home;