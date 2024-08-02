import { UserWithLocations } from "@/App";
import { supabase } from "@/supabase";
import { toast } from "sonner";

const getUsersWithLocations = async () => {
  const { data } = await supabase.from("user_profiles").select(
    `
    name,
    user_id,
    locations ( user_id, remote_date )
    `,
  );
  if (data) {
    const newUsers: UserWithLocations[] = [];
    data.forEach((user) => {
      const newUser: UserWithLocations = {
        ...user,
        backInOffice: null,
      };
      user.locations.sort(
        (a, b) =>
          new Date(b.remote_date).valueOf() - new Date(a.remote_date).valueOf(),
      );

      if (user.locations.length > 0) {
        console.log("LAST REMOTE DATE: ", user.locations[0].remote_date);
        const backInOffice = new Date(user.locations[0].remote_date);
        backInOffice.setDate(backInOffice.getDate() + 1);
        newUser.backInOffice = backInOffice;
      }
      newUsers.push(newUser);
    });

    return newUsers;
  } else {
    toast.error("No users found");
    return [];
  }
};

export { getUsersWithLocations };
