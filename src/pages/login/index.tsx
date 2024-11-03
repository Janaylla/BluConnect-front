import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    const envEmail = process.env.REACT_APP_USER_EMAIL;
    const envPassword = process.env.REACT_APP_USER_PASSWORD;
    console.log({
        envEmail,
        envPassword,
        password, email
    })
    // Validação
    if (email === envEmail && password === envPassword) {
      setErrorMessage('Login bem-sucedido!');
      localStorage.setItem("authenticated", "true"); 
      setIsAuthenticated(true); // Atualiza o estado de autenticação
      
    } else {
      setErrorMessage('Email ou senha incorretos.');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradiente de fundo
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 400, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
          <LockOutlinedIcon sx={{ fontSize: 40 }} color="primary" />
        </Box>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {errorMessage && (
          <Typography color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#155a8a',
            },
          }}
        >
          Entrar
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
