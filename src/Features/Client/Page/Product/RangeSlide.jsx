import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { changeDisplayPrices } from 'Utils/Utils';

export default React.memo(function RangeSlider({ min, max }) {
  const [value, setValue] = React.useState([0, 0]);

  React.useEffect(() => {
    document.querySelector('.MuiSlider-sizeMedium').style.color = '#f472b6';
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        valueLabelFormat={changeDisplayPrices}
      />
    </Box>
  );
});
