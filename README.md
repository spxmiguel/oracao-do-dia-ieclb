# ⛪ Oração do Dia - Devocional Digital

Este é um projeto front-end de altíssimo nível, combinando uma estética editorial clássica de "Santuário Digital" com tecnologia moderna para criar um devocional diário impecável. O aplicativo adapta-se automaticamente ao fuso horário do usuário para exibir orações correspondentes ao período atual (Madrugada, Manhã, Tarde ou Noite), inspiradas em reflexões de fé, graça e acolhimento.

O projeto é hospedado **100% no lado do cliente** via **GitHub Pages**, rodando de forma extremamente veloz, sem dependências pesadas, sem rastreadores e sem complexidades de banco de dados no servidor.

---

## ✨ Funcionalidades Principais

*   **📖 Estética de Santuário Digital**: Design inspirado em livros litúrgicos clássicos de couro e papel texturizado. Inclui:
    *   Molduras internas recortadas e texturas táteis sutis (overlay de ruído analógico).
    *   Tipografia elegante usando as fontes *Cinzel* (títulos clássicos), *Alegreya* (leitura confortável com Letra Capitular/Drop Cap) e *Outfit* (elementos de controle modernos).
    *   Divisores geométricos e de estrelas (`✦`), além de ícones SVG estilizados e responsivos para cada momento sagrado.
*   **🕒 Detecção Automática de Período**: O sistema ajusta a paleta de cores litúrgica e as orações com base na hora local:
    *   `00:00 - 04:59` → Madrugada (🌌 - Tons violeta profundo e estrelas)
    *   `05:00 - 11:59` → Manhã (🌅 - Tons aurorais dourados e rosados)
    *   `12:00 - 17:59` → Tarde (☀️ - Tons azuis celestes e quentes)
    *   `18:00 - 23:59` → Noite (🌙 - Tons azul marinho e luar)
*   **🎲 Motor de Orações Combinatório (Offline & Instantâneo)**: 
    Para evitar repetições excessivas sem sobrecarregar o peso do aplicativo, as orações locais são geradas por um motor combinatório inteligente que divide a oração em 5 partes teológicas (Invocação, Ação de Graças, Reflexão, Intercessão e Bênção/Amém). 
    *   Com 6 variações ricas escritas para cada parte, o sistema gera **$6^5 = 7.776$ combinações exclusivas por período do dia**, resultando em **31.104 orações possíveis** carregadas instantaneamente (0ms de atraso).
*   **🤖 Inteligência Artificial sob Demanda (Gemini 2.5 Flash)**:
    Integração opcional para gerar orações personalizadas em tempo real com base no sentimento atual selecionado pelo usuário (Grato, Cansado, Ansioso, etc.). A geração por IA é acionada manualmente através do botão **"Gerar com IA"** para economizar dados e evitar esperas desnecessárias no primeiro carregamento.
*   **🔊 Narração Inteligente (Text-to-Speech)**:
    Player de voz integrado que lê a oração usando a API nativa do navegador (`SpeechSynthesisUtterance`). O leitor foi configurado com filtros que removem tags de formatação e evitam a leitura robótica de elementos de interface (como títulos de botões ou metadados).
*   **📱 Responsividade & Acessibilidade Premium**:
    Suporte a telas sensíveis ao toque, navegação facilitada por teclado, contrastes rigorosos e micro-transições suaves nas interações com botões.
*   **🎙️ Integração com Alexa**:
    Inclui recursos prontos na pasta `alexa-skill` para criar uma Skill de devocional personalizada para dispositivos Echo.

---

## 🛠️ Segurança e Privacidade da Chave da API

Como o aplicativo é hospedado de forma estática no GitHub Pages, implementamos mecanismos para garantir a máxima segurança dos usuários:

1.  **Local Storage Criptografado/Mascarado**: A chave de API do Gemini inserida pelo usuário é armazenada apenas em seu próprio navegador (`localStorage`).
2.  **Visual Seguro**: Na interface de configurações, a chave é permanentemente mascarada (`••••••••••••••••••••`) para evitar exposição acidental da tela (shoulder surfing).
3.  **Requisições Diretas**: A comunicação ocorre diretamente entre o navegador do usuário e os servidores de segurança da API do Google, sem intermediários.

---

## 📁 Estrutura do Projeto

```
oracao-do-dia-ieclb/
├── index.html        # Estrutura semântica HTML5 com overlays e modal de configurações
├── style.css         # Design System, variáveis HSL por período, texturas e animações
├── app.js            # Motor combinatório local, controle de áudio TTS, integração Gemini e manipulação do DOM
├── README.md         # Este guia do desenvolvedor
└── alexa-skill/      # Diretório da skill Alexa-Hosted
    ├── index.js
    ├── package.json
    ├── model.json
    └── README.md
```

---

## 🚀 Como Executar e Hospedar

### Rodar Localmente
Basta abrir o arquivo `index.html` em qualquer navegador moderno. Como o projeto usa JS puro e requisições HTTP padrão, não é necessária nenhuma etapa de compilação ou build.

### Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie os arquivos do projeto para o repositório (`git push`).
3. Vá em **Settings** > **Pages** no repositório.
4. Sob **Build and deployment**, selecione a branch `main` e a pasta raiz `/ (root)`.
5. Clique em salvar. Em instantes o site estará público no seu domínio do GitHub Pages (ex: `https://seu-usuario.github.io/oracao-do-dia-ieclb/`).
