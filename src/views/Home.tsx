import { AddRemoteDates } from "@/components/AddRemoteDates";
import { SignOutButton } from "@/components/SignOutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCard } from "@/components/UserCard";
import { getIsActuallyRemoteToday, getIsActuallyRemoteTomorrow } from "@/helpers/getIsActuallyRemote";
import { useAuthStore } from "@/stores/authStore";
import { useLocationStore } from "@/stores/locationStore";
import { useUserStore } from "@/stores/userStore";
import { Building } from "lucide-react";
import { useEffect } from "react";

const Home = () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const locationStore = useLocationStore();

  useEffect(() => {
    userStore.getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.currentUser]);

  useEffect(() => {
    userStore.getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationStore.bump]);

  if (userStore.loading || authStore.loading) {
    return (
      <div className="flex justify-center">
        <div className="max-w-5xl w-full">
          <h1 className="text-3xl">Welcome to Remote-Or-Not</h1>
          <h2 className="text-2xl">Check if your colleague is remote or not</h2>
          <div className="py-8 w-full">
            <h3 className="text-xl text-left">Users</h3>
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
              {[1, 2, 3].map((v) => (
                <Card key={v} className="w-full max-w-xl bg-green-300">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center gap-4">
                      <span className="text-xl">Loading...</span>
                      <span className="text-base font-normal">
                        <Building />
                      </span>
                    </CardTitle>
                    <CardContent className="p-0">
                      <div className="text-left">
                        <span className="font-medium">Back in office:</span>
                        <p className="text-left w-full">Loading...</p>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <SignOutButton currentUser={authStore.currentUser} />
      <AddRemoteDates />
      <div className="flex justify-center">
        <div className="max-w-5xl w-full">
          <h1 className="text-3xl">Welcome to Remote-Or-Not</h1>
          <h2 className="text-2xl">Check if your colleague is remote or not</h2>
          <div className="py-8 w-full">
            <h3 className="text-xl text-left">Users</h3>
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
              {userStore.users.map((user) => {
                return (
                  <UserCard
                    key={user.user_id}
                    user={user}
                    today={getIsActuallyRemoteToday(user)}
                    tomorrow={getIsActuallyRemoteTomorrow(user)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Home };
