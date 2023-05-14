import React from "react";
// import '../App.css';
import { Button } from "../Button";
import "./HeroSection.css";
// import CardItem from './CardItem';
import Cards from "./Cards";
import "./Cards.css";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <div className="Parent">
        <div className="hero-container">
          <video
            className="hero-video"
            src="/Videos/squares-1200.mp4"
            autoPlay
            loop
            muted
          />
          <h1>Container Loading Solution</h1>
          <p>What are you waiting for?</p>
          <div className="hero-btns">
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              onclick={() => {}}
            >
              <Link to="/uploadExcelFile" className="nav-links">
                LET'S GET STARTED
              </Link>
            </Button>
          </div>
        </div>
        <div className="card-container">
          <Cards />{" "}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
