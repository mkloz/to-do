import { create } from 'zustand';
import { AlertType } from '@/types/ui';
import { RandomUtils } from '@/utils/RandomUtils';

export class Alert {
  id: string;
  message: string;
  type: AlertType;

  constructor(message: string, type: AlertType) {
    this.id = RandomUtils.generateId();
    this.message = message;
    this.type = type;
  }
}

export interface AlertsStore {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

export const useAlertsStore = create<AlertsStore>((set) => ({
  alerts: [],
  addAlert: (alert: Alert) => {
    set((state) => ({ alerts: [...state.alerts, alert] }));
  },
  removeAlert: (id: string) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
  clearAlerts: () => set({ alerts: [] }),
}));
