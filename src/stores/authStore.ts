import { createUser } from "@/api/createUser";
import { signIn } from "@/api/signIn";
import { supabase } from "@/supabase";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

const useAuthStore = create<{
  currentUser: User | null;
  loading: boolean;
  getCurrentUser: () => Promise<void>;
  handleSignIn: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string, name: string) => Promise<void>;
}>((set) => ({
  currentUser: null,
  loading: false,
  getCurrentUser: async () => {
    set({ loading: true });
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      set({ currentUser: data.session.user, loading: false });
    }
    set({ loading: false });
  },
  handleSignIn: async (email: string, password: string) => {
    set({ loading: true });
    const user = await signIn(email, password);
    set({ currentUser: user, loading: false });
  },
  createUser: async (email: string, password: string, name: string) => {
    set({ loading: true });
    const user = await createUser(email, password, name);
    set({ currentUser: user, loading: false });
  },
}));

export { useAuthStore };
