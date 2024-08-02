import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useLocationStore } from "@/stores/locationStore";
import { useUserStore } from "@/stores/userStore";

export const AddRemoteDates = () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const locationStore = useLocationStore();

  const currentUser = userStore.users.find(
    (u) => u.user_id === authStore.currentUser?.id,
  );

  const getIsRemoteToday = () => {
    if (userStore.users.length !== 0) {
      const d = new Date();
      if (currentUser?.locations) {
        console.log(d.toISOString().split("T")[0]);
        console.log(currentUser.locations);
        return currentUser.locations.find(
          (location) => location.remote_date === d.toISOString().split("T")[0],
        );
      }
    }
    return false;
  };

  const getIsRemoteTomorrow = () => {
    if (userStore.users.length !== 0) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      if (currentUser?.locations) {
        return currentUser.locations.find(
          (location) => location.remote_date === d.toISOString().split("T")[0],
        );
      }
    }
    return false;
  };

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

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-4 m-4 p-0">
      <Button
        variant="outline"
        onClick={
          getIsRemoteToday() ? handleRemoveRemoteToday : handleAddRemoteToday
        }
      >
        I am {getIsRemoteToday() ? "In office" : "Remote"} Today
      </Button>
      <Button
        variant="outline"
        onClick={
          getIsRemoteTomorrow()
            ? handleRemoveRemoteTomorrow
            : handleAddRemoteTomorrow
        }
      >
        I am {getIsRemoteTomorrow() ? "In office" : "Remote"} Tomorrow
      </Button>
    </div>
  );
};
