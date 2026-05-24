/**
 * Oração do Dia Luterana - Lógica da Aplicação (Versão 2.1 com IA & Alexa)
 * Roda 100% no lado do cliente, sem backend ou dependências externas.
 */

// 1. BANCO DE ORAÇÕES COMBINATÓRIO LOCAL (Garante frescor e mais de 7.000 orações únicas por período)
const combinatorialDatabase = {
    madrugada: {
        titles: [
            "Silêncio e Proteção",
            "Entrega e Confiança",
            "Luz na Quietude",
            "Sossego para a Alma",
            "Refúgio na Escuridão",
            "Paz sob as Estrelas"
        ],
        invocations: [
            "Amado Deus, na quietude e no silêncio desta madrugada, quando o mundo parece pausar, eu me coloco diante de Ti.",
            "Senhor da Vida, nesta hora silenciosa em que o sono se afasta, elevo meu coração e meus pensamentos ao Teu encontro.",
            "Deus de amor e compaixão, que velas por nós na escuridão da noite assim como nos guias sob a luz do dia, eu Te busco agora.",
            "Pai de misericórdia, no recolhimento deste momento, encontro paz para respirar e me entregar à Tua santa presença.",
            "Eterno Deus, cuja presença é consolo para as almas inquietas, ouve a minha prece sussurrada no silêncio do meu quarto.",
            "Deus compassivo, na calma desta madrugada, afasto as distrações do mundo para descansar sob a Tua soberana graça."
        ],
        thanksgivings: [
            "Agradeço-Te porque a Tua fidelidade nunca dorme e porque o Teu amor constante afasta toda a minha solidão.",
            "Louvo-Te por seres o meu abrigo seguro e por envolveres a minha vida em um abraço de paz e acolhimento.",
            "Sou grato por Teu cuidado invisível, que me sustenta e me protege mesmo nos momentos em que me sinto frágil.",
            "Te bendigo pela dádiva da fé, que ilumina as horas mais escuras e me assegura que nunca estou desamparado.",
            "Agradeço pelo ar que respiro, pela certeza do Teu perdão gratuito e pela promessa de que a Tua misericórdia se renova.",
            "Celebro a Tua bondade eterna, que acalma as tempestades da mente e traz sossego ao meu ser cansado."
        ],
        reflections: [
            "Trago a Ti as minhas preocupações com o futuro e o cansaço que pesa em meu corpo, sabendo que me conheces por inteiro.",
            "Coloco sob a Tua guarda os meus medos ocultos, as dúvidas que tiram o meu sono e as angústias da minha alma.",
            "Ensina-me a aceitar as minhas limitações humanas e a descansar na certeza de que a Tua maravilhosa graça me basta.",
            "Ajuda-me a silenciar as vozes das cobranças diárias e a render o controle de todas as coisas em Tuas mãos fiéis.",
            "Que a Tua Palavra seja a lâmpada que guia os meus pés e a âncora que estabiliza o meu espírito na incerteza.",
            "Derrama sobre mim aquela paz profunda que excede todo o entendimento humano e que guarda os nossos corações."
        ],
        intercessions: [
            "Intercedo pelos que sofrem nos hospitais, pelos que trabalham na calada da noite e por quem não tem um teto para repousar.",
            "Lembro-me dos doentes, dos solitários e dos que choram no silêncio. Que o Teu Espírito sopre alívio sobre eles.",
            "Guarda a minha família, abençoa os meus amigos e que a nossa comunidade de fé seja sempre um canal de auxílio mútuo.",
            "Protege os que enfrentam a dor física ou a depressão nestas horas tardias. Que sintam que não estão sozinhos.",
            "Abençoa os profissionais de saúde e segurança que vigiam por nós. Que a Tua mão protetora os guarde de todo mal.",
            "Leva consolo aos corações aflitos que perderam a esperança, mostrando a eles a luz de um novo amanhecer."
        ],
        closings: [
            "Concede-me um repouso tranquilo sob a Tua guarda fiel, para que eu acorde restaurado para servir. Amém.",
            "Fecho os olhos em paz, confiando na Tua promessa de amor eterno e salvação gratuita. Amém.",
            "Que o Teu Santo Espírito me envolva em paz e prepare o meu corpo para viver com alegria. Amém.",
            "Descanso em Ti, sabendo que o meu amanhã está seguro sob a Tua bondosa providência. Amém.",
            "Guarda a minha mente e dá-me sonhos serenos na certeza do Teu cuidado inabalável. Amém.",
            "Em nome de Jesus Cristo, meu Redentor, entrego a minha vida e a minha noite em Tuas mãos. Amém."
        ]
    },
    manha: {
        titles: [
            "Gratidão pelo Amanhecer",
            "Caminho de Fé e Ação",
            "Serviço e Comunhão",
            "Fortaleza Diária",
            "Renovação e Esperança",
            "Despertar na Graça"
        ],
        invocations: [
            "Senhor Deus, Criador do céu e da terra, agradeço-Te por esta manhã e pelo sopro de vida que me concedes hoje.",
            "Deus da Vida, ao iniciar esta jornada, coloco-me diante de Ti pedindo que ilumines a minha mente e os meus passos.",
            "Pai Celeste, inspirado pela fé de que a Tua graça nos liberta, desperto para viver este dia sob a Tua orientação.",
            "Eterno Deus, cuja misericórdia brilha como a luz do sol nascente, eu Te busco com esperança e alegria nesta manhã.",
            "Amado Pai, no frescor deste novo amanhecer, elevo minha voz em oração para consagrar a Ti cada uma das minhas horas.",
            "Senhor, que em Jesus Cristo nos revelaste o Teu amor paternal, acolhe minha prece de gratidão ao abrir os olhos hoje."
        ],
        thanksgivings: [
            "Cada novo dia é um testemunho do Teu amor constante e da Tua compaixão que nunca falha conosco.",
            "Agradeço pelas oportunidades de aprendizado, pelas relações de afeto e pela dádiva de poder recomeçar na Tua graça.",
            "Louvo-Te pelo alimento na mesa, pela saúde em meu corpo e pelo privilégio de fazer parte da Tua criação.",
            "Te bendigo porque a fé nos liberta da culpa e do medo, oferecendo-nos diariamente um caminho de paz e esperança.",
            "Obrigado pelo teto que me abriga, pela beleza da natureza que desperta e pela Tua Palavra que me guia.",
            "Sou profundamente grato pela Tua paz que me sustenta e pela certeza de que caminhas lado a lado comigo."
        ],
        reflections: [
            "Dá-me sabedoria para as decisões deste dia, paciência para com os outros e coragem para agir de acordo com a Tua vontade.",
            "Ajuda-me a exercer a minha vocação diária com honestidade, dedicação e alegria, servindo com amor no meu cotidiano.",
            "Livra-me do egoísmo, da pressa que me cega para a necessidade alheia e do desânimo diante das dificuldades.",
            "Que as minhas palavras tragam esperança, que as minhas ações reflitam a Tua justiça e que eu viva com humildade.",
            "Dá-me discernimento para não me calar diante da injustiça e um espírito pronto para perdoar e reconciliar.",
            "Fortalece a minha fé para que eu não me sobrecarregue com ansiedades, lembrando que a Tua graça me basta."
        ],
        intercessions: [
            "Abençoa o meu trabalho, os meus estudos e as relações com meus familiares, colegas e amigos no dia de hoje.",
            "Olha por aqueles que começam o dia preocupados com o desemprego, com a escassez ou com a falta de saúde.",
            "Pedimos que abençoes a nossa comunidade, a nossa Igreja e todos os que trabalham pela dignidade e justiça social.",
            "Dá força aos necessitados, ampara os que se sentem sós e faz de nós instrumentos ativos do Teu acolhimento.",
            "Guarda os enfermos, protege as crianças e que a paz de Cristo reine em todos os lares e sociedades.",
            "Lembramos dos governantes: dá-lhes sabedoria para promover a justiça social, o cuidado com a criação e a paz."
        ],
        closings: [
            "Caminho seguro na certeza de que Tu guias os meus passos e sustentas a minha vida. Amém.",
            "Que o meu dia seja um testemunho vivo do Teu amor na comunhão com meus irmãos e irmãs. Amém.",
            "Entrego este dia em Tuas mãos, pronto para servir sob a bênção do Teu Santo Espírito. Amém.",
            "Que a Tua Palavra seja a minha direção e o Teu amor o meu escudo nas tarefas de hoje. Amém.",
            "Concede-me ânimo e alegria para realizar o meu dever com amor e fidelidade a Ti. Amém.",
            "Em nome de Cristo Jesus, nosso Senhor e Salvador, sob a Tua eterna e santa guarda. Amém."
        ]
    },
    tarde: {
        titles: [
            "Sossego na Jornada",
            "Paciência e Acolhimento",
            "Fidelidade no Trabalho",
            "Presença no Cotidiano",
            "Justiça e Diálogo",
            "Força no Cansaço"
        ],
        invocations: [
            "Deus compassivo, no meio da correria e das tarefas desta tarde, faço uma pausa para buscar a Tua presença calma.",
            "Senhor Deus, na metade desta jornada diária, recorro a Ti para reencontrar o meu equilíbrio e a minha paz.",
            "Pai de amor, que nos dás vigor para o trabalho, elevo a Ti o meu coração neste momento de descanso da tarde.",
            "Deus da graça, que nos chamas a ser sal e luz no mundo, renova as minhas energias físicas e mentais agora.",
            "Amado Deus, na transição destas horas de trabalho, busco o Teu silêncio interior para acalmar os meus pensamentos.",
            "Senhor, que caminhas conosco em todos os afazeres da vida, ouve a minha oração no meio desta tarde."
        ],
        thanksgivings: [
            "Agradeço-Te pelas tarefas concluídas até aqui e pelo sustento que nos dás através do nosso esforço diário.",
            "Louvo-Te porque mesmo no meio da agitação, a Tua presença silenciosa e acolhedora nos traz paz.",
            "Obrigado pelas pessoas que compartilham esta jornada comigo e pelos momentos de cooperação e solidariedade.",
            "Sou grato por Tua providência fiel, que nunca nos deixa faltar o pão e nos dá ânimo para continuar.",
            "Bendigo-Te pela oportunidade de servir ao próximo através do meu trabalho, dos estudos ou dos afazeres domésticos.",
            "Agradeço porque a Tua graça me sustenta gratuitamente e alivia o peso das minhas obrigações."
        ],
        reflections: [
            "Renova as minhas forças físicas que começam a diminuir e traz clareza para a minha mente nas próximas decisões.",
            "Dá-me paciência para lidar com as diferenças, mansidão nas palavras e generosidade no atendimento ao outro.",
            "Ajuda-me a não focar apenas na produtividade, mas a valorizar as pessoas e a respeitar o tempo de cada uma.",
            "Que a pressa das horas não me impeça de ser gentil e de estender a mão a quem está sobrecarregado ao meu lado.",
            "Ensina-me a ser honesto nas minhas relações de trabalho e a agir com integridade in todas as circunstâncias.",
            "Dá-nos discernimento para dialogar com respeito e amor, derrubando os muros do preconceito e da intolerância."
        ],
        intercessions: [
            "Abençoa todos os trabalhadores que se dedicam com honestidade, garantindo o sustento digno de suas famílias.",
            "Lembro-me dos que buscam trabalho nesta tarde e dos que sofrem com condições laborais injustas ou indignas.",
            "Intercedo pelos marginalizados da nossa sociedade e pelos que lutam pela justiça climática, social e econômica.",
            "Protege os idosos, conforta os que sentem dores físicas e dá paciência aos cuidadores de enfermos neste momento.",
            "Abençoa as escolas, as universidades e os locais de trabalho para que sejam espaços de crescimento e paz.",
            "Pedimos pela união das famílias e pela superação de qualquer conflito ou desentendimento em nossos ambientes."
        ],
        closings: [
            "Que a Tua paz, que ultrapassa a nossa compreensão, guarde a minha mente no restante deste dia. Amém.",
            "Sigo em frente com foi, sabendo que a Tua mão segura a minha e me fortalece. Amém.",
            "Que eu possa testemunhar o Teu amor em cada pequena ação e palavra nesta tarde. Amém.",
            "Concluo as minhas tarefas com gratidão, descansando na Tua promessa de salvação e graça. Amém.",
            "Abençoa as horas que restam desta jornada e faz-me um canal de paz na vida de alguém. Amém.",
            "Em nome de Cristo Jesus, cuja graça nos reconcilia e nos envia a servir com amor. Amém."
        ]
    },
    noite: {
        titles: [
            "Gratidão e Descanso",
            "Misericórdia e Perdão",
            "Proteção para o Lar",
            "Confiança e Entrega",
            "Consolo para o Mundo",
            "Quietude na Graça"
        ],
        invocations: [
            "Deus bondoso, o dia chega ao fim e a escuridão da noite nos convida ao descanso, ao recolhimento e à paz.",
            "Senhor Deus, ao findar deste dia, coloco-me sob a Tua sombra protetora para refletir e descansar em Ti.",
            "Pai Celeste, que velas pelo Teu povo sem cessar, venho a Ti nesta noite entregar as minhas fadigas e preces.",
            "Deus de amor e consolação, que nos concedes a noite para o repouso do corpo e da alma, escuta a minha voz.",
            "Amado Pai, no silêncio do meu lar, desligo-me das inquietações do mundo para repousar sob o Teu cuidado.",
            "Senhor, cuja misericórdia nos sustenta tanto na luz do dia quanto no repouso noturno, acolhe a minha entrega."
        ],
        thanksgivings: [
            "Agradeço pelas bênçãos recebidas hoje, pelas tarefas concluídas e pelos encontros sinceros com as pessoas.",
            "Louvo-Te porque a Tua graça nos perdoa e nos oferece diariamente um recomeço livre de culpa e condenação.",
            "Obrigado pelo alimento na mesa, pela paz em meu lar e pela certeza de que o Teu amor nunca me abandona.",
            "Bendigo-Te por teres guardado os meus passos e por teres sido o meu refúgio seguro em meio às tensões.",
            "Agradeço pela Tua Palavra que me conforta e pela comunhão com irmãos e irmãs que fortalece a minha fé.",
            "Sou grato por Tua presença que traz sossego ao meu coração e afasta os medos que tentam me perturbar."
        ],
        reflections: [
            "Reconheço as minhas falhas deste dia: as palavras impacientes que proferi e as oportunidades de fazer o bem que perdi.",
            "Peço Teu perdão misericordioso e ajuda para liberar o meu coração de qualquer ressentimento ou mágoa.",
            "Entrego a Ti as tarefas pendentes, os planos que não se realizaram e a ansiedade sobre o dia de amanhã.",
            "Ensina-me a aceitar que o controle de tudo pertence a Ti e que posso deitar a cabeça em paz no meu travesseiro.",
            "Que a Tua paz reine em meu lar, afastando os medos, os pesadelos e as preocupações que perturbam o sono.",
            "Concede-me a serenidade para perdoar a quem me ofendeu, dormindo com a alma leve sob a Tua graça."
        ],
        intercessions: [
            "Protege a minha família, os meus vizinhos e todos os que se preparam para dormir nesta noite em nossa cidade.",
            "Intercedo pelos que sofrem no leito de dor, pelos solitários e pelos que não conseguem dormir devido à ansiedade.",
            "Guarda os trabalhadores noturnos, protege os desabrigados e que a Tua Igreja seja uma presença ativa de amparo.",
            "Olha pelos que sofrem a dor do luto, conforta as almas angustiadas e dá-lhes a esperança da ressurreição.",
            "Pedimos que a paz se estabeleça nas nações em guerra e que as famílias separadas encontrem amparo e união.",
            "Abençoa as crianças e os idosos nesta noite. Que todos desfrutem de segurança e sono revigorante."
        ],
        closings: [
            "Concede-me um sono tranquilo e seguro, para acordar amanhã renovado e pronto para servir com alegria. Amém.",
            "Descanso em Tua graça, confiando que o amanhã trará novas oportunidades de testemunhar o Teu amor. Amém.",
            "Que o Teu Santo Espírito guarde os meus pensamentos e me dê sonhos serenos sob a Tua proteção. Amém.",
            "Entrego o meu espírito em Tuas mãos, na certeza de que a Tua misericórdia incalculável me basta. Amém.",
            "Durmo em paz sob o Teu olhar amoroso e protetor, sabendo que me sustentas com fidelidade. Amém.",
            "Em nome de Cristo Jesus, meu Salvador e Senhor, na esperança de um novo dia abençoado por Ti. Amém."
        ]
    }
};

// Algoritmo Combinatório para gerar orações teológicas locais
function generateLocalCombinatorialPrayer(period) {
    const database = combinatorialDatabase[period];
    if (!database) return null;
    
    const part1 = database.invocations[Math.floor(Math.random() * database.invocations.length)];
    const part2 = database.thanksgivings[Math.floor(Math.random() * database.thanksgivings.length)];
    const part3 = database.reflections[Math.floor(Math.random() * database.reflections.length)];
    const part4 = database.intercessions[Math.floor(Math.random() * database.intercessions.length)];
    const part5 = database.closings[Math.floor(Math.random() * database.closings.length)];
    
    const title = database.titles[Math.floor(Math.random() * database.titles.length)];
    const text = `${part1} ${part2}\n\n${part3} ${part4}\n\n${part5}`;
    
    return { title, text };
}

// 2. ESTADOS DA APLICAÇÃO
let currentHour = 'auto'; // 'auto' ou número 0-23
let currentPeriod = '';   // 'madrugada', 'manha', 'tarde', 'noite'
let currentPrayer = null; // { title: string, text: string }
let lastPrayerIndex = -1; // Evita repetir a mesma oração consecutivamente
let themeMode = 'auto';    // 'auto' (usa o período) ou 'light' (modo claro sepia)
let devTriggerClicks = 0;  // Clicks para revelar painel dev

// CONFIGURAÇÕES DO USUÁRIO & CHAVE EMBUTIDA (Opção 1)
const EMBEDDED_KEY_B64 = 'QUl6YVN5RDBjOXJhek1lOGFlR09vUkRuV3hqMzhpeGdVZEZqYTdz'; 
const KEY_MASK = '••••••••••••••••••••';

let geminiApiKey = localStorage.getItem('oracao-gemini-key') || 
                   (EMBEDDED_KEY_B64 ? atob(EMBEDDED_KEY_B64) : '');
let selectedMood = localStorage.getItem('oracao-selected-mood') || 'default';
let audioEngine = localStorage.getItem('oracao-audio-engine') || 'native'; // 'native' ou 'google'
let voiceRate = parseFloat(localStorage.getItem('oracao-voice-rate')) || 0.9;
let voicePitch = parseFloat(localStorage.getItem('oracao-voice-pitch')) || 1.0;
let selectedVoiceName = localStorage.getItem('oracao-voice-name') || '';

// Síntese de voz (TTS)
let speechUtterance = null;
let isSpeaking = false;
let voices = [];

// 3. SELETORES DOM
const bodyEl = document.body;
const periodBadgeEl = document.getElementById('period-badge');
const aiActiveIndicator = document.getElementById('ai-active-indicator');
const prayerCard = document.getElementById('prayer-card');
const prayerTitleEl = document.getElementById('prayer-title');
const prayerTextEl = document.getElementById('prayer-text');

// Header buttons
const logoDevTrigger = document.getElementById('logo-dev-trigger');
const btnSettingsToggle = document.getElementById('btn-settings-toggle');
const btnThemeToggle = document.getElementById('btn-theme-toggle');

// Main buttons
const btnNewPrayer = document.getElementById('btn-new-prayer');
const btnNewText = document.getElementById('btn-new-text');
const btnSpeakPrayer = document.getElementById('btn-speak-prayer');
const btnSpeakText = document.getElementById('btn-speak-text');
const btnAiPrayer = document.getElementById('btn-ai-prayer');
const btnAiText = document.getElementById('btn-ai-text');
const ttsContainer = document.getElementById('tts-container');

// Panels & Modals
const devSimulatorPanel = document.getElementById('dev-simulator-panel');
const simulatorButtons = document.querySelectorAll('.btn-sim');
const settingsModal = document.getElementById('settings-modal');
const btnCloseSettings = document.getElementById('btn-close-settings');
const btnSaveSettings = document.getElementById('btn-save-settings');

// Modal Form Inputs
const inputApiKey = document.getElementById('input-api-key');
const selectMood = document.getElementById('select-mood');
const selectAudioEngine = document.getElementById('select-audio-engine');
const voiceSelectContainer = document.getElementById('voice-select-container');
const voiceParamsRow = document.querySelector('.modal-body .input-row');
const apiStatusBadge = document.getElementById('api-status-badge');
const btnTestApi = document.getElementById('btn-test-api');
const selectVoice = document.getElementById('select-voice');
const inputVoiceRate = document.getElementById('input-voice-rate');
const inputVoicePitch = document.getElementById('input-voice-pitch');
const valVoiceRate = document.getElementById('val-voice-rate');
const valVoicePitch = document.getElementById('val-voice-pitch');
const btnToggleKeyVisibility = document.getElementById('btn-toggle-key-visibility');

// 4. EFEITO DE PARTÍCULAS
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    container.innerHTML = '';
    
    const count = 22;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 2.5 + 1; // Muito pequenas (1px a 3.5px)
        const left = Math.random() * 120 - 20; // Espalha horizontalmente
        const duration = Math.random() * 25 + 20; // Super lentas (20s a 45s)
        const delay = Math.random() * 25; // Distribui a entrada
        const opacity = Math.random() * 0.35 + 0.15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        
        container.appendChild(particle);
    }
}

// 5. LÓGICA DE DETECÇÃO DE HORÁRIO E PERÍODO
function getActualHour() {
    if (currentHour === 'auto') {
        return new Date().getHours();
    }
    return parseInt(currentHour, 10);
}

function determinePeriod(hour) {
    if (hour >= 0 && hour < 5) return 'madrugada';
    if (hour >= 5 && hour < 12) return 'manha';
    if (hour >= 12 && hour < 18) return 'tarde';
    return 'noite';
}

function getPeriodLabel(period) {
    switch (period) {
        case 'madrugada': return "🌌 Oração da Madrugada";
        case 'manha': return "🌅 Oração da Manhã";
        case 'tarde': return "☀️ Oração da Tarde";
        case 'noite': return "🌙 Oração da Noite";
        default: return "🙏 Oração do Dia";
    }
}

// 6. ATUALIZAÇÃO DO TEMA VISUAL
function updateTheme() {
    bodyEl.classList.remove('period-madrugada', 'period-manha', 'period-tarde', 'period-noite');
    bodyEl.classList.add(`period-${currentPeriod}`);
    
    if (themeMode === 'light') {
        bodyEl.classList.add('theme-light');
    } else {
        bodyEl.classList.remove('theme-light');
    }
}

// 7. INTEGRAÇÃO GEMINI API (CLIENT-SIDE COM CHAVE DO USUÁRIO)
async function testApiKey(key) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Diga apenas 'OK'" }] }]
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao testar a API Key no Google:", response.status, errorText);
            showToast(`⚠️ Erro na chave: HTTP ${response.status}. Verifique o console (F12) para detalhes.`);
        }
        return response.ok;
    } catch (e) {
        console.error("Erro de rede ao testar chave:", e);
        return false;
    }
}

function updateApiStatusBadge() {
    const userKey = localStorage.getItem('oracao-gemini-key') || '';
    if (userKey) {
        apiStatusBadge.textContent = "Chave Pessoal Ativa ✨";
        apiStatusBadge.className = "status-badge status-online";
        btnTestApi.classList.remove('hidden');
    } else if (EMBEDDED_KEY_B64) {
        apiStatusBadge.textContent = "IA do Sistema Ativa ✨";
        apiStatusBadge.className = "status-badge status-online";
        btnTestApi.classList.add('hidden'); // Oculta botão de teste para a chave do sistema
    } else {
        apiStatusBadge.textContent = "IA Inativa (Usando banco local)";
        apiStatusBadge.className = "status-badge status-offline";
        btnTestApi.classList.add('hidden');
    }
}

function populateApiKeyInput() {
    const userKey = localStorage.getItem('oracao-gemini-key') || '';
    if (userKey) {
        inputApiKey.value = KEY_MASK;
        inputApiKey.placeholder = 'Chave pessoal ativa';
    } else {
        inputApiKey.value = '';
        inputApiKey.placeholder = 'Chave padrão do sistema ativa';
    }
}

async function generateAiPrayer(period, mood) {
    if (!geminiApiKey) return null;
    
    const periodTranslations = {
        madrugada: 'Madrugada (00:00 às 04:59)',
        manha: 'Manhã (05:00 às 11:59)',
        tarde: 'Tarde (12:00 às 17:59)',
        noite: 'Noite (18:00 às 23:59)'
    };
    
    const moodPrompts = {
        default: 'um sentimento de equilíbrio e reflexão geral',
        grato: 'um coração grato por bênçãos recebidas',
        cansado: 'cansaço, sobrecarga física ou mental e necessidade de repouso',
        ansioso: 'ansiedade, inquietações e preocupações com o futuro',
        triste: 'tristeza, luto ou busca por consolo divino',
        fortalecido: 'sentimento de fortalecimento, esperança e disposição para a ação',
        confuso: 'confusão mental e busca por direção e sabedoria nas decisões'
    };
    
    const prompt = `Você é um conselheiro espiritual com foco em empatia e acolhimento cristão. Escreva uma oração em português acolhedora, respeitosa e profunda para o período da ${periodTranslations[period]}.
O sentimento atual de quem está orando é: ${moodPrompts[mood] || moodPrompts.default}.

A oração deve ser centrada no amor, confiança em Deus, comunidade e acolhimento. Evite linguagem excessivamente formal ou arcaica, prefira um tom humano, compassivo e reflexivo. Ela deve ter de 3 a 4 parágrafos (entre 130 e 180 palavras).

IMPORTANTE: Responda estritamente no formato JSON estruturado, sem blocos de código markdown extra (sem aspas triplas de crase \`\`\`json). O JSON deve conter exatamente duas chaves:
"title" (string, o título da oração)
"text" (string, o texto da oração, usando quebras de linha com '\\n' para separar os parágrafos).`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });
        
        if (response.status === 429) {
            throw new Error("LIMIT_EXCEEDED");
        }
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro na API do Gemini:", response.status, errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        const jsonText = data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(jsonText.trim());
        
        if (parsed.title && parsed.text) {
            return parsed;
        }
        throw new Error("Dados de oração incompletos.");
    } catch (e) {
        console.error("Erro ao chamar Gemini API:", e);
        if (e.message === "LIMIT_EXCEEDED") {
            return { error: "LIMIT_EXCEEDED" };
        }
        return null;
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.background = 'var(--card-bg)';
    toast.style.border = '1px solid var(--card-border)';
    toast.style.color = 'var(--text-primary)';
    toast.style.padding = '0.75rem 1.5rem';
    toast.style.borderRadius = '50px';
    toast.style.fontSize = '0.8rem';
    toast.style.fontWeight = '600';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    toast.style.boxShadow = '0 8px 30px var(--shadow-color)';
    toast.style.backdropFilter = 'blur(8px)';
    toast.style.webkitBackdropFilter = 'blur(8px)';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

// 8. RENDERIZAÇÃO DA ORAÇÃO
function displayPrayer(prayer, animate = true) {
    currentPrayer = prayer;
    
    if (animate) {
        prayerTitleEl.classList.add('fade-out');
        prayerTextEl.classList.add('fade-out');
        
        setTimeout(() => {
            periodBadgeEl.textContent = getPeriodLabel(currentPeriod);
            prayerTitleEl.textContent = prayer.title;
            prayerTextEl.textContent = prayer.text;
            
            prayerTitleEl.classList.remove('fade-out');
            prayerTextEl.classList.remove('fade-out');
            prayerTitleEl.classList.add('fade-in');
            prayerTextEl.classList.add('fade-in');
            
            setTimeout(() => {
                prayerTitleEl.classList.remove('fade-in');
                prayerTextEl.classList.remove('fade-in');
            }, 500);
        }, 300);
    } else {
        periodBadgeEl.textContent = getPeriodLabel(currentPeriod);
        prayerTitleEl.textContent = prayer.title;
        prayerTextEl.textContent = prayer.text;
    }
}

async function loadNewPrayer(animate = true, forceAi = false) {
    stopSpeaking();
    
    if (animate) {
        prayerTitleEl.classList.add('fade-out');
        prayerTextEl.classList.add('fade-out');
    }
    
    // Geração por IA só ocorre se for explicitamente forçada (forceAi = true) e a chave existir
    if (forceAi && geminiApiKey) {
        aiActiveIndicator.classList.remove('hidden');
        
        if (btnAiText && btnAiPrayer) {
            btnAiText.textContent = "Gerando...";
            btnAiPrayer.disabled = true;
        }
        
        const aiPrayer = await generateAiPrayer(currentPeriod, selectedMood);
        
        if (btnAiText && btnAiPrayer) {
            btnAiText.textContent = "Gerar com IA";
            btnAiPrayer.disabled = false;
        }
        
        if (aiPrayer && !aiPrayer.error) {
            prayerCard.classList.add('ai-active');
            displayPrayer(aiPrayer, animate);
            return;
        } else {
            // Caso falhe por cota ou conexão
            if (aiPrayer && aiPrayer.error === "LIMIT_EXCEEDED") {
                showToast("✨ Limite de cota da IA atingido. Carregando devocional local!");
            } else {
                showToast("⚠️ Conexão de IA indisponível. Carregando oração local.");
            }
        }
    }
    
    // Carregamento local (Instantâneo e Combinatório)
    aiActiveIndicator.classList.add('hidden');
    prayerCard.classList.remove('ai-active');
    
    const localPrayer = generateLocalCombinatorialPrayer(currentPeriod);
    if (localPrayer) {
        displayPrayer(localPrayer, animate);
    } else {
        // Fallback básico caso algo dê errado
        displayPrayer({
            title: "Paz e Graça",
            text: "Que a paz de Deus esteja com você neste momento de oração."
        }, animate);
    }
}

function syncPeriod(animate = true) {
    const hour = getActualHour();
    const newPeriod = determinePeriod(hour);
    
    if (newPeriod !== currentPeriod) {
        currentPeriod = newPeriod;
        lastPrayerIndex = -1;
        updateTheme();
        loadNewPrayer(animate, false);
    }
}

// 9. MÓDULO SÍNTESE DE VOZ (TTS)
function populateVoiceList() {
    if (!('speechSynthesis' in window)) return;
    voices = window.speechSynthesis.getVoices();
    
    selectVoice.innerHTML = '<option value="default">Voz padrão do navegador</option>';
    
    const ptVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').includes('pt'));
    const ptBRVoices = ptVoices.filter(v => v.lang.toLowerCase().replace('_', '-').includes('pt-br'));
    
    // Se não houver voz selecionada no localStorage, vamos tentar pré-selecionar a melhor voz pt-BR encontrada
    let autoSelectedVoice = selectedVoiceName;
    if (!autoSelectedVoice && ptBRVoices.length > 0) {
        let bestVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('online'));
        if (!bestVoice) bestVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('google'));
        if (!bestVoice) bestVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('siri') || v.name.toLowerCase().includes('premium'));
        if (!bestVoice) bestVoice = ptBRVoices.find(v => !v.name.toLowerCase().includes('desktop'));
        if (!bestVoice) bestVoice = ptBRVoices[0];
        
        if (bestVoice) {
            autoSelectedVoice = bestVoice.name;
        }
    }
    
    ptVoices.forEach(v => {
        const option = document.createElement('option');
        option.value = v.name;
        option.textContent = `${v.name} (${v.lang})`;
        if (v.name === autoSelectedVoice) {
            option.selected = true;
        }
        selectVoice.appendChild(option);
    });
}

if ('speechSynthesis' in window) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = populateVoiceList;
    }
}

// CONTROLES DE ÁUDIO (Google Translate TTS & Web Speech fallback)
let audioQueue = [];
let currentAudioIndex = 0;
let googleAudioPlayer = new Audio();
try {
    googleAudioPlayer.referrerPolicy = "no-referrer";
} catch (e) {
    console.warn("Navegador não suporta referrerPolicy em Audio element", e);
}

function splitTextIntoChunks(text, maxLen) {
    const sentences = text.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [text];
    const chunks = [];
    let currentChunk = "";
    
    for (let sentence of sentences) {
        sentence = sentence.trim();
        if (!sentence) continue;
        
        if ((currentChunk + " " + sentence).length > maxLen) {
            if (currentChunk) {
                chunks.push(currentChunk.trim());
                currentChunk = sentence;
            } else {
                const words = sentence.split(" ");
                for (let word of words) {
                    if ((currentChunk + " " + word).length > maxLen) {
                        chunks.push(currentChunk.trim());
                        currentChunk = word;
                    } else {
                        currentChunk += (currentChunk ? " " : "") + word;
                    }
                }
            }
        } else {
            currentChunk += (currentChunk ? " " : "") + sentence;
        }
    }
    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }
    return chunks;
}

function startSpeaking() {
    if (!currentPrayer) return;
    
    stopSpeaking(); // Limpa reproduções anteriores
    
    const textToSpeak = `${currentPrayer.title}. ${currentPrayer.text}`;
    
    if (audioEngine === 'google') {
        // Tenta usar o motor do Google Translate TTS (voz neural)
        try {
            const chunks = splitTextIntoChunks(textToSpeak, 180);
            audioQueue = chunks.map(chunk => 
                `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-BR&client=tw-ob&q=${encodeURIComponent(chunk)}`
            );
            
            currentAudioIndex = 0;
            isSpeaking = true;
            btnSpeakText.textContent = "Parar Oração";
            ttsContainer.classList.remove('hidden');
            btnSpeakPrayer.classList.add('active');
            
            playNextGoogleChunk();
        } catch (err) {
            console.warn("Falha no Google TTS, usando Web Speech API nativa...", err);
            startNativeSpeaking(textToSpeak);
        }
    } else {
        // Usa o player de áudio nativo (Voz do Sistema)
        startNativeSpeaking(textToSpeak);
    }
}

function playNextGoogleChunk() {
    if (!isSpeaking) return;
    
    if (currentAudioIndex >= audioQueue.length) {
        resetTTSUI();
        return;
    }
    
    googleAudioPlayer.src = audioQueue[currentAudioIndex];
    googleAudioPlayer.play().catch(err => {
        console.warn("Erro de reprodução de áudio, usando fallback nativo...", err);
        const textToSpeak = `${currentPrayer.title}. ${currentPrayer.text}`;
        startNativeSpeaking(textToSpeak);
    });
    
    currentAudioIndex++;
}

googleAudioPlayer.onended = () => {
    playNextGoogleChunk();
};

googleAudioPlayer.onerror = (e) => {
    console.error("Erro no player do Google:", e);
    if (isSpeaking) {
        const textToSpeak = `${currentPrayer.title}. ${currentPrayer.text}`;
        startNativeSpeaking(textToSpeak);
    }
};

// Fala Nativa de Fallback (Web Speech API)
function startNativeSpeaking(text) {
    if (!('speechSynthesis' in window)) {
        resetTTSUI();
        return;
    }
    
    window.speechSynthesis.cancel();
    speechUtterance = new SpeechSynthesisUtterance(text);
    speechUtterance.lang = 'pt-BR';
    speechUtterance.rate = voiceRate;
    speechUtterance.pitch = voicePitch;
    
    if (voices.length > 0) {
        // Se o usuário selecionou uma voz específica na UI, usa ela
        const uiVoiceName = selectVoice.value;
        if (uiVoiceName && uiVoiceName !== 'default') {
            const customVoice = voices.find(v => v.name === uiVoiceName);
            if (customVoice) speechUtterance.voice = customVoice;
        } else {
            // Priorização inteligente de voz padrão em pt-BR de alta qualidade
            const ptVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').includes('pt'));
            const ptBRVoices = ptVoices.filter(v => v.lang.toLowerCase().replace('_', '-').includes('pt-br'));
            
            let chosenVoice = null;
            if (ptBRVoices.length > 0) {
                chosenVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('online'));
                if (!chosenVoice) chosenVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('google'));
                if (!chosenVoice) chosenVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('siri') || v.name.toLowerCase().includes('premium'));
                if (!chosenVoice) chosenVoice = ptBRVoices.find(v => !v.name.toLowerCase().includes('desktop'));
                if (!chosenVoice) chosenVoice = ptBRVoices[0];
            } else if (ptVoices.length > 0) {
                chosenVoice = ptVoices[0];
            }
            
            if (chosenVoice) speechUtterance.voice = chosenVoice;
        }
    }
    
    speechUtterance.onstart = () => {
        isSpeaking = true;
        btnSpeakText.textContent = "Parar Oração";
        ttsContainer.classList.remove('hidden');
        btnSpeakPrayer.classList.add('active');
    };
    
    speechUtterance.onend = () => {
        resetTTSUI();
    };
    
    speechUtterance.onerror = (e) => {
        console.error("Erro na síntese de voz nativa:", e);
        resetTTSUI();
    };
    
    window.speechSynthesis.speak(speechUtterance);
}

function stopSpeaking() {
    isSpeaking = false;
    
    try {
        googleAudioPlayer.pause();
        googleAudioPlayer.src = "";
    } catch (e) {}
    
    audioQueue = [];
    currentAudioIndex = 0;
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    
    resetTTSUI();
}

function resetTTSUI() {
    isSpeaking = false;
    btnSpeakText.textContent = "Ouvir Oração";
    ttsContainer.classList.add('hidden');
    btnSpeakPrayer.classList.remove('active');
    speechUtterance = null;
}

// 10. INICIALIZAÇÃO E LISTENERS
function init() {
    createParticles();
    if ('speechSynthesis' in window) {
        populateVoiceList();
    }
    
    const savedTheme = localStorage.getItem('oracao-theme-mode');
    themeMode = savedTheme === 'light' ? 'light' : 'auto';
    
    // Auxiliar para exibir/ocultar opções da voz nativa
    function toggleAudioEngineUI(engine) {
        if (engine === 'google') {
            voiceSelectContainer.classList.add('hidden');
            voiceParamsRow.classList.add('hidden');
        } else {
            voiceSelectContainer.classList.remove('hidden');
            voiceParamsRow.classList.remove('hidden');
        }
    }
    
    // Carrega configurações no form modal
    selectAudioEngine.value = audioEngine;
    toggleAudioEngineUI(audioEngine);
    
    // NUNCA mostre a chave embutida do sistema no input de texto público, use máscara
    populateApiKeyInput(); 
    selectMood.value = selectedMood;
    inputVoiceRate.value = voiceRate;
    valVoiceRate.textContent = voiceRate + 'x';
    inputVoicePitch.value = voicePitch;
    valVoicePitch.textContent = voicePitch.toFixed(1);
    
    updateApiStatusBadge();
    
    // Sincronização inicial
    syncPeriod(false);
    updateTheme();
    
    // Event Listeners - Controles Principais
    const btnGenerateLanding = document.getElementById('btn-generate-landing');
    if (btnGenerateLanding) {
        btnGenerateLanding.addEventListener('click', () => {
            document.body.classList.add('state-transitioning');
            
            // Inicia o carregamento/geração da oração em paralelo (local por padrão)
            loadNewPrayer(true, false);
            
            // Transição de telas com sobreposição (inicia exibição do app aos 300ms)
            setTimeout(() => {
                document.body.classList.remove('state-landing');
                document.body.classList.add('state-app');
            }, 300);
            
            // Conclui a transição aos 1100ms quando as animações do CSS finalizarem
            setTimeout(() => {
                document.body.classList.remove('state-transitioning');
            }, 1100);
        });
    }

    btnNewPrayer.addEventListener('click', () => {
        const icon = btnNewPrayer.querySelector('.icon-refresh');
        if (icon) {
            icon.classList.add('spin-animation');
            setTimeout(() => icon.classList.remove('spin-animation'), 600);
        }
        loadNewPrayer(true, false);
    });

    if (btnAiPrayer) {
        btnAiPrayer.addEventListener('click', () => {
            loadNewPrayer(true, true);
        });
    }
    
    btnSpeakPrayer.addEventListener('click', () => {
        if (isSpeaking) stopSpeaking();
        else startSpeaking();
    });
    
    btnThemeToggle.addEventListener('click', () => {
        themeMode = themeMode === 'auto' ? 'light' : 'auto';
        localStorage.setItem('oracao-theme-mode', themeMode);
        updateTheme();
    });
    
    // Dev Mode panel (Taps ⛪ 5 times)
    logoDevTrigger.addEventListener('click', () => {
        devTriggerClicks++;
        if (devTriggerClicks >= 5) {
            devSimulatorPanel.classList.toggle('hidden');
            if (!devSimulatorPanel.classList.contains('hidden')) {
                devSimulatorPanel.scrollIntoView({ behavior: 'smooth' });
                showToast("🔧 Modo desenvolvedor ativo.");
            }
            devTriggerClicks = 0;
        }
    });
    
    // Simulator buttons listeners
    simulatorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            simulatorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentHour = btn.getAttribute('data-hour');
            stopSpeaking();
            
            const hour = getActualHour();
            const newPeriod = determinePeriod(hour);
            currentPeriod = newPeriod;
            lastPrayerIndex = -1;
            updateTheme();
            loadNewPrayer(true, false);
        });
    });
    
    // Modais & Configurações listeners
    btnSettingsToggle.addEventListener('click', () => {
        // Mostra apenas chave pessoal mascarada se existir, escondendo a chave real
        populateApiKeyInput();
        selectMood.value = selectedMood;
        selectAudioEngine.value = audioEngine;
        inputVoiceRate.value = voiceRate;
        valVoiceRate.textContent = voiceRate + 'x';
        inputVoicePitch.value = voicePitch;
        valVoicePitch.textContent = voicePitch.toFixed(1);
        
        updateApiStatusBadge();
        populateVoiceList();
        toggleAudioEngineUI(audioEngine);
        
        settingsModal.classList.remove('hidden');
    });
    
    btnCloseSettings.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });
    
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.add('hidden');
        }
    });
    
    btnToggleKeyVisibility.addEventListener('click', () => {
        if (inputApiKey.type === 'password') {
            inputApiKey.type = 'text';
            btnToggleKeyVisibility.textContent = 'Ocultar';
        } else {
            inputApiKey.type = 'password';
            btnToggleKeyVisibility.textContent = 'Mostrar';
        }
    });

    inputApiKey.addEventListener('focus', () => {
        if (inputApiKey.value === KEY_MASK) {
            inputApiKey.value = '';
        }
    });
    
    selectAudioEngine.addEventListener('change', () => {
        toggleAudioEngineUI(selectAudioEngine.value);
    });
    
    inputVoiceRate.addEventListener('input', () => {
        valVoiceRate.textContent = inputVoiceRate.value + 'x';
    });
    inputVoicePitch.addEventListener('input', () => {
        valVoicePitch.textContent = parseFloat(inputVoicePitch.value).toFixed(1);
    });
    
    // Save Configs Button
    btnSaveSettings.addEventListener('click', () => {
        const enteredKey = inputApiKey.value.trim();
        if (enteredKey !== KEY_MASK) {
            if (enteredKey === '') {
                localStorage.removeItem('oracao-gemini-key');
            } else {
                localStorage.setItem('oracao-gemini-key', enteredKey);
            }
            
            // Recalcula chave da API (dá preferência para chave manual do usuário)
            const savedKey = localStorage.getItem('oracao-gemini-key');
            geminiApiKey = savedKey || (EMBEDDED_KEY_B64 ? atob(EMBEDDED_KEY_B64) : '');
        }
        
        selectedMood = selectMood.value;
        audioEngine = selectAudioEngine.value;
        voiceRate = parseFloat(inputVoiceRate.value);
        voicePitch = parseFloat(inputVoicePitch.value);
        selectedVoiceName = selectVoice.value;
        
        localStorage.setItem('oracao-selected-mood', selectedMood);
        localStorage.setItem('oracao-audio-engine', audioEngine);
        localStorage.setItem('oracao-voice-rate', voiceRate);
        localStorage.setItem('oracao-voice-pitch', voicePitch);
        localStorage.setItem('oracao-voice-name', selectedVoiceName);
        
        settingsModal.classList.add('hidden');
        stopSpeaking();
        
        showToast("💾 Configurações salvas.");
        loadNewPrayer(true, false);
    });
    
    // Test API Connection Button
    btnTestApi.addEventListener('click', async () => {
        let testKey = inputApiKey.value.trim();
        if (testKey === KEY_MASK) {
            testKey = localStorage.getItem('oracao-gemini-key') || '';
        }
        if (!testKey) return;
        
        apiStatusBadge.textContent = "Verificando...";
        apiStatusBadge.className = "status-badge status-testing";
        btnTestApi.disabled = true;
        
        const ok = await testApiKey(testKey);
        btnTestApi.disabled = false;
        
        if (ok) {
            apiStatusBadge.textContent = "Conexão Ativa! ✨";
            apiStatusBadge.className = "status-badge status-online";
            showToast("✅ Chave da Gemini API validada com sucesso!");
        } else {
            apiStatusBadge.textContent = "Chave Inválida/Erro";
            apiStatusBadge.className = "status-badge status-offline";
            showToast("❌ Falha na conexão. Verifique sua chave da API.");
        }
    });
    
    setInterval(() => {
        if (currentHour === 'auto') {
            syncPeriod(true);
        }
    }, 5 * 60 * 1000);
}

document.addEventListener('DOMContentLoaded', init);
