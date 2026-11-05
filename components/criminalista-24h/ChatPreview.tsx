import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { AVATAR_SRC } from "@/components/criminalista-24h/ui";
import { cn } from "@/lib/utils";
import { WA_HOME_MESSAGE } from "@/lib/whatsapp";

/**
 * Prévia fiel do que acontece no clique: o WhatsApp abre com esta mensagem já
 * escrita. Tira o medo de "o que eu escrevo?" sem inventar resposta nenhuma.
 */
export function C24ChatPreview({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#0b141a] shadow-[0_34px_70px_-34px_rgba(0,0,0,0.85)]",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
        <Image
          src={AVATAR_SRC}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[15px] font-semibold text-[#e9edef]">Dr. Rodrigo Faustino</p>
          <p className="truncate text-xs text-[#8696a0]">Advogado criminalista · plantão 24h</p>
        </div>
      </div>

      <div className="c24-chat-bg px-4 pb-7 pt-5">
        <p className="mx-auto mb-5 w-fit rounded-md bg-[#182229] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#8696a0]">
          Hoje
        </p>
        <div className="relative ml-auto w-fit max-w-[88%] rounded-lg rounded-tr-none bg-[#005c4b] px-3 pb-1.5 pt-2 text-[15px] leading-snug text-[#e9edef] shadow-md">
          {WA_HOME_MESSAGE}
          <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#9fc3ba]">
            agora
            <CheckCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </span>
        </div>
      </div>

      <figcaption className="border-t border-white/5 bg-[#111b21] px-4 py-3 text-[13px] leading-snug text-[#8696a0]">
        A conversa abre com a mensagem pronta. É só tocar em enviar.
      </figcaption>
    </figure>
  );
}
