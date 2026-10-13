import { useState } from 'react';
import { Check, Gift, QrCode, Stamp } from 'lucide-react';
import { useStore } from '../store.jsx';
import { FIDELIDADE, categoriaPorId, comercioPorId } from '../data.js';
import { Icone, QrFake, Sheet, TopBar } from '../components/ui.jsx';

export default function Fidelidade() {
  const { carimbos, carimbar, resgatar, resgates, avisar, nome } = useStore();
  const [qr, setQr] = useState(null);

  const carimbarDemo = f => {
    carimbar(f.id);
    const novo = (carimbos[f.id] || 0) + 1;
    avisar(novo >= f.meta ? 'Cartão completo! Resgate sua recompensa 🎁' : `Carimbo adicionado (${novo}/${f.meta})`);
    setQr(null);
  };

  return (
    <div className="tela">
      <TopBar titulo="Cartão Fidelidade" voltarPara="/" />
      <p className="intro">Mostre o QR no caixa a cada compra e junte carimbos para ganhar recompensas.</p>

      <div className="lista">
        {FIDELIDADE.map(f => {
          const c = comercioPorId(f.comercio);
          const cat = categoriaPorId(c.categoria);
          const qtd = Math.min(carimbos[f.id] || 0, f.meta);
          const completo = qtd >= f.meta;
          return (
            <article key={f.id} className={`fidelidade ${completo ? 'completo' : ''}`}>
              <header>
                <span className="comercio-capa pequena" style={{ background: cat.cor }}><Icone nome={cat.icone} size={20} color="#fff" /></span>
                <div><strong>{c.nome}</strong><span className="small muted">Ganhe {f.recompensa}</span></div>
                <b className="contador">{qtd}/{f.meta}</b>
              </header>
              <div className="carimbos" style={{ gridTemplateColumns: `repeat(${f.meta > 5 ? 5 : f.meta}, 1fr)` }}>
                {Array.from({ length: f.meta }, (_, k) => (
                  <span key={k} className={k < qtd ? 'on' : ''}>{k < qtd ? <Check size={16} strokeWidth={3} /> : k === f.meta - 1 ? <Gift size={15} /> : k + 1}</span>
                ))}
              </div>
              {completo ? (
                <button className="btn-primario verde" onClick={() => { resgatar(f.id, `${f.recompensa} - ${c.nome}`); avisar('Recompensa resgatada! Mostre esta tela no caixa.'); }}>
                  <Gift size={18} /> Resgatar {f.recompensa}
                </button>
              ) : (
                <button className="btn-secundario" onClick={() => setQr(f)}><QrCode size={18} /> Mostrar QR para carimbar</button>
              )}
            </article>
          );
        })}
      </div>

      {resgates.length > 0 && (
        <>
          <h3 className="sub">Recompensas resgatadas</h3>
          <ul className="resgates">
            {resgates.map(r => <li key={r.em}><Gift size={16} /> {r.recompensa}<small>{new Date(r.em).toLocaleDateString('pt-BR')}</small></li>)}
          </ul>
        </>
      )}

      <Sheet aberto={!!qr} onFechar={() => setQr(null)} titulo={qr ? comercioPorId(qr.comercio).nome : ''}>
        {qr && (
          <div className="qr-box">
            <QrFake texto={`fid-${qr.id}-${nome}`} tamanho={190} />
            <span className="muted small">O atendente lê o QR e adiciona seu carimbo.</span>
            <button className="btn-secundario" onClick={() => carimbarDemo(qr)}><Stamp size={18} /> Simular carimbo (demo)</button>
          </div>
        )}
      </Sheet>
    </div>
  );
}
