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
      Welcome! <br /> <br /> 
      Before beginning the experiment, <br/> please read the instructions carefully. <br /> <br />
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
  </Box>
);


// Screen 2- Congruent Stimulus + P and Q Buttons
const Screen2 = ({ onButtonClick}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      position: 'relative',
      border: 'none',
    }}
  >

    <Button
      sx={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        border: '2px solid white',
        height: '150px',
        width: '170px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: '50px', color: 'white' }}>Q</Typography>
      <img 
        src="neutral_face.png"
        alt="neutral face"
        style={{
          width: '50px',
          height: '50px',
          marginTop: '10px'
        }}
      />
    </Button>


    <Button
      sx={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        border: '2px solid white',
        height: '150px',
        width: '170px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: '50px', color: 'white' }}>P</Typography>
      <img 
        src="angry_face.png"
        alt="angry face"
        style={{
          width: '50px',
          height: '50px',
          marginTop: '10px'
        }}
      />
    </Button>

    {/* Container in Center */}
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '60vh',
        paddingBottom: '40px',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      {/* images in a horizontal row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {[...Array(5)].map((_, index) => (
          <img
            key={index}
            src="/RADIATE_BMP/RADIATE_450_COLOR_BMP/WF/WF01/WF01_NC.jpg"
            alt="Face"
            style={{
              width: '100px',
              height: '100px',
            }}
          />
        ))}
      </Box>

     
      <Typography
        sx={{
          color: 'white',
          fontSize: { xs: '0.5rem', sm: '1.0rem', md: '1.5rem' },
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '40px',
        }}
      >
        A set of five faces will be shown in the center of the screen.<br />
        Your task will be to indicate the emotionality of the MIDDLE face.<br /> <br />
        To submit your answer, press one of the following keys: <br />
        Q if the MIDDLE face is NOT EMOTIONAL.<br />
        P if the MIDDLE face is EMOTIONAL.<br /> <br /> 
        Press Continue to read further instruction.
      </Typography>

     
      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid white',
          backgroundColor: 'grey',
          marginTop: '20px',
        }}
        style={{
          height: '50px',
          width: '100px',
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
      position: 'relative',
      border: 'none',
    }}
  >
    {/* Left Button */}
    <Button
      sx={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        border: '2px solid white',
        height: '150px',
        width: '170px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: '50px', color: 'white' }}>Q</Typography>
      <img 
        src="neutral_face.png"
        alt="neutral face"
        style={{
          width: '50px',
          height: '50px',
          marginTop: '10px'
        }}
      />
    </Button>

    {/* Right Button */}
    <Button
      sx={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        border: '2px solid white',
        height: '150px',
        width: '170px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: '50px', color: 'white' }}>P</Typography>
      <img 
        src="angry_face.png"
        alt="angry face"
        style={{
          width: '50px',
          height: '50px',
          marginTop: '10px'
        }}
      />
    </Button>

    {/* Centered Container */}
    <Container
      maxWidth="md"
      sx={{
        border: '2px solid black',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '60vh',
        paddingBottom: '40px',
      }}
      style={{ marginTop: '120px', marginBottom: '10px' }}
    >
      {/* Images in a horizontal row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {[...Array(2)].map((_, index) => (
          <img
            key={`AC-${index}`} // Ensure unique keys
            src="/RADIATE_BMP/RADIATE_450_COLOR_BMP/WF/WF01/WF01_NC.jpg" // Left images
            alt="Face"
            style={{
              width: '100px',
              height: '100px',
            }}
          />
        ))}
        
        <img
          key="HC" // Ensure unique key for middle image
          src="/RADIATE_BMP/RADIATE_450_COLOR_BMP/WF/WF01/WF01_AC.jpg"// Middle image
          alt="Middle Face"
          style={{
            width: '100px',
            height: '100px',
          }}
        />

        {[...Array(2)].map((_, index) => (
          <img
            key={`AC2-${index}`} // Ensure unique keys
            src="/RADIATE_BMP/RADIATE_450_COLOR_BMP/WF/WF01/WF01_NC.jpg" // Right images
            alt="Face"
            style={{
              width: '100px',
              height: '100px',
            }}
          />
        ))}
      </Box>

      {/* Instruction text */}
      <Typography
        sx={{
          color: 'white',
          fontSize: {xs: '0.5rem', sm: '1rem', md: '1.5rem'},
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '40px',
        }}
      >
        Sometimes the surrounding faces will have different emotionality <br /> than the face in the middle. <br /> <br />
        Only pay attention to the MIDDLE face!<br /> <br />
        Press Continue to read further instruction.
      </Typography>

      {/* Continue Button */}
      <Button
        onClick={onButtonClick}
        sx={{
          border: '2px solid white',
          backgroundColor: 'grey',
          marginTop: '20px',
        }}
        style={{
          height: '50px',
          width: '100px',
        }}
      >
        <Typography style={{ color: 'white' }}>Continue</Typography>
      </Button>
    </Container>
  </Box>
);

//Screen 4 - Example
const Screen4 = ({ onButtonClick}) => (
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px'
          }}
        >
          <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white', lineHeight: 1 }}>
            Q
          </Typography>
          <img 
          src="neutral_face.png"
          alt="neutral face"
          style={{
            width: '50px',
            height: '50px',
            marginTop: '10px'
          }}
          />
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px'
          }}
        >
          <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white', lineHeight: 1 }}>
            P
          </Typography>
          <img 
            src="angry_face.png"
            alt="angry face"
            style={{
              width: '50px',
              height: '50px',
              marginTop: '10px'
            }}
          />
        </Button>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', mt: 2 }}>
        <Typography
          sx={{
            color: "white",
            fontSize: {xs: '0.5rem', sm: '1rem', md: '1.5rem'},
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          In the example below, the left [Q]-key is correct:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
        >
          {Array(5).fill(null).map((_, index) => (
            <img
              key={index}
              src="/RADIATE_BMP/RADIATE_450_COLOR_BMP/WF/WF01/WF01_NC.jpg"
              alt="not emotional face"
              style={{
                width: '75px',
                height: '75px',
                transform: 'rotate(0deg)'
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            color: "white",
            fontSize: {xs: '0.5rem', sm: '1rem', md: '1.5rem'},
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          since the middle face is not emotional.
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: {xs: '0.5rem', sm: '1rem', md: '1.5rem'},
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          In the example below, the right [P]-key is correct:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
        >
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src={index === 2 ? "/RADIATE_BMP/RADIATE_450_COLOR_BMP/WF/WF01/WF01_AC.jpg" : "/RADIATE_BMP/RADIATE_450_COLOR_BMP/WF/WF01/WF01_NC.jpg"}
              alt={index === 2 ? "emotional face" : "not emotional face"}
              style={{
                width: '75px',
                height: '75px',
                transform: index === 2 ? 'rotate(0deg)' : 'rotate(0deg)' 
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            color: "white",
            fontSize: {xs: '0.5rem', sm: '1rem', md: '1.5rem'},
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          since the middle face is emotional.
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: {xs: '0.5rem', sm: '1rem', md: '1.5rem'},
            textAlign: 'center',
            fontWeight: 'bold',
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

//Begin Practice Round
const Screen5 = ({ onButtonClick }) => (
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px'
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white',  lineHeight: 1 }}>
          Q
        </Typography>
        <img 
            src="neutral_face.png"
            alt="neutral face"
            style={{
              width: '50px',
              height: '50px',
              marginTop: '10px'
            }}
          />
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px'
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '40px', md: '50px' }, color: 'white',  lineHeight: 1 }}>
          P
        </Typography>
        <img 
            src="angry_face.png"
            alt="angry face"
            style={{
              width: '50px',
              height: '50px',
              marginTop: '10px'
            }}
          />
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: 'auto',
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
      </Box>
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
        height: '60vh',
        display: 'flex', 
        justifyContent: 'space-around', 
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
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ fontSize: '100px', color: 'white' }}>
          Q
        </Typography>
        <img 
          src="neutral_face.png"
          alt="neutral face"
          style={{
            width: '50px',
            height: '50px',
            marginTop: '10px'
          }}
        />
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
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ fontSize: '100px', color: 'white' }}>
          P
        </Typography>
        <img 
          src="angry_face.png"
          alt="angry face"
          style={{
            width: '50px',
            height: '50px',
            marginTop: '10px'
          }}
        />
      </Button>
    </Container>
  </Box>
);

//Flanker Screen 2- Cross(Screen 7)
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
const Screen9 = ({ onButtonClick, value, onChange, currentPattern1, tooSlow, tooFast }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
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
        border: '2px solid black',
        backgroundColor: 'black',
        height: '60vh',
        position: 'relative',
        marginTop: '120px',
        marginBottom: '10px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: '10px', sm: '15px', md: '20px' },
        }}
      >
        {currentPattern1?.images && Array.isArray(currentPattern1.images) && currentPattern1.images.map((imageUrl, index) => (
          <Box
            key={index}
            component="img"
            src={imageUrl}
            alt={`Pattern element ${index + 1}`}
            sx={{
              width: 'auto',
              height: { 
                xs: '60px',    
                sm: '100px',   
                md: '150px'    
              },
              transform: 'rotate(0deg)',
              objectFit: 'contain',
            }}
          />
        ))}
      </Box>
      
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
const Screen10 = ({ onStartClick, onPracticeClick }) => (
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
          <img 
          src="neutral_face.png"
          alt="neutral face"
          style={{
            width: '50px',
            height: '50px',
            marginTop: '10px'
          }}
        />
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
          <img 
            src="angry_face.png"
            alt="angry face"
            style={{
              width: '50px',
              height: '50px',
              marginTop: '10px'
            }}
          />
        </Typography>
      </Button>

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
            fontSize: { xs: '18px', sm: '22px', md: '26px' }, // Increased font sizes
            textAlign: 'center',
            fontWeight: 'bold',
            mb: { xs: 3, sm: 4, md: 5 }, // Increased bottom margin
            maxWidth: '90%', // Ensure text doesn't get too wide on larger screens
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
              fontSize: { xs: '16px', sm: '18px' }, // Slightly increased font size
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
              fontSize: { xs: '16px', sm: '18px' }, // Slightly increased font size
            }}
          >
            Practice More
          </Button>
        </Box>
      </Box>
    </Container>
  </Box>
);

//Screen 11
const Screen11 = ({ onButtonClick, value, onChange, PID }) => (
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
          fontSize: { xs: '30px', sm: '35px', md: '40px' },
          color: 'white',
          textAlign: 'center',
          mb: { xs: 3, sm: 4, md: 5 },
          fontWeight: 'bold'
        }}
      >
        Thank you for completing the study, please enter the following confirmation code for completion back on redcap.case.edu and/or Prolific: 
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: '48px', sm: '72px', md: '100px' },
          color: 'white',
          textAlign: 'center',
          mb: { xs: 3, sm: 4, md: 5 },
          fontWeight: 'bold'
        }}
      >
        CQX1OE0G
      </Typography>


      
      {/* {online && (
        <Typography
          sx={{
            fontSize: { xs: '24px', sm: '36px', md: '50px' },
            color: 'white',
            textAlign: 'center',
            mt: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {`Follow this link to the second experiment: https://flankertask.netlify.app?exp=F1&online=T&PID=${PID}`}
        </Typography>
      )} */}
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
}

const preloadImages = (imageUrls, onComplete) => {
  let loadedCount = 0;
  const totalImages = imageUrls.length;
  console.warn(`Preloading images`);

  imageUrls.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        onComplete(); // Callback when all images are loaded
      }
    };
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
    };
  });
};

const FaceExperiment = ({ experiment, PID }) => {
    const [screen, setScreen] = useState(1);
    const [delay, setDelay] = useState(1000);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [targetScreen, setTargetScreen] = useState(0);
    const [responses, setResponses] = useState([]);
    const [stopwatch, setStopwatch] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [patterns, setPatterns] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
    const [congruency, setCongruency] = useState(0);
    const [faces, setFaces] = useState(0);
    const [tooSlow, setTooSlow] = useState(false);
    const [tooFast, setTooFast] = useState(false);
    const [takeBreak, setTakeBreak] = useState(false);
    const [skipped, setSkipped] = useState([]);
    const [keyPressed, setKeyPressed] = useState(false);
    const [continued, setContinued] = useState(false);

    useEffect(() => {
      const fetchAndExtractImages = async () => {
        try {
          const csvFile = '/flanker_schedule_f_webp.csv';
          const response = await axios.get(csvFile);

          Papa.parse(response.data, {
            header: true,
            complete: (results) => {
              const uniqueImages = new Set();

              results.data.forEach(row => {
                if (row.target) {
                  uniqueImages.add(row.target.trim()); // Add target image
                }
                if (row.flanker) {
                  row.flanker.split(';').forEach(img => {
                    uniqueImages.add(img.trim()); // Add all flanker images
                  });
                }
              });

              const extractedImages = Array.from(uniqueImages);
              setImageUrls(extractedImages);

              // Preload images before proceeding
              preloadImages(extractedImages, () => {
                setImagesLoaded(true);
              });
            }
          });
        } catch (error) {
          console.error('Error fetching the CSV file:', error);
        }
      };

      fetchAndExtractImages();
    }, []);
  
    
    //loop through CSV patterns
    useEffect(() => {
      const fetchData = async () => {
        try {
          const csvFile = '/flanker_schedule_f_webp.csv';
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
                //ensures flanker and target values are present- filters out missing rows
                .filter(row => row.flanker && row.target) 
                //transforms each row and returns new array with pattern
                .map(row => {
                    //array holding flanker images 1-4
                    const flankerImages = row.flanker.split('; ');
                    return {
                        images: [
                          flankerImages[0],
                          flankerImages[1],
                          row.target,
                          flankerImages[2],
                          flankerImages[3]
                        ]
                    }
                });
                const correctAnswer = results.data
                .filter(row => row.correct)
                //makes entire correct column uppercase
                .map(row => row.correct.toUpperCase());
                //store congruency of each pattern
                const congruent = results.data
                .filter(row => row.congruency)
                .map(row => row.congruency);
                //stores faces type for each pattern
                const faces = results.data
                .filter(row => row.faces)
                .map(row => row.faces);
                console.log("Parsed patterns:", parsedPatterns);
                //parsedPatterns contains images array for each pattern
                setPatterns(parsedPatterns);
                setCorrectAnswers(correctAnswer);
                setCongruency(congruent);
                setFaces(faces)
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
    if(screen === 5  || screen === 1 && continued == true) {
      const handleStart = (event) => {
        console.log(screen);
        //press space to advance to patterns
        if (event.code == 'Space') {
          console.log(screen)
          //move to experiment
          if (screen === 1 && continued == true) {
            setTargetScreen(11);
            setStartTime(Date.now());
            console.log(startTime);
          }  
          //reminders screen
          setScreen(6);
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
  
        //replace faces for patterns with new rearranged array
        setFaces(prevFaces => {
          //copy current array of congruencies from arg prevFaces
          const updatedFaces = [...prevFaces];
          //remove current faces from array and store answer
          const currentFaces = updatedFaces[currentPatternIndex];
          //adds correct faces to end of array
          updatedFaces.push(currentFaces);
          return updatedFaces;
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
                setScreen(6);
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
        let face = faces[trialNumber]
       
        const newResponse = {
            trial: currentPatternIndex - 7,
            response: response,
            duration: duration, 
            accuracy: accuracy, 
            congruency: congruent,
            experiment: experiment,
            faces: face,
            id: PID
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
            //when hit currentPatternIndex = 58, give 10 sec break
            if(currentPatternIndex > 0 && currentPatternIndex % 2 == 0 && takeBreak == true) {
                console.log("setting screen 12");
                setScreen(12);
                setTimeout(() => {
                  setScreen(6);
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
  //           downloadResponses();
        }
    }, [screen]);
  
    //rotates instruction screens 1-5 and experiment screens
    const switchScreen = (nextScreen) => {
        if (nextScreen >= 1 && nextScreen <= 5) {
            setScreen(screen + 1);
        } else if (screen === 9 || screen == 10) {
            setScreen(6);
        } 
        else {
            setScreen(screen + 1);
        }
    };
  
    // //at screen 10, begin experiment
    const handleStartClick = () => {
       console.log("Starting the experiment block...");
       setTargetScreen(11);
       switchScreen(10);
    };
  
    //at screen 10, repeat practice round
    const handlePracticeClick = () => {
      // Logic to start the experiment block
      console.log("Resetting practice block...");
      setCurrentPatternIndex(0);
      setScreen(6);
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
        let url = '';
        console.log(typeof userid)
        //REDCap API endpoint
        if(experiment === 'F1' || experiment === 'A1') {
          url = 'https://redcap.case.edu/api/';
        }
        else {
          url = 'https://redcap.case.edu/api/';
        }
        console.log(url);
       
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
            : '6543B93BA07C88CFA3FD68E9692B1A87',
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
        {screen === 1 && <Screen1 continued = { continued } onButtonClick={() => switchScreen(2)} />}
        {screen === 2 && <Screen2 onButtonClick={() => switchScreen(3)} />}
        {screen === 3 && <Screen3 onButtonClick={() => switchScreen(4)} />}
        {screen === 4 && <Screen4 onButtonClick={() => switchScreen(5)} />}
        {screen === 5 && <Screen5 />}
        {screen === 6 && <Screen6 />}
        {screen === 7 && <Screen7 />}
        {screen === 8 && <Screen8 />}
        {screen === 9 && <Screen9 value={inputValue} onChange={(e) => setInputValue(e.targscet.value)} currentPattern1={patterns[currentPatternIndex]} tooSlow={tooSlow} tooFast={tooFast}/>}
        {screen === 10 && <Screen10 onStartClick={handleStartClick} onPracticeClick={handlePracticeClick}/>}
        {screen === 11 && <Screen11 PID = {PID} />}
        {screen === 12 && <Screen12 onBreakEnd={handleBreakEnd} />}
      </div>
    );
  }
  
  export default FaceExperiment;