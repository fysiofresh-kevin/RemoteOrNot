import "@/App.css";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useRef } from "react";
import { Route, useLocation } from "wouter";
import { Home } from "@/views/Home";
import { SignIn } from "@/views/SignIn";

export type UserWithLocations = {
  user_id: string;
  name: string;
  backInOffice: Date | null;
  locations?: { user_id: string; remote_date: string }[];
};

function App() {
  const isMounted = useRef(false);
  const authStore = useAuthStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    isMounted.current = true;
    authStore.getCurrentUser();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authStore.currentUser && !authStore.loading) {
      setLocation("/sign-in");
    } else {
      setLocation("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.currentUser, authStore.loading]);

  return (
    <>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/" component={Home} />
    </>
  );
}

export default App;
