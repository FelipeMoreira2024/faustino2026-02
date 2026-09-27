"use client";

import { PHONE_TEL } from "@/lib/site";
import { trackLpLead } from "@/components/lp/tracking";

type LpPhoneLinkProps = {
  section: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

export function LpPhoneLink({ section, className, ariaLabel, children }: LpPhoneLinkProps) {
  return (
    <a
      href={PHONE_TEL}
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackLpLead("phone", section)}
    >
      {children}
    </a>
  );
}
