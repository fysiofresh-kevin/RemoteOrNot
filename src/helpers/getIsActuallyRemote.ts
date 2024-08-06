const getIsActuallyRemoteToday = (user: {
  locationToday: boolean;
  isScheduledRemoteToday: boolean;
}) =>
  user.locationToday
    ? !user.isScheduledRemoteToday
    : !!user.isScheduledRemoteToday;

const getIsActuallyRemoteTomorrow = (user: {
  locationTomorrow: boolean;
  isScheduledRemoteTomorrow: boolean;
}) =>
  user.locationTomorrow
  ? !user.isScheduledRemoteTomorrow
  : !!user.isScheduledRemoteTomorrow;

export { getIsActuallyRemoteToday, getIsActuallyRemoteTomorrow };
