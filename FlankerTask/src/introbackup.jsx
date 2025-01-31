//BOTTOM of file contains function that doesn't stop for response- 4/9/24

//doesn't move past screen 9- old
import React, { useState } from 'react';
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
     <Typography variant= "h4" justifyContent = 'center'
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
      <Typography justifyContent='center' sx= {{marginTop: "20px", marginLeft: "260px", fontSize: "100px"}}>
      &lt;&lt;&lt;&lt;&lt;
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
      <Typography justifyContent='center' sx= {{marginTop: "20px", marginLeft: "260px", fontSize: "100px"}}>
      &lt;&lt;&gt;&lt;&lt;
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
      <Typography sx= {{color: 'black', fontSize: '16px'}} style= {{marginTop: "-70px", fontWeight: 'bold'}}>
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

    <Typography justifyContent='center' sx= {{marginTop: "20px", marginLeft: "350px", fontSize: "50px"}}>
    &gt;&gt;&lt;&gt;&gt;
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

    <Typography justifyContent='center' sx= {{marginBottom: "100px", marginTop: "-100px", marginLeft: "350px", fontSize: "50px"}}>
    &lt;&lt;&gt;&lt;&lt;
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
      <Typography sx= {{color: 'black', fontSize: '16px'}} style= {{marginTop: "70px", fontWeight: 'bold'}}>
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

const Screen7 = () => (
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
      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid black',
          justifyContent: 'center',
        }}
        style={{
          height: '50px',
          width: '100px',
          alignItems: 'center',
          marginBottom: 'px',
          marginTop: '30px',
          marginLeft: '360px',
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>
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
      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid black',
          justifyContent: 'center',
        }}
        style={{
          height: '50px',
          width: '100px',
          alignItems: 'center',
          marginBottom: '20px',
          marginTop: '380px',
          marginLeft: '360px',
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>
    </Container>
  </Box>
);

//Rotate Screens
function App() {

 

  const [screen, setScreen] = useState(1);


  const switchScreen = () => {
    if (screen == 6) {
        const interval = setInterval(() => {
          setScreen(7)
        }, 1000)
  
    } else if (screen < 7) {
      setScreen((prevScreen) => (prevScreen % 7) + 1);
    }
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
    </div>
  );
}

export default App;

//counting of screens- 3/6/24
function App() {

    const [screen, setScreen] = useState(6);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if(screen < 8) {
          //fix so that it doesn't keep trying to increment/function doesn't keep calling
          setScreen(screen => (screen < 8 ? screen + 1 : screen));
        }
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    
  
    return (
      
      <div className="App">
        <header className="App-header">
        {screen} seconds have elapsed since mounting.
        </header>
      </div>
    );

//Works but doesn't wait for response- 4/9/24
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import confusionImg from './images/confusion.jpg';
import fearImg from './images/fear.jpg';

const incongruent = [confusionImg, confusionImg, fearImg, confusionImg, confusionImg];
const congruent = [confusionImg, confusionImg, confusionImg, confusionImg, confusionImg];

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
      <Typography justifyContent='center' sx= {{color: "white", fontSize: "120px"}}>
      &lt; &lt; &lt; &lt; &lt;
      </Typography>
      <Button
        sx={{
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "280px",
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
          border: '2px solid darkblue',
          justifyContent: 'center',
        }}
        style={{
          height: '150px',
          width: '170px',
          alignItems: 'center',
          bottom: "280px",
          left: "770px"
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>
      <Typography sx= {{color: 'black', fontSize: '16px'}} style= {{ fontWeight: 'bold'}}>
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

// Screen 11: Faces Flanker (Incongruent)
const Screen11 = ({ onButtonClick, value, onChange }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'gray',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      style={{ marginTop: '10px', marginBottom: '10px' }}
    >
      {/* Spacer */}
      <div style={{ flex: 1 }}></div>

      {/* Images */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' }}>
        {/* Map over the array of image sources and render <img> elements */}
        {incongruent.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{ width: '150px', height: '150px', marginRight: '10px' }}
          />
        ))}
      </div>

      {/* Input Field */}
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        style={{ backgroundColor: 'gray', width: '100%', padding: '10px', borderColor: 'gray', margingTop: '20px', marginBottom: '100px' }}
      />
    </Container>
  </Box>
);

// Screen 12: Faces Flanker (Incongruent)
const Screen12 = ({ onButtonClick, value, onChange }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'gray',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      style={{ marginTop: '10px', marginBottom: '10px' }}
    >
      {/* Spacer */}
      <div style={{ flex: 1 }}></div>

      {/* Images */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' }}>
        {/* Map over the array of image sources and render <img> elements */}
        {congruent.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{ width: '150px', height: '150px', marginRight: '10px' }}
          />
        ))}
      </div>

      {/* Input Field */}
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        style={{ backgroundColor: 'gray', width: '100%', padding: '10px', borderColor: 'gray', margingTop: '20px', marginBottom: '100px' }}
      />
    </Container>
  </Box>
);
//Screen 13- End Slide
const Screen13 = ({ onButtonClick, value, onChange }) => (
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
      style={{ marginTop: '120px', marginBottom: '10px' }}>
      
      <Typography justifyContent='center' sx= {{marginTop: "100px", marginLeft: "160px", fontSize: "100px"}}>
        Thank you!
      </Typography>
    </Container>
  </Box>
);


function App() {
  const [screen, setScreen] = useState(1);
  const [delay, setDelay] = useState(1000);
  const [inputValue, setInputValue] = useState('');
  const [targetScreen, setTargetScreen] = useState(8);
  const [responses, setResponses] = useState([]);

  const handleChange = (event) => {
    const response = event.target.value.trim().toUpperCase();
    setInputValue(response);
    console.log(response);
    if (screen >= 9 && (response === 'Q' || response === 'P')) {
      saveResponse(response);
      console.log("saved responses");
    }
  };

  const saveResponse = (response) => {
    const existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
    const updatedResponses = [...existingResponses, { screen: screen, response: response}]; 
    localStorage.setItem('responses', JSON.stringify(updatedResponses));
    setResponses(updatedResponses);
    console.log("setting screen 6");
    setScreen(6);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if ((screen === 9 || screen === 10 || screen === 11 || screen === 12) && inputValue === '') {
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
      } else if ((screen === 9 || screen === 10|| screen === 11 || screen === 12) && inputValue !== '') {
        console.log("true");
        setInputValue('');
        setScreen(6);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [screen, delay]);

 useEffect(() => {
  console.log("Screen state changed:", screen);
  if (screen === 13) {
    console.log("Screen reached 13, downloading responses...");
    downloadResponses();
  }
}, [screen]);


  const switchScreen = (nextScreen) => {
    if (nextScreen >= 1 && nextScreen <= 5) {
      setScreen(screen + 1);
    } else if (screen === 9 || screen === 10 || screen === 11 || screen === 12) {
      setScreen(6);
    } else {
      setScreen(screen + 1);
    }
  };


    
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
    sendDataToREDCap(responses);
    //clear out local Storage
    localStorage.removeItem('responses');
  };

  // Function to send data to REDCap
  function sendDataToREDCap(data) {
    console.log("Sending responses to RedCap")
    // Scrape PID from URL
    const urlParams = new URLSearchParams(window.location.search);
    let userid = null;
      if (urlParams.has('PID')) {
        userid = urlParams.get('PID');
      } else {
        userid = 10;
        console.warn("Warning: No PID found in the URL.");
      }
        if (!userid) {
            console.error("Cannot send data: No PID found.");
            return;
        }

      const url = 'https://redcap.case.edu/api/';
      const body = {
          'token': '6543B93BA07C88CFA3FD68E9692B1A87',
          'content': 'record',
          'format': 'json',
          'type': 'flat',
          'overwriteBehavior': 'normal',
          'forceAutoNumber': 'false',
          'data': JSON.stringify([{
              'record_id': userid,
              'flanker_data_json': JSON.stringify(data),
              'form_1_complete': '2'
          }]),
          'returnContent': 'count',
          'returnFormat': 'json'
      };

      // Send POST request to REDCap API
      $.post(url, body)
          .done(function(response) {
              console.log('Data sent to REDCap. Response:', response);
          })
          .fail(function(error) {
              console.error('Failed to send data to REDCap:', error);
          });
  }


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
      {screen === 11 && <Screen11 value={inputValue} onChange={handleChange} />}
      {screen === 12 && <Screen12 value={inputValue} onChange={handleChange} />}
      {screen === 13 && <Screen13 />}
    </div>
  );
}


//old FaceExperiment/images code- 8/29
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import confusionImg from './images/confusion.jpg';
import fearImg from './images/fear.jpg';
import Papa from 'papaparse';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 


const incongruent = [confusionImg, confusionImg, fearImg, confusionImg, confusionImg];
const congruent = [confusionImg, confusionImg, confusionImg, confusionImg, confusionImg];

  //change so that relative to window size-use windowWidth; align button with text  
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
     Welcome to the Face Experiment! <br />

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
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography justifyContent='center' sx= {{position: 'relative', left: '120px', fontSize: "150px", color: 'white'}}>
        &lt; &lt; &lt; &lt; &lt;
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
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      <Typography justifyContent='center' sx= {{position: 'relative', left: '140px', fontSize: "150px", color: 'white'}}>
      &lt; &lt; &gt; &lt; &lt;
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
//Screen 13
const Screen13 = ({ onButtonClick, value, onChange }) => (
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
      style={{ marginTop: '120px', marginBottom: '10px' }}>

      <Typography justifyContent='center' sx= {{marginTop: "100px", marginLeft: "160px", fontSize: "100px"}}>
        Thank you!
      </Typography>
    </Container>
  </Box>
);

// Screen 12: Faces Flanker (Incongruent)
const Screen11 = ({ onButtonClick, value, onChange }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      style={{ marginTop: '10px', marginBottom: '10px' }}
    >
      {/* Spacer */}
      <div style={{ flex: 1 }}></div>

      {/* Images */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' }}>
        {/* Map over the array of image sources and render <img> elements */}
        {incongruent.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{ width: '150px', height: '150px', marginRight: '10px' }}
          />
        ))}
      </div>

      {/* Input Field */}
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        style={{ backgroundColor: 'gray', width: '100%', padding: '10px', borderColor: 'gray', margingTop: '20px', marginBottom: '100px' }}
      />
    </Container>
  </Box>
);

// Screen 12: Faces Flanker (Incongruent)
const Screen12 = ({ onButtonClick, value, onChange }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      style={{ marginTop: '10px', marginBottom: '10px' }}
    >
      {/* Spacer */}
      <div style={{ flex: 1 }}></div>

      {/* Images */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' }}>
        {/* Map over the array of image sources and render <img> elements */}
        {congruent.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{ width: '150px', height: '150px', marginRight: '10px' }}
          />
        ))}
      </div>

      {/* Input Field */}
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        style={{ backgroundColor: 'gray', width: '100%', padding: '10px', borderColor: 'gray', margingTop: '20px', marginBottom: '100px' }}
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
  const [responses, setResponses] = useState([]);
  const [stopwatch, setStopwatch] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [patterns, setPatterns] = useState([]);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

   //loop through CSV patterns for images
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/flanker_schedule_mini_images');
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
              //makes entire correct column uppercase
              .map(row => row.correct.toUpperCase());
              //store congruency of each pattern
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

  // Automatically cycle through patterns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPatternIndex(prevIndex => (prevIndex + 1) % patterns.length);
    }, 3000); // Update every 3 seconds or as needed
    return () => clearInterval(interval);
  }, [patterns.length]);

  //timer code
  useEffect(() => {
      let interval = null;
      if (timerActive) {
          interval = setInterval(() => {
              setStopwatch(prevTime => prevTime + 1); // Update every 1 ms
          }, 1);
      } else {
          clearInterval(interval);
      }
      return () => clearInterval(interval);
  }, [timerActive]);
 
  //stops timer when keydown for Q or P
  useEffect(() => {
      const handleKeyDown = (event) => {
          const { key } = event;
          if ((screen === 9 || screen === 10 || screen === 11 || screen === 12) && (key === 'Q' || key === 'P')) {
              setTimerActive(false);
              console.log(Date.now());
              saveResponse(key, stopwatch);
          }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, [screen, stopwatch]);

  useEffect(() => {
      if (screen === 9 || screen === 10 || screen === 11 || screen === 12) {
          setStopwatch(0);
          setTimerActive(true);
          console.log(Date.now());
      }
  }, [screen]);

  const handleChange = (event) => {
      const response = event.target.value.trim().toUpperCase();
      setInputValue(response);
      if (screen >= 9 && (response === 'Q' || response === 'P')) {
          saveResponse(response, stopwatch);
      }
  };

  const saveResponse = (response, duration) => {
      const existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
      const newResponse = {
          screen: screen,
          response: response,
          duration: duration
      };
      const updatedResponses = [...existingResponses, newResponse];
      localStorage.setItem('responses', JSON.stringify(updatedResponses));
      setResponses(updatedResponses);
      setScreen(6);
  };

  useEffect(() => {
      const interval = setInterval(() => {
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
          } else if ((screen === 9 || screen === 10 || screen === 11 || screen === 12) && inputValue !== '') {
              setInputValue('');
          }
      }, delay);
      return () => clearInterval(interval);
  }, [screen, delay]);

  useEffect(() => {
      if (screen === 13) {
          console.log("Screen reached 13, downloading responses...");
          downloadResponses();
      }
  }, [screen]);

  const switchScreen = (nextScreen) => {
      if (nextScreen >= 1 && nextScreen <= 5) {
          setScreen(screen + 1);
      } else if (screen === 9 || screen === 10 || screen === 11 || screen === 12) {
          setScreen(6);
      } else {
          setScreen(screen + 1);
      }
  };

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

  const sendDataToREDCap = (data) => {
      console.log("Sending responses to RedCap");
      const urlParams = new URLSearchParams(window.location.search);
      const userid = urlParams.get('PID') || '10';
      const url = 'https://redcap.case.edu/api/';
      const body = {
          method: 'POST',
          token: '6543B93BA07C88CFA3FD68E9692B1A87',
          content: 'record',
          format: 'json',
          type: 'flat',
          overwriteBehavior: 'normal',
          forceAutoNumber: 'false',
          data: JSON.stringify([{
              'record_id': userid,
              'flanker_data_json': data,
              'flanker_data_complete': '2'
          }]),
          returnContent: 'count',
          returnFormat: 'json'
      };

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
      {screen === 9 && <Screen9 value={inputValue} onChange={handleChange} />}
      {screen === 10 && <Screen10 value={inputValue} onChange={handleChange} />}
      {screen === 11 && <Screen11 value={inputValue} onChange={handleChange} />}
      {screen === 12 && <Screen12 value={inputValue} onChange={handleChange} />}
      {screen === 13 && <Screen13 />}
    </div>
  );
}

export default App;