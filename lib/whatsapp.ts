import {
  PHONE_DISPLAY,
  PHONE_E164,
  PHONE_TEL,
} from "@/lib/site";

export { PHONE_DISPLAY, PHONE_TEL };

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${PHONE_E164.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

/**
 * Deep-links da Seção 13 do docs/copy.md — textos pré-preenchidos exatos (URL-encoded).
 */
export const WA_STANDARD = createWhatsAppLink(
  "Olá, preciso conversar com um advogado de defesa criminal."
);

export const WA_FLAGRANTE = createWhatsAppLink(
  "URGENTE: prisão em flagrante. Preciso de um advogado criminalista agora."
);

export const WA_SIGILO = createWhatsAppLink(
  "Olá, preciso de defesa em uma acusação delicada e busco atendimento sigiloso."
);
