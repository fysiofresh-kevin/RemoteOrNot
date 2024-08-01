import { createUser } from "@/api/createUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";

export const RegisterForm = ({
  handleSignIn,
  setIsLoading,
  setCurrentUser,
  setEmail,
  setPassword,
  setName,
  email,
  password,
  name,
}: {
  handleSignIn: () => void;
  setIsLoading: (v: boolean) => void;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setName: (v: string) => void;
  email: string;
  password: string;
  name: string;
}) => {
  return (
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
      <Button
        className="w-full"
        onClick={() =>
          createUser(
            setIsLoading,
            setCurrentUser,
            handleSignIn,
            email,
            password,
            name,
          )
        }
      >
        Register
      </Button>
    </div>
  );
};
