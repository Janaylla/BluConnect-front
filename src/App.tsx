import { ToastProvider } from "./components/Toast/Toast";
import { GlobalStyled } from "./pages/global/styled";
import Router from "./router/router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <GlobalStyled />
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}

export default App;
