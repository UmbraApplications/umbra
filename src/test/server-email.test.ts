import { describe, expect, it } from 'vitest';
import { 
  OFFICIAL_RECIPIENT_EMAIL, 
  validateBriefingPayload, 
  handleSendBriefingRequest 
} from '@/lib/server-email';

describe('Server Email Dispatcher', () => {
  it('destinatário do servidor deve ser ofc.umbra@gmail.com', () => {
    expect(OFFICIAL_RECIPIENT_EMAIL).toBe('ofc.umbra@gmail.com');
  });

  describe('validateBriefingPayload', () => {
    it('deve rejeitar payloads vazios ou inválidos', () => {
      expect(validateBriefingPayload(null).valid).toBe(false);
      expect(validateBriefingPayload({}).valid).toBe(false);
    });

    it('deve exigir nome não vazio', () => {
      const res = validateBriefingPayload({
        name: '   ',
        email: 'valido@email.com',
        description: 'Descrição detalhada com mais de dez caracteres.',
      });
      expect(res.valid).toBe(false);
      expect(res.errors).toContain('Nome para contato é obrigatório.');
    });

    it('deve exigir e-mail com formato válido', () => {
      const res = validateBriefingPayload({
        name: 'Cliente',
        email: 'email-invalido',
        description: 'Descrição detalhada com mais de dez caracteres.',
      });
      expect(res.valid).toBe(false);
      expect(res.errors).toContain('E-mail válido para contato é obrigatório.');
    });

    it('deve exigir descrição com pelo menos 10 caracteres', () => {
      const res = validateBriefingPayload({
        name: 'Cliente',
        email: 'cliente@teste.com',
        description: 'Curto',
      });
      expect(res.valid).toBe(false);
      expect(res.errors).toContain('Descrição do projeto com no mínimo 10 caracteres é obrigatória.');
    });

    it('deve aprovar payload válido e sanitizar campos', () => {
      const res = validateBriefingPayload({
        name: '   Maria Silva  ',
        email: 'maria@empresa.com',
        service: 'Web',
        description: 'Construção de plataforma administrativa de clientes.',
      });
      expect(res.valid).toBe(true);
      expect(res.data?.name).toBe('Maria Silva');
      expect(res.data?.email).toBe('maria@empresa.com');
      expect(res.data?.service).toBe('Web');
    });
  });

  describe('handleSendBriefingRequest HTTP Handler', () => {
    it('deve rejeitar métodos diferentes de POST com 405', async () => {
      const req = new Request('http://localhost/api/send-briefing', { method: 'GET' });
      const res = await handleSendBriefingRequest(req);

      expect(res.status).toBe(405);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.recipient).toBe('ofc.umbra@gmail.com');
    });

    it('deve rejeitar JSON inválido com 400', async () => {
      const req = new Request('http://localhost/api/send-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-json{{{',
      });
      const res = await handleSendBriefingRequest(req);

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
    });

    it('deve retornar 400 se os dados não passarem na validação', async () => {
      const req = new Request('http://localhost/api/send-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '', email: 'invalido' }),
      });
      const res = await handleSendBriefingRequest(req);

      expect(res.status).toBe(400);
    });

    it('deve responder 503 com configured=false se o ambiente não possuir credenciais externas', async () => {
      const req = new Request('http://localhost/api/send-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'João Manuel',
          email: 'cliente@teste.com',
          description: 'Sistema web para agendamento de consultas com autenticação.',
        }),
      });

      const res = await handleSendBriefingRequest(req, {});

      expect(res.status).toBe(503);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.delivered).toBe(false);
      expect(json.configured).toBe(false);
      expect(json.recipient).toBe('ofc.umbra@gmail.com');
      expect(json.message).toContain('UMBRA_EMAIL_PASS');
    });

    it('deve retornar 200 com delivered=true quando credenciais de servidor estiverem configuradas', async () => {
      const req = new Request('http://localhost/api/send-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'João Manuel',
          email: 'cliente@teste.com',
          description: 'Sistema web para agendamento de consultas com autenticação.',
        }),
      });

      const res = await handleSendBriefingRequest(req, {
        UMBRA_EMAIL_PASS: 'kqxn jqea nywd gzbl',
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.delivered).toBe(true);
      expect(json.configured).toBe(true);
      expect(json.recipient).toBe('ofc.umbra@gmail.com');
    });
  });
});
