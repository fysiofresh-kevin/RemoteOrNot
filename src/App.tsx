import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { LogInScreen } from "./components/LogInScreen";
import { SignOutButton } from "./components/SignOutButton";
import { toast } from "sonner";
import { Router, Building } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { getUsersWithLocations } from "./api/getUsersWithLocations";

export type UserWithLocations = {
  user_id: string;
  name: string;
  backInOffice: Date | null;
  locations?: { user_id: string; remote_date: string }[];
};

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserWithLocations[]>([]);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setCurrentUser(data.session.user);
      } else {
        setCurrentUser(null);
      }
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getUsersWithLocations(setUsers);

    setIsLoading(false);
  }, [currentUser]);

  const getIsRemote = (user: {
    locations?: { user_id: string; remote_date: string }[];
  }): boolean => {
    const usersLocations = user.locations ?? [];
    usersLocations.sort(
      (a, b) =>
        new Date(a.remote_date).valueOf() + new Date(b.remote_date).valueOf(),
    );
    const remoteDates = usersLocations.map(
      (location) => new Date(location.remote_date),
    );
    if (remoteDates[0]) {
      remoteDates[0].setDate(remoteDates[0].getDate() + 1);
      console.log(remoteDates[0]);
      if (remoteDates[0] > new Date()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black/50 absolute flex justify-center items-center top-0 left-0 h-screen w-screen m-0 p-0">
        <Card className="max-w-5xl min-w-96">
          <CardHeader>
            <CardTitle className="text-left">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <LogInScreen
        setCurrentUser={setCurrentUser}
        setIsLoading={setIsLoading}
      />
    );
  } else {
    return (
      <>
        <SignOutButton currentUser={currentUser} />
        <div className="flex justify-center">
          <div className="max-w-5xl w-full">
            <h1 className="text-3xl">Welcome to Remote-Or-Not</h1>
            <h2 className="text-2xl">
              Check if your colleague is remote or not
            </h2>
            <div className="py-8 w-full">
              <h3 className="text-xl text-left">Users</h3>
              <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
                {users.map((user) => {
                  return (
                    <Card
                      key={user.user_id}
                      className={`w-full max-w-xl ${getIsRemote(user) ? "bg-red-300" : "bg-green-300"}`}
                    >
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center gap-4">
                          <span className="text-xl">{user.name}</span>
                          <span className="text-base font-normal">
                            {getIsRemote(user) ? <Router /> : <Building />}
                          </span>
                        </CardTitle>
                        <CardContent className="p-0">
                          {getIsRemote(user) && (
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
