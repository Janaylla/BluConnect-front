import Router from './router/router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Router/>
    </QueryClientProvider>
    </>
  );
}

export default App;
