import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/index.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <AppRouter />
    </NextUIProvider>
  </QueryClientProvider>
);
