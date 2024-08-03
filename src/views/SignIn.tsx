import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { SignInForm } from "@/components/SignInForm";
import { RegisterForm } from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

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
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
            />
          ) : (
            <RegisterForm
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
