import React from 'react';
import { Box, Container } from '@mui/material';
import confusionImg from './confusion.bmp';
import fearImg from './fear.bmp';

var Screen12 = function Screen12(_ref) {
  var onButtonClick = _ref.onButtonClick,
      value = _ref.value,
      onChange = _ref.onChange;
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
        style: { marginTop: '120px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }
      },
      React.createElement('img', {
        src: confusionImg,
        alt: 'Confusion',
        style: { width: '150px', height: '150px', marginRight: '10px' }
      }),
      React.createElement('img', {
        src: confusionImg,
        alt: 'Confusion',
        style: { width: '150px', height: '150px', marginRight: '10px' }
      }),
      React.createElement('img', {
        src: fearImg,
        alt: 'Fear',
        style: { width: '150px', height: '150px', marginRight: '10px' }
      }),
      React.createElement('img', {
        src: confusionImg,
        alt: 'Confusion',
        style: { width: '150px', height: '150px', marginRight: '10px' }
      }),
      React.createElement('img', {
        src: confusionImg,
        alt: 'Confusion',
        style: { width: '150px', height: '150px' }
      })
    )
  );
};

export default Screen12;