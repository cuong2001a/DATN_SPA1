import React from 'react';
import { Button } from '@mui/material';
import { createTheme } from '@mui/material';

const ButtonComponent = (props) => {
  let { mes, color, callBack, size, radius, config, disabled, width, height, type } = props;
  const theme = createTheme({});
  if (!color) {
    color = '#3b82f6';
  }

  if (!type) type = 'button';
  if (!disabled) disabled = false;
  return (
    <div className={config}>
      <Button
        type={type}
        disabled={disabled}
        variant="contained"
        size={size}
        style={{ backgroundColor: color, borderRadius: radius, width, height }}
        onClick={callBack}
      >
        {mes}
      </Button>
    </div>
  );
};

export default ButtonComponent;
