import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SignInForm = ({
  handleSignIn,
  setEmail,
  setPassword,
  email,
  password,
}: {
  handleSignIn: () => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  email: string;
  password: string;
}) => {
  return (
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
      <Button className="w-full" type="submit" onClick={handleSignIn}>
        Login
      </Button>
    </div>
  );
};
