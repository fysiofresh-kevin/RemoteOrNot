import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction, useState } from "react";
import { supabase } from "@/supabase";
import { toast } from "sonner";
import { SignInForm } from "./SignInForm";
import { RegisterForm } from "./RegisterForm";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";

export const LogInScreen = ({
  setIsLoading,
  setCurrentUser,
}: {
  setIsLoading: (v: boolean) => void;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
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
          setCurrentUser(data.user);
          return;
        }
      })
      .catch((error) => {
        console.error("error", error);
        toast.error("Error signing in");
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
            <SignInForm
              handleSignIn={handleSignIn}
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
            />
          ) : (
            <RegisterForm
              handleSignIn={handleSignIn}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
              setEmail={setEmail}
              setPassword={setPassword}
              setName={setName}
              email={email}
              password={password}
              name={name}
            />
          )}
        </CardContent>
        <CardFooter>
          {!isNewUser ? (
            <>
              Don't have an account?{" "}
              <Button variant="link" onClick={() => setIsNewUser(true)}>
                Register
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" onClick={() => setIsNewUser(false)}>
                Sign in
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
