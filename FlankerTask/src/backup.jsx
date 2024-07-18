import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';


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
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
     <Typography align= "center" variant= "h4" 
     sx = {{marginTop: "150px"}}
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
          marginTop: '180px',
          marginLeft: '350px',
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>
    </Container>
  </Box>
);

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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography justifyContent='center' sx= {{marginTop: "20px", marginLeft: "200px", fontSize: "100px"}}>
      &lt; &lt; &lt; &lt; &lt;
      </Typography>
      <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '175px',
          width: '180px',
          alignItems: 'center',
          marginTop: '-15px',
          marginBottom: '100px',
          marginLeft: '50px',
        }}
      >
        <Typography sx={{ fontSize: '70px', color: 'black' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '175px',
          width: '180px',
          alignItems: 'center',
          marginTop: '-15px',
          marginBottom: '100px',
          marginLeft: '350px',
        }}
      >
        <Typography sx={{ fontSize: '70px', color: 'black' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>
      <Typography sx= {{color: 'black', fontSize: '16px'}} style= {{marginTop: "-85px", fontWeight: 'bold'}}>
      A set of five arrows will be shown in the center of the screen.
      Your task will be to indicate the direction of the MIDDLE arrow.
      To submit your answer, press one of the following keys: <br />
      Q if the MIDDLE arrow is pointing to the LEFT <br />
      P if the MIDDLE arrow is pointing to the RIGHT.
      Press Contine to read further instruction.
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
          marginTop: '55px',
          marginLeft: '350px',
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography  justifyContent='center' sx= {{marginTop: "20px", marginLeft: "200px", fontSize: "100px"}}>
      &lt; &lt; &gt; &lt; &lt;
      </Typography>
      <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '175px',
          width: '180px',
          alignItems: 'center',
          marginTop: '-15px',
          marginBottom: '100px',
          marginLeft: '50px',
        }}
      >
        <Typography sx={{ fontSize: '70px', color: 'black' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '175px',
          width: '180px',
          alignItems: 'center',
          marginTop: '-15px',
          marginBottom: '100px',
          marginLeft: '350px',
        }}
      >
        <Typography sx={{ fontSize: '70px', color: 'black' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>
      <Typography align= 'center' sx= {{color: 'black', fontSize: '16px'}} style= {{marginTop: "-70px", fontWeight: 'bold'}}>
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
          top: '90px'
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
      backgroundColor: 'gray',
      justifyContent: 'center',
      height: '60vh',
    }}
    style={{ marginTop: '120px', marginBottom: '10px' }}
  >
      <Typography justifyContent='center' sx= {{marginTop: "20px", marginLeft: "200px", fontSize: "20px"}}>
     In the example below,  the left [Q]-key is correct: <br />
      </Typography>

    <Typography justifyContent='center' sx= {{marginTop: "20px", marginLeft: "300px", fontSize: "50px"}}>
    &gt; &gt; &lt; &gt; &gt;
    </Typography>

    <Typography justifyContent='center' sx= {{marginTop: "20px", marginLeft: "200px", fontSize: "20px"}}>
    since the middle arrow is pointing to the left.
    </Typography>
    
    <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '120px',
          width: '120px',
          alignItems: 'center',
          left: '670px',
          bottom: '140px',
          marginBottom: '100px',
        }}
      >
        <Typography sx={{ fontSize: '40px', color: 'black' }}>
          Q
          <br />
          &lt;
        </Typography>
        </Button>

    <Typography justifyContent='center' sx= {{marginBottom: "100px", marginTop: "-200px", bottom: "100px", marginLeft: "200px", fontSize: "20px"}}>
     In the example below,  the right[P]-key is correct: <br />
      </Typography>

    <Typography justifyContent='center' sx= {{marginBottom: "100px", marginTop: "-100px", marginLeft: "300px", fontSize: "50px"}}>
    &lt; &lt; &gt; &lt; &lt;
    </Typography>

    <Typography justifyContent='center' sx= {{marginBottom: "100px", marginTop: "-80px", marginLeft: "200px", fontSize: "20px"}}>
    since the middle arrow is pointing to the left. <br />
    <br />
    Press Continue for further instruction.
    </Typography>
    
    <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '120px',
          width: '120px',
          alignItems: 'center',
          left: '670px',
          marginTop: '-270px',
          marginBottom: '200px',
        }}
      >
        <Typography sx={{ fontSize: '40px', color: 'black' }}>
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
          left: '230px',
          top: '-30px',
          bottom: '200px'
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography align= 'center' sx= {{color: 'black', fontSize: '16px'}} style= {{marginTop: "70px", fontWeight: 'bold'}}>
      You will now be given a chance to practice before the test begins. <br />
      Remember: <br />
      {'\u00A0\u00A0\u00A0\u00A0'}Keep focusing on the fixation point in the center of the screen and answer as quickly as possible but {'\u00A0\u00A0\u00A0\u00A0'}avoid mistakes. <br />
      {'\u00A0\u00A0\u00A0\u00A0'}Place your index fingers on the [Q] and [P] keys. <br />
      Press Start to begin the Practice Block.
      </Typography>

      <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '175px',
          width: '180px',
          alignItems: 'center',
          marginTop: '40px',
          marginBottom: '100px',
          marginLeft: '50px',
        }}
      >
        <Typography sx={{ fontSize: '70px', color: 'black' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '175px',
          width: '180px',
          alignItems: 'center',
          marginTop: '40px',
          marginBottom: '100px',
          marginLeft: '350px',
        }}
      >
        <Typography sx={{ fontSize: '70px', color: 'black' }}>
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
          marginTop: '-30px',
          marginLeft: '350px',
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Button
        sx={{
          border: '2px solid darkblue',
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
        <Typography sx={{ fontSize: '100px', color: 'black' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid darkblue',
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
        <Typography sx={{ fontSize: '100px', color: 'black' }}>
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography
        sx={{ fontSize: '200px', color: 'black', justifyContent: 'center' }}
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      
    </Container>
  </Box>
);

//Flanker Task- Arrows Screen 1
const Screen9 = ({ onButtonClick, value, onChange }) => (
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography justifyContent='center' sx= {{marginTop: "90px", marginLeft: "190px", fontSize: "150px"}}>
        &lt;&lt;&lt;&lt;&lt;
      </Typography>

      {/* Input Field */}
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        style={{ backgroundColor: 'gray', marginTop: '20px', width: '100%', padding: '10px', borderColor: 'gray' }}
      />


    </Container>
  </Box>
);

//Flanker Task- Arrows Screen 2
const Screen10 = ({ onButtonClick, value, onChange }) => (
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography justifyContent='center' sx= {{marginTop: "90px", marginLeft: "190px", fontSize: "150px"}}>
      &lt;&lt;&gt;&lt;&lt;
      </Typography>

      {/* Input Field */}
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        style={{ backgroundColor: 'gray', marginTop: '20px', width: '100%', padding: '10px', borderColor: 'gray' }}
      />

    </Container>
  </Box>
);

//Rotate Screens
  function App() {
  const [screen, setScreen] = useState(1);
  const [delay, setDelay] = useState(1000);
  const [inputValue, setInputValue] = useState('');
  const [targetScreen, setTargetScreen] = useState(8);

  const handleChange = (event) => {
    const response = event.target.value.trim().toUpperCase();
    setInputValue(response);
    if (screen >= 9 && (response === 'Q' || response === 'P')) {
      saveResponse(response);
      downloadResponses();
    }
  };

  const saveResponse = (response) => {
    const existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
    existingResponses.push({ screen: screen, response: response });
    localStorage.setItem('responses', JSON.stringify(existingResponses));
    setScreen(6);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if ((screen === 9 || screen === 10) && inputValue === '') {
        return;
      }
      if (screen === 6 || screen === 8) {
        setDelay(1000);
        if (screen === 8) {
          setScreen(screen => targetScreen);
          setTargetScreen(targetScreen => targetScreen + 1);
        } else {
          setScreen(screen => screen + 1);
        }
      } else if (screen === 7) {
        setDelay(500);
        setScreen(screen => screen + 1);
      } else if ((screen === 9 || screen === 10) && inputValue !== '') {
        setInputValue('');
        setDelay(2000);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [screen, delay]);

  const switchScreen = (nextScreen) => {
    if (nextScreen >= 1 && nextScreen <= 5) {
      setScreen(screen + 1);
    } else if (screen === 9 || screen === 10) {
      setScreen(6);
    } else {
      setScreen(screen + 1);
    }
  };
    
  const downloadResponses = () => {
    const data = jsPsych.data.get().json();
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'responses.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <div>
      {screen === 1 && <Screen1 onButtonClick={switchScreen} />}
      {screen === 2 && <Screen2 onButtonClick={switchScreen} />}
      {screen === 3 && <Screen3 onButtonClick={switchScreen} />}
      {screen === 4 && <Screen4 onButtonClick={switchScreen} />}
      {screen === 5 && <Screen5 onButtonClick={switchScreen} />}
      {screen === 6 && <Screen6 />}
      {screen === 7 && <Screen7 />}
      {screen === 8 && <Screen8 />}
      {screen === 9 && <Screen9 value={inputValue} onChange={handleChange} />}
      {screen === 10 && <Screen10 value={inputValue} onChange={handleChange} />}
    </div>
  );
}

export default App;