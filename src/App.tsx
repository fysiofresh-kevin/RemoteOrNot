import "@/App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogInScreen } from "@/components/LogInScreen";
import { SignOutButton } from "@/components/SignOutButton";
import { Router, Building, Calendar } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { getIsRemote } from "@/helpers/getIsUserRemote";
import { useEffect, useRef } from "react";
import { AddRemoteDates } from "@/components/AddRemoteDates";
import { useLocationStore } from "./stores/locationStore";

export type UserWithLocations = {
  user_id: string;
  name: string;
  backInOffice: Date | null;
  locations?: { user_id: string; remote_date: string }[];
};

function App() {
  const isMounted = useRef(false);
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const locationStore = useLocationStore();

  useEffect(() => {
    userStore.getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.currentUser, locationStore.bump]);

  useEffect(() => {
    isMounted.current = true;
    authStore.getCurrentUser();
    userStore.getUsers();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (!authStore.currentUser) {
    return <LogInScreen />;
  } else {
    return (
      <>
        <SignOutButton currentUser={authStore.currentUser} />
        <AddRemoteDates />
        <div className="flex justify-center">
          <div className="max-w-5xl w-full">
            <h1 className="text-3xl">Welcome to Remote-Or-Not</h1>
            <h2 className="text-2xl">
              Check if your colleague is remote or not
            </h2>
            <div className="py-8 w-full">
              <h3 className="text-xl text-left">Users</h3>
              <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
                {userStore.users.map((user) => {
                  return (
                    <Card
                      key={user.user_id}
                      className={`w-full max-w-xl ${getIsRemote(user).today ? "bg-red-300" : "bg-green-300"}`}
                    >
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center gap-4">
                          <span className="text-xl">{user.name}</span>
                          <span className="text-base font-normal">
                            {getIsRemote(user) ? <Router /> : <Building />}
                          </span>
                        </CardTitle>
                        <CardContent className="p-0">
                          {getIsRemote(user).tomorrow &&
                            !getIsRemote(user).today && (
                              <>
                                <div className="border-b border-black/10 my-2" />
                                <div className="text-left flex gap-2">
                                  <Calendar />
                                  <span>Remote tomorrow</span>
                                </div>
                              </>
                            )}
                          {getIsRemote(user).today && (
                            <div className="text-left">
                              <span className="font-medium">
                                Back in office:
                              </span>
                              <p className="text-left w-full">
                                {user.backInOffice?.toDateString()}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
