import React from "react";

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function NotFound(props) {

  return (
    <div>
      <TopNavbar history={props.history}/>
      NotFound
      <Footer history={props.history}/>
    </div>
  );
}