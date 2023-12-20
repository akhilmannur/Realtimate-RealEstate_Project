import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import BuyCard from "../Components/BuyCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HomeListing from "../Components/HomeListing";

const BuyListing = () => {
 

  return (
    <div>
      <Header/>
        <BuyCard/>
      <HomeListing/>
      <Footer/>
    </div>
  );
};

export default BuyListing;
