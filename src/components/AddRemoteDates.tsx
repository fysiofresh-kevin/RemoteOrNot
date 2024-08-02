import { useState } from "react";
import { Button } from "./ui/button";

export const AddRemoteDates = () => {
  const [remoteToday, setRemoteToday] = useState<boolean>();
  const [remoteTommorow, setRemoteTommorow] = useState<boolean>();

  const getRemoteDate = (d: Date) => {};

  const setRemoteDate = (d: Date) => {};

  return (
    <div className="flex items-center">
      <Button>{remoteToday ? "In office" : "Remote"} Today</Button>
      <Button>{remoteToday ? "In office" : "Remote"}  Tomorrow</Button>
    </div>
  );
};
