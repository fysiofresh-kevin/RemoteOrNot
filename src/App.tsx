import "./App.css";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { LogInScreen } from "./components/LogInScreen";
import { SignOutButton } from "./components/SignOutButton";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    setIsLoading(false);
  }, []);

  useEffect(() => { console.log(isLoggedIn) }, [isLoggedIn])

  if (isLoading) {
    return (
      <div className="bg-black/50 absolute flex justify-center items-center top-0 left-0 h-screen w-screen m-0 p-0">
        <Card className="max-w-5xl min-w-96">
          <CardHeader>
            <CardTitle className="text-left">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <LogInScreen setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} />
    );
  } else {
    return (
      <>
        <SignOutButton isLoggedIn={isLoggedIn} />
        <div>
          <h1 className="text-3xl">Welcome to Remote-Or-Not</h1>
          <h2 className="text-2xl">Check if your colleague is remote or not</h2>
          <div className="grid grid-cols-2"></div>
        </div>
      </>
    );
  }
}

export default App;
