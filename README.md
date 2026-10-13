# Valeu+

Protótipo web do app **Valeu+** — guia de comércios do bairro, clube de descontos, cartão fidelidade, cupons e raspadinha digital. No computador, o app aparece dentro de um celular simulado; no celular, abre em tela cheia.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5175
```

Build estático: `npm run build` (gera `dist/`, pode ser publicado em qualquer hospedagem estática — usa rotas com `#`, sem configuração de servidor).

## Telas

- **Home** — saudação, notificações, carrossel de banners, seletor de endereço e atalhos
- **Guia de Bairro** — busca, categorias, lista por distância e página do comércio (ligar, WhatsApp, rota, cupons, fidelidade)
- **Clube Valeu+** — cartão virtual de membro com QR, plano e benefícios dos parceiros
- **Cartão Fidelidade** — carimbos por comércio, QR para carimbar e resgate de recompensas
- **Cupons de Desconto** — pegar cupom, usar com QR/código, filtros (disponíveis, meus, usados)
- **Raspadinha Digital** — raspe com o dedo/mouse, 1 por dia, prêmios dos parceiros
- **Favoritos**, **Conta** (editar perfil) e **Notificações**

Os dados são de demonstração (`src/data.js`) e o progresso do usuário fica salvo no navegador (localStorage).
