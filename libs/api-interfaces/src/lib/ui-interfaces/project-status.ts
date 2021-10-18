export type ProjectStatus = 'FINISHED' | 'ON_HOLD' | 'IN_PROGRESS';

export const STATUS_MAPPING: Record<
  ProjectStatus,
  { label: string; theme: string }
> = {
  FINISHED: {
    label: 'Finished',
    theme: 'bg-success',
  },
  ON_HOLD: {
    label: 'On hold',
    theme: 'bg-danger',
  },
  IN_PROGRESS: {
    label: 'In progress',
    theme: 'bg-warning',
  },
};
