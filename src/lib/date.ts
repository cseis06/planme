const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export const formatTodayLabel = (date = new Date()) => {
  const label = dateFormatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
};