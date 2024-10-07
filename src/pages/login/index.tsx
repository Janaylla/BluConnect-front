import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função para verificar email e senha
  const handleLogin = () => {
    const envEmail = process.env.REACT_APP_USER_EMAIL;
    const envPassword = process.env.REACT_APP_USER_PASSWORD;

    // Validação
    if (email === envEmail && password === envPassword) {
      setErrorMessage('Login bem-sucedido!');
      // Redirecionar ou realizar alguma ação após o login
    } else {
      setErrorMessage('Email ou senha incorretos.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      {errorMessage && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#155a8a',
          },
        }}
      >
        Entrar
      </Button>
    </Box>
  );
};

export default Login;
