import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// set up the cache and the Query client using "new QueryClient()"
// QueryClient() accepts options

const QueryClientData = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime (in ms) is the amount of time that the data in the cache will stay valid until refatch again
      staleTime: 60 * 1000,
    },
  },
});

// to provide the data to the application you can use the <QueryClientProvider>
// the 'client' prop should be the result of QueryClient()

// As child component of <QueryClientProvider> you can provide the devtools
// Devtools component: <ReactQueryDevtools initialIsOpen={false} />

function App() {
  return (
    <>
      <QueryClientProvider client={QueryClientData}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
