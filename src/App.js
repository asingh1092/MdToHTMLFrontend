import React, { useState } from 'react';
import { Box, Container, TextField, Button, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import axios from 'axios';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const convert = () => {
    axios.post('http://localhost:8080/markdown/convert', markdown, {
         headers: {
           'Content-Type': 'text/plain'
         }
       })
    .then(response => {
    console.log(response)
      setHtml(response.data);
    })
    .catch(error => {
      console.error('Error converting Markdown to HTML:', error);
    });
  };

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <h1>Markdown to HTML Converter</h1>
         <Button variant="contained" onClick={toggleDarkMode}>
                  {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
        <TextField
          label="Enter Markdown"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={markdown}
          onChange={handleMarkdownChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={convert}>
          Convert
        </Button>
         <h2>Converted HTML</h2>
        {html && (
           <Box mt={2} border={1} borderColor="grey.400" borderRadius={1} p={2}>
             <div dangerouslySetInnerHTML={{ __html: html }} />
           </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
