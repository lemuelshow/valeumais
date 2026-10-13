import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, Check, ChevronDown, ChevronLeft, ChevronRight, CircleUserRound, CreditCard, Gift, LocateFixed, Map, Navigation, Star, Tag, User,
} from 'lucide-react';
import { useStore } from '../store.jsx';
import { BANNERS, COMERCIOS, ENDERECOS, NOTIFICACOES, categoriaPorId } from '../data.js';
import { Estrelas, Icone, Logo, Sheet } from '../components/ui.jsx';

const ATALHOS = [
  { to: '/guia', titulo: 'Guia de Bairro', icone: Map, cor: '#1463FF', fundo: '#E6EEFF' },
  { to: '/clube', titulo: 'Clube Valeu+', icone: Star, cor: '#6E56CF', fundo: '#EEEAFD' },
  { to: '/fidelidade', titulo: 'Cartão Fidelidade', icone: CreditCard, cor: '#B58A00', fundo: '#FFF6D6' },
  { to: '/cupons', titulo: 'Cupons de Desconto', icone: Tag, cor: '#D9622B', fundo: '#FFEEE4' },
  { to: '/raspadinha', titulo: 'Raspadinha Digital', icone: Gift, cor: '#1F8A4C', fundo: '#E3F5EA' },
];

function Carrossel() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, [i]);
  const ir = d => setI(x => (x + d + BANNERS.length) % BANNERS.length);

  return (
    <section className="carrossel" aria-roledescription="carrossel">
      <div className="carrossel-trilho" style={{ transform: `translateX(-${i * 100}%)` }}>
        {BANNERS.map(b => (
          <article key={b.id} className={`banner banner-${b.tema}`} aria-hidden={b.id !== BANNERS[i].id}>
            <div className="banner-texto">
              <Logo claro tamanho={16} />
              <h2>{b.titulo}<span>{b.destaque}</span></h2>
              <p>{b.texto}</p>
              <button className="banner-cta" onClick={() => navigate(b.link)}>{b.cta}</button>
            </div>
            <div className="banner-arte"><span><Icone nome={b.icone} size={64} strokeWidth={1.5} /></span></div>
          </article>
        ))}
      </div>
      <button className="carrossel-seta esq" onClick={() => ir(-1)} aria-label="Anterior"><ChevronLeft size={20} /></button>
      <button className="carrossel-seta dir" onClick={() => ir(1)} aria-label="Próximo"><ChevronRight size={20} /></button>
      <div className="carrossel-dots">
        {BANNERS.map((b, k) => <button key={b.id} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Banner ${k + 1}`} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const { nome, enderecoId, set, notificacoesLidas, avisar } = useStore();
  const [sheet, setSheet] = useState(false);
  const endereco = ENDERECOS.find(e => e.id === enderecoId) || ENDERECOS[0];
  const naoLidas = NOTIFICACOES.filter(n => !notificacoesLidas.includes(n.id)).length;
  const perto = [...COMERCIOS].sort((a, b) => a.distancia - b.distancia).slice(0, 6);

  return (
    <div className="home">
      <header className="home-header">
        <div className="avatar"><User size={30} /></div>
        <div className="saudacao">
          <strong>Olá, {nome.toUpperCase()}!</strong>
          <span>Bem-vindo de volta</span>
        </div>
        <Link to="/notificacoes" className="icon-btn branco" aria-label="Notificações">
          <Bell size={26} />
          {naoLidas > 0 && <i className="badge">{naoLidas}</i>}
        </Link>
        <Link to="/conta" className="icon-btn branco" aria-label="Conta"><CircleUserRound size={28} /></Link>
      </header>

      <Carrossel />

      <button className="endereco" onClick={() => setSheet(true)}>
        <Navigation size={22} className="endereco-icone" />
        <div>
          <strong>{endereco.numero}</strong>
          <span>{endereco.linha}</span>
        </div>
        <ChevronDown size={20} className="muted" />
      </button>

      <div className="atalhos">
        {ATALHOS.map(a => (
          <Link key={a.to} to={a.to} className="atalho">
            <span className="atalho-icone" style={{ background: a.fundo, color: a.cor }}><a.icone size={30} strokeWidth={1.8} /></span>
            <strong>{a.titulo}</strong>
          </Link>
        ))}
      </div>

      <section className="secao">
        <div className="secao-titulo"><h3>Perto de você</h3><Link to="/guia">Ver todos</Link></div>
        <div className="horizontal">
          {perto.map(c => {
            const cat = categoriaPorId(c.categoria);
            return (
              <Link key={c.id} to={`/guia/${c.id}`} className="mini-card">
                <span className="mini-capa" style={{ background: `linear-gradient(135deg, ${cat.cor}, ${cat.cor}AA)` }}>
                  <Icone nome={cat.icone} size={28} color="#fff" />
                </span>
                <strong>{c.nome}</strong>
                <span className="muted small"><Estrelas nota={c.nota} /> · {c.distancia.toString().replace('.', ',')} km</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Sheet aberto={sheet} onFechar={() => setSheet(false)} titulo="Escolha o endereço">
        <button className="sheet-item" onClick={() => { setSheet(false); avisar('Localização atual: Planalto, Linhares - ES'); }}>
          <LocateFixed size={20} className="azul" /> <span>Usar minha localização atual</span>
        </button>
        {ENDERECOS.map(e => (
          <button key={e.id} className="sheet-item" onClick={() => { set({ enderecoId: e.id }); setSheet(false); }}>
            <Navigation size={18} className="azul" />
            <span><b>{e.numero}</b><small>{e.linha}</small></span>
            {e.id === endereco.id && <Check size={18} className="azul" />}
          </button>
        ))}
      </Sheet>
    </div>
  );
}
