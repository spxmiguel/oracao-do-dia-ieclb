# ⛪ Oração do Dia Luterana - Devocional Digital

Este é um projeto front-end minimalista, moderno e responsivo que funciona como um devocional digital diário. O aplicativo adapta-se automaticamente ao fuso horário local do usuário para exibir orações correspondentes ao período atual (Madrugada, Manhã, Tarde ou Noite) inspiradas na tradição de fé, amor e acolhimento luterana.

O projeto roda **100% no lado do cliente** via **GitHub Pages**, sem dependências externas, sem frameworks e sem complexidades de backend.

---

## ✨ Funcionalidades Principais

*   **🕒 Detecção Automática de Período**: O sistema detecta o horário local do dispositivo do usuário e ajusta a interface:
    *   `00:00 - 04:59` → Madrugada (🌌)
    *   `05:00 - 11:59` → Manhã (🌅)
    *   `12:00 - 17:59` → Tarde (☀️)
    *   `18:00 - 23:59` → Noite (🌙)
*   **🎨 Temas Visuais Dinâmicos**: A interface adota automaticamente um gradiente de cores que representa o período do dia atual com efeito premium de *Glassmorphism* (cartão translúcido desfocado) e fundo de partículas luminosas flutuantes.
*   **🙏 Banco de Orações Local (Offline)**: Inclui um acervo local de **20 orações extensas** (5 por período do dia) escritas com linguagem acolhedora, respeitosa e profunda, abordando temas da teologia luterana como a graça (Sola Gratia), comunhão, cuidado com a criação e justiça.
*   **🤖 Inteligência Artificial Opcional (Gemini API)**: Integração opcional com o modelo **Gemini 1.5 Flash** para geração de orações personalizadas em tempo real com base no sentimento atual selecionado pelo usuário (Grato, Cansado, Ansioso, etc.).
*   **🔊 Leitura por Voz (Text-to-Speech)**: Player de áudio integrado usando a API nativa do navegador (`SpeechSynthesisUtterance`), com controle de velocidade, tom e seleção de voz.
*   **📱 Mobile-First & Acessível**: Design fluido, responsivo e adaptado para celulares, com suporte completo para navegação por teclado e bons contrastes de cores.
*   **🎙️ Integração com Alexa**: Inclui uma pasta com arquivos prontos para criar uma skill gratuita da Alexa (*Alexa-Hosted Skill*) e ouvir suas orações nos dispositivos Echo.

---

## 🛠️ Segurança da Chave da API (Como funciona a IA sem vazar dados)

Como o aplicativo é hospedado de forma estática no GitHub Pages, **não é possível embutir uma chave de API secreta diretamente no código-fonte**, pois qualquer pessoa poderia inspecionar o código e roubá-la.

Para resolver isso, implementamos duas soluções limpas e seguras:

1.  **Local Storage (Padrão)**: O usuário cola sua chave de API do Gemini no painel de configurações. Essa chave é salva **apenas no navegador dele** (`localStorage`) e as requisições partem direto do cliente para a API do Google, garantindo privacidade e segurança absoluta de dados.
2.  **Restrição por Domínio (Para uso público amplo)**: Se você deseja que qualquer visitante do seu site use a IA sem precisar digitar uma chave, você pode criar uma chave no Google Cloud Console e **restringi-la para aceitar requisições vindas apenas do seu domínio** (ex: `https://seu-usuario.github.io/*`). Dessa forma, mesmo que alguém copie a chave do código-fonte, ela não funcionará em nenhum outro site ou aplicativo, protegendo sua cota de uso.

---

## 📁 Estrutura de Arquivos

```
oracao-do-dia-ieclb/
├── index.html        # Estrutura semântica e modal de configurações
├── style.css         # Variáveis de temas por período, CSS Grid, partículas e modal
├── app.js            # Lógica de períodos, banco de orações, TTS e chamada de API Gemini
├── README.md         # Este guia
└── alexa-skill/      # Modelos e códigos para integração com assistente Alexa
    ├── index.js
    ├── package.json
    ├── model.json
    └── README.md
```

---

## 🚀 Como Executar e Implantar

### Executar Localmente
Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não há necessidade de servidores locais ou compilação.

### Como Hospedar no GitHub Pages
1. Crie um repositório público no GitHub.
2. Faça o push dos arquivos do projeto para o repositório.
3. Acesse as **Settings (Configurações)** do repositório no GitHub.
4. Vá em **Pages** no menu lateral esquerdo.
5. Em *Build and deployment*, selecione a branch `main` e a pasta `/ (root)`.
6. Salve. Em poucos instantes o GitHub fornecerá o link público do seu aplicativo devocional!
