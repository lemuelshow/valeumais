import { useEffect, useRef } from 'react';
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { CircleUserRound, Heart, House, QrCode, Smartphone } from 'lucide-react';
import { StoreProvider } from './store.jsx';
import { Logo, StatusBar } from './components/ui.jsx';
import Home from './screens/Home.jsx';
import Guia from './screens/Guia.jsx';
import Comercio from './screens/Comercio.jsx';
import Clube from './screens/Clube.jsx';
import Fidelidade from './screens/Fidelidade.jsx';
import Cupons from './screens/Cupons.jsx';
import Raspadinha from './screens/Raspadinha.jsx';
import Favoritos from './screens/Favoritos.jsx';
import Conta from './screens/Conta.jsx';
import Notificacoes from './screens/Notificacoes.jsx';

const ABAS = ['/', '/favoritos', '/conta'];

function BottomNav() {
  const { pathname } = useLocation();
  if (!ABAS.includes(pathname)) return null;
  return (
    <nav className="bottomnav">
      <NavLink to="/" end><House size={26} /><span>HOME</span></NavLink>
      <NavLink to="/favoritos"><Heart size={26} /><span>FAVORITO</span></NavLink>
      <NavLink to="/conta"><CircleUserRound size={26} /><span>CONTA</span></NavLink>
    </nav>
  );
}

/** Área rolável do app: volta ao topo a cada troca de tela. */
function Tela() {
  const ref = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { ref.current?.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="app-scroll" ref={ref}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guia" element={<Guia />} />
        <Route path="/guia/:id" element={<Comercio />} />
        <Route path="/clube" element={<Clube />} />
        <Route path="/fidelidade" element={<Fidelidade />} />
        <Route path="/cupons" element={<Cupons />} />
        <Route path="/raspadinha" element={<Raspadinha />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="stage">
        <aside className="stage-info">
          <Logo tamanho={44} />
          <h2>O seu bairro com mais vantagens.</h2>
          <p>Guia de comércios, clube de descontos, cartão fidelidade, cupons e raspadinha digital — tudo em um só app.</p>
          <ul>
            <li><Smartphone size={18} /> Versão web com simulação de celular</li>
            <li><QrCode size={18} /> Cupons e cartões com QR code</li>
          </ul>
          <small>Protótipo navegável · dados de demonstração</small>
        </aside>

        <div className="phone">
          <span className="phone-btn power" />
          <span className="phone-btn vol-up" />
          <span className="phone-btn vol-down" />
          <div className="phone-screen">
            <div className="island" />
            <StoreProvider>
              <StatusBar />
              <Tela />
              <BottomNav />
              <div className="home-indicator" />
            </StoreProvider>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
