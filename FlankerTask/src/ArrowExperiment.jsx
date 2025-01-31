import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Papa from 'papaparse';
import axios from 'axios';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 

// Screen 1- Welcome Screen
const Screen1 = ({ onButtonClick, experiment, continued}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100%',
      height: '100vh',
      padding: '5%',
      boxSizing: 'border-box',
    }}
  >
     {continued ? ( 
      <Typography 
      align="center" 
      variant="h4"
      sx={{
        color: "white",
        marginBottom: '5vh',
        fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem'},
        fontWeight: 'bold'
      }}
    >
        Welcome back! < br/>
        You will now complete another round of the same task you did earlier. Please keep your index fingers on the Q and P keys and press the Q key when the MIDDLE arrow is pointed left and the P key when the MIDDLE arrow is pointing right. Please respond as quickly as possible but without making mistakes. < br/> Press the spacebar to begin.
      </Typography> ) :
     (
      <>
      <Typography 
      align="center" 
      variant="h4"
      sx={{
        color: "white",
        marginBottom: '5vh',
        fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem'},
        fontWeight: 'bold'
      }}
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
          color: 'white',
          padding: '10px 20px',
          fontSize: {xs: '0.8rem', sm: '1rem'},
          '&:hover': {
            backgroundColor: 'darkgray',
          },
        }}
      >
        Continue
      </Button>
      </>
    )}
    </Box>
);


//Screen 2- Intro
const Screen2 = ({ onButtonClick, experiment }) => (
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        border: '2px solid black',
        backgroundColor: 'black',
        pt: 4,
        pb: 2,
      }}
    >
      <Button
        sx={{
          border: '2px solid white',
          height: { xs: '100px', sm: '120px', md: '150px' },
          width: { xs: '120px', sm: '140px', md: '170px' },
          position: 'absolute',
          top: '5%',
          left: {xs: '5%', sm: '7%', md: '0%'},
          transform: {
            xs: 'none',
            sm: 'translateX(-10%)',
            md: 'translateX(-75%)'
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid white',
          height: { xs: '100px', sm: '120px', md: '150px' },
          width: { xs: '120px', sm: '140px', md: '170px' },
          position: 'absolute',
          top: '5%',
          right: {xs: '5%', sm: '7%', md: '0%'},
          transform: {
            xs: 'none',
            sm: 'translateX(10%)',
            md: 'translateX(75%)'
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>

      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        mt: { xs: '120px', sm: '140px', md: '0' }, // Add top margin on smaller screens
      }}>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "60px", sm: "80px", md: "120px" },
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          &lt; &lt; &lt; &lt; &lt;
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2,
          mt: { xs: 2, sm: 3, md: 4 },
          mb: { xs: '5%', sm: '7%', md: '10%' },
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
            textAlign: 'center',
            fontWeight: 'bold',
            mb: { xs: 2, sm: 3, md: 4 },
            marginTop: '40px'
          }}
        >
          A set of five arrows will be shown in the center of the screen. <br />
          Your task will be to indicate the direction of the MIDDLE arrow. <br /> <br />
          To submit your answer, press one of the following keys: <br />
          Q if the MIDDLE arrow is pointing to the LEFT <br />
          P if the MIDDLE arrow is pointing to the RIGHT.<br /> <br/>
          Press Continue to read further instruction.
        </Typography>

        <Button
          onClick={onButtonClick}
          sx={{
            border: '2px solid white',
            backgroundColor: 'grey',
            color: 'white',
            height: '50px',
            width: '100px',
            mt: 2,
          }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  </Box>
);


// Screen 3- Incongruent Stimulus
const Screen3 = ({ onButtonClick, experiment }) => (
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        border: '2px solid black',
        backgroundColor: 'black',
        pt: 4,
        pb: 2,
      }}
    >
      <Button
        sx={{
          border: '2px solid white',
          height: '150px',
          width: '170px',
          position: 'absolute',
          top: '5%',
          left: {xs: '5%', sm: '7%', md: '0%'},
          transform: {
            xs: 'none',
            sm: 'translateX(-10%)',
            md: 'translateX(-75%)'
          },
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
          height: '150px',
          width: '170px',
          position: 'absolute',
          top: '5%',
          right: {xs: '5%', sm: '7%', md: '0%'},
          transform: {
            xs: 'none',
            sm: 'translateX(10%)',
            md: 'translateX(75%)'
          },
        }}
      >
        <Typography sx={{ fontSize: '50px', color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "100px", sm: "120px", md: "150px" },
            textAlign: 'center'
          }}
        >
           &lt; &lt; &gt; &lt; &lt;
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2,
          mb: '10%',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 10,
          }}
        >
      Sometimes the surrounding arrows will point <br /> in the opposite direction than the arrow in the middle. <br /> <br />
      Only pay attention to the MIDDLE arrow! <br /> <br />
      Press Continue to read further instruction.
        </Typography>

        <Button
          onClick={onButtonClick}
          sx={{
            border: '2px solid white',
            backgroundColor: 'grey',
            color: 'white',
            height: '50px',
            width: '100px',
            mt: 2,
          }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  </Box>
);


//Screen 4 - Example
const Screen4 = ({ onButtonClick, experiment }) => (
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        border: '2px solid black',
        backgroundColor: 'black',
        pt: 2,
        pb: 2,
      }}
    >
      <Box sx={{ position: 'relative', height: '120px' }}>
        <Button
          sx={{
            border: '2px solid white',
            height: { xs: '100px', sm: '120px', md: '150px' },
            width: { xs: '120px', sm: '140px', md: '170px' },
            position: 'absolute',
            top: '5%',
            left: {xs: '5%', sm: '7%', md: '0%'},
            transform: {
              xs: 'none',
              sm: 'translateX(-10%)',
              md: 'translateX(-75%)'
            },
          }}
        >
          <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
            Q
            <br />
            &lt;
          </Typography>
        </Button>

        <Button
          sx={{
            border: '2px solid white',
            height: { xs: '100px', sm: '120px', md: '150px' },
            width: { xs: '120px', sm: '140px', md: '170px' },
            position: 'absolute',
            top: '5%',
            right: {xs: '5%', sm: '7%', md: '0%'},
            transform: {
              xs: 'none',
              sm: 'translateX(10%)',
              md: 'translateX(75%)'
            },
          }}
        >
          <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
            P
            <br />
            &gt;
          </Typography>
        </Button>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', mt: 2 }}>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          In the example below, the left [Q]-key is correct:
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "25px", sm: "28px", md: "30px" },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          &lt; &lt; &lt; &lt; &lt;
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          since the middle arrow is pointing to the left.
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          In the example below, the right [P]-key is correct:
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "20px", sm: "28px", md: "32px" },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          &lt; &lt; &gt; &lt; &lt;
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          since the middle arrow is pointing to the right.
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Press Continue for further instruction.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Button
          onClick={onButtonClick}
          sx={{
            border: '2px solid white',
            backgroundColor: 'grey',
            color: 'white',
            height: '50px',
            width: '100px',
          }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  </Box>
);

//Begin Practice Round- Screen 5
const Screen5 = ({ experiment }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        maxHeight: '100vh',
        position: 'relative',
        border: '2px solid black',
        backgroundColor: 'black',
        pt: { xs: 10, sm: 12, md: 4 },
        pb: 2,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Button
        sx={{
          border: '2px solid white',
          height: { xs: '100px', sm: '120px', md: '150px' },
          width: { xs: '120px', sm: '140px', md: '170px' },
          position: 'absolute',
          top: { xs: '2%', sm: '3%', md: '5%' },
          left: { xs: '5%', sm: '7%', md: '0%' },
          transform: {
            xs: 'none',
            sm: 'translateX(-10%)',
            md: 'translateX(-75%)'
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid white',
          height: { xs: '100px', sm: '120px', md: '150px' },
          width: { xs: '120px', sm: '140px', md: '170px' },
          position: 'absolute',
          top: { xs: '2%', sm: '3%', md: '5%' },
          right: { xs: '5%', sm: '7%', md: '0%' },
          transform: {
            xs: 'none',
            sm: 'translateX(10%)',
            md: 'translateX(75%)'
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>

      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: { xs: 16, sm: 20, md: 16 },
        mb: { xs: 2, sm: 3, md: 4 },
      }}>
        <Typography
          sx={{
            color: "white",
            fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem'},
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          You will now be given a chance to practice<br /> before the test begins. <br /> <br />
          Remember:
          Keep focusing on the fixation point in the center of the screen and answer as quickly as possible but avoid mistakes. <br /><br />
          Place your index fingers on the [Q] and [P] keys. <br />
          Press the space bar to begin the Practice Block.
        </Typography>
      </Box>
      
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: 'auto',
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      > */}
        {/* <Button
          onClick={onButtonClick}
          sx={{
            border: '2px solid white',
            backgroundColor: 'grey',
            color: 'white',
            height: '50px',
            width: '100px',
          }}
        >
          Start
        </Button> */}
      {/* </Box> */}
    </Container>
  </Box>
);

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
//Flanker Screen 7- Cross
const Screen7 = ({ onButtonClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid black',
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '80px', sm: '120px', md: '200px' },
          color: 'white',
          textAlign: 'center',
          mb: { xs: 2, sm: 3, md: 4 },
          lineHeight: 1,
        }}
      >
        +
      </Typography>
    </Container>
  </Box>
);

// Flanker Screen 8- Blank
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
const Screen9 = ({ onButtonClick, value, onChange, currentPattern1, tooSlow, tooFast }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
      overflow: 'auto',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid black',
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '80px', sm: '120px', md: '150px' },
          color: 'white',
          textAlign: 'center',
          mb: { xs: 2, sm: 3, md: 4 },
          lineHeight: 1,
        }}
      >
        {currentPattern1}
      </Typography>
      
      {tooSlow && (
        <Typography
          sx={{
            fontSize: { xs: '24px', sm: '36px', md: '50px' },
            color: 'red',
            textAlign: 'center',
            mt: { xs: 2, sm: 3, md: 4 },
          }}
        >
          Too Slow! Press Space to continue.
        </Typography>
      )}
       {tooFast && (
        <Typography
          sx={{
            fontSize: { xs: '24px', sm: '36px', md: '50px' },
            color: 'red',
            textAlign: 'center',
            mt: { xs: 2, sm: 3, md: 4 },
          }}
        >
          Too Fast! Press Space to continue.
        </Typography>
      )}
    </Container>
  </Box>
);

//Screen 10- Experiment Begins
const Screen10 = ({ onStartClick, onPracticeClick, experiment }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        maxHeight: '100vh',
        position: 'relative',
        border: '2px solid black',
        backgroundColor: 'black',
        pt: { xs: 10, sm: 12, md: 4 },
        pb: 2,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Q and P buttons remain unchanged */}
      <Button
        sx={{
          border: '2px solid white',
          height: { xs: '100px', sm: '120px', md: '150px' },
          width: { xs: '120px', sm: '140px', md: '170px' },
          position: 'absolute',
          top: { xs: '2%', sm: '3%', md: '5%' },
          left: { xs: '5%', sm: '7%', md: '0%' },
          transform: {
            xs: 'none',
            sm: 'translateX(-10%)',
            md: 'translateX(-75%)'
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
          Q
          <br />
          &lt;
        </Typography>
      </Button>

      <Button
        sx={{
          border: '2px solid white',
          height: { xs: '100px', sm: '120px', md: '150px' },
          width: { xs: '120px', sm: '140px', md: '170px' },
          position: 'absolute',
          top: { xs: '2%', sm: '3%', md: '5%' },
          right: { xs: '5%', sm: '7%', md: '0%' },
          transform: {
            xs: 'none',
            sm: 'translateX(10%)',
            md: 'translateX(75%)'
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white' }}>
          P
          <br />
          &gt;
        </Typography>
      </Button>
 {/* Conditionally render different screens */}
 {experiment === 'A1' ? (
          // Version for experiment A1
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              mt: { xs: 16, sm: 20, md: 16 },
              mb: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '18px', sm: '22px', md: '26px' },
                textAlign: 'center',
                fontWeight: 'bold',
                mb: { xs: 3, sm: 4, md: 5 },
                maxWidth: '90%',
              }}
            >
              The experiment will now begin.
              <br /> <br />
              Press Start to begin the Experiment Block.
              <br />
              If you would like additional practice, press Practice More.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: { xs: 2, sm: 3 },
                mt: { xs: 2, sm: 3 },
              }}
            >
              <Button
                onClick={onStartClick}
                sx={{
                  border: '2px solid white',
                  backgroundColor: 'grey',
                  color: 'white',
                  height: '50px',
                  width: { xs: '80%', sm: '150px' },
                  fontSize: { xs: '16px', sm: '18px' },
                }}
              >
                Start
              </Button>
              <Button
                onClick={onPracticeClick}
                sx={{
                  border: '2px solid white',
                  backgroundColor: 'grey',
                  color: 'white',
                  height: '50px',
                  width: { xs: '80%', sm: '150px' },
                  fontSize: { xs: '16px', sm: '18px' },
                }}
              >
                Practice More
              </Button>
            </Box>
          </Box>
        ) : (
          // Version for experiments A2 & A3
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              mt: { xs: 16, sm: 20, md: 16 },
              mb: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '18px', sm: '22px', md: '26px' },
                textAlign: 'center',
                fontWeight: 'bold',
                mb: { xs: 3, sm: 4, md: 5 },
                maxWidth: '90%',
              }}
            >
              The experiment will now begin.
              <br />
              Press the space bar to begin the Experiment Block.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );

//Screen 11
const Screen11 = ({ onButtonClick, value, onChange, experiment, PID }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      border: 'none',
      overflow: 'auto',
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid black',
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '48px', sm: '72px', md: '100px' },
          color: 'white',
          textAlign: 'center',
          mb: { xs: 3, sm: 4, md: 5 },
          fontWeight: 'bold'
        }}
      >
        Thank you!
      </Typography>
      
      {experiment === "A1" && (
        <Typography
          component="a"
          href={`https://flankertask.netlify.app?exp=F1&PID=${PID}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2.0rem', md: '2.5rem' },
            color: 'white',
            textAlign: 'center',
            mt: { xs: 2, sm: 3, md: 4 },
            textDecoration: 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Click this link to the second attention game! 
        </Typography>
      )}
    </Container>
  </Box>
);

//Screen 12- Break Screen every 50 trials

const Screen12 = ({ onBreakEnd }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup timeout
    } else {
      onBreakEnd(); // Call the callback to resume the experiment
    }
  }, [countdown, onBreakEnd]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none',
        overflow: 'auto',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid black',
          backgroundColor: 'black',
          height: { xs: '80vh', md: '60vh' },
          width: '100%',
          padding: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '32px', sm: '48px', md: '60px' },
            color: 'white',
            textAlign: 'center',
            maxWidth: '100%',
            fontWeight: 'bold'
          }}
        >
          Break Time!
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '20px', sm: '25px', md: '30px' },
            color: 'white',
            textAlign: 'center',
            marginTop: 2,
          }}
        >
          Experiment will resume in {countdown} seconds.
        </Typography>
      </Container>
    </Box>
  );
};

//Rotate Screens
const ArrowExperiment = ({ experiment, PID }) => {
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
  const [tooFast, setTooFast] = useState(false);
  const [takeBreak, setTakeBreak] = useState(false);
  const [skipped, setSkipped] = useState([]);
  const [keyPressed, setKeyPressed] = useState(false);
  const [continued, setContinued] = useState(false);


  
  //loop through CSV patterns
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Determine which csv file to load based on experiment type
        let csvFile;
        if (experiment === 'A1' || experiment === 'A2') {
            csvFile = '/flanker_arrows_A1.csv';
        } else {  // A3
            csvFile = '/flanker_arrows_A3.csv';
            setCurrentPatternIndex(8);
            //show summarized instructions
            setContinued(true);
        }
        console.log("Experiment:", experiment);
        const response = await axios.get(csvFile);
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
  }, [continued, experiment]);

//check currentPatternIndex and patterns array
  useEffect(() => {
    console.log("Current Pattern Index:", currentPatternIndex);
    console.log(PID);
    console.log("Current Pattern:", patterns[currentPatternIndex]);
  }, [currentPatternIndex, patterns]);
  
//use to advance from screen 5 to practice round and screen 10 to experiment
useEffect(() => {
  if(screen === 5 || screen === 10 || screen === 1 && continued == true) {
    const handleStart = (event) => {
      //press space to advance to patterns
      if (event.code == 'Space') {
        //move to experiment
        if (screen === 10 || screen === 1 && continued == true) {
          setTargetScreen(11);
        }  
        //if A2, skip reminders
        if (experiment === 'A2' || experiment === 'A3') {
          setScreen(7);
        }
        //reminders screen
        else {
          setScreen(6);
        }
      }
  }
  
  //event listener for keydown
  window.addEventListener('keydown', handleStart);
  //clean up event listener
  return () => {
    window.removeEventListener('keydown', handleStart);
  };
}
}, [screen, continued, experiment]);

 //after hit space bar, move pattern to end and remove event listener
 const handleSpace = (event) => {
    console.log("handle space");
    console.log(tooFast);
    if ((tooFast || tooSlow) && event.code === 'Space') {
      movePatternToEnd();
      setCurrentPatternIndex(prevIndex => (prevIndex + 1));
      console.log(currentPatternIndex);
      //if every 50 trials, set takebreak to true
      //change to 58
      if(currentPatternIndex % 58 == 0) {
          setTakeBreak(true);
      }
      if(tooFast == true) {
        // hides the too fast message 
        setTooFast(false); 
      }
      else {
        //save response if tooSlow
        saveResponse(null, 2000);
        // hides the too slow message
        setTooSlow(false);
      }
      console.log("added null trial");
      window.removeEventListener('keydown', handleSpace); // remove the event listener after handling the event
    }
};

//if takes more than 2 seconds, too slow message, and move pattern back
useEffect(() => {
  let slow, move;
  //stores start time for pattern
    if (screen === 9 && currentPatternIndex >= 8) {
      setStartTime(Date.now());
      console.log(startTime);
      
      //waits 2 seconds, then says too slow and adds event listener for space bar
      slow = setTimeout(() => {
        if (!tooFast) {
          setTooSlow(true);
          //add event listener for user to hit space bar
          window.addEventListener('keydown', handleSpace); 
        }
      }, 2000);  
  };
  

  //clean up
  return () => {
    clearTimeout(slow);
    clearTimeout(move);
    if(tooSlow) {
      window.removeEventListener('keydown', handleSpace); 
    }
  };
  // renders every time following variables update
}, [screen, currentPatternIndex, tooSlow, tooFast]);


//moves pattern to end of list if participant takes longer than 5 sec
  const movePatternToEnd = () => {
      console.log("Moving Pattern to Back")
      //replace patterns with new rearranged array
      //takes previous state(prevSkipped) as arg and returns new state as array with currPatternIndex
      setPatterns(prevPatterns => {
        //copy current array from arg prevPatterns
        const updatedPatterns = [...prevPatterns];
        //remove current pattern from array and store pattern
        const currentPattern = updatedPatterns[currentPatternIndex];
        //adds pattern to end of array
        updatedPatterns.push(currentPattern);
        console.log("Patterns array:", updatedPatterns);
        return updatedPatterns
      });
      //replace correct answer patterns with new rearranged array
      setCorrectAnswers(prevCorrectAnswers => {
        //copy current array from arg prevCorrectAnswers
        const updatedCorrectAnswers = [...prevCorrectAnswers];
        //remove current answer from array and store answer
        const currentCorrectAnswer = updatedCorrectAnswers[currentPatternIndex];
        //adds correct answer to end of array
        updatedCorrectAnswers.push(currentCorrectAnswer);
        return updatedCorrectAnswers;
    });
      //replace congruency for patterns with new rearranged array
      setCongruency(prevCongruency => {
        //copy current array of congruencies from arg prevCongruency
        const updatedCongruency = [...prevCongruency];
        //remove current congruency from array and store answer
        const currentCongruency = updatedCongruency[currentPatternIndex];
        //adds correct congruency to end of array
        updatedCongruency.push(currentCongruency);
        return updatedCongruency;
    });
      //update the skipped array
      setSkipped(prevSkipped => {
          const updatedSkipped = [...prevSkipped, currentPatternIndex];
          console.log("Skipped array:", updatedSkipped);
          return updatedSkipped;
      });
      setTooSlow(false);
      if (experiment === 'A2' || experiment === 'A3') {
        setScreen(7);
      }
      else {
        setScreen(6);
      }
  };

   
  //stops timer when keydown for Q or P
  useEffect(() => {
      const handleKeyDown = (event) => {
          //key = event.key
          //extract key property from event
          const { key } = event
          //Experiment Block
          //only process keydown if no key is currently pressed
          if (!tooSlow && !tooFast && !keyPressed && (key === 'Q' || key === 'P' || key === 'q' || key === 'p')) {
            //since key has been assigned, key has been pressed
            setKeyPressed(true);
            //if experiment trial
            if ((screen === 9) && (currentPatternIndex >= 8)) {
                const endTime = Date.now();
                const duration = endTime - startTime;
                console.log(startTime);
                console.log(endTime);
                console.log("Response duration:", duration);
                //if too fast response, mark as incorrect and send to end of experiment
                if (duration < 150) {
                  //save response and duration if tooFast
                  saveResponse(key.toUpperCase(), duration);
                  setTooFast(true);
                }
                else {
                  saveResponse(key.toUpperCase(), duration);
                  setCurrentPatternIndex(prevIndex => (prevIndex + 1));
                  //if every 50 trials, set takebreak to true
                  //change to 58 for full experiment
                  if (currentPatternIndex % 58 == 0) {
                    setTakeBreak(true);
                  }
                  setInputValue(''); // Clear input field for the next pattern
              }
            }
            //Practice Block
            else if((screen === 9) && (key.toUpperCase() == correctAnswers[currentPatternIndex])) {
              setCurrentPatternIndex(prevIndex => (prevIndex + 1));
              setInputValue('');
              if (experiment === 'A2' || experiment === 'A3') {
                setScreen(7);
              }
              else {
                setScreen(6);
              }
            }
        }
      };

      //keyup/released key handler to reset keyPressed state
      const handleKeyUp = (event) => {
        const { key } = event;
        if(key === 'Q' || key === 'P' || key === 'q' || key === 'p') {
          //mark key as released
          setKeyPressed(false);
        }
      }

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
      };
  }, [screen, stopwatch, tooSlow, keyPressed, tooFast]);

   //useEffect to listen for space when tooFast
   useEffect(() => {
    if (tooFast) {
      window.addEventListener('keydown', handleSpace);
      return () => window.removeEventListener('keydown', handleSpace);
    }
  }, [tooFast]);

  
  //creates new response object with screen number, response, and time
  const saveResponse = (response, duration) => {
      const existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
      
      //set trial number
      let trialNumber = currentPatternIndex;
      //when currentPatternIndex is greater than total number of trials
      //change based on total number of trials!!!
      if(currentPatternIndex >= 208 && skipped.length > 0) {
          trialNumber = skipped.shift();
          console.log("Setting new Trial Number");
      }
      //check accuracy and store for result
      let accuracy = false;
      if (response == correctAnswers[trialNumber]){
          accuracy = true;
      }
      //set congruency
      let congruent = congruency[trialNumber]
     
      const newResponse = {
          trial: currentPatternIndex - 7,
          response: response,
          duration: duration, 
          accuracy: accuracy, 
          congruency: congruent,
          experiment: experiment,
          id: PID
      };
      

  //adds new response object to array of responses
      const updatedResponses = [...existingResponses, newResponse];
        localStorage.setItem('responses', JSON.stringify(updatedResponses));
        setResponses(updatedResponses);
        console.log(newResponse);
        if (screen >= 9) {
          if (experiment === 'A2' || experiment === 'A3') {
            setScreen(7);
          }
          else {
            setScreen(6);
          }
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
          //when hit currentPatternIndex = 58, give 10 sec break
          if(currentPatternIndex > 0 && currentPatternIndex % 2 == 0 && takeBreak == true) {
              console.log("setting screen 12");
              setScreen(12);
              setTimeout(() => {
                if (experiment === 'A2' || experiment === 'A3') {
                  setScreen(7);
                }
                else {
                  setScreen(6);
                }
                setTakeBreak(false);
              }, 10000);
          }
          else if (currentPatternIndex >= patterns.length) {
              setScreen(11); // change screen to 11 after last pattern
          } 
          else if (targetScreen === 11) {
              setScreen(9); // Transition to screen 9 after patterns in screen 8
              setStartTime(Date.now());
              console.log(startTime);
          }
          else if (currentPatternIndex === 8 && !continued) {
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
          if (experiment === "A2" || experiment === "A3") {
            downloadResponses();
          }
      }
  }, [screen]);

  //rotates instruction screens 1-5 and experiment screens
  const switchScreen = (nextScreen) => {
      if (nextScreen >= 1 && nextScreen <= 5) {
          setScreen(screen + 1);
      } else if (screen === 9 || screen == 10) {
        if (experiment === 'A2' || experiment === 'A3') {
          setScreen(7);
        }
        else {
          setScreen(6);
        }
      } 
      else {
          setScreen(screen + 1);
      }
  };

   //at screen 10, begin experiment
   const handleStartClick = () => {
     console.log("Starting the experiment block...");
    setTargetScreen(11);
    switchScreen(10);
  };

  // //at screen 10, repeat practice round
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
      //custom download name : ID_experiment.json
      a.download = `${PID}_${experiment}.json`;
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
      const userid = PID || '10';
      console.log(typeof userid)
      //REDCap API endpoint
      if(experiment === 'F1' || experiment === 'A1') {
        const url = 'https://redcap.case.edu/api/';
      }
      else {
        const url = 'https://redcap.uits.iu.edu/api/';
      }
     
      // Determine which field to use based on the experiment
      let dataField = 'flanker_data_json';
      if (experiment === 'F1' || experiment === 'A3') {
          dataField = 'flanker_data_json_2';
      }

      //data to be sent to REDCap API
      const body = {
          method: 'POST',
          //API Token
          token: (experiment === 'F1' || experiment === 'A1') 
          ? '6543B93BA07C88CFA3FD68E9692B1A87' 
          //change for A2, A3 token
          : '0',
          content: 'record',
          format: 'json',
          type: 'flat',
          overwriteBehavior: 'normal',
          forceAutoNumber: 'false',
          data: JSON.stringify([{
              'record_id': userid,
              //change for faces as well
              [dataField]: data,
              //make flanker_data_json_2 for F1 and A3
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

  const handleBreakEnd = () => {
    setScreen(6); // Return to the experiment after the break
    setTakeBreak(false); // Reset the break state
  };

  return (
    <div>
      {screen === 1 && <Screen1 experiment = { experiment } continued = { continued } onButtonClick={() => switchScreen(2)} />}
      {screen === 2 && <Screen2 onButtonClick={() => switchScreen(3)} />}
      {screen === 3 && <Screen3 onButtonClick={() => switchScreen(4)} />}
      {screen === 4 && <Screen4 onButtonClick={() => switchScreen(5)} />}
      {screen === 5 && <Screen5 />}
      {screen === 6 && <Screen6 />}
      {screen === 7 && <Screen7 />}
      {screen === 8 && <Screen8 />}
      {screen === 9 && <Screen9 value={inputValue} onChange={(e) => setInputValue(e.target.value)} currentPattern1={patterns[currentPatternIndex]} tooSlow={tooSlow} tooFast={tooFast}/>}
      {screen === 10 && <Screen10 experiment = {experiment} onStartClick={handleStartClick} onPracticeClick={handlePracticeClick}/>}
      {screen === 11 && <Screen11 experiment = {experiment} PID = {PID} />}
      {screen === 12 && <Screen12 onBreakEnd={handleBreakEnd} />}
    </div>
  );
}

export default ArrowExperiment;