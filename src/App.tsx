import "./App.css";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { LogInScreen } from "./components/LogInScreen";
import { SignOutButton } from "./components/SignOutButton";
import { toast } from "sonner";
import { Router, Building } from "lucide-react";
import { User } from "@supabase/supabase-js";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<
    {
      user_id: string;
      name: string;
      is_user_remote?: { user_id: string; remote_until: string };
    }[]
  >([]);

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
    supabase
      .from("user_profiles")
      .select(
        `
        name,
        user_id,
        is_user_remote ( user_id, remote_until )
        `,
      )
      .then(({ data }) => {
        if (data) {
          const formattedUsers = data.map((user) => ({
            ...user,
            is_user_remote: user.is_user_remote
              ? user.is_user_remote[0]
              : undefined,
          }));
          setUsers(formattedUsers);
        } else {
          setUsers([]);
          toast.error("No users found");
        }
      });

    setIsLoading(false);
  }, [currentUser]);

  const getIsRemote = (user: {
    is_user_remote?: { user_id: string; remote_until: string };
  }): boolean => {
    if (user.is_user_remote?.remote_until) {
      const d = new Date(user.is_user_remote?.remote_until);
      d.setDate(d.getDate() + 1);
      if (d > new Date()) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
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
        <div>
          <h1 className="text-3xl">Welcome to Remote-Or-Not</h1>
          <h2 className="text-2xl">Check if your colleague is remote or not</h2>
          <div className="py-8">
            <h3 className="text-xl text-left">Users</h3>
            <div className="grid grid-cols-2 mt-4">
              {users.map((user) => {
                return (
                  <Card
                    key={user.user_id}
                    className={
                      getIsRemote(user) ? "bg-red-300" : "bg-green-300"
                    }
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{user.name}</span>
                        <span className="text-base font-normal">
                          {getIsRemote(user) ? <Router /> : <Building />}
                        </span>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
