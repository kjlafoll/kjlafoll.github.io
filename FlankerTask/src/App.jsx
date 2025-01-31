import React, { useState, useEffect } from 'react';
import ArrowExperiment from './ArrowExperiment.jsx';
import FaceExperiment from './FaceExperiment.jsx';

const App = () => {
  const [experiment, setExperiment] = useState(null);
  const [online, setOnline] = useState(true);
  const [PID, setPID] = useState(-1);

  useEffect(() => {
    // Function to get query parameters
    const getQueryParam = (param) => {
      //creates instance of URLSearchParams, web API to get parameter
      //window.location.search returns query string
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    //retrieve and set experiment type
     const expParam = getQueryParam('exp');
     setExperiment(expParam);
     
    //retrieve where online or not
    const onlineParam = getQueryParam('online');
    //set online state variable
    setOnline(onlineParam == 'T');

    //retrieve and set PID
    setPID(getQueryParam('PID'));
  }, []);
  
//render appropriate experiment
  if (experiment === 'F1') {
    return <FaceExperiment />;
  }
  else if(experiment === 'A1' || experiment === 'A2' || experiment === 'A3') {
    return <ArrowExperiment PID = { PID } experiment = { experiment } online = { online } />;
  }
};

export default App;
