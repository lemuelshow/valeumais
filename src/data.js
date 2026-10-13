// Dados de demonstração do Valeu+

export const CATEGORIAS = [
  { id: 'alimentacao', nome: 'Alimentação', icone: 'UtensilsCrossed', cor: '#FF7A45' },
  { id: 'mercado', nome: 'Mercados', icone: 'ShoppingCart', cor: '#22A06B' },
  { id: 'saude', nome: 'Saúde', icone: 'HeartPulse', cor: '#E5484D' },
  { id: 'beleza', nome: 'Beleza', icone: 'Sparkles', cor: '#D6409F' },
  { id: 'pets', nome: 'Pets', icone: 'PawPrint', cor: '#8E4EC6' },
  { id: 'servicos', nome: 'Serviços', icone: 'Wrench', cor: '#1463FF' },
  { id: 'educacao', nome: 'Educação', icone: 'GraduationCap', cor: '#0D9488' },
];

export const COMERCIOS = [
  {
    id: 'pizzaria-forno-vivo', nome: 'Pizzaria Forno Vivo', categoria: 'alimentacao', nota: 4.8, avaliacoes: 312,
    endereco: 'Av. Getúlio Vargas, 1450 - Centro', distancia: 0.6, telefone: '27999910001', horario: '18:00 – 23:30',
    abertoAgora: true, descricao: 'Pizzas artesanais em forno a lenha, massa de fermentação natural e entrega no bairro.',
    destaque: 'Rodízio às terças com 20% OFF',
  },
  {
    id: 'padaria-trigo-dourado', nome: 'Padaria Trigo Dourado', categoria: 'alimentacao', nota: 4.7, avaliacoes: 528,
    endereco: 'R. Monsenhor Pedrinha, 220 - Centro', distancia: 0.3, telefone: '27999910002', horario: '06:00 – 20:00',
    abertoAgora: true, descricao: 'Pães quentinhos toda hora, confeitaria, café da manhã completo e marmitas no almoço.',
    destaque: 'Café + pão de queijo por R$ 7,90',
  },
  {
    id: 'supermercado-bom-dia', nome: 'Supermercado Bom Dia', categoria: 'mercado', nota: 4.5, avaliacoes: 890,
    endereco: 'Av. Prefeito Samuel Batista Cruz, 3100 - Três Barras', distancia: 1.8, telefone: '27999910003', horario: '07:00 – 22:00',
    abertoAgora: true, descricao: 'Hortifruti fresco todos os dias, açougue, padaria e entrega grátis acima de R$ 150.',
    destaque: 'Quarta Verde: frutas e verduras com 15% OFF',
  },
  {
    id: 'farmacia-vida-plena', nome: 'Farmácia Vida Plena', categoria: 'saude', nota: 4.9, avaliacoes: 402,
    endereco: 'R. da Conceição, 87 - Centro', distancia: 0.9, telefone: '27999910004', horario: '24 horas',
    abertoAgora: true, descricao: 'Medicamentos, dermocosméticos, aferição de pressão e aplicação de injetáveis.',
    destaque: 'Genéricos com até 35% OFF para membros',
  },
  {
    id: 'clinica-sorriso-certo', nome: 'Clínica Sorriso Certo', categoria: 'saude', nota: 4.8, avaliacoes: 187,
    endereco: 'Av. Augusto Calmon, 560 - Interlagos', distancia: 2.4, telefone: '27999910005', horario: '08:00 – 18:00',
    abertoAgora: false, descricao: 'Odontologia geral, clareamento, implantes e ortodontia. Avaliação gratuita.',
    destaque: 'Limpeza + avaliação por R$ 89',
  },
  {
    id: 'studio-bela-arte', nome: 'Studio Bela Arte', categoria: 'beleza', nota: 4.9, avaliacoes: 264,
    endereco: 'R. Vitória, 1020 - Planalto', distancia: 0.4, telefone: '27999910006', horario: '09:00 – 19:00',
    abertoAgora: true, descricao: 'Cabelo, unhas, design de sobrancelhas e maquiagem para eventos.',
    destaque: 'Escova + hidratação com 25% OFF',
  },
  {
    id: 'barbearia-navalha', nome: 'Barbearia Navalha de Ouro', categoria: 'beleza', nota: 4.7, avaliacoes: 351,
    endereco: 'R. Pastor Uly, 45 - Planalto', distancia: 0.7, telefone: '27999910007', horario: '09:00 – 20:00',
    abertoAgora: true, descricao: 'Corte, barba com toalha quente e ambiente com sinuca e café.',
    destaque: 'Corte + barba por R$ 55',
  },
  {
    id: 'pet-amigo', nome: 'Pet Amigo', categoria: 'pets', nota: 4.8, avaliacoes: 219,
    endereco: 'Av. Nogueira da Gama, 300 - Movelar', distancia: 1.2, telefone: '27999910008', horario: '08:00 – 19:00',
    abertoAgora: true, descricao: 'Banho e tosa, rações, acessórios e veterinário com hora marcada.',
    destaque: 'Banho grátis a cada 5 no cartão fidelidade',
  },
  {
    id: 'auto-center-linhares', nome: 'Auto Center Planalto', categoria: 'servicos', nota: 4.6, avaliacoes: 143,
    endereco: 'R. Apolônia Belizária Corrêa, 610 - Planalto', distancia: 0.5, telefone: '27999910009', horario: '08:00 – 18:00',
    abertoAgora: true, descricao: 'Mecânica geral, troca de óleo, alinhamento e balanceamento.',
    destaque: 'Troca de óleo com filtro grátis',
  },
  {
    id: 'lavanderia-bolha', nome: 'Lavanderia Bolha Azul', categoria: 'servicos', nota: 4.6, avaliacoes: 98,
    endereco: 'R. Leopoldo Garcia, 130 - Centro', distancia: 1.1, telefone: '27999910010', horario: '08:00 – 20:00',
    abertoAgora: false, descricao: 'Lavagem por quilo, edredons, tênis e delivery no mesmo dia.',
    destaque: '1 kg grátis na primeira lavagem',
  },
  {
    id: 'escola-ingles-wave', nome: 'Wave English School', categoria: 'educacao', nota: 4.9, avaliacoes: 176,
    endereco: 'Av. Getúlio Vargas, 2200 - Centro', distancia: 1.5, telefone: '27999910011', horario: '08:00 – 21:00',
    abertoAgora: true, descricao: 'Inglês para crianças, adolescentes e adultos, turmas reduzidas e aulas de conversação.',
    destaque: 'Matrícula grátis para membros do Clube',
  },
  {
    id: 'hortifruti-da-roca', nome: 'Hortifruti da Roça', categoria: 'mercado', nota: 4.7, avaliacoes: 233,
    endereco: 'R. Belo Horizonte, 77 - Planalto', distancia: 0.2, telefone: '27999910012', horario: '07:00 – 19:00',
    abertoAgora: true, descricao: 'Frutas, verduras e legumes direto do produtor, ovos caipiras e queijos.',
    destaque: 'Cesta da semana por R$ 49,90',
  },
];

export const CUPONS = [
  { id: 'c1', comercio: 'pizzaria-forno-vivo', titulo: '20% OFF no rodízio', desconto: '20%', validade: '2026-11-30', regras: 'Válido às terças-feiras, no salão. Não cumulativo.' },
  { id: 'c2', comercio: 'padaria-trigo-dourado', titulo: 'Café da manhã em dobro', desconto: '2x1', validade: '2026-10-31', regras: 'Na compra de 1 combo café da manhã, ganhe outro. Até 10h.' },
  { id: 'c3', comercio: 'farmacia-vida-plena', titulo: '15% OFF em dermocosméticos', desconto: '15%', validade: '2026-12-15', regras: 'Exceto itens em promoção. Limite de 1 uso por CPF.' },
  { id: 'c4', comercio: 'studio-bela-arte', titulo: 'Escova + hidratação', desconto: '25%', validade: '2026-11-15', regras: 'Agendamento pelo WhatsApp. De segunda a quinta.' },
  { id: 'c5', comercio: 'barbearia-navalha', titulo: 'Corte + barba', desconto: 'R$ 15', validade: '2026-11-20', regras: 'R$ 15 de desconto no combo. Válido todos os dias.' },
  { id: 'c6', comercio: 'pet-amigo', titulo: 'Banho e tosa', desconto: '30%', validade: '2026-12-01', regras: 'Para cães de pequeno porte. Agendamento obrigatório.' },
  { id: 'c7', comercio: 'supermercado-bom-dia', titulo: 'R$ 20 em compras acima de R$ 200', desconto: 'R$ 20', validade: '2026-10-31', regras: 'Exceto bebidas alcoólicas e cigarros.' },
  { id: 'c8', comercio: 'auto-center-linhares', titulo: 'Alinhamento + balanceamento', desconto: '40%', validade: '2026-12-20', regras: 'Carros de passeio, aro até 17.' },
  { id: 'c9', comercio: 'escola-ingles-wave', titulo: 'Matrícula grátis', desconto: 'GRÁTIS', validade: '2027-01-31', regras: 'Para novos alunos em qualquer turma.' },
];

export const FIDELIDADE = [
  { id: 'f1', comercio: 'padaria-trigo-dourado', meta: 10, recompensa: '1 café da manhã completo', carimbosIniciais: 7 },
  { id: 'f2', comercio: 'barbearia-navalha', meta: 8, recompensa: '1 corte grátis', carimbosIniciais: 3 },
  { id: 'f3', comercio: 'pet-amigo', meta: 5, recompensa: '1 banho grátis', carimbosIniciais: 4 },
  { id: 'f4', comercio: 'pizzaria-forno-vivo', meta: 10, recompensa: '1 pizza grande', carimbosIniciais: 1 },
];

export const BENEFICIOS_CLUBE = [
  { comercio: 'farmacia-vida-plena', beneficio: 'Genéricos com até 35% OFF' },
  { comercio: 'escola-ingles-wave', beneficio: 'Matrícula grátis + 10% na mensalidade' },
  { comercio: 'supermercado-bom-dia', beneficio: '5% de cashback em toda compra' },
  { comercio: 'clinica-sorriso-certo', beneficio: 'Avaliação e limpeza por R$ 59' },
  { comercio: 'auto-center-linhares', beneficio: 'Revisão com 20% OFF na mão de obra' },
  { comercio: 'studio-bela-arte', beneficio: '15% OFF em todos os serviços' },
];

export const PREMIOS_RASPADINHA = [
  { titulo: 'Você ganhou!', premio: 'Café + pão de queijo grátis', comercio: 'padaria-trigo-dourado', chance: 0.18 },
  { titulo: 'Você ganhou!', premio: '10% OFF na próxima pizza', comercio: 'pizzaria-forno-vivo', chance: 0.18 },
  { titulo: 'Você ganhou!', premio: 'R$ 10 em compras', comercio: 'supermercado-bom-dia', chance: 0.12 },
  { titulo: 'Você ganhou!', premio: 'Hidratação grátis', comercio: 'studio-bela-arte', chance: 0.08 },
  { titulo: 'Quase!', premio: 'Não foi dessa vez. Tente de novo amanhã!', comercio: null, chance: 0.44 },
];

export const BANNERS = [
  { id: 'b1', titulo: 'Pizza na terça', destaque: '20% OFF', texto: 'Toda terça na Pizzaria Forno Vivo', cta: 'PEGAR CUPOM', link: '/cupons', icone: 'Pizza', tema: 'azul' },
  { id: 'b2', titulo: 'Clube Valeu+', destaque: 'economize todo mês', texto: 'Descontos exclusivos em dezenas de parceiros do bairro', cta: 'CONHEÇA', link: '/clube', icone: 'Crown', tema: 'noite' },
  { id: 'b3', titulo: 'Raspou,', destaque: 'ganhou!', texto: 'Uma raspadinha grátis por dia com prêmios reais', cta: 'RASPAR AGORA', link: '/raspadinha', icone: 'Gift', tema: 'ciano' },
];

export const ENDERECOS = [
  { id: 'e1', numero: '26', linha: 'R. Apolônia Belizária Corrêa, 26 - Planalto, Linhares - ES, 29900-000' },
  { id: 'e2', numero: '1450', linha: 'Av. Getúlio Vargas, 1450 - Centro, Linhares - ES, 29900-000' },
  { id: 'e3', numero: '87', linha: 'R. da Conceição, 87 - Centro, Linhares - ES, 29900-000' },
];

export const NOTIFICACOES = [
  { id: 'n1', titulo: 'Novo cupom disponível', texto: 'Pizzaria Forno Vivo liberou 20% OFF no rodízio de terça.', quando: 'há 10 min', tipo: 'cupom' },
  { id: 'n2', titulo: 'Falta pouco!', texto: 'Mais 3 carimbos na Padaria Trigo Dourado e o café da manhã é seu.', quando: 'há 2 h', tipo: 'fidelidade' },
  { id: 'n3', titulo: 'Sua raspadinha de hoje', texto: 'Já raspou hoje? Tem prêmio esperando por você.', quando: 'hoje, 08:00', tipo: 'raspadinha' },
  { id: 'n4', titulo: 'Bem-vindo ao Valeu+', texto: 'Descubra os comércios do seu bairro e economize.', quando: 'ontem', tipo: 'geral' },
];

export const comercioPorId = id => COMERCIOS.find(c => c.id === id);
export const categoriaPorId = id => CATEGORIAS.find(c => c.id === id);
