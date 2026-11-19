export type ExperimentMode = "manual" | "automatic";
export type ExperimentStatus = "active" | "paused" | "completed" | "inconclusive" | "cancelled";
export type ExperimentMetric = "qualified_lead" | "whatsapp_click";
export type LeadStage = "conversation" | "qualified";
export type ExperimentPlanInput = {
  hypothesis: string;
  metric: ExperimentMetric;
  baselineRate: number;
  minimumLift: number;
  dailyBrowsers: number;
  attributionDays: number;
};
export type ExperimentPlan = ExperimentPlanInput & { perVariant: number; revision: string | null };

export type AssignmentPayload = {
  experimentId: string;
  participantId: string;
  pageId: string;
  variant: "a" | "b";
  exp: number;
};

export type PageAddress = { host: string; path: string };
export type Exposure = AssignmentPayload & { entryHost: string; entryPath: string; contactReference?: string };

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
    measureLeads?: boolean;
  };
  publications: { entry: PageAddress; page: PageAddress }[];
};
