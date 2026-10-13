import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Ticket } from 'lucide-react';
import { useStore } from '../store.jsx';
import { CUPONS, comercioPorId } from '../data.js';
import { QrFake, Sheet, TopBar, dataBR } from '../components/ui.jsx';

const FILTROS = [['todos', 'Todos'], ['disponiveis', 'Disponíveis'], ['meus', 'Meus cupons'], ['usados', 'Usados']];

export default function Cupons() {
  const { cupons, pegarCupom, usarCupom, avisar } = useStore();
  const [filtro, setFiltro] = useState('todos');
  const [aberto, setAberto] = useState(null);

  const lista = CUPONS.filter(cp => {
    const meu = cupons[cp.id];
    if (filtro === 'disponiveis') return !meu;
    if (filtro === 'meus') return meu && !meu.usado;
    if (filtro === 'usados') return meu?.usado;
    return true;
  });

  const copiar = async codigo => {
    try { await navigator.clipboard.writeText(codigo); avisar('Código copiado!'); } catch { avisar(codigo); }
  };

  return (
    <div className="tela">
      <TopBar titulo="Cupons de Desconto" voltarPara="/" />
      <div className="chips">
        {FILTROS.map(([id, nome]) => <button key={id} className={filtro === id ? 'on' : ''} onClick={() => setFiltro(id)}>{nome}</button>)}
      </div>

      <div className="lista">
        {lista.map(cp => {
          const c = comercioPorId(cp.comercio);
          const meu = cupons[cp.id];
          return (
            <article key={cp.id} className={`cupom ${meu?.usado ? 'usado' : ''}`}>
              <div className="cupom-valor"><b>{cp.desconto}</b><span>OFF</span></div>
              <div className="cupom-corpo">
                <Link to={`/guia/${c.id}`} className="small azul">{c.nome}</Link>
                <strong>{cp.titulo}</strong>
                <span className="small muted">Válido até {dataBR(cp.validade)}</span>
                {!meu && <button className="btn-cupom" onClick={() => { pegarCupom(cp.id); avisar('Cupom guardado em "Meus cupons"'); }}>Pegar cupom</button>}
                {meu && !meu.usado && <button className="btn-cupom ativo" onClick={() => setAberto(cp)}><Ticket size={15} /> Usar agora</button>}
                {meu?.usado && <span className="usado-tag">Utilizado</span>}
              </div>
            </article>
          );
        })}
        {lista.length === 0 && <p className="vazio">Nenhum cupom aqui ainda.</p>}
      </div>

      <Sheet aberto={!!aberto} onFechar={() => setAberto(null)} titulo={aberto?.titulo}>
        {aberto && (
          <div className="qr-box">
            <span className="muted small">{comercioPorId(aberto.comercio).nome}</span>
            <QrFake texto={cupons[aberto.id].codigo} tamanho={180} />
            <button className="codigo" onClick={() => copiar(cupons[aberto.id].codigo)}>{cupons[aberto.id].codigo} <Copy size={15} /></button>
            <p className="small muted regras">{aberto.regras}</p>
            <button className="btn-primario" onClick={() => { usarCupom(aberto.id); setAberto(null); avisar('Cupom utilizado. Valeu! 💙'); }}>Confirmar uso no caixa</button>
          </div>
        )}
      </Sheet>
    </div>
  );
}
