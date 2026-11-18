export type ExperimentMode = "manual" | "automatic";
export type ExperimentStatus = "active" | "paused" | "completed" | "inconclusive" | "cancelled";

export type AssignmentPayload = {
  experimentId: string;
  participantId: string;
  pageId: string;
  variant: "a" | "b";
  exp: number;
};

export type PageAddress = { host: string; path: string };
export type Exposure = AssignmentPayload & { entryHost: string; entryPath: string };

export type PublicExperimentConfig = {
  experiment: null | {
    id: string;
    entry: PageAddress;
    baselinePageId: string;
    baseline: PageAddress;
    challengerPageId: string;
    challenger: PageAddress;
    baselineAllocation: number;
    endsAt: string | null;
  };
  publications: { entry: PageAddress; page: PageAddress }[];
};
