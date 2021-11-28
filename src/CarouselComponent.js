import React,{useState,useEffect} from "react";
import react, { Component } from "react";
import {
    UncontrolledCarousel,

} from "reactstrap";
import { NavLink } from "react-router-dom";

function Carousel() {
  
  
  

  return (
    <div>
      <UncontrolledCarousel  
  items={[
    {
      altText: 'Slide 1',
      caption: 'Slide 1',
      key: 1,
      src: 'FirstImage.jpg'
    },
    {
      altText: 'Slide 2',
      caption: 'Slide 2',
      key: 2,
      src:'SecondImage.jpg'
    },
    {
      altText: 'Slide 3',
      caption: 'Slide 3',
      key: 3,
      src: 'ThirdImage.jpg'
    }
  ]}
 />
    </div>
  );
}

export default Carousel;
