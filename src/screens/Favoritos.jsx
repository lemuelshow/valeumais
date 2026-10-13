import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../store.jsx';
import { COMERCIOS } from '../data.js';
import { CardComercio } from './Guia.jsx';

export default function Favoritos() {
  const { favoritos } = useStore();
  const lista = COMERCIOS.filter(c => favoritos.includes(c.id));
  return (
    <div className="tela">
      <header className="tab-header"><h1>Favoritos</h1><span className="muted small">{lista.length} comércio(s)</span></header>
      {lista.length === 0 ? (
        <div className="vazio-grande">
          <Heart size={48} />
          <b>Nenhum favorito ainda</b>
          <span>Toque no coração dos comércios que você mais gosta.</span>
          <Link to="/guia" className="btn-primario">Explorar o Guia de Bairro</Link>
        </div>
      ) : (
        <div className="lista">{lista.map(c => <CardComercio key={c.id} c={c} />)}</div>
      )}
    </div>
  );
}
