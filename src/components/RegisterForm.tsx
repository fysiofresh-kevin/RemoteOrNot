import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/authStore";

export const RegisterForm = ({
  setEmail,
  setPassword,
  setName,
  email,
  password,
  name,
}: {
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setName: (v: string) => void;
  email: string;
  password: string;
  name: string;
}) => {
  const authStore = useAuthStore();
  return (
    <form
      onSubmit={() => authStore.createUser(email, password, name)}
      className="flex flex-col gap-4"
    >
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
      <Button className="w-full" type="submit">
        Register
      </Button>
    </form>
  );
};
