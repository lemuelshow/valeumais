import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, RotateCcw, Sparkles } from 'lucide-react';
import { useStore } from '../store.jsx';
import { PREMIOS_RASPADINHA, comercioPorId } from '../data.js';
import { TopBar } from '../components/ui.jsx';

const hoje = () => new Date().toLocaleDateString('sv-SE'); // AAAA-MM-DD no fuso local

function sortear() {
  let r = Math.random();
  for (let i = 0; i < PREMIOS_RASPADINHA.length; i++) {
    r -= PREMIOS_RASPADINHA[i].chance;
    if (r <= 0) return i;
  }
  return PREMIOS_RASPADINHA.length - 1;
}

export default function Raspadinha() {
  const { raspadinha, set, avisar } = useStore();
  const canvasRef = useRef(null);
  const raspando = useRef(false);
  const [progresso, setProgresso] = useState(0);

  // Uma raspadinha por dia
  useEffect(() => {
    if (!raspadinha || raspadinha.data !== hoje()) set({ raspadinha: { data: hoje(), indice: sortear(), revelada: false } });
  }, [raspadinha, set]);

  const atual = raspadinha?.data === hoje() ? raspadinha : null;
  const premio = atual ? PREMIOS_RASPADINHA[atual.indice] : null;
  const revelada = atual?.revelada;

  // Desenha a camada prateada
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv || revelada || !atual) return;
    const ctx = cv.getContext('2d');
    const { width, height } = cv;
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, '#9FB3D9'); g.addColorStop(0.5, '#D7E2F7'); g.addColorStop(1, '#8EA4CF');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(11,63,179,.55)';
    ctx.font = '600 22px Lexend, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RASPE AQUI', width / 2, height / 2 + 4);
    ctx.font = '14px Lexend, sans-serif';
    ctx.fillText('✦  ✦  ✦', width / 2, height / 2 + 30);
    setProgresso(0);
  }, [atual?.indice, revelada]); // eslint-disable-line react-hooks/exhaustive-deps

  const raspar = e => {
    if (!raspando.current || revelada) return;
    const cv = canvasRef.current;
    const r = cv.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    const x = ((p.clientX - r.left) / r.width) * cv.width;
    const y = ((p.clientY - r.top) / r.height) * cv.height;
    const ctx = cv.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const medir = () => {
    raspando.current = false;
    const cv = canvasRef.current;
    if (!cv || revelada) return;
    const dados = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
    let limpos = 0;
    for (let i = 3; i < dados.length; i += 32) if (dados[i] < 32) limpos++;
    const pct = limpos / (dados.length / 32);
    setProgresso(pct);
    if (pct > 0.5) {
      set({ raspadinha: { ...atual, revelada: true } });
      if (premio.comercio) avisar('Prêmio guardado na sua conta 🎉');
    }
  };

  // Soltar o botão em qualquer lugar encerra a raspagem (mesmo fora do cartão)
  useEffect(() => {
    const fim = () => { if (raspando.current) medir(); };
    window.addEventListener('mouseup', fim);
    return () => window.removeEventListener('mouseup', fim);
  });

  const ganhou = premio?.comercio;

  return (
    <div className="tela">
      <TopBar titulo="Raspadinha Digital" voltarPara="/" />
      <p className="intro">Raspe o cartão com o dedo (ou o mouse). Uma raspadinha grátis por dia!</p>

      {premio && (
        <div className="raspadinha">
          <div className={`raspadinha-premio ${ganhou ? 'ganhou' : ''}`}>
            {ganhou ? <Gift size={42} /> : <Sparkles size={42} />}
            <b>{premio.titulo}</b>
            <span>{premio.premio}</span>
            {ganhou && <small>{comercioPorId(premio.comercio).nome}</small>}
          </div>
          {!revelada && (
            <canvas
              ref={canvasRef} width={600} height={360} className="raspadinha-canvas"
              onMouseDown={e => { raspando.current = true; raspar(e); }} onMouseMove={raspar}
              onTouchStart={e => { raspando.current = true; raspar(e); }} onTouchMove={raspar} onTouchEnd={medir}
            />
          )}
        </div>
      )}
      {!revelada && <div className="progresso"><i style={{ width: `${Math.min(100, (progresso / 0.5) * 100)}%` }} /></div>}

      {revelada && (
        <div className="raspadinha-final">
          {ganhou
            ? <Link className="btn-primario" to={`/guia/${premio.comercio}`}>Ver {comercioPorId(premio.comercio).nome}</Link>
            : <p className="muted center">Volte amanhã para uma nova chance.</p>}
          <button className="btn-secundario" onClick={() => set({ raspadinha: { data: hoje(), indice: sortear(), revelada: false } })}>
            <RotateCcw size={16} /> Nova raspadinha (demo)
          </button>
        </div>
      )}

      <div className="regras-box">
        <b>Como funciona</b>
        <span>Os prêmios são oferecidos pelos comércios parceiros do Valeu+ e ficam disponíveis por 7 dias após o resgate.</span>
      </div>
    </div>
  );
}
