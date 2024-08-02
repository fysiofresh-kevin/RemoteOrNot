import { UserWithLocations } from "@/App";
import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const getUsersWithLocations = (
  setUsers: Dispatch<SetStateAction<UserWithLocations[]>>,
) => {
  supabase
    .from("user_profiles")
    .select(
      `
    name,
    user_id,
    locations ( user_id, remote_date )
    `,
    )
    .then(({ data }) => {
      if (data) {
        const newUsers: UserWithLocations[] = [];
        data.forEach((user) => {
          const newUser: UserWithLocations = {
            ...user,
            backInOffice: null,
          };
          user.locations.sort(
            (a, b) =>
              new Date(a.remote_date).valueOf() +
              new Date(b.remote_date).valueOf(),
          );

          if (user.locations.length > 0) {
            const backInOffice = new Date(user.locations[0].remote_date);
            backInOffice.setDate(backInOffice.getDate() + 1);
            newUser.backInOffice = backInOffice
          }
          newUsers.push(newUser);
        });

        setUsers(newUsers);
      } else {
        setUsers([]);
        toast.error("No users found");
      }
    });
};

export { getUsersWithLocations };
