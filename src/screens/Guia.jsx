import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, MapPin, Search } from 'lucide-react';
import { useStore } from '../store.jsx';
import { CATEGORIAS, COMERCIOS, categoriaPorId } from '../data.js';
import { Estrelas, Icone, TopBar } from '../components/ui.jsx';

export function CardComercio({ c }) {
  const { favoritos, alternarFavorito } = useStore();
  const cat = categoriaPorId(c.categoria);
  const fav = favoritos.includes(c.id);
  return (
    <div className="comercio-card">
      <Link to={`/guia/${c.id}`} className="comercio-link">
        <span className="comercio-capa" style={{ background: `linear-gradient(135deg, ${cat.cor}, ${cat.cor}B3)` }}>
          <Icone nome={cat.icone} size={26} color="#fff" />
        </span>
        <div className="comercio-info">
          <strong>{c.nome}</strong>
          <span className="small muted">{cat.nome} · <Estrelas nota={c.nota} /> ({c.avaliacoes})</span>
          <span className="small muted"><MapPin size={12} /> {c.distancia.toString().replace('.', ',')} km · <b className={c.abertoAgora ? 'verde' : 'vermelho'}>{c.abertoAgora ? 'Aberto' : 'Fechado'}</b></span>
          <span className="tag-destaque">{c.destaque}</span>
        </div>
      </Link>
      <button className={`fav ${fav ? 'on' : ''}`} onClick={() => alternarFavorito(c.id)} aria-label={fav ? 'Remover dos favoritos' : 'Favoritar'}>
        <Heart size={20} fill={fav ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}

export default function Guia() {
  const [params, setParams] = useSearchParams();
  const [busca, setBusca] = useState('');
  const cat = params.get('cat') || '';

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return COMERCIOS
      .filter(c => !cat || c.categoria === cat)
      .filter(c => !q || `${c.nome} ${c.descricao} ${c.destaque}`.toLowerCase().includes(q))
      .sort((a, b) => a.distancia - b.distancia);
  }, [busca, cat]);

  return (
    <div className="tela">
      <TopBar titulo="Guia de Bairro" voltarPara="/" />
      <div className="busca">
        <Search size={18} />
        <input placeholder="Buscar comércio, serviço ou produto" value={busca} onChange={e => setBusca(e.target.value)} />
      </div>
      <div className="chips">
        <button className={!cat ? 'on' : ''} onClick={() => setParams({})}>Todos</button>
        {CATEGORIAS.map(c => (
          <button key={c.id} className={cat === c.id ? 'on' : ''} onClick={() => setParams({ cat: c.id })}>
            <Icone nome={c.icone} size={15} /> {c.nome}
          </button>
        ))}
      </div>
      <p className="contagem">{lista.length} {lista.length === 1 ? 'comércio' : 'comércios'} perto de você</p>
      <div className="lista">
        {lista.map(c => <CardComercio key={c.id} c={c} />)}
        {lista.length === 0 && <p className="vazio">Nada encontrado para “{busca}”.</p>}
      </div>
    </div>
  );
}
