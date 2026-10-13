export interface BriefingData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  stage?: string;
  budget?: string;
  description: string;
}

export const UMBRA_CONTACT = {
  name: 'João Manuel Cesário de Jesus Oliveira',
  role: 'Fundador & Desenvolvedor Full Stack',
  email: 'ofc.umbra@gmail.com',
  phone: '11941774214',
  phoneFormatted: '(11) 94177-4214',
  whatsappNumber: '5511941774214',
  whatsappUrl: 'https://wa.me/5511941774214?text=Ol%C3%A1!%20Conheci%20a%20UMBRA%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.',
  company: 'UMBRA Applications',
  city: 'Guarulhos — SP',
};

export interface SendBriefingResult {
  success: boolean;
  delivered: boolean;
  configured: boolean;
  message: string;
  recipient: string;
}

/**
 * Generates an executive, well-structured text summary of the project briefing.
 */
export function generateBriefingText(data: BriefingData): string {
  const dateFormatted = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return [
    '=================================================================',
    '              UMBRA APPLICATIONS — BRIEFING DE PROJETO            ',
    '                  Tecnologia para o próximo passo                 ',
    '=================================================================',
    `Data do registro: ${dateFormatted}`,
    '',
    '1. DADOS DE IDENTIFICAÇÃO E CONTATO',
    '-----------------------------------------------------------------',
    `Nome do Contato: ${data.name || 'Não informado'}`,
    `E-mail:          ${data.email || 'Não informado'}`,
    `Telefone/Whats:  ${data.phone || 'Não informado'}`,
    `Empresa/Marca:   ${data.company || 'Não informada'}`,
    '',
    '2. ESCOPO DO PROJETO',
    '-----------------------------------------------------------------',
    `Solução Desejada: ${data.service}`,
    `Fase Atual:       ${data.stage || 'Em planejamento inicial'}`,
    `Estimativa:       ${data.budget || 'A definir em conjunto'}`,
    '',
    '3. DESAFIO, CONTEXTO E OBJETIVOS',
    '-----------------------------------------------------------------',
    data.description || 'Nenhuma descrição detalhada informada.',
    '',
    '=================================================================',
    'Próximo passo: análise técnica de arquitetura e proposta de escopo.',
    `Atendimento oficial: ${UMBRA_CONTACT.name} | ${UMBRA_CONTACT.email}`,
    '=================================================================',
  ].join('\n');
}

/**
 * Triggers a browser download of the structured text briefing file.
 */
export function downloadBriefingFile(data: BriefingData): void {
  const text = generateBriefingText(data);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'projeto';
  a.href = url;
  a.download = `briefing-umbra-${safeName}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates a pre-filled mailto URL for direct email dispatch.
 * Official destination: ofc.umbra@gmail.com
 */
export function generateMailtoUrl(data: BriefingData): string {
  const subject = encodeURIComponent(`[BRIEFING UMBRA] ${data.name} — ${data.service}`);
  const body = encodeURIComponent(generateBriefingText(data));
  return `mailto:${UMBRA_CONTACT.email}?subject=${subject}&body=${body}`;
}

/**
 * Generates a WhatsApp direct messaging link with concise summary directed to official number.
 */
export function generateWhatsAppUrl(data: BriefingData): string {
  const text = [
    `*Novo Briefing — UMBRA Applications*`,
    `*Nome:* ${data.name}`,
    `*E-mail:* ${data.email}`,
    data.phone ? `*Tel:* ${data.phone}` : null,
    data.company ? `*Empresa:* ${data.company}` : null,
    `*Solução:* ${data.service}`,
    data.stage ? `*Fase:* ${data.stage}` : null,
    '',
    `*Desafio:*`,
    data.description,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/5511941774214?text=${encodeURIComponent(text)}`;
}

/**
 * Generates official general WhatsApp direct link for sales and technical inquiries.
 */
export function generateWhatsAppGeneralUrl(message?: string): string {
  const text = message || 'Olá! Conheci a UMBRA pelo site e gostaria de conversar sobre um projeto.';
  return `https://wa.me/5511941774214?text=${encodeURIComponent(text)}`;
}

/**
 * Real server-side email dispatch client call.
 * Posts briefing data to /api/send-briefing without exposing any secrets in the browser.
 */
export async function sendBriefingViaApi(
  data: BriefingData
): Promise<SendBriefingResult> {
  // Client-side pre-validation
  if (!data.name.trim() || !data.email.trim() || !data.description.trim()) {
    return {
      success: false,
      delivered: false,
      configured: false,
      message: 'Preencha todos os campos obrigatórios antes de enviar.',
      recipient: UMBRA_CONTACT.email,
    };
  }

  try {
    const response = await fetch('/api/send-briefing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as SendBriefingResult;
    return result;
  } catch {
    return {
      success: false,
      delivered: false,
      configured: false,
      message:
        'Não foi possível conectar ao servidor de envio automático. Você pode abrir seu aplicativo de e-mail ou baixar o briefing.',
      recipient: UMBRA_CONTACT.email,
    };
  }
}
