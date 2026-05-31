# Primeiros Minutos

PWA cristão mobile-first para começar e terminar o dia com Palavra, oração e reflexão.

## Stack

React 18, TypeScript estrito, Vite, Tailwind CSS, Framer Motion, Lucide React, Firebase Auth, Cloud Firestore, vite-plugin-pwa, localStorage e Web Speech API.

## Funcionalidades

- Onboarding com Google ou modo local sem login.
- Cloud save por conta Google, com migração do progresso local ao entrar depois.
- Escolha entre Evangélico, Católico e Cristão sem religião.
- Perguntas de perfil para personalizar o foco, tom e tamanho da oração.
- Devocional diário curto, com mensagem, versículo e oração.
- Palavra do dia, versículo e oração personalizada em uma rotação anual de 365 dias.
- Diário privado com humor, edição, exclusão e sincronização em nuvem quando conectado.
- Histórico de constância, XP privado, níveis e conquistas.
- Cache local para fallback visual.
- Narração via Web Speech API com voz em português disponível no navegador.
- Lista de espera Premium em breve, sem cobrança.
- PWA instalável e compatível com GitHub Pages.

## Instalação

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Narração

O app usa a Web Speech API do navegador, preferindo uma voz `pt-BR` quando disponível. Não há chave de voz no frontend.

## Firebase

1. Crie um projeto no Firebase.
2. Ative Authentication com Google. Mantenha Email/Password desativado neste MVP.
3. Crie um banco Cloud Firestore em modo production.
4. Copie `.env.example` para `.env` e preencha as variáveis `VITE_FIREBASE_*`.
5. Publique as regras com o arquivo `firestore.rules`.

Este repositório já inclui `.firebaserc` e `firebase.json` apontando para o projeto `primeiros-minutos`. O `.env` local fica fora do Git.

Estrutura usada:

- `users/{uid}/profile/main`
- `users/{uid}/completions/{YYYY-MM-DD}`
- `users/{uid}/journal/{entryId}`
- `premium_waitlist/{uid}`

## GitHub Pages

O build é estático. Para repositórios publicados em subpath, defina:

```bash
VITE_PUBLIC_BASE_PATH=/nome-do-repositorio/
```

Depois rode `npm run build` e publique a pasta `dist`. Este repositório já inclui um workflow em `.github/workflows/deploy.yml` que publica o `dist` no GitHub Pages usando `VITE_PUBLIC_BASE_PATH=/oracao-do-dia/`.

## Rebrand de App Anterior

Este projeto foi preparado para substituir uma aplicação estática anterior: nomes, textos, identidade visual e navegação foram definidos para “Primeiros Minutos”, preservando apenas a compatibilidade técnica com Vite, Firebase Client SDK e GitHub Pages.

## Decisões de Arquitetura

- Sem React Router: navegação por estado interno em `App.tsx`.
- Firebase Client SDK modular, sem backend próprio.
- Firestore com listeners em tempo real e cache em localStorage.
- Conteúdo mockado local com 21 devocionais únicos.
- Biblioteca anual local com 365 entradas: leitura, versículo, mensagem diária e oração personalizada.
- Premium implementado apenas como lista de espera.

## Limitações do MVP

- Sem notificações push agendadas.
- Sem geração dinâmica de conteúdo devocional.
- Não há chave de voz compartilhada no frontend.
- Sem pagamentos, assinatura, checkout, Stripe, Cloud Functions, Apple Login, marketplace ou anúncios.
- O modo offline depende do app já ter sido carregado ao menos uma vez.

## Próximos Passos Possíveis

- Adicionar notificações locais quando viável no ambiente PWA.
- Expandir biblioteca de devocionais estáticos.
- Avaliar áudios próprios estáticos no futuro, caso faça sentido.
- Criar filtros premium do diário quando o produto for lançado.
- Melhorar métricas privadas de constância sem elementos sociais.
