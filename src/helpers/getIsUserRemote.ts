const getIsRemote = (user: {
  locations?: { user_id: string; remote_date: string }[];
}): { today: boolean; tomorrow: boolean } => {
  const locationToday = user.locations?.find(
    (location) =>
      location.remote_date === new Date().toISOString().split("T")[0],
  );
  const locationTomorrow = user.locations?.find((location) => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return location.remote_date === d.toISOString().split("T")[0];
  });
  return {
    today: !!locationToday,
    tomorrow: !!locationTomorrow,
  };
};

export { getIsRemote };
