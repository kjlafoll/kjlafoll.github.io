import React from 'react';
import { Box, Container } from '@mui/material';
import confusionImg from './confusion.bmp';
import fearImg from './fear.bmp';

const Screen12 = ({ onButtonClick, value, onChange }) => (
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
      style={{ marginTop: '120px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}
    >
      {/* Image 1 */}
      <img
        src={confusionImg}
        alt="Confusion"
        style={{ width: '150px', height: '150px', marginRight: '10px' }}
      />
      {/* Image 2 */}
      <img
        src={confusionImg}
        alt="Confusion"
        style={{ width: '150px', height: '150px', marginRight: '10px' }}
      />
      {/* Image 3 */}
      <img
        src={fearImg}
        alt="Fear"
        style={{ width: '150px', height: '150px', marginRight: '10px' }}
      />
      {/* Image 4 */}
      <img
        src={confusionImg}
        alt="Confusion"
        style={{ width: '150px', height: '150px', marginRight: '10px' }}
      />
      {/* Image 5 */}
      <img
        src={confusionImg}
        alt="Confusion"
        style={{ width: '150px', height: '150px' }}
      />
    </Container>
  </Box>
);

export default Screen12;
