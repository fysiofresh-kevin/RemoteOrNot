import { supabase } from "@/supabase";
import { toast } from "sonner";
import { create } from "zustand";

const useLocationStore = create<{
  bump: number;
  addLocation: (userId: string, remoteDate: string) => Promise<void>;
  removeLocation: (userId: string, remoteDate: string) => Promise<void>;
}>((set) => ({
  bump: 0,
  addLocation: async (userId: string, remoteDate: string) => {
    const { error } = await supabase.from("locations").insert({
      user_id: userId,
      remote_date: remoteDate,
    });
    if (error) {
      toast.error(error.message);
    }
    set((p) => ({ bump: p.bump + 1 }));
  },
  removeLocation: async (userId: string, remoteDate: string) => {
    const { error } = await supabase
      .from("locations")
      .delete()
      .eq("user_id", userId)
      .eq("remote_date", remoteDate);
    if (error) {
      toast.error(error.message);
    }
    set((p) => ({ bump: p.bump + 1 }));
  },
}));

export { useLocationStore };
