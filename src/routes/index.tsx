import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Code2,
  Layers3,
  ShieldCheck,
  Zap,
  Check,
  Menu,
  X,
  Download,
  ExternalLink,
  Info,
  ChevronRight,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Copy,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/umbra-hero-2.jpg';
import symbol from '@/assets/umbra-symbol.png.asset.json';
import founder from '@/assets/fundador-umbra.webp.asset.json';
import produtoMl from '@/assets/produto-ml.jpg.asset.json';
import produtoLileot from '@/assets/produto-lileot.jpg.asset.json';
import {
  BriefingData,
  UMBRA_CONTACT,
  downloadBriefingFile,
  generateMailtoUrl,
  generateWhatsAppUrl,
  sendBriefingViaApi
} from '@/lib/briefing';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'UMBRA — Tecnologia com propósito | Engenharia de Software & Design' },
      { name: 'description', content: 'A UMBRA desenvolve sites, aplicativos, sistemas e plataformas sob medida. Transformamos problemas reais em produtos digitais funcionais e escaláveis.' },
      { property: 'og:title', content: 'UMBRA — Tecnologia com propósito | Engenharia de Software & Design' },
      { property: 'og:description', content: 'Transformamos problemas reais em produtos digitais sob medida. Engenharia de software, design e estratégia.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]
  }),
  component: Index,
});

// Data repositories
const navLinks: [string, string][] = [
  ['Início', '#inicio'],
  ['Por que UMBRA', '#por-que-umbra'],
  ['Processo', '#processo'],
  ['Soluções', '#solucoes'],
  ['Projetos', '#projetos'],
  ['Engenharia', '#engenharia'],
  ['Labs', '#labs'],
  ['Sobre', '#sobre'],
  ['Contato', '#contato'],
];

const whyPillars = [
  {
    num: '01',
    title: 'Sob medida',
    description: 'Cada negócio possui seus próprios desafios. Criamos soluções pensadas para a realidade e necessidade exata de cada projeto.',
  },
  {
    num: '02',
    title: 'Tecnologia + Design',
    description: 'Engenharia sólida e experiência de usuário caminham juntas para criar produtos funcionais, intuitivos e visualmente impecáveis.',
  },
  {
    num: '03',
    title: 'Feito para evoluir',
    description: 'Um produto digital não termina no lançamento. Construímos arquiteturas modulares pensando no crescimento do seu negócio.',
  },
  {
    num: '04',
    title: 'Proximidade',
    description: 'Comunicação clara, acompanhamento transparente e participação ativa do cliente em todas as etapas do desenvolvimento.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'ENTENDER',
    subtitle: 'Mapeamento & Contexto',
    text: 'Entender o contexto, as necessidades e os objetivos reais antes de escrever a primeira linha de código.',
    detail: 'Analisamos a fundo o problema do seu negócio, fluxos operacionais e o perfil do usuário final para definir um escopo claro e eficiente.',
    deliverables: ['Mapeamento de desafios reais', 'Definição de objetivos de negócio', 'Análise de restrições técnicas']
  },
  {
    num: '02',
    title: 'QUESTIONAR',
    subtitle: 'Desafio & Estratégia',
    text: 'Encontrar oportunidades e desafiar soluções óbvias para evitar complexidades desnecessárias.',
    detail: 'Avaliamos se a melhor resposta é um web app, um sistema sob medida ou uma automação, garantindo investimento inteligente.',
    deliverables: ['Simplificação de fluxos', 'Escolha da melhor abordagem técnica', 'Priorização de funcionalidades críticas']
  },
  {
    num: '03',
    title: 'PROJETAR',
    subtitle: 'Arquitetura & UX/UI',
    text: 'Transformar necessidades em experiências de uso claras, funcionais e visualmente marcantes.',
    detail: 'Desenhamos protótipos de alta fidelidade, estruturamos a arquitetura do banco de dados e definimos as diretrizes do sistema.',
    deliverables: ['Interface refinada e responsiva', 'Arquitetura de dados escalável', 'Design system consistente']
  },
  {
    num: '04',
    title: 'CONSTRUIR',
    subtitle: 'Engenharia de Software',
    text: 'Desenvolver tecnologia sólida, escalável, testada e preparada para evoluir.',
    detail: 'Código autoral limpo em React, TypeScript e infraestrutura robusta focada em alta performance, segurança e responsividade.',
    deliverables: ['Código autoral e manutenível', 'Otimização de tempo de carregamento', 'Testes e segurança em camadas']
  },
  {
    num: '05',
    title: 'EVOLUIR',
    subtitle: 'Iteração & Acompanhamento',
    text: 'Acompanhar o produto no ar, otimizar resultados e preparar os próximos passos.',
    detail: 'Monitoramos a utilização real, aplicamos melhorias contínuas e mantemos o software preparado para novas demandas.',
    deliverables: ['Monitoramento de uso real', 'Ajustes pós-lançamento', 'Roadmap de evolução contínua']
  }
];

const servicesCategories = [
  {
    category: 'WEB',
    badge: 'Plataformas',
    items: [
      'Sites institucionais premium',
      'Landing pages de alta conversão',
      'Sistemas web sob medida',
      'Dashboards administrativos',
      'Plataformas digitais completas'
    ]
  },
  {
    category: 'MOBILE',
    badge: 'Aplicações',
    items: [
      'Aplicativos Android nativos/híbridos',
      'Aplicativos iOS dedicados',
      'Aplicativos multiplataforma (PWA/React)',
      'Aplicações internas para equipes de campo'
    ]
  },
  {
    category: 'SOFTWARE',
    badge: 'Sistemas',
    items: [
      'Sistemas empresariais de gestão',
      'Painéis administrativos e de controle',
      'APIs REST e conectores de dados',
      'Integração de sistemas legados',
      'Automação de processos operacionais'
    ]
  },
  {
    category: 'IA & AUTOMAÇÃO',
    badge: 'Tecnologia',
    items: [
      'Integração com Inteligência Artificial',
      'Automação de tarefas repetitivas',
      'Assistentes virtuais inteligentes',
      'Processamento de dados e relatórios',
      'Soluções personalizadas em automação'
    ]
  }
];

interface Project {
  id: string;
  client: string;
  name: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
  cta: string;
  url: string;
  image: string;
  alt: string;
  challengeDetail: string;
  solutionDetail: string;
  features: string[];
}

const products: Project[] = [
  {
    id: 'ml-marcenaria',
    client: 'ML — Marcenaria e Montagens',
    name: 'Calculadora de orçamento sob medida',
    description: 'Ferramenta digital desenvolvida para o dia a dia da marcenaria: some materiais, acabamentos e mão de obra, veja o total estimado em tempo real e gere orçamentos profissionais em PDF — direto do celular, no meio da obra.',
    problem: 'Orçamentos precisavam ser calculados manualmente em papéis durante o trabalho na obra, causando demoras e margem para erros.',
    solution: 'Aplicação web otimizada para dispositivos móveis que simplifica a escolha de insumos, calcula totais instantaneamente e gera PDF pronto para envio.',
    result: 'Cálculo de orçamentos em menos de 2 minutos direto no celular no meio do atendimento.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'jsPDF', 'PWA'],
    cta: 'Abrir calculadora',
    url: 'https://joaomanueloliveira.github.io/ML-Marcenaria-e-Montagens/',
    image: produtoMl.url,
    alt: 'Tela da calculadora de orçamento da Marcenaria ML, com campos de cliente, materiais, mão de obra e total estimado',
    challengeDetail: 'O processo anterior exigia anotações manuais em blocos de papel e posteriores cálculos no computador. Esse fluxo aumentava o tempo de resposta ao cliente e abria margem para esquecimento de custos de ferragens e mão de obra.',
    solutionDetail: 'Desenvolvemos uma aplicação leve, responsiva e focada na usabilidade rápida. O marcenheiro insere os dados do cliente, seleciona materiais e quantidades, e o sistema calcula valores finais de mão de obra e lucro desejado, gerando o PDF na hora.',
    features: [
      'Interface otimizada para smartphones em ambiente de obra',
      'Cálculo automático de materiais, ferragens e mão de obra',
      'Exportação instantânea de orçamento em PDF formatado',
      'Compartilhamento direto via WhatsApp para o cliente',
      'Armazenamento local rápido e funcionamento fluido'
    ]
  },
  {
    id: 'lileot-transporte',
    client: 'Lileot Transporte',
    name: 'Central de comunicação & mobilidade',
    description: 'Ponto único de informação para quem necessita de mobilidade ágil em Amparo e no Circuito das Águas: solicitação de corridas, área de cobertura, promoções e programa de indicações centralizados.',
    problem: 'Passageiros tinham dificuldade em consultar áreas de cobertura regional, tarifários e canais diretos de atendimento.',
    solution: 'Hub digital responsivo reunindo informações de rotas, vantagens exclusivas e botão inteligente para acionamento direto via WhatsApp.',
    result: 'Comunicação direta e rápida centralizada em um único ponto digital 24/7.',
    technologies: ['React', 'TypeScript', 'Vite', 'Lucide Icons', 'WhatsApp API'],
    cta: 'Ver o site',
    url: 'https://lileottransporte.lovable.app/',
    image: produtoLileot.url,
    alt: 'Tela do site da Lileot Transporte, com pedido de corrida, área de cobertura e promoções',
    challengeDetail: 'Em serviços de transporte regional, a clareza sobre áreas atendidas e formas de contato é vital para evitar perda de passageiros. O desafio era criar uma plataforma moderna, leve e acessível em qualquer smartphone.',
    solutionDetail: 'Criamos uma central institucional minimalista com chamadas claras para ação. O usuário visualiza cidades atendidas em Amparo e região, descobre vantagens de indicação e solicita a corrida em poucos toques.',
    features: [
      'Design responsivo focado em usabilidade móvel',
      'Mapeamento claro de cidades da área de cobertura',
      'Integração direta de chamada por WhatsApp',
      'Divulgação de promoções ativas e regulamento de indicações',
      'Carregamento ultra-rápido otimizado para redes 3G/4G'
    ]
  }
];

const techLayers = [
  {
    num: '01',
    layer: 'INTERFACE',
    title: 'Experiência & Responsividade',
    stack: 'React · TypeScript · Tailwind CSS · Progressive Web Apps',
    description: 'Interfaces limpas, dinâmicas e acessíveis. Foco total em usabilidade, performance de renderização e adaptação fluida para todos os tamanhos de tela.'
  },
  {
    num: '02',
    layer: 'APLICAÇÃO',
    title: 'Roteamento & Estado',
    stack: 'TanStack Router · State Management · Client-side Caching',
    description: 'Arquitetura de rotas fortemente tipadas, gerenciamento de estado previsível e navegação instantânea sem recarregamento de página.'
  },
  {
    num: '03',
    layer: 'BACKEND',
    title: 'Serviços & Lógica de Negócio',
    stack: 'Node.js · REST APIs · Autenticação & Edge Workers',
    description: 'APIs estruturadas, regras de negócio isoladas, processamento assíncrono e comunicação segura entre serviços.'
  },
  {
    num: '04',
    layer: 'BANCO DE DADOS',
    title: 'Persistência & Modelagem',
    stack: 'PostgreSQL · Supabase · Estruturação Relacional',
    description: 'Modelagem relacional de dados, consultas otimizadas, integridade referencial e backups automatizados.'
  },
  {
    num: '05',
    layer: 'INTEGRAÇÕES',
    title: 'Conectividade & Automação',
    stack: 'Webhooks · APIs de Mensageria · Geradores PDF · Cloud Services',
    description: 'Conexão direta com serviços externos, exportação automatizada de documentos e integração com ecossistemas corporativos.'
  }
];

const labsProjects = [
  {
    badge: 'EM EXPERIMENTAÇÃO',
    badgeType: 'experiment',
    title: 'Integração de IA em Fluxos Operacionais',
    description: 'Pesquisa e testes práticos com modelos de linguagem para auxílio em tomada de decisão e automação de rotinas de atendimento.'
  },
  {
    badge: 'EM EXPERIMENTAÇÃO',
    badgeType: 'experiment',
    title: 'Geradores Automáticos de Documentos',
    description: 'Ferramenta para criação instantânea de propostas comerciais, briefings e relatórios estruturados a partir de dados brutos.'
  },
  {
    badge: 'EM PESQUISA',
    badgeType: 'research',
    title: 'Dashboards de Alta Fidelidade',
    description: 'Exploração de componentes gráficos interativos e otimização de renderização para grandes volumes de dados operacionais.'
  },
  {
    badge: 'EM TESTES INTERNOS',
    badgeType: 'testing',
    title: 'Notificações & Automações Multi-canal',
    description: 'Protótipos de integração entre eventos de sistema e disparos automatizados de mensagens em canais corporativos.'
  }
];

const realMetrics = [
  { value: '100%', label: 'Código autoral sob medida, desenvolvido para a necessidade exata de cada projeto.' },
  { value: '2+', label: 'Produtos digitais ativos em produção contínua no mercado.' },
  { value: '5', label: 'Etapas claras no processo "Do Problema ao Produto".' },
  { value: '0', label: 'Fórmulas prontas ou atalhos que comprometem a qualidade final.' },
];

function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="UMBRA — Início">
      <img src={symbol.url} alt="Símbolo UMBRA" width={30} height={36} />
      <span>UMBRA</span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-line" />
      <span>{children}</span>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Multi-step Briefing Form state
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [briefingData, setBriefingData] = useState<BriefingData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Site institucional ou plataforma web',
    stage: 'Ideia inicial / Planejamento',
    budget: 'A definir em conjunto',
    description: '',
  });

  const [formValidationErrors, setFormValidationErrors] = useState<Record<string, string>>({});
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  // Submission status handling (preserves data and provides clear feedback)
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    status: 'idle' | 'unconfigured' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    type: 'email' | 'save' | 'copy';
    title: string;
    message: string;
  } | null>(null);

  // Scroll listener for header elevation
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setConfirmationModal(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu or modals are open
  useEffect(() => {
    if (menuOpen || selectedProject || confirmationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, selectedProject, confirmationModal]);

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!briefingData.name.trim()) {
      errors.name = 'Informe seu nome para contato.';
    }
    if (!briefingData.email.trim()) {
      errors.email = 'Informe seu e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(briefingData.email)) {
      errors.email = 'Formato de e-mail inválido.';
    }
    setFormValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!briefingData.description.trim() || briefingData.description.trim().length < 10) {
      errors.description = 'Conte um pouco mais sobre o desafio ou objetivo (mínimo 10 caracteres).';
    }
    setFormValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  };

  const handleDownloadBriefing = () => {
    downloadBriefingFile(briefingData);
    setConfirmationModal({
      open: true,
      type: 'save',
      title: 'Arquivo baixado no seu dispositivo',
      message: 'O documento .txt estruturado com todas as especificações do briefing foi gerado e salvo localmente no seu dispositivo. Nenhuma informação foi enviada para servidores externos.',
    });
  };

  const handleSendEmail = async () => {
    if (isSubmittingEmail) return; // Prevent duplicate concurrent requests

    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setIsSubmittingEmail(true);
    setSubmissionFeedback({ status: 'idle', message: '' });

    try {
      const result = await sendBriefingViaApi(briefingData);

      if (result.success && result.delivered) {
        // Only trigger real "sent" feedback when server actually completed delivery
        setConfirmationModal({
          open: true,
          type: 'email',
          title: 'Briefing enviado com sucesso',
          message: `Seu briefing foi entregue ao servidor e encaminhado para o e-mail oficial ${UMBRA_CONTACT.email}. Entraremos em contato com a análise preliminar.`,
        });
      } else if (!result.configured) {
        // Explicitly inform missing external server configuration without falsely claiming completion
        setSubmissionFeedback({
          status: 'unconfigured',
          message: result.message,
        });
      } else {
        setSubmissionFeedback({
          status: 'error',
          message: result.message || 'Falha ao processar o envio direto no servidor.',
        });
      }
    } catch {
      setSubmissionFeedback({
        status: 'error',
        message: 'Erro na conexão com o servidor. Seus dados estão preservados abaixo.',
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleCopySummary = async () => {
    const text = [
      `BRIEFING UMBRA — ${briefingData.name}`,
      `E-mail: ${briefingData.email}`,
      `Solução: ${briefingData.service}`,
      `Desafio: ${briefingData.description}`,
      `Destinatário oficial: ${UMBRA_CONTACT.email}`
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setConfirmationModal({
        open: true,
        type: 'copy',
        title: 'Copiado para a área de transferência',
        message: 'O resumo estruturado do briefing foi copiado. Você pode colar no WhatsApp ou onde desejar.',
      });
    } catch {
      handleDownloadBriefing();
    }
  };

  const resetForm = () => {
    setFormStep(1);
    setBriefingData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Site institucional ou plataforma web',
      stage: 'Ideia inicial / Planejamento',
      budget: 'A definir em conjunto',
      description: '',
    });
    setSubmissionFeedback({ status: 'idle', message: '' });
    setConfirmationModal(null);
  };

  return (
    <>
      {/* Sticky Precision Header */}
      <header className={`site-header ${headerScrolled ? 'scrolled' : ''}`} id="inicio">
        <div className="header-container">
          <div className="header-left">
            <Brand />
          </div>

          <nav className="header-nav" aria-label="Navegação principal">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className="nav-link font-medium">
                {label}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <div className="status-chip hidden 2xl:inline-flex">
              <span className="status-dot" />
              <span>Disponível para projetos</span>
            </div>

            <Button asChild variant="outline" className="hidden md:inline-flex h-9 gap-2 px-3.5 text-xs font-semibold border-border/70 hover:border-primary hover:bg-primary/5 transition-all">
              <a href="#contato">
                Vamos conversar <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              </a>
            </Button>

            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer & Backdrop */}
        {menuOpen && (
          <>
            <div
              className="mobile-backdrop"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <nav className="mobile-nav-drawer" aria-label="Navegação móvel">
              <div className="mobile-nav-header">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Navegação</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="mobile-nav-close"
                  aria-label="Fechar menu móvel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mobile-nav-list">
                {navLinks.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="mobile-nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{label}</span>
                    <ChevronRight className="w-4 h-4 text-primary/70" />
                  </a>
                ))}
              </div>
              <div className="mobile-nav-footer">
                <a
                  href="#contato"
                  className="mobile-nav-cta"
                  onClick={() => setMenuOpen(false)}
                >
                  Iniciar briefing <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero" aria-labelledby="hero-title">
          <img
            src={hero || '/images/umbra-hero-2.jpg'}
            className="hero-art"
            alt="Fundo geométrico tecnológico UMBRA"
            width={1920}
            height={1088}
            fetchPriority="high"
          />
          <div className="page-width hero-content">
            <Eyebrow>Engenharia de Software &amp; Design de Produto</Eyebrow>
            <h1 id="hero-title">
              UMBRA.<br />
              Tecnologia para<br />
              o seu <span>próximo passo.</span>
            </h1>
            <p className="hero-description">
              Sites, aplicativos e sistemas sob medida.<br />
              Transformamos problemas reais em produtos digitais funcionais, escaláveis e prontos para o mercado.
            </p>
            <div className="hero-cta-group mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="h-12 sm:h-11 gap-3 px-6 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all justify-center w-full sm:w-auto">
                <a href="#contato">
                  Iniciar briefing <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 sm:h-11 gap-2.5 px-5 text-xs font-semibold uppercase tracking-wider border-border hover:border-primary hover:bg-card justify-center w-full sm:w-auto">
                <a href="#projetos">
                  Ver casos reais <ArrowDown className="w-3.5 h-3.5 text-primary" />
                </a>
              </Button>
            </div>
          </div>

          <div className="page-width hero-bottom">
            <span className="hero-caption flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              OPERACIONAL · ESTRATÉGIA, CÓDIGO E DESIGN
            </span>
            <span className="hero-caption hidden sm:inline-flex">
              GUARULHOS — SP · ATENDIMENTO BRASIL
            </span>
          </div>
        </section>

        {/* CAPABILITIES BAR */}
        <div className="capabilities">
          <div className="page-width capabilities-grid">
            <span className="capability"><Code2 className="w-4 h-4 text-primary shrink-0" />Desenvolvimento Full Stack</span>
            <span className="capability"><Layers3 className="w-4 h-4 text-primary shrink-0" />Soluções sob medida</span>
            <span className="capability"><ShieldCheck className="w-4 h-4 text-primary shrink-0" />Engenharia &amp; Design</span>
            <span className="capability"><Zap className="w-4 h-4 text-primary shrink-0" />Tecnologia com propósito</span>
          </div>
        </div>

        {/* SEÇÃO 1: POR QUE UMBRA? */}
        <section id="por-que-umbra" className="section page-width">
          <Eyebrow>POSICIONAMENTO E PROPÓSITO</Eyebrow>
          <div className="section-heading">
            <h2>Por que UMBRA?</h2>
            <p className="section-intro">
              Tecnologia faz sentido quando resolve alguma coisa. Não desenvolvemos código apenas por desenvolver — construímos soluções com intenção.
            </p>
          </div>

          <div className="why-grid">
            {whyPillars.map((pillar) => (
              <div key={pillar.num} className="why-card group">
                <div className="why-card-number">
                  <span>{pillar.num}</span>
                  <span className="why-card-line" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO 2: DO PROBLEMA AO PRODUTO (PROCESSO) */}
        <section id="processo" className="section process-timeline">
          <div className="page-width">
            <Eyebrow>METODOLOGIA E FLUXO DE TRABALHO</Eyebrow>
            <div className="section-heading">
              <h2>Do problema ao produto.</h2>
              <p className="section-intro">
                Não começamos pelo código. Começamos pelo problema. Um processo estruturado para transformar incerteza em software em produção.
              </p>
            </div>

            {/* Step navigation tabs */}
            <div className="process-nav rounded-t-md overflow-hidden">
              {processSteps.map((step, idx) => (
                <button
                  key={step.num}
                  type="button"
                  className={`process-nav-item ${activeStep === idx ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className="process-nav-num">{step.num} / 05</span>
                  <span className="process-nav-title">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Active Step detail display card */}
            <div className="process-display-card">
              <div className="flex items-start gap-6">
                <span className="process-display-number">{processSteps[activeStep].num}</span>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-primary">
                    {processSteps[activeStep].subtitle}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold">{processSteps[activeStep].title}</h3>
                  <p className="font-medium text-foreground mt-3 text-base leading-snug">
                    "{processSteps[activeStep].text}"
                  </p>
                </div>
              </div>
              <div className="process-display-content border-t md:border-t-0 md:border-l border-border/70 pt-5 md:pt-0 md:pl-8">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {processSteps[activeStep].detail}
                </p>
                <div className="space-y-1.5 pt-2 border-t border-border/40">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
                    Entregáveis desta etapa:
                  </span>
                  {processSteps[activeStep].deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: O QUE A UMBRA CONSTRÓI (SERVIÇOS ARCHITECTURE) */}
        <section id="solucoes" className="section page-width">
          <Eyebrow>ARQUITETURA DE SERVIÇOS</Eyebrow>
          <div className="section-heading">
            <h2>O que podemos construir?</h2>
            <p className="section-intro">
              Da primeira ideia ao produto em funcionamento. Desenvolvemos soluções sob medida conforme o momento e o desafio da sua empresa.
            </p>
          </div>

          <div className="architecture-grid">
            {servicesCategories.map((col) => (
              <div key={col.category} className="architecture-col">
                <div className="architecture-header">
                  <h3 className="architecture-category">{col.category}</h3>
                  <span className="architecture-badge">{col.badge}</span>
                </div>
                <ul className="architecture-list">
                  {col.items.map((item) => (
                    <li key={item} className="architecture-item">
                      <span className="architecture-bullet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO 4: REESTRUTURAÇÃO DO PORTFÓLIO E CASOS REAIS */}
        <section id="projetos" className="section page-width section-border-top">
          <Eyebrow>CASOS REAIS &amp; PRODUTOS EM PRODUÇÃO</Eyebrow>
          <div className="section-heading">
            <h2>Soluções em uso todos os dias.</h2>
            <p className="section-intro">
              Projetos que nasceram de cenários reais e hoje facilitam a rotina de quem usa. Engenharia de software aplicada à realidade do cliente.
            </p>
          </div>

          <div className="portfolio-grid">
            {products.map((prod) => (
              <article key={prod.id} className="product-card">
                <div className="product-media">
                  <img src={prod.image} alt={prod.alt} loading="lazy" width={1200} height={800} />
                </div>

                <div className="product-body">
                  <span className="product-client">{prod.client}</span>
                  <h3>{prod.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{prod.description}</p>

                  {/* Problem & Solution block */}
                  <div className="product-problem-solution">
                    <div className="ps-block">
                      <span className="ps-label">
                        <span className="ps-label-dot problem" /> O DESAFIO REAL
                      </span>
                      <p className="text-muted-foreground">{prod.problem}</p>
                    </div>
                    <div className="ps-block">
                      <span className="ps-label">
                        <span className="ps-label-dot solution" /> A SOLUÇÃO IMPLEMENTADA
                      </span>
                      <p className="text-foreground font-medium">{prod.solution}</p>
                    </div>
                  </div>

                  <div className="product-tags">
                    {prod.technologies.map((tech) => (
                      <span className="tech-tag" key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="product-actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-10 sm:h-9 gap-2 text-muted-foreground hover:text-foreground justify-center sm:justify-start"
                      onClick={() => setSelectedProject(prod)}
                    >
                      <Info className="w-3.5 h-3.5 text-primary" /> Ver estudo detalhado
                    </Button>

                    <a
                      href={prod.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-primary hover:underline h-10 sm:h-auto"
                    >
                      {prod.cta} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SEÇÃO 5: TECNOLOGIA POR TRÁS DA EXPERIÊNCIA (ENGENHARIA) */}
        <section id="engenharia" className="section page-width section-border-top">
          <Eyebrow>ENGENHARIA &amp; ARQUITETURA DE SISTEMAS</Eyebrow>
          <div className="section-heading">
            <h2>A experiência é simples.<br />A engenharia por trás dela não precisa ser.</h2>
            <p className="section-intro">
              Produtos digitais consistentes resultam de escolhas técnicas conscientes. Trabalhamos com tecnologias consolidadas para garantir performance e escalabilidade.
            </p>
          </div>

          <div className="tech-stack-container">
            {techLayers.map((layer) => (
              <div key={layer.num} className="tech-layer-card group">
                <div className="tech-layer-name">
                  <span>{layer.num}</span>
                  <span className="text-muted-foreground/40">/</span>
                  <span>{layer.layer}</span>
                </div>
                <div>
                  <h4 className="tech-layer-title">{layer.title}</h4>
                  <span className="text-xs font-mono text-primary font-medium">{layer.stack}</span>
                </div>
                <p className="tech-layer-desc">{layer.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO 6: UMBRA LABS */}
        <section id="labs" className="section page-width section-border-top">
          <Eyebrow>PESQUISA &amp; EXPERIMENTAÇÃO</Eyebrow>
          <div className="section-heading">
            <h2>UMBRA LABS</h2>
            <p className="section-intro">
              Nem toda ideia nasce pronta. Algumas precisam ser experimentadas. Nosso laboratório contínuo de inteligência artificial, automação e arquiteturas emergentes.
            </p>
          </div>

          <div className="labs-grid">
            {labsProjects.map((lab, index) => (
              <div key={index} className="labs-card">
                <span className={`labs-badge ${lab.badgeType}`}>{lab.badge}</span>
                <h3>{lab.title}</h3>
                <p>{lab.description}</p>
              </div>
            ))}
          </div>

          {/* Banner Em Construção */}
          <div className="building-banner">
            <div>
              <span className="eyebrow text-xs mb-1">VISÃO DE FUTURO</span>
              <h3 className="text-2xl font-bold mt-1">O próximo passo já está em construção.</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-md">
                Novas ideias, produtos digitais autorais e protótipos de automação estão tomando forma nos bastidores da UMBRA.
              </p>
            </div>

            <div className="building-dots">
              <div className="building-dot-item">
                <span className="building-pulse" /> EM DESENVOLVIMENTO
              </div>
              <div className="building-dot-item">
                <span className="building-pulse bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> EM PESQUISA
              </div>
              <div className="building-dot-item">
                <span className="building-pulse bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> EM EXPERIMENTAÇÃO
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 7: QUEM ESTÁ POR TRÁS & MÉTRICAS */}
        <section id="sobre" className="section page-width section-border-top">
          <div className="founder-grid">
            <div className="founder-photo">
              <img
                src={founder.url}
                alt="João Manuel Cesário de Jesus Oliveira, fundador da UMBRA e desenvolvedor Full Stack"
                loading="lazy"
                width={768}
                height={1366}
              />
              <div className="founder-label">
                <p className="text-white font-bold text-sm">João Manuel Cesário de Jesus Oliveira</p>
                <p className="text-xs text-primary font-mono mt-1">Fundador &amp; Full Stack Developer</p>
              </div>
            </div>

            <div className="founder-content">
              <Eyebrow>POR TRÁS DA UMBRA</Eyebrow>
              <h2>Uma empresa criada para transformar problemas reais em produtos digitais.</h2>

              <p>
                A UMBRA nasceu quando João Manuel Cesário de Jesus Oliveira se perguntou como o seu domínio de tecnologia e engenharia de software poderiam contribuir diretamente para solucionar desafios reais de negócios e pessoas.
              </p>
              <p>
                À frente da empresa, o fundador atua conectando visão estratégica de produto, design de experiência e desenvolvimento de código. Essa abordagem ponta a ponta garante que cada projeto receba atenção rigorosa aos detalhes, desde a primeira conversa até o software rodando em produção.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="tech-tag">Visão de negócio</span>
                <span className="tech-tag">Design &amp; Código</span>
                <span className="tech-tag">Engenharia de software</span>
                <span className="tech-tag">Desenvolvimento ponta a ponta</span>
              </div>

              <div className="mt-8">
                <Button asChild variant="link" className="p-0 text-primary hover:text-primary/80 font-semibold gap-2">
                  <a href="#contato">
                    Vamos construir juntos <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Real Metrics Grid */}
          <div className="metrics-grid mt-16">
            {realMetrics.map((m, idx) => (
              <div key={idx} className="metric-item">
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO 8: CTA FINAL & FORMULÁRIO DE BRIEFING PADRONIZADO (13.13) */}
        <section id="contato" className="section contact-section bg-card/30">
          <div className="page-width contact-grid">
            <div>
              <Eyebrow>O PRÓXIMO PASSO COMEÇA AQUI</Eyebrow>
              <h2 className="mb-4 mt-2 leading-tight">
                Você traz o problema.<br />
                <span className="text-primary">A UMBRA encontra o próximo passo.</span>
              </h2>
              <p className="section-intro">
                Vamos conversar sobre o que sua empresa precisa construir. Preencha este briefing estruturado para avaliarmos a viabilidade técnica e arquitetural da sua ideia.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-success flex-shrink-0" />
                  <span>Sem compromisso comercial. Uma conversa técnica objetiva.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Resumo estruturado pronto para download ou envio por e-mail.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Privacidade garantida: dados processados com sigilo.</span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-md border border-border-subtle bg-surface-alt max-w-md">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Atendimento oficial UMBRA:
                </span>
                <p className="text-xs text-foreground font-medium">
                  {UMBRA_CONTACT.name}
                </p>
                <p className="text-xs text-primary font-mono mt-0.5">
                  {UMBRA_CONTACT.email}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {UMBRA_CONTACT.city}
                </p>
              </div>
            </div>

            {/* BRIEFING CARD COM PROGRESSO MULTI-ETAPAS */}
            <div className="bg-card border border-border p-6 sm:p-8 rounded-lg shadow-2xl relative">
              {/* Stepper Header */}
              <div className="briefing-stepper">
                <button
                  type="button"
                  className={`briefing-step-tab ${formStep === 1 ? 'active' : formStep > 1 ? 'completed' : ''}`}
                  onClick={() => setFormStep(1)}
                >
                  <span className="step-circle">{formStep > 1 ? <Check className="w-3 h-3" /> : '1'}</span>
                  <span>Contato</span>
                </button>
                <span className="text-muted-foreground/30 text-xs">/</span>
                <button
                  type="button"
                  className={`briefing-step-tab ${formStep === 2 ? 'active' : formStep > 2 ? 'completed' : ''}`}
                  onClick={() => {
                    if (validateStep1()) setFormStep(2);
                  }}
                >
                  <span className="step-circle">{formStep > 2 ? <Check className="w-3 h-3" /> : '2'}</span>
                  <span>Escopo</span>
                </button>
                <span className="text-muted-foreground/30 text-xs">/</span>
                <button
                  type="button"
                  className={`briefing-step-tab ${formStep === 3 ? 'active' : ''}`}
                  onClick={() => {
                    if (validateStep1() && validateStep2()) setFormStep(3);
                  }}
                >
                  <span className="step-circle">3</span>
                  <span>Revisão</span>
                </button>
              </div>

              {/* ETAPA 1: CONTATO */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">1. Identificação e Contato</h3>
                    <p className="text-xs text-muted-foreground">Como podemos nos comunicar com você sobre este projeto?</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="field-label" htmlFor="briefing-name">
                        <span>Seu nome</span>
                        <span className="field-required">*obrigatório</span>
                      </label>
                      <input
                        id="briefing-name"
                        className="field"
                        placeholder="Como podemos chamar você?"
                        value={briefingData.name}
                        onChange={e => {
                          setBriefingData({ ...briefingData, name: e.target.value });
                          if (formValidationErrors.name) setFormValidationErrors({ ...formValidationErrors, name: '' });
                        }}
                        autoComplete="name"
                        maxLength={120}
                      />
                      {formValidationErrors.name && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formValidationErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="field-label" htmlFor="briefing-email">
                        <span>Seu e-mail</span>
                        <span className="field-required">*obrigatório</span>
                      </label>
                      <input
                        id="briefing-email"
                        className="field"
                        placeholder="voce@empresa.com"
                        type="email"
                        value={briefingData.email}
                        onChange={e => {
                          setBriefingData({ ...briefingData, email: e.target.value });
                          if (formValidationErrors.email) setFormValidationErrors({ ...formValidationErrors, email: '' });
                        }}
                        autoComplete="email"
                        maxLength={120}
                      />
                      {formValidationErrors.email && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formValidationErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="field-label" htmlFor="briefing-phone">
                        <span>WhatsApp / Telefone</span>
                        <span className="text-[10px] text-muted-foreground">opcional</span>
                      </label>
                      <input
                        id="briefing-phone"
                        className="field"
                        placeholder="(DDD) 99999-9999"
                        value={briefingData.phone || ''}
                        onChange={e => setBriefingData({ ...briefingData, phone: e.target.value })}
                        autoComplete="tel"
                        maxLength={30}
                      />
                    </div>

                    <div>
                      <label className="field-label" htmlFor="briefing-company">
                        <span>Empresa ou Projeto</span>
                        <span className="text-[10px] text-muted-foreground">opcional</span>
                      </label>
                      <input
                        id="briefing-company"
                        className="field"
                        placeholder="Nome da sua marca ou negócio"
                        value={briefingData.company || ''}
                        onChange={e => setBriefingData({ ...briefingData, company: e.target.value })}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full sm:w-auto h-11 sm:h-10 px-5 gap-2 text-xs font-semibold uppercase tracking-wider justify-center"
                    >
                      Avançar para escopo <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* ETAPA 2: ESCOPO & DESAFIO */}
              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">2. Escopo &amp; Desafio Tecnológico</h3>
                    <p className="text-xs text-muted-foreground">Qual problema sua empresa precisa resolver com tecnologia?</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="field-label" htmlFor="briefing-service">
                        <span>Tipo de solução</span>
                        <span className="field-required">*obrigatório</span>
                      </label>
                      <select
                        id="briefing-service"
                        className="field"
                        value={briefingData.service}
                        onChange={e => setBriefingData({ ...briefingData, service: e.target.value })}
                      >
                        <option>Site institucional ou plataforma web</option>
                        <option>Aplicativo móvel (iOS / Android)</option>
                        <option>Sistema empresarial sob medida / ERP</option>
                        <option>Automação operacional / Integração de APIs</option>
                        <option>IA ou Assistente inteligente</option>
                        <option>Ainda quero entender as possibilidades</option>
                      </select>
                    </div>

                    <div>
                      <label className="field-label" htmlFor="briefing-stage">
                        <span>Fase atual do projeto</span>
                        <span className="text-[10px] text-muted-foreground">opcional</span>
                      </label>
                      <select
                        id="briefing-stage"
                        className="field"
                        value={briefingData.stage || ''}
                        onChange={e => setBriefingData({ ...briefingData, stage: e.target.value })}
                      >
                        <option>Ideia inicial / Planejamento</option>
                        <option>Já temos sistema e queremos modernizar</option>
                        <option>Temos protótipo ou design pronto</option>
                        <option>Demanda urgente para operação</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="briefing-description">
                      <span>Descrição do desafio ou projeto</span>
                      <span className="field-required">*mínimo 10 caracteres</span>
                    </label>
                    <textarea
                      id="briefing-description"
                      className="field min-h-28 resize-y"
                      placeholder="Qual gargalo, processo ou necessidade este software deve solucionar? Quem são os usuários previstos?"
                      value={briefingData.description}
                      onChange={e => {
                        setBriefingData({ ...briefingData, description: e.target.value });
                        if (formValidationErrors.description) setFormValidationErrors({ ...formValidationErrors, description: '' });
                      }}
                      maxLength={5000}
                    />
                    <span className="field-helper flex justify-between">
                      <span>Seja o mais específico possível quanto ao objetivo.</span>
                      <span>{briefingData.description.length}/5000</span>
                    </span>
                    {formValidationErrors.description && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formValidationErrors.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setFormStep(1)}
                      className="text-xs h-11 sm:h-10 px-4 justify-center"
                    >
                      Voltar
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="h-11 sm:h-10 px-5 gap-2 text-xs font-semibold uppercase tracking-wider justify-center"
                    >
                      Revisar informações <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* ETAPA 3: REVISÃO & FINALIZAÇÃO (13.13) */}
              {formStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold">3. Revisão do Briefing</h3>
                    <p className="text-xs text-muted-foreground">Confira os detalhes antes de enviar para a equipe UMBRA.</p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-surface-inset border border-border p-4 rounded-md space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-border/40 pb-2">
                      <span className="text-muted-foreground">Contato:</span>
                      <span className="text-foreground font-semibold">{briefingData.name} ({briefingData.email})</span>
                    </div>
                    {briefingData.phone && (
                      <div className="flex justify-between border-b border-border/40 pb-2">
                        <span className="text-muted-foreground">Telefone:</span>
                        <span className="text-foreground">{briefingData.phone}</span>
                      </div>
                    )}
                    {briefingData.company && (
                      <div className="flex justify-between border-b border-border/40 pb-2">
                        <span className="text-muted-foreground">Empresa:</span>
                        <span className="text-foreground">{briefingData.company}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-border/40 pb-2">
                      <span className="text-muted-foreground">Solução:</span>
                      <span className="text-primary font-semibold">{briefingData.service}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-2">
                      <span className="text-muted-foreground">Estágio:</span>
                      <span className="text-foreground">{briefingData.stage}</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-muted-foreground block mb-1">Desafio / Escopo:</span>
                      <p className="text-foreground font-sans text-xs leading-relaxed bg-card p-3 rounded border border-border/40 max-h-32 overflow-y-auto">
                        {briefingData.description}
                      </p>
                    </div>
                  </div>

                  {/* Operational Feedback Box (when server credentials are unconfigured or error occurs) */}
                  {submissionFeedback.status === 'unconfigured' && (
                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-md text-xs space-y-2.5">
                      <div className="flex items-center gap-2 text-amber-400 font-semibold">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Envio automático direto pendente de configuração no servidor</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        O envio automático direto requer que a variável de ambiente <code className="text-foreground font-mono bg-card px-1 py-0.5 rounded">UMBRA_EMAIL_PASS</code> ou <code className="text-foreground font-mono bg-card px-1 py-0.5 rounded">RESEND_API_KEY</code> esteja configurada no servidor de hospedagem.
                      </p>
                      <p className="text-text-secondary leading-relaxed font-medium">
                        Seus dados estão preservados no formulário. Para encaminhar agora mesmo pelo seu cliente de e-mail para <strong className="text-foreground">{UMBRA_CONTACT.email}</strong>, clique no botão abaixo:
                      </p>
                      <div className="pt-1 flex flex-wrap gap-2">
                        <a
                          href={generateMailtoUrl(briefingData)}
                          className="inline-flex items-center gap-2 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3.5 py-2 text-xs font-semibold transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" /> Abrir no aplicativo de e-mail (mailto)
                        </a>
                      </div>
                    </div>
                  )}

                  {submissionFeedback.status === 'error' && (
                    <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md text-xs space-y-2">
                      <div className="flex items-center gap-2 text-destructive font-semibold">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Falha no envio</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {submissionFeedback.message}
                      </p>
                      <p className="text-text-secondary">
                        Seus dados continuam preservados. Você pode tentar novamente ou enviar diretamente pelo aplicativo de e-mail:
                      </p>
                      <div className="pt-1 flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSendEmail}
                          disabled={isSubmittingEmail}
                          className="text-xs h-8"
                        >
                          Tentar novamente
                        </Button>
                        <a
                          href={generateMailtoUrl(briefingData)}
                          className="inline-flex items-center gap-1.5 rounded bg-surface-subtle border border-border px-3 py-1.5 text-xs text-foreground font-medium hover:bg-card"
                        >
                          <Mail className="w-3 h-3 text-primary" /> Abrir cliente de e-mail
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <Button
                        type="button"
                        onClick={handleSendEmail}
                        disabled={isSubmittingEmail}
                        className="h-11 gap-2.5 font-semibold text-xs uppercase tracking-wider shadow-lg shadow-primary/20"
                      >
                        {isSubmittingEmail ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" /> Enviando briefing...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4" /> Enviar por E-mail
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleDownloadBriefing}
                        className="h-11 gap-2.5 text-xs font-semibold uppercase tracking-wider border-border hover:border-primary"
                      >
                        <Download className="w-4 h-4 text-primary" /> Baixar Briefing (.txt)
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setFormStep(2)}
                        className="text-xs h-10 sm:h-9 px-3 justify-center"
                      >
                        Editar dados
                      </Button>

                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleCopySummary}
                          className="text-xs h-10 sm:h-9 gap-1.5 text-muted-foreground hover:text-foreground flex-1 sm:flex-none justify-center"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copiar resumo
                        </Button>

                        <a
                          href={generateWhatsAppUrl(briefingData)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-success hover:underline px-3 py-2 rounded-md hover:bg-success/10 flex-1 sm:flex-none"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Falar no WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-grid">
            <div>
              <Brand />
              <p className="mt-4 text-xs text-muted-foreground max-w-xs leading-relaxed">
                UMBRA — Tecnologia para o próximo passo.<br />
                Desenvolvimento de sites, aplicativos e sistemas sob medida com engenharia sólida e design autoral.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span>Status operacional: normal</span>
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">Navegação</h4>
              <div className="footer-links-grid">
                {navLinks.map(([label, href]) => (
                  <a key={href} href={href} className="nav-link text-xs">
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">Localização</h4>
              <p className="footer-text">
                Guarulhos — SP<br />
                Brasil
              </p>
              <p className="footer-text mt-3 text-primary font-mono text-xs">
                {UMBRA_CONTACT.email}
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-text">
              © 2026 UMBRA Applications. Todos os direitos reservados. Tecnologia com propósito.
            </span>
            <a href="#inicio" className="footer-text flex items-center gap-1.5 hover:text-foreground transition-colors font-medium">
              Voltar ao topo <ArrowUpRight size={14} className="text-primary" />
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL DE ESTUDO DE CASO (PROJECT DETAIL MODAL) */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="font-mono text-xs uppercase font-semibold tracking-wider text-primary">
                  {selectedProject.client}
                </span>
                <h3 className="text-xl font-bold mt-0.5">{selectedProject.name}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
                aria-label="Fechar modal de detalhes"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="modal-body space-y-6">
              <div className="aspect-video w-full rounded-md overflow-hidden border border-border bg-surface-inset">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 bg-surface-inset p-4 rounded-md border border-border">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive" /> O Desafio Enfrentado
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedProject.challengeDetail}
                  </p>
                </div>

                <div className="space-y-2 bg-surface-inset p-4 rounded-md border border-border">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-success flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" /> A Solução Desenvolvida
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedProject.solutionDetail}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Principais Funcionalidades da Aplicação
                </h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Stack Tecnológica Utilizada
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-primary hover:underline h-10 sm:h-auto"
                >
                  Acessar aplicação em produção <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Button asChild size="sm" onClick={() => setSelectedProject(null)} className="text-xs h-11 sm:h-9 justify-center">
                  <a href="#contato">
                    Tem um desafio parecido? Fale conosco <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO UNIFICADO (13.14) */}
      {confirmationModal && (
        <div className="modal-overlay" onClick={() => setConfirmationModal(null)}>
          <div className="modal-container max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 text-primary">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{confirmationModal.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {confirmationModal.message}
              </p>

              <div className="space-y-2">
                <Button
                  onClick={() => setConfirmationModal(null)}
                  className="w-full text-xs font-semibold uppercase tracking-wider"
                >
                  Continuar navegando
                </Button>

                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="w-full text-xs"
                >
                  Iniciar novo briefing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
