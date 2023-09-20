import { Paper } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme, styled } from '@mui/material/styles';


export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'auto',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));
// A custom theme for this app
const theme = createTheme({
    
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;