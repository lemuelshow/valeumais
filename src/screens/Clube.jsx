import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgePercent, Check, ChevronRight, Crown } from 'lucide-react';
import { useStore } from '../store.jsx';
import { BENEFICIOS_CLUBE, categoriaPorId, comercioPorId } from '../data.js';
import { Icone, Logo, QrFake, Sheet, TopBar } from '../components/ui.jsx';

export default function Clube() {
  const { nome, membro, set, avisar } = useStore();
  const [qr, setQr] = useState(false);
  const numero = '5021 8834 0091 2607';

  return (
    <div className="tela">
      <TopBar titulo="Clube Valeu+" voltarPara="/" />

      <div className={`cartao-clube ${membro ? '' : 'bloqueado'}`} onClick={() => membro && setQr(true)} role={membro ? 'button' : undefined}>
        <div className="cartao-topo"><Logo claro tamanho={20} /><Crown size={22} /></div>
        <span className="cartao-numero">{membro ? numero : '•••• •••• •••• ••••'}</span>
        <div className="cartao-base">
          <div><small>Membro</small><b>{nome.toUpperCase()}</b></div>
          <div><small>Validade</small><b>{membro ? '10/2027' : '--/--'}</b></div>
        </div>
        {membro && <span className="cartao-dica">Toque para mostrar o QR</span>}
      </div>

      {!membro ? (
        <div className="plano">
          <h3>Seja membro e economize todo mês</h3>
          <ul>
            <li><Check size={16} /> Descontos exclusivos em parceiros do bairro</li>
            <li><Check size={16} /> Cupons liberados antes de todo mundo</li>
            <li><Check size={16} /> 2 raspadinhas por dia</li>
          </ul>
          <div className="plano-preco"><span>R$</span><b>9,90</b><small>/mês</small></div>
          <button className="btn-primario" onClick={() => { set({ membro: true }); avisar('Bem-vindo ao Clube Valeu+! 🎉'); }}>Quero ser membro</button>
          <small className="muted">Demonstração: nenhuma cobrança é feita.</small>
        </div>
      ) : (
        <div className="economia">
          <BadgePercent size={28} />
          <div><b>Você já economizou R$ 86,40</b><span className="small">com o Clube este mês</span></div>
        </div>
      )}

      <h3 className="sub">Benefícios dos parceiros</h3>
      <div className="lista">
        {BENEFICIOS_CLUBE.map(b => {
          const c = comercioPorId(b.comercio);
          const cat = categoriaPorId(c.categoria);
          return (
            <Link key={b.comercio} to={`/guia/${c.id}`} className="beneficio-item">
              <span className="comercio-capa pequena" style={{ background: cat.cor }}><Icone nome={cat.icone} size={20} color="#fff" /></span>
              <div><strong>{c.nome}</strong><span className="small azul">{b.beneficio}</span></div>
              <ChevronRight size={18} className="muted" />
            </Link>
          );
        })}
      </div>

      {membro && (
        <button className="link-sair" onClick={() => { set({ membro: false }); avisar('Assinatura cancelada'); }}>Cancelar assinatura (demo)</button>
      )}

      <Sheet aberto={qr} onFechar={() => setQr(false)} titulo="Apresente no caixa">
        <div className="qr-box"><QrFake texto={`clube-${numero}`} tamanho={190} /><b>{numero}</b><span className="muted small">Membro {nome}</span></div>
      </Sheet>
    </div>
  );
}
