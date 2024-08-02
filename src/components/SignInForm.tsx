import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/authStore";

export const SignInForm = ({
  setEmail,
  setPassword,
  email,
  password,
}: {
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  email: string;
  password: string;
}) => {
  const authStore = useAuthStore();
  return (
    <form
      onSubmit={() => {authStore.handleSignIn(email, password)}}
      className="flex flex-col gap-4"
    >
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
      <Button className="w-full" type="submit">
        Login
      </Button>
    </form>
  );
};
