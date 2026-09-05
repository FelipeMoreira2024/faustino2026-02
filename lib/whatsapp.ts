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

export const WA_HOME_STANDARD = createWhatsAppLink(
  "Olá, preciso conversar com um Advogado de Defesa Criminal."
);

/**
 * Variante B da home (/b): o lead se autodeclara "defesa criminal" + "particular"
 * e indica a situação antes da primeira resposta — triagem no clique.
 */
export const WA_HOME_B = createWhatsAppLink(
  "Olá, Dr. Rodrigo. Preciso de defesa criminal e busco atendimento particular.\n" +
    "Minha situação: (fui preso / familiar preso / recebi intimação / estou sendo investigado / respondo a processo)"
);

export const WA_FLAGRANTE = createWhatsAppLink(
  "URGENTE: prisão em flagrante. Preciso de um advogado criminalista agora."
);

export const WA_SIGILO = createWhatsAppLink(
  "Olá, preciso de defesa em uma acusação delicada e busco atendimento sigiloso."
);
