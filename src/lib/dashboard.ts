export type DashboardEvent = {
  title: string;
  date: string;
};

export type DashboardSummary = {
  balance: number;
  nextEvent: DashboardEvent | null;
};

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  return {
    balance: 1240,
    nextEvent: { title: "Cita médica", date: "Mañana" },
  };
};