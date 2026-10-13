import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ENDERECOS, FIDELIDADE } from './data.js';

const CHAVE = 'valeu-plus:v1';

const inicial = () => ({
  nome: 'Ana',
  email: 'ana@email.com',
  enderecoId: ENDERECOS[0].id,
  favoritos: ['padaria-trigo-dourado', 'farmacia-vida-plena'],
  cupons: {}, // id -> { codigo, pegoEm, usado }
  carimbos: Object.fromEntries(FIDELIDADE.map(f => [f.id, f.carimbosIniciais])),
  resgates: [],
  membro: false,
  raspadinha: null, // { data, indice, revelada }
  notificacoesLidas: [],
});

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    return salvo ? { ...inicial(), ...salvo } : inicial();
  } catch {
    return inicial();
  }
}

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [estado, setEstado] = useState(carregar);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch { /* modo privado */ }
  }, [estado]);

  const avisar = useCallback(msg => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(t => (t && Date.now() - t.id >= 2400 ? null : t)), 2500);
  }, []);

  const acoes = useMemo(() => ({
    set: patch => setEstado(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
    alternarFavorito: id => setEstado(s => ({
      ...s, favoritos: s.favoritos.includes(id) ? s.favoritos.filter(x => x !== id) : [...s.favoritos, id],
    })),
    pegarCupom: id => setEstado(s => ({
      ...s, cupons: { ...s.cupons, [id]: { codigo: `VLU-${Math.random().toString(36).slice(2, 7).toUpperCase()}`, pegoEm: Date.now(), usado: false } },
    })),
    usarCupom: id => setEstado(s => ({ ...s, cupons: { ...s.cupons, [id]: { ...s.cupons[id], usado: true } } })),
    carimbar: id => setEstado(s => ({ ...s, carimbos: { ...s.carimbos, [id]: (s.carimbos[id] || 0) + 1 } })),
    resgatar: (id, recompensa) => setEstado(s => ({
      ...s, carimbos: { ...s.carimbos, [id]: 0 }, resgates: [{ id, recompensa, em: Date.now() }, ...s.resgates],
    })),
    resetar: () => setEstado(inicial()),
  }), []);

  const valor = useMemo(() => ({ ...estado, ...acoes, avisar }), [estado, acoes, avisar]);

  return (
    <Ctx.Provider value={valor}>
      {children}
      {toast && <div className="toast" key={toast.id}>{toast.msg}</div>}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);
