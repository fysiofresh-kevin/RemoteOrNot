import { getUsersWithLocations } from "@/api/getUsersWithLocations";
import { UserWithLocations } from "@/App";
import { create } from "zustand";

const useUserStore = create<{
  users: UserWithLocations[];
  loading: boolean;
  getUsers: () => Promise<void>;
}>((set) => ({
  users: [],
  loading: false,
  getUsers: async () => {
    set({ loading: true });
    const users = await getUsersWithLocations();
    set({ users, loading: false });
  },
}));

export { useUserStore };
