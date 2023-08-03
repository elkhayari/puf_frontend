import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function StartTest(props) {
  const { boards } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${boards[selectedIndex]}`);
  };

  return (
    <React.Fragment>
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="body1">
          Select a board
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        {boards.map((board, index) => (
          <Chip
            color="primary"
            label={board}
            onClick={(event) => handleClick(event, index)}
          />
        ))}
      </Stack>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button>Run</Button>
      </Box>
    </React.Fragment>
  );
}
