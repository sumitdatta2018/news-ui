import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Login from '@mui/icons-material/Login';
import Signup from '@mui/icons-material/HowToReg';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NewsFeedCard, { NewsFeedCardProp } from './NewsCard';
import TextField from '@mui/material/TextField';


function App() {
  const [value, setValue] = React.useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [unit, setUnit] = React.useState("hours");
  const [interval, setInterval] = React.useState("12");
  const [keyword, setKeyword] = React.useState("");
  const timeUnits = [
    {
      label: 'MINUTES',
      value: 'minutes',
    },
    {
      label: 'HOURS',
      value: 'hours',
    },
    {
      label: 'DAYS',
      value: 'days',
    },
    {
      label: 'WEEKS',
      value: 'weeks',
    },
    {
      label: 'MONTHS',
      value: 'months',
    },
    {
      label: 'YEARS',
      value: 'years',
    }
  ];
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  const imgStyle = {
    height: "45vw",
    width: "100%",
    background: "linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73))",
    margi: "16vw"
  };
  function Item(props: any) {
    return (
      <Paper elevation={3}>
        <img style={imgStyle}
          src={`${props.item.img}?w=64&h=64&fit=crop&auto=format`}
          loading="lazy"
        />
      </Paper>
    )
  }
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const handleIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInterval(event.target.value);
  };
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Search >
              <SearchIconWrapper>
                <SearchIcon></SearchIcon>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={keyword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setKeyword(e.target.value);
                }}
              />
            </Search>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="flex-end"
              item xs={10}
            >
              <TextField
                id="time unit"
                select
                label="Time unit"
                defaultValue="hours"
                value={unit}
                onChange={handleUnitChange}
                size="small"
                variant="outlined"
                InputProps={{ style: { color: 'white' } }}
                sx={{
                  color: "white",
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '.MuiOutlinedInput-inputSizeSmall': {
                    borderColor: 'white',
                  },
                  '.MuiSvgIcon-root ': {
                    fill: "white !important",
                  }
                }}
              >
                {timeUnits.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="time interval"
                type="number"
                defaultValue="12"
                value={interval}
                onChange={handleIntervalChange}
                size="small"
                variant="outlined"
                InputProps={{ style: { color: 'white' } }}
                sx={{
                  color: "white",
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },

                  '.MuiOutlinedInput-inputSizeSmall': {
                    borderColor: 'white',
                  },
                  '.MuiSvgIcon-root ': {
                    fill: "white !important",
                  }
                }}
              >
              </TextField>
              <Button variant="outlined" color="inherit" startIcon={<Signup />} >Signup</Button>
              <Button variant="outlined" color="inherit" startIcon={<Login />} >Login</Button>
            </Grid>
          </Toolbar>
        </AppBar>
        <NewsFeedCard unit={unit} keyword={keyword} interval={interval} />

      </Box>
    </div >
  );
}
export default App;
