import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CategoriesList from '../components/CategoriesList';

function Categories() {
  return (
    <div>
      <Box>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={10} lg={12}>
              <Paper
                sx={{
                  padding: '30px 100px 30px 100px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <CategoriesList />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Categories;
