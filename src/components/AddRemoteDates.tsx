import { Button } from "@/components/ui/button";
import {
  getIsActuallyRemoteToday,
  getIsActuallyRemoteTomorrow,
} from "@/helpers/getIsActuallyRemote";
import { useAuthStore } from "@/stores/authStore";
import { useLocationStore } from "@/stores/locationStore";
import { useUserStore } from "@/stores/userStore";
import { RemoteDaysConfigurator } from "@/components/RemoteDaysConfigurator";

/**
 * Buttons to add/remove remote dates
 */
export const AddRemoteDates = () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const locationStore = useLocationStore();

  const currentUser = userStore.users.find(
    (u) => u.user_id === authStore.currentUser?.id,
  );

  /** If the user is scheduled to be remote today and this function is called, add the date */
  const handleAddRemoteToday = () => {
    if (!authStore.currentUser) {
      return;
    }
    locationStore.addLocation(
      authStore.currentUser?.id,
      new Date().toISOString().split("T")[0],
    );
  };

  const handleAddRemoteTomorrow = () => {
    if (!authStore.currentUser) {
      return;
    }
    const d = new Date();
    d.setDate(d.getDate() + 1);
    locationStore.addLocation(
      authStore.currentUser?.id,
      d.toISOString().split("T")[0],
    );
  };
  const handleRemoveRemoteToday = () => {
    if (!authStore.currentUser) {
      return;
    }
    locationStore.removeLocation(
      authStore.currentUser?.id,
      new Date().toISOString().split("T")[0],
    );
  };

  const handleRemoveRemoteTomorrow = () => {
    if (!authStore.currentUser) {
      return;
    }
    const d = new Date();
    d.setDate(d.getDate() + 1);
    locationStore.removeLocation(
      authStore.currentUser?.id,
      d.toISOString().split("T")[0],
    );
  };

  if (!currentUser) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-4 m-4 p-0">
      <Button
        variant="outline"
        onClick={
          currentUser.locationToday
            ? handleRemoveRemoteToday
            : handleAddRemoteToday
        }
      >
        I am {getIsActuallyRemoteToday(currentUser) ? "In office" : "Remote"}{" "}
        Today
      </Button>
      <Button
        variant="outline"
        onClick={
          currentUser.locationTomorrow
            ? handleRemoveRemoteTomorrow
            : handleAddRemoteTomorrow
        }
      >
        I am {getIsActuallyRemoteTomorrow(currentUser) ? "In office" : "Remote"}{" "}
        Tomorrow
      </Button>
      <RemoteDaysConfigurator />
    </div>
  );
};
