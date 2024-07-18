import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import confusionImg from './images/confusion.jpg';
import fearImg from './images/fear.jpg';
import Papa from 'papaparse';
import axios from 'axios';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var incongruent = [confusionImg, confusionImg, fearImg, confusionImg, confusionImg];
var congruent = [confusionImg, confusionImg, confusionImg, confusionImg, confusionImg];

//change so that relative to window size-use windowWidth; align button with text  
// Screen 1- Welcome Screen
var Screen1 = function Screen1(_ref) {
  var onButtonClick = _ref.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Typography,
      { align: 'center', variant: 'h4',
        sx: { marginTop: "300px", marginLeft: "100px", color: "white" }
      },
      'Welcome! ',
      React.createElement('br', null),
      'Before beginning the experiment, please read the instructions carefully. ',
      React.createElement('br', null),
      'Press Continue to read instructions.'
    ),
    React.createElement(
      Button,
      {
        onClick: onButtonClick,
        sx: {
          border: '2px solid white',
          backgroundColor: 'gray',
          justifyContent: 'center'
        },
        style: {
          height: '50px',
          width: '100px',
          alignItems: 'center',
          marginBottom: 'px',
          marginTop: '500px',
          right: '600px'
        }
      },
      React.createElement(
        Typography,
        { style: { color: 'white' } },
        'Continue'
      )
    )
  );
};
//white around Q and P boxes
// Screen 2- Congruent Stimulus + P and Q Buttons
var Screen2 = function Screen2(_ref2) {
  var onButtonClick = _ref2.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh',
          alignItems: 'center'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { sx: { color: "white", fontSize: "150px", left: "130px", position: 'relative' } },
        '< < < < <'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "320px",
            right: "260px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "320px",
            left: "770px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      ),
      React.createElement(
        Typography,
        { sx: { color: 'white', fontSize: '20px', textAlign: 'center', justifyContent: 'center' }, style: { fontWeight: 'bold', bottom: "130px", position: 'relative' } },
        'A set of five arrows will be shown in the center of the screen. Your task will be to indicate the direction of the MIDDLE arrow. To submit your answer, press one of the following keys: ',
        React.createElement('br', null),
        'Q if the MIDDLE arrow is pointing to the LEFT ',
        React.createElement('br', null),
        'P if the MIDDLE arrow is pointing to the RIGHT. Press Continue to read further instruction.'
      ),
      React.createElement(
        Button,
        {
          onClick: onButtonClick,
          sx: {
            border: '2px solid white',
            backgroundColor: 'grey',
            justifyContent: 'center'
          },
          style: {
            height: '50px',
            width: '100px',
            backGroundColor: 'gray',
            alignItems: 'center',
            left: '370px',
            bottom: '100px'
          }
        },
        React.createElement(
          Typography,
          { style: { color: 'white' } },
          'Continue'
        )
      )
    )
  );
};

// Screen 3- Incongruent Stimulus
var Screen3 = function Screen3(_ref3) {
  var onButtonClick = _ref3.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { sx: { color: "white", fontSize: "150px", left: "130px", position: 'relative' } },
        '< < > < <'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "300px",
            right: "260px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "300px",
            left: "770px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      ),
      React.createElement(
        Typography,
        { sx: { color: 'white', fontSize: '20px', textAlign: 'center', justifyContent: 'center' }, style: { fontWeight: 'bold', bottom: '130px', position: 'relative' } },
        'Sometimes the surrounding arrows will point in the opposite direction than the arrow in the middle. ',
        React.createElement('br', null),
        'Only pay attention to the MIDDLE arrow! Press Continue to read further instruction.'
      ),
      React.createElement(
        Button,
        {
          onClick: onButtonClick,
          sx: {
            border: '2px solid white',
            backgroundColor: 'grey',
            justifyContent: 'center'
          },
          style: {
            height: '50px',
            width: '100px',
            backGroundColor: 'gray',
            alignItems: 'center',
            left: '350px',
            bottom: '70px'
          }
        },
        React.createElement(
          Typography,
          { style: { color: 'white' } },
          'Continue'
        )
      )
    )
  );
};

//Screen 4 - Example
var Screen4 = function Screen4(_ref4) {
  var onButtonClick = _ref4.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { textAlign: 'center', color: "white", position: 'relative', bottom: '50px', fontSize: "28px" } },
        'In the example below,  the left [Q]-key is correct: ',
        React.createElement('br', null)
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { textAlign: 'center', color: "white", position: 'relative', bottom: '50px', fontSize: "80px" } },
        '< < < < < ',
        React.createElement('br', null)
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { textAlign: 'center', color: "white", position: 'relative', bottom: '50px', fontSize: "28px" } },
        'since the middle arrow is pointing to the left. ',
        React.createElement('br', null),
        React.createElement('br', null)
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "350px",
            right: "260px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "350px",
            left: "750px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { textAlign: 'center', color: "white", position: 'relative', bottom: "180px", fontSize: "28px" } },
        'In the example below,  the right [P]-key is correct: ',
        React.createElement('br', null)
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { textAlign: 'center', color: "white", position: 'relative', bottom: "180px", fontSize: "80px" } },
        '< < > < < ',
        React.createElement('br', null)
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { textAlign: 'center', marginBottom: "100px", color: "white", position: 'relative', bottom: "180px", fontSize: "28px" } },
        'since the middle arrow is pointing to the right. ',
        React.createElement('br', null),
        React.createElement('br', null),
        'Press Continue for further instruction.'
      ),
      React.createElement(
        Button,
        {
          onClick: onButtonClick,
          sx: {
            border: '2px solid white',
            backgroundColor: 'grey',
            justifyContent: 'center'
          },
          style: {
            height: '50px',
            width: '100px',
            backGroundColor: 'gray',
            alignItems: 'center',
            position: 'relative',
            left: "350px",
            bottom: "250px"
          }
        },
        React.createElement(
          Typography,
          { style: { color: 'white' } },
          'Continue'
        )
      )
    )
  );
};
//Screen 5- Practice Round Intro Card
var Screen5 = function Screen5(_ref5) {
  var onButtonClick = _ref5.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { align: 'center', sx: { color: 'white', fontSize: '28px' }, style: { marginTop: "70px", fontWeight: 'bold' } },
        'You will now be given a chance to practice before the test begins. ',
        React.createElement('br', null),
        'Remember: ',
        React.createElement('br', null),
        '\xA0\xA0\xA0\xA0',
        'Keep focusing on the fixation point in the center of the screen and answer as quickly as possible but avoid mistakes. ',
        React.createElement('br', null),
        '\xA0\xA0\xA0\xA0',
        'Place your index fingers on the [Q] and [P] keys. ',
        React.createElement('br', null),
        'Press Start to begin the Practice Block.'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "450px",
            right: "260px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "450px",
            left: "750px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      ),
      React.createElement(
        Button,
        {
          onClick: onButtonClick,
          sx: {
            border: '2px solid white',
            backgroundColor: 'grey',
            justifyContent: 'center'
          },
          style: {
            height: '50px',
            width: '100px',
            backGroundColor: 'gray',
            alignItems: 'center',
            position: 'relative',
            left: "20px"

          }
        },
        React.createElement(
          Typography,
          { style: { color: 'white' } },
          'Start'
        )
      )
    )
  );
};

//Flanker Task- Screen 1 P and Q/ Screen 6 overall
var Screen6 = function Screen6(_ref6) {
  var onButtonClick = _ref6.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '300px',
            width: '200px',
            alignItems: 'center',
            marginBottom: '20px',
            marginTop: '30px',
            marginLeft: '90px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '100px', color: 'white' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '300px',
            width: '210px',
            alignItems: 'center',
            marginBottom: '20px',
            marginTop: '30px',
            marginLeft: '250px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '100px', color: 'white' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      )
    )
  );
};

var Screen7 = function Screen7(_ref7) {
  var onButtonClick = _ref7.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        {
          sx: { fontSize: '200px', color: 'white', justifyContent: 'center' },
          style: {
            alignItems: 'center',
            marginRight: '100px',
            marginLeft: '350px',
            marginTop: '50px'
          }
        },
        '+'
      )
    )
  );
};
// Flanker Screen 3- Blank(Screen 8)
var Screen8 = function Screen8(_ref8) {
  var onButtonClick = _ref8.onButtonClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(Container, {
      maxWidth: 'md',
      sx: {
        border: '2px solid black',
        backgroundColor: 'black',
        justifyContent: 'center',
        height: '60vh'
      },
      style: { marginTop: '120px', marginBottom: '10px' }
    })
  );
};

//Flanker Task- Arrows Screen 1
var Screen9 = function Screen9(_ref9) {
  var onButtonClick = _ref9.onButtonClick,
      value = _ref9.value,
      onChange = _ref9.onChange,
      currentPattern1 = _ref9.currentPattern1;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { position: 'relative', left: '120px', top: '100px', fontSize: "150px", color: 'white' } },
        currentPattern1
      )
    )
  );
};

// //Flanker Task- Arrows Screen 2
// const Screen10 = ({ onButtonClick, value, onChange, currentPattern }) => {
//   return (
//   <Box
//     sx={{
//       display: 'flex',
//       justifyContent: 'center',
//       backgroundColor: 'black',
//       width: '100vw',
//       height: '100vh',
//       border: 'none',
//     }}
//   >
//     <Container
//       maxWidth="md"
//       sx={{
//         border: '2px solid black',
//         backgroundColor: 'black',
//         justifyContent: 'center',
//         height: '60vh',
//       }}
//       style={{ marginTop: '120px', marginBottom: '10px' }}
//     >
//       <Typography justifyContent='center' sx= {{position: 'relative', left: '140px', fontSize: "150px", color: 'white'}}>

//       </Typography>
//     </Container>
//   </Box>
//   );  
// };

//Screen 11
var Screen11 = function Screen11(_ref10) {
  var onButtonClick = _ref10.onButtonClick,
      value = _ref10.value,
      onChange = _ref10.onChange;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' } },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "100px", marginLeft: "160px", fontSize: "100px", color: "white" } },
        'Thank you!'
      )
    )
  );
};

// // Screen 10: Faces Flanker (Incongruent)
// const Screen10 = ({ onButtonClick, value, onChange }) => (
//   <Box
//     sx={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'black',
//       width: '100vw',
//       height: '100vh',
//     }}
//   >
//     <Container
//       maxWidth="md"
//       sx={{
//         border: '2px solid black',
//         backgroundColor: 'black',
//         height: '60vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//       style={{ marginTop: '10px', marginBottom: '10px' }}
//     >
//       {/* Spacer */}
//       <div style={{ flex: 1 }}></div>

//       {/* Images */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '150px' }}>
//         {/* Map over the array of image sources and render <img> elements */}
//         {incongruent.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt={`Image ${index + 1}`}
//             style={{ width: '150px', height: '150px', marginRight: '10px' }}
//           />
//         ))}
//       </div>
//     </Container>
//   </Box>
// );

// // Screen 11: Faces Flanker (Incongruent)
// const Screen11 = ({ onButtonClick, value, onChange }) => (
//   <Box
//     sx={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'black',
//       width: '100vw',
//       height: '100vh',
//     }}
//   >
//     <Container
//       maxWidth="md"
//       sx={{
//         border: '2px solid black',
//         backgroundColor: 'black',
//         height: '60vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//       style={{ marginTop: '10px', marginBottom: '10px' }}
//     >
//       {/* Spacer */}
//       <div style={{ flex: 1 }}></div>

//       {/* Images */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '150px' }}>
//         {/* Map over the array of image sources and render <img> elements */}
//         {congruent.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt={`Image ${index + 1}`}
//             style={{ width: '150px', height: '150px', marginRight: '10px' }}
//           />
//         ))}
//       </div>

//     </Container>
//   </Box>
// );
//Screen 10- Experiment Block Starts
var Screen10 = function Screen10(_ref11) {
  var onStartClick = _ref11.onStartClick,
      onPracticeClick = _ref11.onPracticeClick;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        border: 'none'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { align: 'center', sx: { color: 'white', fontSize: '28px' }, style: { marginTop: "70px", fontWeight: 'bold' } },
        'The experiment will now begin. Press Start to begin the Experiment Block. If you would like additional practice, press Practice More.'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "290px",
            right: "260px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid white',
            justifyContent: 'center'
          },
          style: {
            height: '150px',
            width: '170px',
            alignItems: 'center',
            bottom: "290px",
            left: "750px"
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '50px', color: 'white' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      ),
      React.createElement(
        Button,
        {
          onClick: onStartClick,
          sx: {
            border: '2px solid white',
            backgroundColor: 'grey',
            justifyContent: 'center'
          },
          style: {
            height: '50px',
            width: '100px',
            backGroundColor: 'gray',
            alignItems: 'center',
            position: 'relative',
            right: "100px"

          }
        },
        React.createElement(
          Typography,
          { style: { color: 'white' } },
          'Start'
        )
      ),
      React.createElement(
        Button,
        {
          onClick: onPracticeClick,
          sx: {
            border: '2px solid white',
            backgroundColor: 'grey',
            justifyContent: 'center'
          },
          style: {
            height: '50px',
            width: '100px',
            backGroundColor: 'gray',
            alignItems: 'center',
            position: 'relative',
            left: "20px"

          }
        },
        React.createElement(
          Typography,
          { style: { color: 'white' } },
          'Practice More'
        )
      )
    )
  );
};

//Rotate Screens
function App() {
  var _this = this;

  var _useState = useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      screen = _useState2[0],
      setScreen = _useState2[1];

  var _useState3 = useState(1000),
      _useState4 = _slicedToArray(_useState3, 2),
      delay = _useState4[0],
      setDelay = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      inputValue = _useState6[0],
      setInputValue = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      targetScreen = _useState8[0],
      setTargetScreen = _useState8[1];

  var _useState9 = useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      responses = _useState10[0],
      setResponses = _useState10[1];

  var _useState11 = useState(0),
      _useState12 = _slicedToArray(_useState11, 2),
      stopwatch = _useState12[0],
      setStopwatch = _useState12[1];

  var _useState13 = useState(0),
      _useState14 = _slicedToArray(_useState13, 2),
      startTime = _useState14[0],
      setStartTime = _useState14[1];

  var _useState15 = useState([]),
      _useState16 = _slicedToArray(_useState15, 2),
      patterns = _useState16[0],
      setPatterns = _useState16[1];

  var _useState17 = useState(0),
      _useState18 = _slicedToArray(_useState17, 2),
      correctAnswers = _useState18[0],
      setCorrectAnswers = _useState18[1];

  var _useState19 = useState(0),
      _useState20 = _slicedToArray(_useState19, 2),
      currentPatternIndex = _useState20[0],
      setCurrentPatternIndex = _useState20[1];

  var _useState21 = useState(0),
      _useState22 = _slicedToArray(_useState21, 2),
      congruency = _useState22[0],
      setCongruency = _useState22[1];

  //loop through CSV patterns


  useEffect(function () {
    var fetchData = function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var response;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get('/flanker-mini.csv');

              case 3:
                response = _context.sent;

                console.log("Raw CSV data:", response.data);
                Papa.parse(response.data, {
                  header: true,
                  //execute complete callback when parsing is completed and take results as arg
                  complete: function complete(results) {
                    console.log("Parsed data:", results.data);
                    //store pattern in parsedPatterns
                    var parsedPatterns = results.data.filter(function (row) {
                      return row.flanker && row.target;
                    }).map(function (row) {
                      return row.flanker + ' ' + row.flanker + ' ' + row.target + ' ' + row.flanker + ' ' + row.flanker;
                    });
                    var correctAnswer = results.data.filter(function (row) {
                      return row.correct;
                    }).map(function (row) {
                      return row.correct.toUpperCase();
                    });
                    var congruent = results.data.filter(function (row) {
                      return row.congruency;
                    }).map(function (row) {
                      return row.congruency;
                    });
                    console.log("Parsed patterns:", parsedPatterns);
                    setPatterns(parsedPatterns);
                    setCorrectAnswers(correctAnswer);
                    setCongruency(congruent);
                  },
                  error: function error(_error) {
                    console.error("Parsing error:", _error);
                  }
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                console.error('Error fetching the CSV file:', _context.t0);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 8]]);
      }));

      return function fetchData() {
        return _ref12.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);

  // Automatically cycle through patterns- delete
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentPatternIndex(prevIndex => (prevIndex + 1) % patterns.length);
  //   }, 3000); // Update every 3 seconds or as needed
  //   return () => clearInterval(interval);
  // }, [patterns.length]);

  //timer code
  // useEffect(() => {
  //     let interval = null;
  //     if (timerActive) {
  //         interval = setInterval(() => {
  //             setStopwatch(prevTime => prevTime + 1); // Update every 1 ms
  //         }, 1);
  //     } else {
  //         clearInterval(interval);
  //     }
  //     return () => clearInterval(interval);
  // }, [timerActive]);

  //check currentPatternIndex and patterns array
  useEffect(function () {
    console.log("Current Pattern Index:", currentPatternIndex);
    console.log("Current Pattern:", patterns[currentPatternIndex]);
  }, [currentPatternIndex, patterns]);

  //stops timer when keydown for Q or P
  useEffect(function () {
    var handleKeyDown = function handleKeyDown(event) {
      var key = event.key;
      //Experiment Block

      if (screen === 9 && currentPatternIndex >= patterns.length / 2 && (key === 'Q' || key === 'P')) {
        var endTime = Date.now();
        var duration = endTime - startTime;
        console.log(startTime);
        console.log(endTime);
        console.log("Response duration:", duration);
        saveResponse(key, duration);
        setCurrentPatternIndex(function (prevIndex) {
          return prevIndex + 1;
        });
        setInputValue(''); // Clear input field for the next pattern
      }
      //Faces Block
      else if ((screen === 10 || screen === 11) && (key === 'Q' || key === 'P')) {
          var _endTime = Date.now();
          var _duration = _endTime - startTime;
          console.log("Response duration:", _duration);
          saveResponse(key, _duration);
          setInputValue('');
        }
        //Practice Block
        else if (screen === 9 && key == correctAnswers[currentPatternIndex]) {
            setCurrentPatternIndex(function (prevIndex) {
              return prevIndex + 1;
            });
            setInputValue('');
            setScreen(6);
          }
    };

    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen, stopwatch]);

  //stores startTime when hit patterns
  useEffect(function () {
    if (screen === 9 && currentPatternIndex == patterns.length / 2 - 1) {
      setStartTime(Date.now());
      console.log(startTime);
    }
  }, [screen]);

  //when receive response, save response-- potentially delete
  // const handleChange = (event) => {
  //     const response = event.target.value.trim().toUpperCase();
  //     setInputValue(response);
  //     if (screen >= 10 && (response === 'Q' || response === 'P')) {
  //         saveResponse(response, duration);
  //     }
  // };
  // console.log("Current Screen:", screen);

  //creates new response object with screen number, response, and time
  var saveResponse = function saveResponse(response, duration) {
    var existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
    var accuracy = false;
    if (response == correctAnswers[currentPatternIndex]) {
      accuracy = true;
    }
    var newResponse = {
      trial: currentPatternIndex - 7,
      response: response,
      duration: duration,
      accuracy: accuracy,
      congruency: congruency[currentPatternIndex]
    };

    //adds new response object to array of responses
    var updatedResponses = [].concat(_toConsumableArray(existingResponses), [newResponse]);
    localStorage.setItem('responses', JSON.stringify(updatedResponses));
    setResponses(updatedResponses);
    if (screen >= 9) {
      setScreen(6);
    }
  };

  //determines delay for screens 6-8 and initializes empty input for trials
  useEffect(function () {
    var interval = setInterval(function () {
      if (screen === 6 || screen === 8) {
        setDelay(1000);
        //if screen 8 and reach last pattern of 9-> change screen to 11
        if (screen === 8 && currentPatternIndex == patterns.length) {
          setScreen(function (screen) {
            return targetScreen;
          });
        }
        //else if just screen 8 and running through patterns 
        else if (screen == 8 && targetScreen == 11) {
            setScreen(9);
            setStartTime(Date.now());
            console.log(startTime);
          }
          //stops at practice block and shows screen 10 for experiment
          else if (screen === 8 && currentPatternIndex == patterns.length / 2) {
              setScreen(10);
            }
            //screen 8 to screen 11(post-patterns)- potentially delete
            else {
                setScreen(function (screen) {
                  return screen + 1;
                });
              }
      } else if (screen === 7) {
        setDelay(500);
        setScreen(function (screen) {
          return screen + 1;
        });
      }
      //set input to empty string for each pattern/screen
      if (screen === 9 && inputValue !== '') {
        setInputValue('');
      }
    }, delay);
    return function () {
      return clearInterval(interval);
    };
  }, [screen, delay]);

  //downloads responses when reach last screen
  useEffect(function () {
    if (screen === 11) {
      console.log("Screen reached 11, downloading responses...");
      downloadResponses();
    }
  }, [screen]);

  //rotates instruction screens 1-5 and experiment screens
  var switchScreen = function switchScreen(nextScreen) {
    if (nextScreen >= 1 && nextScreen <= 5) {
      setScreen(screen + 1);
    } else if (screen === 9 || screen == 10) {
      setScreen(6);
    } else {
      setScreen(screen + 1);
    }
  };

  //at screen 10, begin experiment
  var handleStartClick = function handleStartClick() {
    console.log("Starting the experiment block...");
    setTargetScreen(11);
    //how is this working
    switchScreen(10);
  };

  //at screen 10, repeat practice round
  var handlePracticeClick = function handlePracticeClick() {
    // Logic to start the experiment block
    console.log("Resetting practice block...");
    setCurrentPatternIndex(0);
    switchScreen(10);
  };

  //downloads user responses
  var downloadResponses = function downloadResponses() {
    if (responses.length === 0) {
      console.error("No responses to download.");
      return;
    }
    var jsonData = JSON.stringify(responses);
    var blob = new Blob([jsonData], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
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
  var sendDataToREDCap = function sendDataToREDCap(data) {
    console.log("Sending responses to RedCap");
    //creates URLSearchParams API object to extract parameters
    var urlParams = new URLSearchParams(window.location.search);
    //retrieve PID from URL query string
    var userid = urlParams.get('PID') || '10';
    //REDCap API endpoint
    var url = 'https://redcap.case.edu/api/';
    //data to be sent to REDCap API
    var body = {
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
        'flanker_data_json': data,
        'flanker_data_complete': '2'
      }]),
      returnContent: 'count',
      returnFormat: 'json'
    };
    //HTTP POST request to REDCap API
    $.post(url, body).done(function (response) {
      console.log('Data sent to REDCap. Response:', response);
    }).fail(function (error) {
      console.error('Failed to send data to REDCap:', error);
    });
  };

  return React.createElement(
    'div',
    null,
    screen === 1 && React.createElement(Screen1, { onButtonClick: function onButtonClick() {
        return switchScreen(2);
      } }),
    screen === 2 && React.createElement(Screen2, { onButtonClick: function onButtonClick() {
        return switchScreen(3);
      } }),
    screen === 3 && React.createElement(Screen3, { onButtonClick: function onButtonClick() {
        return switchScreen(4);
      } }),
    screen === 4 && React.createElement(Screen4, { onButtonClick: function onButtonClick() {
        return switchScreen(5);
      } }),
    screen === 5 && React.createElement(Screen5, { onButtonClick: function onButtonClick() {
        return switchScreen(6);
      } }),
    screen === 6 && React.createElement(Screen6, null),
    screen === 7 && React.createElement(Screen7, null),
    screen === 8 && React.createElement(Screen8, null),
    screen === 9 && React.createElement(Screen9, { value: inputValue, onChange: function onChange(e) {
        return setInputValue(e.target.value);
      }, currentPattern1: patterns[currentPatternIndex] }),
    screen === 10 && React.createElement(Screen10, { onStartClick: handleStartClick, onPracticeClick: handlePracticeClick }),
    screen === 11 && React.createElement(Screen11, null)
  );
}

export default App;