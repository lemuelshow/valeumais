import { useEffect } from 'react';
import { Bell, CreditCard, Gift, Tag } from 'lucide-react';
import { useStore } from '../store.jsx';
import { NOTIFICACOES } from '../data.js';
import { TopBar } from '../components/ui.jsx';

const ICONES = { cupom: Tag, fidelidade: CreditCard, raspadinha: Gift, geral: Bell };

export default function Notificacoes() {
  const { notificacoesLidas, set } = useStore();
  const lidasAntes = notificacoesLidas;

  useEffect(() => {
    const t = setTimeout(() => set({ notificacoesLidas: NOTIFICACOES.map(n => n.id) }), 1200);
    return () => clearTimeout(t);
  }, [set]);

  return (
    <div className="tela">
      <TopBar titulo="Notificações" />
      <ul className="notificacoes">
        {NOTIFICACOES.map(n => {
          const I = ICONES[n.tipo];
          return (
            <li key={n.id} className={lidasAntes.includes(n.id) ? '' : 'nova'}>
              <span className="notif-icone"><I size={20} /></span>
              <div><b>{n.titulo}</b><span>{n.texto}</span><small>{n.quando}</small></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
