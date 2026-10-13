import { Link, useParams } from 'react-router-dom';
import { Clock, Heart, MapPin, MessageCircle, Navigation, Phone, Share2, Tag } from 'lucide-react';
import { useStore } from '../store.jsx';
import { BENEFICIOS_CLUBE, CUPONS, FIDELIDADE, categoriaPorId, comercioPorId } from '../data.js';
import { Estrelas, Icone, TopBar } from '../components/ui.jsx';

export default function Comercio() {
  const { id } = useParams();
  const { favoritos, alternarFavorito, avisar, carimbos } = useStore();
  const c = comercioPorId(id);
  if (!c) return <div className="tela"><TopBar titulo="Comércio" /><p className="vazio">Comércio não encontrado.</p></div>;

  const cat = categoriaPorId(c.categoria);
  const fav = favoritos.includes(c.id);
  const cupons = CUPONS.filter(x => x.comercio === c.id);
  const cartao = FIDELIDADE.find(f => f.comercio === c.id);
  const beneficio = BENEFICIOS_CLUBE.find(b => b.comercio === c.id);
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.endereco}, Linhares - ES`)}`;

  const compartilhar = async () => {
    const texto = `${c.nome} no Valeu+: ${c.destaque}`;
    try {
      if (navigator.share) await navigator.share({ title: c.nome, text: texto });
      else { await navigator.clipboard.writeText(texto); avisar('Link copiado!'); }
    } catch { /* cancelado */ }
  };

  return (
    <div className="tela sem-padding">
      <div className="capa" style={{ background: `linear-gradient(135deg, ${cat.cor}, #0B3FB3)` }}>
        <TopBar titulo="" acao={(
          <>
            <button className="icon-btn" onClick={compartilhar} aria-label="Compartilhar"><Share2 size={20} /></button>
            <button className={`icon-btn ${fav ? 'fav-on' : ''}`} onClick={() => { alternarFavorito(c.id); avisar(fav ? 'Removido dos favoritos' : 'Adicionado aos favoritos'); }} aria-label="Favoritar">
              <Heart size={22} fill={fav ? 'currentColor' : 'none'} />
            </button>
          </>
        )} />
        <span className="capa-icone"><Icone nome={cat.icone} size={56} color="#fff" strokeWidth={1.5} /></span>
      </div>

      <div className="detalhe">
        <span className="pill">{cat.nome}</span>
        <h1>{c.nome}</h1>
        <p className="muted small"><Estrelas nota={c.nota} /> · {c.avaliacoes} avaliações · {c.distancia.toString().replace('.', ',')} km</p>
        <p>{c.descricao}</p>

        <div className="acoes-rapidas">
          <a href={`tel:+55${c.telefone}`}><Phone size={20} /><span>Ligar</span></a>
          <a href={`https://wa.me/55${c.telefone}?text=${encodeURIComponent('Olá! Vi vocês no Valeu+ 😊')}`} target="_blank" rel="noreferrer"><MessageCircle size={20} /><span>WhatsApp</span></a>
          <a href={mapa} target="_blank" rel="noreferrer"><Navigation size={20} /><span>Rota</span></a>
        </div>

        <ul className="info-lista">
          <li><MapPin size={18} /> {c.endereco}, Linhares - ES</li>
          <li><Clock size={18} /> {c.horario} · <b className={c.abertoAgora ? 'verde' : 'vermelho'}>{c.abertoAgora ? 'Aberto agora' : 'Fechado agora'}</b></li>
        </ul>

        <div className="destaque-box"><Tag size={18} /> {c.destaque}</div>

        {beneficio && (
          <Link to="/clube" className="beneficio-box">
            <b>Clube Valeu+</b><span>{beneficio.beneficio}</span>
          </Link>
        )}

        {cupons.length > 0 && (
          <>
            <h3 className="sub">Cupons disponíveis</h3>
            {cupons.map(cp => (
              <Link key={cp.id} to="/cupons" className="cupom-mini">
                <span className="cupom-mini-valor">{cp.desconto}</span>
                <span>{cp.titulo}</span>
              </Link>
            ))}
          </>
        )}

        {cartao && (
          <>
            <h3 className="sub">Cartão fidelidade</h3>
            <Link to="/fidelidade" className="cupom-mini">
              <span className="cupom-mini-valor amarelo">{carimbos[cartao.id] || 0}/{cartao.meta}</span>
              <span>Junte {cartao.meta} carimbos e ganhe {cartao.recompensa}</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
