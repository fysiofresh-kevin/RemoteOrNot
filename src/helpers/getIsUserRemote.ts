/**
 * Returns an object with booleans for the current day and tomorrow
 * @param user - the user object
 * @returns
 * {
 * today: boolean
 * tomorrow: boolean
 * scheduledToday: boolean
 * scheduledTomorrow: boolean
 * }
 */
const getIsRemote = (user: {
  locations?: { user_id: string; remote_date: string }[];
  days_remote: number[];
}): {
  today: boolean;
  tomorrow: boolean;
  scheduledToday: boolean;
  scheduledTomorrow: boolean;
} => {
  let today = false,
    tomorrow = false,
    scheduledToday = false,
    scheduledTomorrow = false;

  if (!user.locations && !user.days_remote)
    return {
      today: false,
      tomorrow: false,
      scheduledToday: false,
      scheduledTomorrow: false,
    };

  const dToday = new Date();
  const dTomorrow = new Date();
  dTomorrow.setDate(dTomorrow.getDate() + 1);

  if (user.locations) {
    for (const location of user.locations) {
      if (location.remote_date === dToday.toISOString().split("T")[0]) {
        today = true;
      }
      if (location.remote_date === dTomorrow.toISOString().split("T")[0]) {
        tomorrow = true;
      }
    }
  }
  for (const day of user.days_remote) {
    if (day === dToday.getDay()) {
      scheduledToday = true;
      if (day === dTomorrow.getDay()) {
        scheduledTomorrow = true;
      }
    }
  }

  return {
    today,
    tomorrow,
    scheduledToday,
    scheduledTomorrow,
  };
};

export { getIsRemote };
