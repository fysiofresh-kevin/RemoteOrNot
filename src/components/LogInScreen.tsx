import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/supabase";
import { toast } from "sonner";

export const LogInScreen = ({
  setIsLoading,
  setIsLoggedIn,
}: {
  setIsLoading: (v: boolean) => void;
  setIsLoggedIn: (v: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(({ error, data }) => {
        if (error) {
          toast.error("Error signing in");
          return;
        }
        if (data) {
          toast.success("Successfully signed in");
          setIsLoggedIn(true);
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Error signing in");
      });

    setIsLoading(false);
  };

  const handleSignUp = () => {
    setIsLoading(true);
    supabase.auth
      .signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })
      .then(({ error, data }) => {
        if (error) {
          toast.error("Error signing up");
          return;
        }
        if (data) {
          toast.success("Successfully signed up");
          handleSignIn();
          setIsLoggedIn(true);
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Error signing up");
      });

    setIsLoading(false);
  };

  return (
    <div className="bg-black/50 absolute flex justify-center items-center top-0 left-0 h-screen w-screen m-0 p-0">
      <Card className="max-w-5xl min-w-96">
        <CardHeader>
          <CardTitle className="text-left">You are not logged in</CardTitle>
          <CardDescription className="text-left">
            Please {isNewUser ? "register" : "login"} to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isNewUser ? (
            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email (abc@fairytalesgroup.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center items-center gap-2">
                <Button className="w-full" type="submit" onClick={handleSignIn}>
                  Login
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setIsNewUser(true)}
                >
                  Register
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email (abc@fairytalesgroup.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center items-center gap-2">
                <Button className="w-full" onClick={handleSignUp}>
                  Register
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setIsNewUser(false)}
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
