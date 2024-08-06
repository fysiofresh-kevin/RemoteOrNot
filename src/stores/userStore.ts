import { getUsersWithLocations } from "@/api/getUsersWithLocations";
import { setRemoteDays } from "@/api/setRemoteDays";
import { UserWithLocations } from "@/App";
import { toast } from "sonner";
import { create } from "zustand";

const useUserStore = create<{
  users: UserWithLocations[];
  loading: boolean;
  getUsers: () => Promise<void>;
  setRemoteDays: (userId: string, days: number[]) => Promise<void>;
}>((set) => ({
  users: [],
  loading: false,
  getUsers: async () => {
    set({ loading: true });
    const users = await getUsersWithLocations();
    set({ users, loading: false });
  },
  setRemoteDays: async (userId: string, days: number[]) => {
    set({ loading: true });
    const res = await setRemoteDays(userId, days);
    if (res) toast.success("Remote days updated");
    set({ loading: false });
  },
}));

export { useUserStore };
