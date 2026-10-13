import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, CreditCard, Crown, Gift, HelpCircle, LogOut, MapPin, Pencil, Shield, Tag, User } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Sheet } from '../components/ui.jsx';

export default function Conta() {
  const { nome, email, membro, cupons, resgates, set, resetar, avisar } = useStore();
  const [editar, setEditar] = useState(false);
  const [form, setForm] = useState({ nome, email });
  const meusCupons = Object.values(cupons).filter(c => !c.usado).length;

  const itens = [
    { to: '/cupons', icone: Tag, titulo: 'Meus cupons', info: meusCupons ? `${meusCupons} ativo(s)` : '' },
    { to: '/fidelidade', icone: CreditCard, titulo: 'Cartões fidelidade', info: resgates.length ? `${resgates.length} resgate(s)` : '' },
    { to: '/clube', icone: Crown, titulo: 'Clube Valeu+', info: membro ? 'Membro' : 'Assine' },
    { to: '/raspadinha', icone: Gift, titulo: 'Raspadinha do dia' },
    { to: '/notificacoes', icone: Bell, titulo: 'Notificações' },
  ];

  return (
    <div className="tela">
      <header className="conta-header">
        <div className="avatar grande"><User size={38} /></div>
        <div>
          <h1>{nome}</h1>
          <span className="muted small">{email}</span>
          {membro && <span className="pill dourado"><Crown size={12} /> Membro Clube</span>}
        </div>
        <button className="icon-btn" onClick={() => { setForm({ nome, email }); setEditar(true); }} aria-label="Editar perfil"><Pencil size={18} /></button>
      </header>

      <nav className="menu">
        {itens.map(i => (
          <Link key={i.to} to={i.to} className="menu-item">
            <i.icone size={20} /> <span>{i.titulo}</span> {i.info && <small>{i.info}</small>} <ChevronRight size={18} className="muted" />
          </Link>
        ))}
      </nav>

      <nav className="menu">
        <button className="menu-item" onClick={() => avisar('Em breve: endereços salvos')}><MapPin size={20} /> <span>Meus endereços</span><ChevronRight size={18} className="muted" /></button>
        <button className="menu-item" onClick={() => avisar('Em breve: privacidade')}><Shield size={20} /> <span>Privacidade e segurança</span><ChevronRight size={18} className="muted" /></button>
        <button className="menu-item" onClick={() => avisar('Fale conosco: contato@valeumais.com.br')}><HelpCircle size={20} /> <span>Ajuda</span><ChevronRight size={18} className="muted" /></button>
        <button className="menu-item vermelho" onClick={() => { if (window.confirm('Sair e apagar os dados de demonstração?')) { resetar(); avisar('Dados reiniciados'); } }}>
          <LogOut size={20} /> <span>Sair</span>
        </button>
      </nav>
      <p className="versao">Valeu+ · versão 1.0 (web)</p>

      <Sheet aberto={editar} onFechar={() => setEditar(false)} titulo="Editar perfil">
        <form className="form" onSubmit={e => { e.preventDefault(); set({ nome: form.nome.trim() || nome, email: form.email }); setEditar(false); avisar('Perfil atualizado'); }}>
          <label>Nome<input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required /></label>
          <label>E-mail<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
          <button className="btn-primario">Salvar</button>
        </form>
      </Sheet>
    </div>
  );
}
