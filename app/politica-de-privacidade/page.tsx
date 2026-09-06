import type { Metadata } from "next";
import { TrustPageShell } from "@/components/TrustPageShell";
import { ATTORNEY_NAME, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade | Faustino Advocacia",
  description:
    "Política de privacidade e tratamento de dados nos canais digitais da Faustino Advocacia.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Dados tratados",
    text: "O site pode registrar dados técnicos de navegação, origem da visita e interações com botões. Quando você inicia contato por telefone ou WhatsApp, os dados enviados por você passam a ser tratados para triagem, atendimento, contratação e cumprimento de obrigações legais e profissionais.",
  },
  {
    title: "Envio de informações sensíveis",
    text: "Evite enviar documentos, imagens, conversas, senhas ou dados de terceiros antes de orientação. No primeiro contato, informe apenas cidade, fase do caso, data do próximo ato e os dados mínimos necessários para identificar a urgência.",
  },
  {
    title: "Analytics e publicidade",
    text: "Ferramentas de mensuração por meio do Google Tag Manager somente são carregadas após a aceitação de cookies de métricas. Se você recusar, o site continua funcionando sem essas tags. A escolha fica registrada no navegador e pode ser alterada pelo link ‘Preferências de cookies’ no rodapé.",
  },
  {
    title: "Testes de página",
    text: "O site pode comparar versões da página inicial para entender qual facilita o contato, com fundamento no interesse legítimo de avaliar o funcionamento e melhorar a clareza do canal digital. Um identificador aleatório próprio mantém a versão exibida e permite contar uma visita e, quando ocorrer, o primeiro clique no WhatsApp daquela sessão. Não são armazenados nome, telefone, conteúdo da conversa, endereço IP ou a URL completa para essa finalidade. Os registros pseudônimos são mantidos por até 90 dias após o fim do teste; resultados agregados podem ser preservados no histórico. A participação pode ser desativada em ‘Preferências de cookies’.",
  },
  {
    title: "WhatsApp e serviços externos",
    text: "Ao clicar no WhatsApp, telefone ou mapa, você acessa serviços de terceiros. O tratamento realizado por essas plataformas segue também suas próprias políticas. Durante um teste de página, o primeiro clique no WhatsApp pode ser contado pelo sistema próprio mesmo sem ativar o Google Analytics. O redirecionamento ocorre normalmente se a medição estiver indisponível.",
  },
  {
    title: "Sigilo profissional e segurança",
    text: "Informações recebidas no exercício da advocacia são protegidas pelas regras profissionais aplicáveis. São adotadas medidas de acesso e organização compatíveis com a natureza dos dados, sem que seja possível prometer risco zero em transmissões pela internet.",
  },
  {
    title: "Direitos e contato",
    text: `Você pode solicitar informações, correção ou avaliação sobre dados pessoais pelos canais oficiais do escritório. Responsável: ${ATTORNEY_NAME}. Telefone: ${PHONE_DISPLAY}. Solicitações podem exigir confirmação de identidade para proteger o próprio titular.`,
  },
];

export default function PrivacyPage() {
  return (
    <TrustPageShell
      eyebrow="PRIVACIDADE E LGPD"
      title="Política de Privacidade"
      intro="Esta política explica como dados podem ser tratados durante a navegação e o contato com o escritório. Última revisão: 6 de setembro de 2026."
    >
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="border-t border-ink/15 pt-7">
            <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{section.text}</p>
          </section>
        ))}
      </div>
    </TrustPageShell>
  );
}
