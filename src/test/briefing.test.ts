import { describe, expect, it, vi, beforeEach } from 'vitest';
import { 
  UMBRA_CONTACT, 
  generateBriefingText, 
  generateMailtoUrl, 
  generateWhatsAppUrl, 
  sendBriefingViaApi, 
  BriefingData 
} from '@/lib/briefing';

describe('Briefing Client Library', () => {
  const sampleBriefing: BriefingData = {
    name: 'Carlos Oliveira',
    email: 'carlos@empresa.com.br',
    phone: '(19) 99876-5432',
    company: 'Oliveira Soluções',
    service: 'Sistema empresarial sob medida / ERP',
    stage: 'Ideia inicial / Planejamento',
    budget: 'A definir',
    description: 'Necessitamos de um sistema web para gestão interna e controle de estoque de peças.',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('destinatário oficial deve ser estritamente ofc.umbra@gmail.com', () => {
    expect(UMBRA_CONTACT.email).toBe('ofc.umbra@gmail.com');
  });

  it('não deve expor senhas ou tokens de aplicativo no módulo do cliente', () => {
    expect((UMBRA_CONTACT as Record<string, unknown>).appPasswordToken).toBeUndefined();
    expect((UMBRA_CONTACT as Record<string, unknown>).password).toBeUndefined();
  });

  it('generateBriefingText deve conter o destinatário oficial e dados do projeto', () => {
    const text = generateBriefingText(sampleBriefing);

    expect(text).toContain('UMBRA APPLICATIONS — BRIEFING DE PROJETO');
    expect(text).toContain('ofc.umbra@gmail.com');
    expect(text).toContain('Carlos Oliveira');
    expect(text).toContain('carlos@empresa.com.br');
    expect(text).toContain('(19) 99876-5432');
    expect(text).toContain('Sistema empresarial sob medida / ERP');
    expect(text).toContain('Necessitamos de um sistema web');
  });

  it('generateMailtoUrl deve apontar para ofc.umbra@gmail.com com assunto e corpo codificados', () => {
    const url = generateMailtoUrl(sampleBriefing);

    expect(url.startsWith('mailto:ofc.umbra@gmail.com?subject=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Carlos Oliveira'));
    expect(url).toContain(encodeURIComponent('Sistema empresarial sob medida / ERP'));
  });

  it('generateWhatsAppUrl deve direcionar para o número oficial 5511941774214 com resumo codificado', () => {
    const url = generateWhatsAppUrl(sampleBriefing);

    expect(url.startsWith('https://wa.me/5511941774214?text=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Carlos Oliveira'));
    expect(url).toContain(encodeURIComponent('carlos@empresa.com.br'));
    expect(UMBRA_CONTACT.whatsappNumber).toBe('5511941774214');
  });

  it('sendBriefingViaApi deve validar campos obrigatórios localmente antes de disparar requisição', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const result = await sendBriefingViaApi({
      name: '',
      email: '',
      description: '',
      service: 'Web',
    });

    expect(result.success).toBe(false);
    expect(result.delivered).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('sendBriefingViaApi deve retornar delivered true quando a API responder com sucesso', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          delivered: true,
          configured: true,
          message: 'Enviado com sucesso.',
          recipient: 'ofc.umbra@gmail.com',
        }),
        { status: 200 }
      )
    );

    const result = await sendBriefingViaApi(sampleBriefing);

    expect(result.success).toBe(true);
    expect(result.delivered).toBe(true);
    expect(result.recipient).toBe('ofc.umbra@gmail.com');
  });

  it('sendBriefingViaApi não deve mascarar quando o servidor não tiver credenciais configuradas', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          delivered: false,
          configured: false,
          message: 'Variáveis de ambiente ausentes no servidor.',
          recipient: 'ofc.umbra@gmail.com',
        }),
        { status: 503 }
      )
    );

    const result = await sendBriefingViaApi(sampleBriefing);

    expect(result.success).toBe(false);
    expect(result.delivered).toBe(false);
    expect(result.configured).toBe(false);
    expect(result.message).toContain('Variáveis de ambiente ausentes');
  });

  it('sendBriefingViaApi deve tratar falha de rede sem lançar exceção não capturada', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network offline'));

    const result = await sendBriefingViaApi(sampleBriefing);

    expect(result.success).toBe(false);
    expect(result.delivered).toBe(false);
    expect(result.recipient).toBe('ofc.umbra@gmail.com');
  });
});
