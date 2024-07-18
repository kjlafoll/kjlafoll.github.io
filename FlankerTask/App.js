var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import confusionImg from './images/confusion.jpg';
import fearImg from './images/fear.jpg';
import Papa from 'papaparse';
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
      onChange = _ref9.onChange;
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
        { justifyContent: 'center', sx: { position: 'relative', left: '120px', fontSize: "150px", color: 'white' } },
        '< < < < <'
      ),
      React.createElement('input', {
        type: 'text',
        value: value,
        onChange: onChange,
        style: { backgroundColor: 'gray', marginTop: '20px', width: '100%', padding: '10px', borderColor: 'gray' }
      })
    )
  );
};

//Flanker Task- Arrows Screen 2
var Screen10 = function Screen10(_ref10) {
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
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { position: 'relative', left: '140px', fontSize: "150px", color: 'white' } },
        '< < > < <'
      ),
      React.createElement('input', {
        type: 'text',
        value: value,
        onChange: onChange,
        style: { backgroundColor: 'gray', marginTop: '20px', width: '100%', padding: '10px', borderColor: 'gray' }
      })
    )
  );
};
//Screen 13
var Screen13 = function Screen13(_ref11) {
  var onButtonClick = _ref11.onButtonClick,
      value = _ref11.value,
      onChange = _ref11.onChange;
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' } },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "100px", marginLeft: "160px", fontSize: "100px" } },
        'Thank you!'
      )
    )
  );
};

// Screen 12: Faces Flanker (Incongruent)
var Screen11 = function Screen11(_ref12) {
  var onButtonClick = _ref12.onButtonClick,
      value = _ref12.value,
      onChange = _ref12.onChange;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        },
        style: { marginTop: '10px', marginBottom: '10px' }
      },
      React.createElement('div', { style: { flex: 1 } }),
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' } },
        incongruent.map(function (src, index) {
          return React.createElement('img', {
            key: index,
            src: src,
            alt: 'Image ' + (index + 1),
            style: { width: '150px', height: '150px', marginRight: '10px' }
          });
        })
      ),
      React.createElement('input', {
        type: 'text',
        value: value,
        onChange: onChange,
        style: { backgroundColor: 'gray', width: '100%', padding: '10px', borderColor: 'gray', margingTop: '20px', marginBottom: '100px' }
      })
    )
  );
};

// Screen 12: Faces Flanker (Incongruent)
var Screen12 = function Screen12(_ref13) {
  var onButtonClick = _ref13.onButtonClick,
      value = _ref13.value,
      onChange = _ref13.onChange;
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh'
      }
    },
    React.createElement(
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'black',
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        },
        style: { marginTop: '10px', marginBottom: '10px' }
      },
      React.createElement('div', { style: { flex: 1 } }),
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' } },
        congruent.map(function (src, index) {
          return React.createElement('img', {
            key: index,
            src: src,
            alt: 'Image ' + (index + 1),
            style: { width: '150px', height: '150px', marginRight: '10px' }
          });
        })
      ),
      React.createElement('input', {
        type: 'text',
        value: value,
        onChange: onChange,
        style: { backgroundColor: 'gray', width: '100%', padding: '10px', borderColor: 'gray', margingTop: '20px', marginBottom: '100px' }
      })
    )
  );
};

//Rotate Screens
function App() {
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

  var _useState7 = useState(8),
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

  var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      timerActive = _useState14[0],
      setTimerActive = _useState14[1];

  var _useState15 = useState([]),
      _useState16 = _slicedToArray(_useState15, 2),
      patterns = _useState16[0],
      setPatterns = _useState16[1];

  var _useState17 = useState(0),
      _useState18 = _slicedToArray(_useState17, 2),
      currentPatternIndex = _useState18[0],
      setCurrentPatternIndex = _useState18[1];

  // useEffect(() => {
  //   fetch('./flanker-mini.csv')
  //     .then(response => response.text())
  //     .then(data => {
  //       Papa.parse(data, {
  //         complete: (results) => {
  //           console.log("Parsed data:", results.data);
  //           const parsedPatterns = results.data.map(row => {
  //             if (row.length >= 3) {
  //               // Create the pattern based on your description
  //               return `${row[2]} ${row[2]} ${row[1]} ${row[2]} ${row[2]}`;
  //             }
  //             return ''; // Default pattern or error handling
  //           });
  //           console.log("Parsed patterns:", parsedPatterns);
  //           setPatterns(parsedPatterns);
  //         },
  //         header: false
  //       });
  //     })
  //     .catch(error => console.error("Failed to load or parse CSV:", error));
  // }, []);

  // Automatically cycle through patterns


  useEffect(function () {
    var interval = setInterval(function () {
      setCurrentPatternIndex(function (prevIndex) {
        return (prevIndex + 1) % patterns.length;
      });
    }, 3000); // Update every 3 seconds or as needed
    return function () {
      return clearInterval(interval);
    };
  }, [patterns.length]);

  //timer code
  useEffect(function () {
    var interval = null;
    if (timerActive) {
      interval = setInterval(function () {
        setStopwatch(function (prevTime) {
          return prevTime + 1;
        }); // Update every 1 ms
      }, 1);
    } else {
      clearInterval(interval);
    }
    return function () {
      return clearInterval(interval);
    };
  }, [timerActive]);

  //stops timer when keydown for Q or P
  useEffect(function () {
    var handleKeyDown = function handleKeyDown(event) {
      var key = event.key;

      if ((screen === 9 || screen === 10 || screen === 11 || screen === 12) && (key === 'Q' || key === 'P')) {
        setTimerActive(false);
        console.log(Date.now());
        saveResponse(key, stopwatch);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen, stopwatch]);

  useEffect(function () {
    if (screen === 9 || screen === 10 || screen === 11 || screen === 12) {
      setStopwatch(0);
      setTimerActive(true);
      console.log(Date.now());
    }
  }, [screen]);

  var handleChange = function handleChange(event) {
    var response = event.target.value.trim().toUpperCase();
    setInputValue(response);
    if (screen >= 9 && (response === 'Q' || response === 'P')) {
      saveResponse(response, stopwatch);
    }
  };

  var saveResponse = function saveResponse(response, duration) {
    var existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
    var newResponse = {
      screen: screen,
      response: response,
      duration: duration
    };
    var updatedResponses = [].concat(_toConsumableArray(existingResponses), [newResponse]);
    localStorage.setItem('responses', JSON.stringify(updatedResponses));
    setResponses(updatedResponses);
    setScreen(6);
  };

  useEffect(function () {
    var interval = setInterval(function () {
      if (screen === 6 || screen === 8) {
        setDelay(1000);
        if (screen === 8) {
          setScreen(function (screen) {
            return targetScreen;
          });
          setTargetScreen(function (targetScreen) {
            return targetScreen + 1;
          });
        } else {
          setScreen(function (screen) {
            return screen + 1;
          });
        }
      } else if (screen === 7) {
        setDelay(500);
        setScreen(function (screen) {
          return screen + 1;
        });
      } else if ((screen === 9 || screen === 10 || screen === 11 || screen === 12) && inputValue !== '') {
        setInputValue('');
      }
    }, delay);
    return function () {
      return clearInterval(interval);
    };
  }, [screen, delay]);

  useEffect(function () {
    if (screen === 13) {
      console.log("Screen reached 13, downloading responses...");
      downloadResponses();
    }
  }, [screen]);

  var switchScreen = function switchScreen(nextScreen) {
    if (nextScreen >= 1 && nextScreen <= 5) {
      setScreen(screen + 1);
    } else if (screen === 9 || screen === 10 || screen === 11 || screen === 12) {
      setScreen(6);
    } else {
      setScreen(screen + 1);
    }
  };

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

  var sendDataToREDCap = function sendDataToREDCap(data) {
    console.log("Sending responses to RedCap");
    var urlParams = new URLSearchParams(window.location.search);
    var userid = urlParams.get('PID') || '10';
    var url = 'https://redcap.case.edu/api/';
    var body = {
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
    screen === 9 && React.createElement(Screen9, { value: inputValue, onChange: handleChange }),
    screen === 10 && React.createElement(Screen10, { value: inputValue, onChange: handleChange }),
    screen === 11 && React.createElement(Screen11, { value: inputValue, onChange: handleChange }),
    screen === 12 && React.createElement(Screen12, { value: inputValue, onChange: handleChange }),
    screen === 13 && React.createElement(Screen13, null)
  );
}

export default App;