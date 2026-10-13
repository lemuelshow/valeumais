import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BatteryFull, ChevronLeft, Circle, Crown, Gift, GraduationCap, HeartPulse, PawPrint, Pizza, ShoppingCart,
  Signal, Sparkles, Star, UtensilsCrossed, Wifi, Wrench,
} from 'lucide-react';

const ICONES = { UtensilsCrossed, ShoppingCart, HeartPulse, Sparkles, PawPrint, Wrench, GraduationCap, Pizza, Crown, Gift };

/** Ícone lucide pelo nome (usado nos dados). */
export function Icone({ nome, ...props }) {
  const C = ICONES[nome] || Circle;
  return <C {...props} />;
}

export function Logo({ claro = false, tamanho = 22 }) {
  return (
    <span className={`logo ${claro ? 'claro' : ''}`} style={{ fontSize: tamanho }}>
      Valeu<b>+</b>
    </span>
  );
}

export function StatusBar() {
  const { pathname } = useLocation();
  const claro = pathname === '/';
  const [hora, setHora] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setHora(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`statusbar ${claro ? 'claro' : ''}`} aria-hidden="true">
      <span>{hora.toTimeString().slice(0, 5)}</span>
      <span className="statusbar-icons"><Signal size={14} /><Wifi size={14} /><BatteryFull size={17} /></span>
    </div>
  );
}

/** Barra superior das telas internas. */
export function TopBar({ titulo, acao, voltarPara }) {
  const navigate = useNavigate();
  return (
    <header className="topbar">
      <button className="icon-btn" onClick={() => (voltarPara ? navigate(voltarPara) : navigate(-1))} aria-label="Voltar">
        <ChevronLeft size={24} />
      </button>
      <h1>{titulo}</h1>
      <div className="topbar-acao">{acao}</div>
    </header>
  );
}

export function Sheet({ aberto, onFechar, titulo, children }) {
  if (!aberto) return null;
  return (
    <div className="sheet-backdrop" onClick={e => e.target === e.currentTarget && onFechar()}>
      <div className="sheet" role="dialog" aria-label={titulo}>
        <div className="sheet-handle" />
        {titulo && <h3>{titulo}</h3>}
        {children}
      </div>
    </div>
  );
}

/** QR code ilustrativo (determinístico pelo texto) — não é um QR decodificável. */
export function QrFake({ texto, tamanho = 160 }) {
  const n = 25;
  let h = 2166136261;
  for (const ch of texto) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
  const finder = (x, y) => {
    const dentro = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    for (const [ox, oy] of [[0, 0], [n - 7, 0], [0, n - 7]]) {
      if (dentro(ox, oy)) {
        const dx = x - ox; const dy = y - oy;
        return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
      }
      if (x >= ox - 1 && x <= ox + 7 && y >= oy - 1 && y <= oy + 7) return 0;
    }
    return null;
  };
  const cels = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y);
      if (f === 1 || (f === null && rnd() > 0.52)) cels.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  }
  return (
    <svg className="qr" width={tamanho} height={tamanho} viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label="QR code">
      <rect x="-1" y="-1" width={n + 2} height={n + 2} fill="#fff" />
      <g fill="#0B1F4D">{cels}</g>
    </svg>
  );
}

export function Estrelas({ nota }) {
  return (
    <span className="estrelas">
      <Star size={13} fill="#FFB800" stroke="#FFB800" /> {nota.toFixed(1)}
    </span>
  );
}

export const dataBR = iso => iso.split('-').reverse().join('/');
