import { UserWithLocations } from "@/App";
import {
  getIsActuallyRemoteToday,
  getIsActuallyRemoteTomorrow,
} from "@/helpers/getIsActuallyRemote";
import { getIsRemote } from "@/helpers/getIsUserRemote";
import { supabase } from "@/supabase";
import { toast } from "sonner";

const getUsersWithLocations = async () => {
  const { data } = await supabase.from("user_profiles").select(
    `
    name,
    user_id,
    days_remote,
    locations ( user_id, remote_date )
    `,
  );
  if (data) {
    const newUsers: UserWithLocations[] = [];
    data.forEach((user) => {
      if (!user.days_remote) user.days_remote = [];
      const { today, tomorrow, scheduledToday, scheduledTomorrow } =
        getIsRemote(user);
      const newUser: UserWithLocations = {
        ...user,
        locationToday: today,
        locationTomorrow: tomorrow,
        isScheduledRemoteToday: scheduledToday,
        isScheduledRemoteTomorrow: scheduledTomorrow,
        backInOffice: null,
      };
      user.locations.sort(
        (a, b) =>
          new Date(b.remote_date).valueOf() - new Date(a.remote_date).valueOf(),
      );

      if (
        getIsActuallyRemoteToday(newUser) &&
        !getIsActuallyRemoteTomorrow(newUser)
      ) {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        newUser.backInOffice = d;
      }
      if (
        getIsActuallyRemoteToday(newUser) &&
        getIsActuallyRemoteTomorrow(newUser)
      ) {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        newUser.backInOffice = d;
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
