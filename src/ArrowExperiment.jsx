import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Papa from 'papaparse';
import axios from 'axios';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 


// Screen 1- Welcome Screen
const Screen1 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
  
     <Typography align= "center" variant= "h4" 
     sx = {{marginTop: "300px", marginLeft: "100px", color: "white"}}
     >
     Welcome! <br />

     Before beginning the experiment, please read the instructions carefully. <br />

     Press Continue to read instructions.
     </Typography>
     <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid white',
          backgroundColor: 'gray',
          justifyContent: 'center',
        }}
        style={{
          height: '50px',
          width: '100px',
          alignItems: 'center',
          marginBottom: 'px',
          marginTop: '500px',
          right: '600px'
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>
  </Box>
);
//white around Q and P boxes
// Screen 2- Congruent Stimulus + P and Q Buttons
const Screen2 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
        alignItems: 'center'
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography sx= {{color: "white", fontSize: "150px", left: "130px", position: 'relative'}}>
      &lt; &lt; &lt; &lt; &lt;
      </Typography>
      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "320px",
          right: "260px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "320px",
          left: "770px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>
      <Typography sx= {{color: 'white', fontSize: '20px', textAlign: 'center', justifyContent: 'center'}} style= {{ fontWeight: 'bold', bottom: "130px", position: 'relative'}}>
      A set of five arrows will be shown in the center of the screen.
      Your task will be to indicate the direction of the MIDDLE arrow.
      To submit your answer, press one of the following keys: <br />
      Q if the MIDDLE arrow is pointing to the LEFT <br />
      P if the MIDDLE arrow is pointing to the RIGHT.
      Press Continue to read further instruction.
      </Typography>
      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid white',
          backgroundColor: 'grey',
          justifyContent: 'center',
        }}
        style={{
          height: '50px',
          width: '100px',
          backGroundColor: 'gray',
          alignItems: 'center',
          left: '370px',
          bottom: '100px'
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>
    </Container>
  </Box>
);


// Screen 3- Incongruent Stimulus
const Screen3 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography sx= {{color: "white", fontSize: "150px", left: "130px", position: 'relative'}}>
      &lt; &lt; &gt; &lt; &lt;
      </Typography>
    
      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "300px",
          right: "260px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>


      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "300px",
          left: "770px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>
      
      <Typography sx= {{color: 'white', fontSize: '20px', textAlign: 'center', justifyContent: 'center'}} style= {{ fontWeight: 'bold', bottom: '130px', position: 'relative'}}>
      Sometimes the surrounding arrows will point in the opposite direction than the arrow in the middle. <br />
      Only pay attention to the MIDDLE arrow!
      Press Continue to read further instruction.
      </Typography>
      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid white',
          backgroundColor: 'grey',
          justifyContent: 'center',
        }}
        style={{
          height: '50px',
          width: '100px',
          backGroundColor: 'gray',
          alignItems: 'center',
          left: '350px',
          bottom: '70px'
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>
    </Container>
  </Box>
);

//Screen 4 - Example
const Screen4 = ({ onButtonClick }) => (
  <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100vw',
    height: '100vh',
    border: 'none',
  }}
>
  <Container
    maxWidth="md"
    sx={{
      border: '2px solid black',
      backgroundColor: 'black',
      justifyContent: 'center',
      height: '60vh',
    }}
    style={{ marginTop: '120px', marginBottom: '10px' }}
  >
     <Typography justifyContent='center' sx= {{textAlign:'center', color: "white", position: 'relative', bottom: '50px', fontSize: "28px"}}>
     In the example below,  the left [Q]-key is correct: <br />
     </Typography>
     <Typography justifyContent='center' sx= {{textAlign:'center', color: "white", position: 'relative', bottom: '50px', fontSize: "80px"}}>
     &lt; &lt; &lt; &lt; &lt; <br />
     </Typography>
     <Typography justifyContent='center' sx= {{textAlign:'center', color: "white", position: 'relative', bottom: '50px', fontSize: "28px"}}>
     since the middle arrow is pointing to the left. <br />
     <br />
     </Typography>
    <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "350px",
          right: "260px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>
      
      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "350px",
          left: "750px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>

    <Typography justifyContent='center' sx= {{textAlign:'center', color: "white", position: 'relative', bottom: "180px", fontSize: "28px"}}>
     In the example below,  the right [P]-key is correct: <br />
     </Typography>
     <Typography justifyContent='center' sx= {{textAlign:'center', color: "white", position: 'relative', bottom: "180px", fontSize: "80px"}}>
     &lt; &lt; &gt; &lt; &lt; <br />
     </Typography>
     <Typography justifyContent='center' sx= {{textAlign:'center', marginBottom: "100px", color: "white", position: 'relative', bottom: "180px", fontSize: "28px"}}>
     since the middle arrow is pointing to the right. <br />
     <br />
     Press Continue for further instruction.
    </Typography>
   
      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid white',
          backgroundColor: 'grey',
          justifyContent: 'center',
        }}
        style={{
          height: '50px',
          width: '100px',
          backGroundColor: 'gray',
          alignItems: 'center',
          position: 'relative',
          left: "350px", 
          bottom: "250px"
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>

  </Container>
</Box>
)
//Screen 5- Practice Round Intro Card
const Screen5 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography align= 'center' sx= {{color: 'white', fontSize: '28px'}} style= {{marginTop: "70px", fontWeight: 'bold'}}>
      You will now be given a chance to practice before the test begins. <br />
      Remember: <br />
      {'\u00A0\u00A0\u00A0\u00A0'}Keep focusing on the fixation point in the center of the screen and answer as quickly as possible but avoid mistakes. <br />
      {'\u00A0\u00A0\u00A0\u00A0'}Place your index fingers on the [Q] and [P] keys. <br />
      Press Start to begin the Practice Block.
      </Typography>

      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "450px",
          right: "260px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "450px",
          left: "750px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>

      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid white',
          backgroundColor: 'grey',
          justifyContent: 'center',
        }}
        style={{
          height: '50px',
          width: '100px',
          backGroundColor: 'gray',
          alignItems: 'center',
          position: 'relative',
          left: "20px", 
          
        }}
      >
        <Typography style={{ color: 'white' }}>Start</Typography>
      </Button>
    </Container>
  </Box>

)

//Flanker Task- Screen 1 P and Q/ Screen 6 overall
const Screen6 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '300px',
          width: '200px',
          alignItems: 'center',
          marginBottom: '20px',
          marginTop: '30px',
          marginLeft: '90px',
        }}
      >
        <Typography sx={{ fontSize: '100px', color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid white',
          justifyContent: 'center',
        }}
        style={{
          height: '300px',
          width: '210px',
          alignItems: 'center',
          marginBottom: '20px',
          marginTop: '30px',
          marginLeft: '250px',
        }}
      >
        <Typography sx={{ fontSize: '100px', color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>
    </Container>
  </Box>
)

const Screen7 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography
        sx={{ fontSize: '200px', color: 'white', justifyContent: 'center' }}
        style={{
          alignItems: 'center',
          marginRight: '100px',
          marginLeft: '350px',
          marginTop: '50px',
        }}
      >
        +
      </Typography>

    </Container>
  </Box>
);
// Flanker Screen 3- Blank(Screen 8)
const Screen8 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >

    </Container>
  </Box>
);

//Flanker Task- Arrows Screen 9
const Screen9 = ({ onButtonClick, value, onChange, currentPattern1, tooSlow}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
        <Typography
          justifyContent="center"
          sx={{ position: 'relative', left: '120px', top: '100px', fontSize: '150px', color: 'white' }}
        >
          {currentPattern1}
        </Typography>
      
        {tooSlow && (
        <Typography
          justifyContent="center"
          sx={{ position: 'relative', left: '290px', top: '100px', fontSize: '50px', color: 'red' }}
        >
          Too Slow!
        </Typography>
      )}
    </Container>
  </Box>
);

//Screen 10- Experiment Block Starts
const Screen10 = ({ onStartClick, onPracticeClick }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh',
        }}
        style={{ marginTop: '120px', marginBottom: '10px' }}
      >
        <Typography align= 'center' sx= {{color: 'white', fontSize: '28px'}} style= {{marginTop: "70px", fontWeight: 'bold'}}>
        The experiment will now begin.
        Press Start to begin the Experiment Block.
        If you would like additional practice, press Practice More.
        </Typography>
  
        <Button
          sx={{
            border: '2px solid white',
            justifyContent: 'center',
          }}
          style={{
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "290px",
            right: "260px"
          }}
        >
          <Typography sx={{ fontSize: '50px', color: 'white' }}>
            Q
            <br />
            &lt;
          </Typography>
        </Button>
  
        <Button
          sx={{
            border: '2px solid white',
            justifyContent: 'center',
          }}
          style={{
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "290px",
            left: "750px"
          }}
        >
          <Typography sx={{ fontSize: '50px', color: 'white' }}>
            P
            <br />
            &gt;
          </Typography>
        </Button>
  
        <Button
          onClick={onStartClick}
          sx={{
            border: '2px solid white',
            backgroundColor: 'grey',
            justifyContent: 'center',
          }}
          style={{
            height: '50px',
            width: '100px',
            backGroundColor: 'gray',
            alignItems: 'center',
            position: 'relative',
            right: "100px", 
            
          }}
        >
          <Typography style={{ color: 'white' }}>Start</Typography>
        </Button>
        <Button
            onClick={onPracticeClick}
            sx={{
              border: '2px solid white',
              backgroundColor: 'grey',
              justifyContent: 'center',
            }}
            style={{
              height: '50px',
              width: '100px',
              backGroundColor: 'gray',
              alignItems: 'center',
              position: 'relative',
              left: "20px", 
              
            }}
          >
            <Typography style={{ color: 'white' }}>Practice More</Typography>
          </Button>
      </Container>
    </Box>
  
);

//Screen 11
const Screen11 = ({ onButtonClick, value, onChange }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}>

      <Typography justifyContent='center' sx= {{marginTop: "100px", marginLeft: "160px", fontSize: "100px", color: "white"}}>
        Thank you!
      </Typography>
    </Container>
  </Box>
);

  //Screen 12- Break Screen every 50 trials
  const Screen12 = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh',
        }}
        style={{ marginTop: '120px', marginBottom: '10px' }}>
  
        <Typography justifyContent='center' sx= {{marginTop: "100px", marginLeft: "160px", fontSize: "100px", color: "white"}}>
          Break Time! \n Experiment will resume in 10 seconds.
        </Typography>
      </Container>
    </Box>
  );




//Rotate Screens
function App() {
  const [screen, setScreen] = useState(1);
  const [delay, setDelay] = useState(1000);
  const [inputValue, setInputValue] = useState('');
  const [targetScreen, setTargetScreen] = useState(0);
  const [responses, setResponses] = useState([]);
  const [stopwatch, setStopwatch] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [patterns, setPatterns] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [congruency, setCongruency] = useState(0);
  const [tooSlow, setTooSlow] = useState(false);
  const [skipped, setSkipped] = useState([]);

  
  //loop through CSV patterns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/flanker-mini.csv');
        console.log("Raw CSV data:", response.data);
          Papa.parse(response.data, {
            header: true,
            //execute complete callback when parsing is completed and take results as arg
            complete: (results) => {
              console.log("Parsed data:", results.data);
              //store pattern in parsedPatterns
              const parsedPatterns = results.data
              .filter(row => row.flanker && row.target) 
              .map(row => {
                  return `${row.flanker} ${row.flanker} ${row.target} ${row.flanker} ${row.flanker}`;
              });
              const correctAnswer = results.data
              .filter(row => row.correct) 
              .map(row => row.correct.toUpperCase());
              const congruent = results.data
              .filter(row => row.congruency)
              .map(row => row.congruency);
              console.log("Parsed patterns:", parsedPatterns);
              setPatterns(parsedPatterns);
              setCorrectAnswers(correctAnswer);
              setCongruency(congruent);
            },
          error: (error) => {
            console.error("Parsing error:", error);
          }
        });
      }
      catch (error) {
        console.error('Error fetching the CSV file:', error);
      }
      }
      fetchData();
  }, []);

//check currentPatternIndex and patterns array
  useEffect(() => {
    console.log("Current Pattern Index:", currentPatternIndex);
    console.log("Current Pattern:", patterns[currentPatternIndex]);
  }, [currentPatternIndex, patterns]);
  
//if takes more than 5 seconds, too slow message, and move pattern back
  useEffect(() => {
    let slow, move;
    if (screen === 9 && currentPatternIndex >= 8) {
        setStartTime(Date.now());
        console.log(startTime);
        //waits 5 seconds, then says too slow and moves pattern to end
        slow = setTimeout(() => {
          setTooSlow(true);
      }, 5000);
        //waits 6 seconds before moving to next pattern
        move = setTimeout(() => {
          movePatternToEnd();
          setCurrentPatternIndex(prevIndex => (prevIndex + 1));
        }, 6000);
    }
    return () => { 
      clearTimeout(slow);
      clearTimeout(move);
    };
    //renders everytime screen and currentPatternIndex updates
  }, [screen, currentPatternIndex]);

//moves pattern to end of list if participant takes longer than 5 sec
  const movePatternToEnd = () => {
      console.log("Moving Pattern to Back")
      //replace patterns with new rearranged array
      setPatterns(prevPatterns => {
        //copy current array from arg prevPatterns
        const updatedPatterns = [...prevPatterns];
        //remove current pattern from array and store pattern
        const currentPattern = updatedPatterns[currentPatternIndex];
        //adds pattern to end of array
        updatedPatterns.push(currentPattern);
        //takes previous state(prevSkipped) as arg and returns new state as array with currPatternIndex
        setSkipped(prevSkipped => [...prevSkipped, currentPatternIndex]);
        console.log("Skipped array: ", skipped);
        console.log("Patterns array:", updatedPatterns);
        //returns new patterns array
        return updatedPatterns;
    });
    setTooSlow(false);
    setScreen(6);
  };



  //stops timer when keydown for Q or P
  useEffect(() => {
      const handleKeyDown = (event) => {
          const { key } = event;
          //Experiment Block
          if ((screen === 9) && (currentPatternIndex >= 8) && (key === 'Q' || key === 'P')) {
              const endTime = Date.now();
              const duration = endTime - startTime;
              console.log(startTime);
              console.log(endTime);
              console.log("Response duration:", duration);
              saveResponse(key, duration);
              setCurrentPatternIndex(prevIndex => (prevIndex + 1));
              setInputValue(''); // Clear input field for the next pattern
          }
          //Practice Block
          else if((screen === 9) && (key == correctAnswers[currentPatternIndex])) {
            setCurrentPatternIndex(prevIndex => (prevIndex + 1));
            setInputValue(''); 
            setScreen(6);
          }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, [screen, stopwatch]);
  
  // //stores startTime when hit patterns
  // useEffect(() => {
  //     if (screen === 9 && currentPatternIndex == patterns.length/2 - 1) {
  //         setStartTime(Date.now());
  //         console.log(startTime);
  //     }
  // }, [screen]);
  
  
  //creates new response object with screen number, response, and time
  const saveResponse = (response, duration) => {
      const existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
      
      //set trial number
      let trialNumber = currentPatternIndex;
      //when currentPatternIndex is greater than total number of trials
      if(currentPatternIndex >= 16 && skipped.length > 0) {
          trialNumber = skipped.shift();
          console.log("Setting new Trial Number");
      }
      //check accuracy and store for result
      let accuracy = false;
      if (response == correctAnswers[trialNumber]){
          accuracy = true;
      }
      //set congruency
      let congruent = congruency[currentPatternIndex]
      if(currentPatternIndex >= patterns.length && skipped.length > 0) {
          congruent = congruency[trialNumber]
      }
      const newResponse = {
          trial: trialNumber - 7,
          response: response,
          duration: duration, 
          accuracy: accuracy, 
          congruency: congruent
          //add urlParam A1, A2, or F1
      };

  //adds new response object to array of responses
      const updatedResponses = [...existingResponses, newResponse];
        localStorage.setItem('responses', JSON.stringify(updatedResponses));
        setResponses(updatedResponses);
        console.log(newResponse);
        if (screen >= 9) {
            setScreen(6);
        }
  };

  //determines delay for screens 6-8 and initializes empty input for trials
  useEffect(() => {
    const interval = setInterval(() => {
        if (screen === 6) {
            setDelay(1000);
            setScreen(screen => screen + 1);  
        }
        if (screen === 8) {
          setDelay(1000);
          if (screen === 8 && currentPatternIndex === patterns.length) {
              setScreen(targetScreen); // Change screen to 11 after last pattern
          } else if (screen === 8 && targetScreen === 11) {
              setScreen(9); // Transition to screen 9 after patterns in screen 8
              setStartTime(Date.now());
              console.log(startTime);
          } else if (screen === 8 && currentPatternIndex === 8) {
              setScreen(10); // Display screen 10 at halfway point of patterns in screen 8
          }
          else {
            console.log("incrementing to screen 9");
            setScreen(screen => screen + 1); 
          }
        } 
        else if (screen === 7) {
            setDelay(500);
            setScreen(8); // Move to next screen after delay for screen 7
        }
        // Reset input value for screen 9
        if (screen === 9 && inputValue !== '') {
            setInputValue('');
        }
    }, delay);
    return () => clearInterval(interval);
}, [screen, delay]);


  //downloads responses when reach last screen
  useEffect(() => {
      if (screen === 11) {
          console.log("Screen reached 11, downloading responses...");
          downloadResponses();
      }
  }, [screen]);

  //rotates instruction screens 1-5 and experiment screens
  const switchScreen = (nextScreen) => {
      if (nextScreen >= 1 && nextScreen <= 5) {
          setScreen(screen + 1);
      } else if (screen === 9 || screen == 10) {
          setScreen(6);
      } else {
          setScreen(screen + 1);
      }
  };

  //at screen 10, begin experiment
  const handleStartClick = () => {
    console.log("Starting the experiment block...");
    setTargetScreen(11);
    //how is this working
    switchScreen(10);
  };

  //at screen 10, repeat practice round
  const handlePracticeClick = () => {
    // Logic to start the experiment block
    console.log("Resetting practice block...");
    setCurrentPatternIndex(0);
    switchScreen(10);
  };
  
//downloads user responses
  const downloadResponses = () => {
      if (responses.length === 0) {
          console.error("No responses to download.");
          return;
      }
      const jsonData = JSON.stringify(responses);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'responses.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      sendDataToREDCap(jsonData);
      // Clear out local storage
      localStorage.removeItem('responses');
  };

//creates json file and sends to RedCap
  const sendDataToREDCap = (data) => {
      console.log("Sending responses to RedCap");
      //creates URLSearchParams API object to extract parameters
      const urlParams = new URLSearchParams(window.location.search);
      //retrieve PID from URL query string
      const userid = urlParams.get('PID') || '10';
      //REDCap API endpoint
      const url = 'https://redcap.case.edu/api/';
      //data to be sent to REDCap API
      const body = {
          method: 'POST',
          //API Token
          token: '6543B93BA07C88CFA3FD68E9692B1A87',
          content: 'record',
          format: 'json',
          type: 'flat',
          overwriteBehavior: 'normal',
          forceAutoNumber: 'false',
          data: JSON.stringify([{
              'record_id': userid,
              //change to variable with flanker_data_json + urlParam
              //change for faces as well
              'flanker_data_json': data,
              'flanker_data_complete': '2'
          }]),
          returnContent: 'count',
          returnFormat: 'json'
      };
      //HTTP POST request to REDCap API
      $.post(url, body)
          .done(function(response) {
              console.log('Data sent to REDCap. Response:', response);
          })
          .fail(function(error) {
              console.error('Failed to send data to REDCap:', error);
          });
  };

  return (
    <div>
      {screen === 1 && <Screen1 onButtonClick={() => switchScreen(2)} />}
      {screen === 2 && <Screen2 onButtonClick={() => switchScreen(3)} />}
      {screen === 3 && <Screen3 onButtonClick={() => switchScreen(4)} />}
      {screen === 4 && <Screen4 onButtonClick={() => switchScreen(5)} />}
      {screen === 5 && <Screen5 onButtonClick={() => switchScreen(6)} />}
      {screen === 6 && <Screen6 />}
      {screen === 7 && <Screen7 />}
      {screen === 8 && <Screen8 />}
      {screen === 9 && <Screen9 value={inputValue} onChange={(e) => setInputValue(e.target.value)} currentPattern1={patterns[currentPatternIndex]} tooSlow={tooSlow}/>}
      {screen === 10 && <Screen10 onStartClick={handleStartClick} onPracticeClick={handlePracticeClick} />}
      {screen === 11 && <Screen11 />}
      {screen === 12 && <Screen12 />}
    </div>
  );
}

export default App;