import React from "react";

import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";
import Home from "./Pages/Home/Home";


function App() {
  return (
    <div >
      <Navbar/>
        <Home />
        <Footer />
    </div>
  );
}

export default App;
