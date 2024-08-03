import { UserWithLocations } from "@/App";
import { Building, Calendar, Router } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const UserCard = ({
  user,
  today,
  tomorrow,
}: {
  user: UserWithLocations;
  today: boolean;
  tomorrow: boolean;
}) => {
  return (
    <Card
      key={user.user_id}
      className={`w-full max-w-xl ${today ? "bg-red-300" : "bg-green-300"}`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4">
          <span className="text-xl">{user.name}</span>
          <span className="text-base font-normal">
            {today ? <Router /> : <Building />}
          </span>
        </CardTitle>
        <CardContent className="p-0">
          {tomorrow && !today && (
            <>
              <div className="border-b border-black/10 my-2" />
              <div className="text-left flex gap-2">
                <Calendar />
                <span>Remote tomorrow</span>
              </div>
            </>
          )}
          {today && (
            <div className="text-left">
              <span className="font-medium">Back in office:</span>
              <p className="text-left w-full">
                {user.backInOffice?.toDateString()}
              </p>
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export { UserCard };
