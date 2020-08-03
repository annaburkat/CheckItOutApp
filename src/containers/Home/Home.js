import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";

export default function Home(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/places', {withCredentials: true})
    .then(function (response) {
      console.log(response)
      // handle success
      setPlaces(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  return (
    <div>
      <TopNavbar history={props.history}/>
      <Hero/>
      <Container>
        <Categories/>
        {
          places.length ?
            places.map(place => <p key={place._id}>{place.name}</p>)
          : null
        }
      </Container>
      <Footer history={props.history}/>
    </div>

  );
}