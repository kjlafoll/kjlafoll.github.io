var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

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
      Container,
      {
        maxWidth: 'md',
        sx: {
          border: '2px solid black',
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { align: 'center', variant: 'h4',
          sx: { marginTop: "150px" }
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
            marginTop: '180px',
            marginLeft: '350px'
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "20px", marginLeft: "200px", fontSize: "100px" } },
        '< < < < <'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '175px',
            width: '180px',
            alignItems: 'center',
            marginTop: '-15px',
            marginBottom: '100px',
            marginLeft: '50px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '70px', color: 'black' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '175px',
            width: '180px',
            alignItems: 'center',
            marginTop: '-15px',
            marginBottom: '100px',
            marginLeft: '350px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '70px', color: 'black' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      ),
      React.createElement(
        Typography,
        { sx: { color: 'black', fontSize: '16px' }, style: { marginTop: "-85px", fontWeight: 'bold' } },
        'A set of five arrows will be shown in the center of the screen. Your task will be to indicate the direction of the MIDDLE arrow. To submit your answer, press one of the following keys: ',
        React.createElement('br', null),
        'Q if the MIDDLE arrow is pointing to the LEFT ',
        React.createElement('br', null),
        'P if the MIDDLE arrow is pointing to the RIGHT. Press Contine to read further instruction.'
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
            marginTop: '55px',
            marginLeft: '350px'
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "20px", marginLeft: "200px", fontSize: "100px" } },
        '< < > < <'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '175px',
            width: '180px',
            alignItems: 'center',
            marginTop: '-15px',
            marginBottom: '100px',
            marginLeft: '50px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '70px', color: 'black' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '175px',
            width: '180px',
            alignItems: 'center',
            marginTop: '-15px',
            marginBottom: '100px',
            marginLeft: '350px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '70px', color: 'black' } },
          'P',
          React.createElement('br', null),
          '>'
        )
      ),
      React.createElement(
        Typography,
        { align: 'center', sx: { color: 'black', fontSize: '16px' }, style: { marginTop: "-70px", fontWeight: 'bold' } },
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
            top: '90px'
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "20px", marginLeft: "200px", fontSize: "20px" } },
        'In the example below,  the left [Q]-key is correct: ',
        React.createElement('br', null)
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "20px", marginLeft: "300px", fontSize: "50px" } },
        '> > < > >'
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "20px", marginLeft: "200px", fontSize: "20px" } },
        'since the middle arrow is pointing to the left.'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '120px',
            width: '120px',
            alignItems: 'center',
            left: '670px',
            bottom: '140px',
            marginBottom: '100px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '40px', color: 'black' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginBottom: "100px", marginTop: "-200px", bottom: "100px", marginLeft: "200px", fontSize: "20px" } },
        'In the example below,  the right[P]-key is correct: ',
        React.createElement('br', null)
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginBottom: "100px", marginTop: "-100px", marginLeft: "300px", fontSize: "50px" } },
        '< < > < <'
      ),
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginBottom: "100px", marginTop: "-80px", marginLeft: "200px", fontSize: "20px" } },
        'since the middle arrow is pointing to the left. ',
        React.createElement('br', null),
        React.createElement('br', null),
        'Press Continue for further instruction.'
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '120px',
            width: '120px',
            alignItems: 'center',
            left: '670px',
            marginTop: '-270px',
            marginBottom: '200px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '40px', color: 'black' } },
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
            left: '230px',
            top: '-30px',
            bottom: '200px'
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { align: 'center', sx: { color: 'black', fontSize: '16px' }, style: { marginTop: "70px", fontWeight: 'bold' } },
        'You will now be given a chance to practice before the test begins. ',
        React.createElement('br', null),
        'Remember: ',
        React.createElement('br', null),
        '\xA0\xA0\xA0\xA0',
        'Keep focusing on the fixation point in the center of the screen and answer as quickly as possible but ',
        '\xA0\xA0\xA0\xA0',
        'avoid mistakes. ',
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
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '175px',
            width: '180px',
            alignItems: 'center',
            marginTop: '40px',
            marginBottom: '100px',
            marginLeft: '50px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '70px', color: 'black' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
            justifyContent: 'center'
          },
          style: {
            height: '175px',
            width: '180px',
            alignItems: 'center',
            marginTop: '40px',
            marginBottom: '100px',
            marginLeft: '350px'
          }
        },
        React.createElement(
          Typography,
          { sx: { fontSize: '70px', color: 'black' } },
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
            marginTop: '-30px',
            marginLeft: '350px'
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
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
          { sx: { fontSize: '100px', color: 'black' } },
          'Q',
          React.createElement('br', null),
          '<'
        )
      ),
      React.createElement(
        Button,
        {
          sx: {
            border: '2px solid darkblue',
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
          { sx: { fontSize: '100px', color: 'black' } },
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        {
          sx: { fontSize: '200px', color: 'black', justifyContent: 'center' },
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
        backgroundColor: 'gray',
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "90px", marginLeft: "190px", fontSize: "150px" } },
        '<<<<<'
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
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: '60vh'
        },
        style: { marginTop: '120px', marginBottom: '10px' }
      },
      React.createElement(
        Typography,
        { justifyContent: 'center', sx: { marginTop: "90px", marginLeft: "190px", fontSize: "150px" } },
        '<<><<'
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

  var handleChange = function handleChange(event) {
    var response = event.target.value.trim().toUpperCase();
    setInputValue(response);
    if (screen >= 9 && (response === 'Q' || response === 'P')) {
      saveResponse(response);
      downloadResponses();
    }
  };

  var saveResponse = function saveResponse(response) {
    var existingResponses = JSON.parse(localStorage.getItem('responses')) || [];
    existingResponses.push({ screen: screen, response: response });
    localStorage.setItem('responses', JSON.stringify(existingResponses));
    setScreen(6);
  };

  useEffect(function () {
    var interval = setInterval(function () {
      if ((screen === 9 || screen === 10) && inputValue === '') {
        return;
      }
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
      } else if ((screen === 9 || screen === 10) && inputValue !== '') {
        setInputValue('');
        setDelay(2000);
      }
    }, delay);
    return function () {
      return clearInterval(interval);
    };
  }, [screen, delay]);

  var switchScreen = function switchScreen(nextScreen) {
    if (nextScreen >= 1 && nextScreen <= 5) {
      setScreen(screen + 1);
    } else if (screen === 9 || screen === 10) {
      setScreen(6);
    } else {
      setScreen(screen + 1);
    }
  };

  var downloadResponses = function downloadResponses() {
    var data = jsPsych.data.get().json();
    var jsonData = JSON.stringify(data);
    var blob = new Blob([jsonData], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'responses.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return React.createElement(
    'div',
    null,
    screen === 1 && React.createElement(Screen1, { onButtonClick: switchScreen }),
    screen === 2 && React.createElement(Screen2, { onButtonClick: switchScreen }),
    screen === 3 && React.createElement(Screen3, { onButtonClick: switchScreen }),
    screen === 4 && React.createElement(Screen4, { onButtonClick: switchScreen }),
    screen === 5 && React.createElement(Screen5, { onButtonClick: switchScreen }),
    screen === 6 && React.createElement(Screen6, null),
    screen === 7 && React.createElement(Screen7, null),
    screen === 8 && React.createElement(Screen8, null),
    screen === 9 && React.createElement(Screen9, { value: inputValue, onChange: handleChange }),
    screen === 10 && React.createElement(Screen10, { value: inputValue, onChange: handleChange })
  );
}

export default App;