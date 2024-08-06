import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";

const RemoteDaysConfigurator = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);

  const days = [false, monday, tuesday, wednesday, thursday, false];
  const setDays = [() => null, setMonday, setTuesday, setWednesday, setThursday, setFriday, () => null];

  useEffect(() => {
    const currentUserDaysRemote = userStore.users.find(u => u.user_id === authStore.currentUser?.id)?.days_remote
    if (currentUserDaysRemote) {
      currentUserDaysRemote.forEach((v) => {
        setDays[v](true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.currentUser]);

  const handleSubmit = () => {
    if (!authStore.currentUser) return;
    const daysRemote: number[] = [];
    days.forEach((v, i) => {
      if (v) daysRemote.push(i);
    });
    console.log(daysRemote)
    userStore.setRemoteDays(authStore.currentUser.id, daysRemote);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Calendar />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Scheduled Remote Days</DialogTitle>
          <DialogDescription>
            Make changes to your scheduled remote days. You can still mark
            yourself as remote/not on the day or the day before.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="monday"
              checked={monday}
              onCheckedChange={() => setMonday(!monday)}
            />
            <label
              htmlFor="monday"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Monday
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tuesday"
              checked={tuesday}
              onCheckedChange={() => setTuesday(!tuesday)}
            />
            <label
              htmlFor="tuesday"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tuesday
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wednesday"
              checked={wednesday}
              onCheckedChange={() => setWednesday(!wednesday)}
            />
            <label
              htmlFor="wednesday"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Wednesday
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="thursday"
              checked={thursday}
              onCheckedChange={() => setThursday(!thursday)}
            />
            <label
              htmlFor="thursday"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Thursday
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="friday"
              checked={friday}
              onCheckedChange={() => setFriday(!friday)}
            />
            <label
              htmlFor="friday"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Friday
            </label>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { RemoteDaysConfigurator };
