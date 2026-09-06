export type ExperimentMode = "manual" | "automatic";
export type ExperimentStatus = "active" | "paused" | "completed" | "inconclusive" | "cancelled";

export type AssignmentPayload = {
  experimentId: string;
  participantId: string;
  pageId: string;
  variant: "a" | "b";
  exp: number;
};

export type PublicExperimentConfig = {
  experiment: null | {
    id: string;
    baselinePageId: string;
    baselinePath: string;
    challengerPageId: string;
    challengerPath: string;
    baselineAllocation: number;
    endsAt: string | null;
  };
  permanentPath: string;
};
