/**
 * Oração do Dia Luterana - Lógica da Aplicação (Versão 2.1 com IA & Alexa)
 * Roda 100% no lado do cliente, sem backend ou dependências externas.
 */

// 1. BANCO DE ORAÇÕES LOCAL (Inspiradas na teologia e tradição luterana)
const prayersDatabase = {
    madrugada: [
        {
            title: "Silêncio e Proteção",
            text: "Amado Deus, na quietude e no silêncio desta madrugada, quando o mundo ao redor parece pausar, eu me coloco diante de Ti.\nTrago em meu coração as minhas inquietações, as incertezas sobre o futuro e o peso do cansaço acumulado. Que a Tua presença reconfortante seja o meu abrigo nestas horas escuras.\nEntrego sob a Tua guarda a minha vida, a minha família e todas as pessoas que se sentem sós ou desamparadas nesta noite.\nConcede-me um repouso tranquilo, na certeza de que a Tua graça me sustenta e de que o Teu amor não conhece limites. Que eu possa descansar sob a promessa do Teu cuidado fiel.\nAmém."
        },
        {
            title: "Entrega e Confiança",
            text: "Senhor da Vida, quando o sono se afasta e os pensamentos se agitam no silêncio do quarto, lembro-me do Teu convite para entregar a Ti todos os fardos.\nTu nos conheces por inteiro, sabes de nossas fraquezas e de nossas esperanças. Derrama sobre mim a Tua paz, aquela que ultrapassa toda a nossa capacidade humana de compreender.\nGuarda a minha mente das ansiedades que tentam se instalar e concede-me a serenidade necessária para repousar.\nConfio na Tua promessa de misericórdia, sabendo que cada novo dia é um presente do Teu amor que nos liberta e nos renova.\nAmém."
        },
        {
            title: "Luz na Quietude",
            text: "Deus de amor e compaixão, que caminhas conosco tanto no brilho do dia quanto nas sombras da noite.\nAgradeço-Te porque a Tua vigilância amorosa não falha e porque nunca estamos sós. Que a Tua luz interior dissipe qualquer angústia ou dúvida que tente perturbar o meu descanso nesta madrugada.\nFortalece o meu espírito para que eu possa olhar para o amanhã com esperança renovada, sabendo que a Tua Palavra é lâmpada para os meus pés.\nQue o Teu Santo Espírito me envolva em paz e prepare o meu corpo para servir com alegria.\nAmém."
        },
        {
            title: "Oração pelo Próximo no Silêncio",
            text: "Pai de misericórdia, nesta hora em que o silêncio convida à reflexão, lembro-me daqueles que não conseguem dormir por causa da dor física, da preocupação financeira ou do sofrimento da alma.\nIntercedo pelos doentes nos hospitais, pelos que trabalham no turno da noite cuidando de vidas e pelos que não têm um teto para se abrigar.\nQue o Teu Espírito Consolador sopre paz e alívio sobre cada coração aflito. Que sintam que não estão sozinhos e que a Tua Igreja seja sempre um farol de acolhimento e solidariedade para com os necessitados.\nAmém."
        },
        {
            title: "Sossego para a Alma",
            text: "Amado Deus, neste momento de silêncio, peço que acalmes os batimentos do meu coração e acalmes a minha mente.\nAfasta de mim as cobranças e o peso do que deixei de fazer hoje. Ensina-me a aceitar que sou frágil, mas que a Tua graça me basta e me perdoa plenamente.\nQue eu possa fechar os olhos em paz, entregando o controle de tudo em Tuas mãos. Que a Tua fidelidade seja o meu travesseiro e que eu acorde restaurado para testemunhar o Teu amor e a Tua bondade na comunhão com meus irmãos e irmãs.\nAmém."
        }
    ],
    manha: [
        {
            title: "Gratidão pelo Novo Dia",
            text: "Senhor Deus, criador do céu e da terra, agradeço-Te de todo o coração por esta manhã e pelo sopro de vida que me concedes.\nCada novo amanhecer é um testemunho vivo do Teu amor e da Tua graça que se renovam sobre nós. Ao iniciar esta jornada, peço que guies os meus passos e ilumines a minha mente nas decisões que precisarei tomar.\nQue eu não viva este dia focado apenas em mim, mas que meus olhos estejam atentos às necessidades do meu próximo. Dá-me sabedoria para escutar, coragem para agir com justiça e paciência para acolher a todos com amor.\nAmém."
        },
        {
            title: "Caminho de Fé e Ação",
            text: "Deus da Vida, que em Jesus Cristo nos deste o maior exemplo de serviço e compaixão.\nLembro-me, nesta manhã, de que a fé cristã nos chama a ser pessoas ativas no mundo, espalhando sementes de paz, amor e reconciliação. Abençoa o meu trabalho, as minhas tarefas domésticas e as minhas relações.\nQue as minhas palavras transmitam esperança e que as minhas ações reflitam a Tua bondade. Dá-me discernimento para não me calar diante da injustiça e um espírito pronto para estender a mão aos que mais precisam no dia de hoje.\nAmém."
        },
        {
            title: "Serviço e Comunhão",
            text: "Pai Celeste, inspirados pela fé da Reforma, recordamos que fomos libertados em Cristo para ser servos e servas uns dos outros em amor.\nQue esta verdade guie o meu dia. Livra-me do egoísmo e da pressa que nos impedem de ver o irmão e a irmã no caminho.\nQue eu possa exercer a minha vocação diária com dedicação, alegria e honestidade, contribuindo para o bem-estar da minha família e da comunidade. Abençoa a nossa Igreja e todos os que trabalham pela promoção da dignidade humana.\nAmém."
        },
        {
            title: "Fortaleza Diária",
            text: "Deus forte e consolador, o dia se apresenta cheio de desafios e tarefas que muitas vezes nos fazem sentir pequenos e sobrecarregados.\nPeço que me dês a Tua força e o Teu ânimo nesta manhã. Recorda-me, nos momentos de cansaço ou dúvida, de que a Tua graça me é oferecida gratuitamente e de que não preciso carregar o mundo nos ombros.\nQue eu caminhe seguro na certeza de que Tu estás comigo, orientando a minha vida e protegendo os meus passos de todo o mal.\nAmém."
        },
        {
            title: "Cuidado com a Criação",
            text: "Deus Criador, cuja sabedoria se revela no canto das aves, no calor do sol que nasce e na diversidade da vida que desperta nesta manhã.\nAgradeço pela beleza do mundo e peço que despertes em mim uma responsabilidade profunda pelo cuidado com a criação. Ajuda-me a fazer escolhas conscientes que preservem a natureza e promovam a justiça climática e social.\nQue o meu modo de viver hoje honre o Teu projeto de vida abundante para todas as criaturas e traga paz aos que compartilham a caminhada comigo.\nAmém."
        }
    ],
    tarde: [
        {
            title: "Sossego no Meio da Jornada",
            text: "Deus compassivo, no meio da correria e das tarefas desta tarde, faço uma pausa necessária para silenciar e buscar a Tua presença.\nRenova as minhas forças físicas que começam a diminuir e traz clareza para a minha mente. Que a pressa das horas não me roube a capacidade de ser gentil e compreensivo.\nColoco sob o Teu cuidado o restante da minha jornada de trabalho ou estudo. Que a Tua paz, que acalma as tempestades da alma, esteja comigo, lembrando-me de que o valor da minha vida está no Teu amor e não apenas na minha produtividade.\nAmém."
        },
        {
            title: "Paciência e Acolhimento",
            text: "Amado Deus, quando a tarde avança e as pressões diárias se acumulam, muitas vezes nos falta paciência e serenidade para lidar com as diferenças.\nPeço que derrames sobre mim um espírito de mansidão e tolerância. Ajuda-me a ouvir antes de falar e a estender a mão aos que estão desanimados ou cansados ao meu redor.\nQue os meus relacionamentos de hoje sejam pautados pelo respeito e pela compaixão, sendo eu um canal de consolo e compreensão para os que convivem comigo no cotidiano.\nAmém."
        },
        {
            title: "Fidelidade e Testemunho",
            text: "Senhor, que em nossas tarefas cotidianas possamos dar testemunho do Teu amor.\nAbençoa cada trabalhador e trabalhadora que nesta tarde se dedica com esforço ao sustento de suas famílias. Que haja dignidade no trabalho e justiça na remuneração de todos.\nDá-nos honestidade nas nossas relações comerciais e pessoais. Que em cada pequena ação, por mais simples que seja, possamos construir um mundo mais justo e solidário, de acordo com o Teu Reino.\nAmém."
        },
        {
            title: "Presença e Fortalecimento",
            text: "Deus de amor, às vezes o cansaço do meio do dia nos faz questionar os nossos caminhos e nos sentimos sozinhos nas nossas lutas.\nAbre os meus olhos nesta tarde para perceber os sinais da Tua presença amorosa ao meu redor: no sorriso de um colega, no vento que sopra ou na Tua Palavra que me fortalece.\nRenova a minha fé e dá-me a certeza de que a Tua mão segura a minha, sustentando-me em cada dificuldade e me conduzindo à paz.\nAmém."
        },
        {
            title: "Justiça, Diálogo e Ecumenismo",
            text: "Senhor Deus, Tu que nos chamas a viver em unidade e a buscar a paz.\nNesta tarde, peço que nos ajudes a derrubar os muros do preconceito e da divisão. Que possamos dialogar com respeito e amor com pessoas de diferentes crenças e opiniões, aprendendo uns com os outros.\nDá-nos coragem para defender os direitos dos marginalizados e dos que sofrem injustiça em nossa sociedade. Que a nossa vida seja um testemunho ativo de paz e fraternidade.\nAmém."
        }
    ],
    noite: [
        {
            title: "Gratidão e Entrega ao Descanso",
            text: "Deus bondoso, o dia chega ao fim e a escuridão da noite nos convida ao descanso e ao recolhimento.\nAgradeço-Te de coração por todas as bênçãos recebidas hoje, pelas tarefas concluídas, pelos encontros sinceros e pelo alimento na mesa.\nEntrego a Ti também os planos que não se realizaram e as tarefas que ficaram pendentes, confiando que o amanhã pertence a Ti. Peço que a Tua proteção envolva o meu lar e as pessoas que amo, proporcionando-nos um sono tranquilo, seguro e revigorante.\nDescanso em Tua graça.\nAmém."
        },
        {
            title: "Reconciliação e Misericórdia",
            text: "Senhor Deus, ao olhar para trás e refletir sobre este dia que passou, reconheço as minhas falhas, as palavras impacientes que proferi e as vezes em que deixei de fazer o bem.\nPeço Teu perdão e a Tua misericórdia. Liberta o meu coração de ressentimentos e ajuda-me a perdoar também a quem me ofendeu.\nQue eu possa deitar a cabeça no travesseiro com a alma leve, sabendo que in Cristo a Tua graça sempre nos oferece um novo começo e uma nova chance de amar e servir.\nAmém."
        },
        {
            title: "Proteção e Paz no Lar",
            text: "Pai e Mãe Celeste, que cuidas com infinito carinho de todas as famílias.\nNesta noite, peço que a Tua paz reine em meu lar. Afasta de nós as desavenças, os medos e as preocupações que impedem o sono. Abençoa as crianças, os jovens e os idosos.\nProtege a nossa casa e os nossos vizinhos de todo o perigo. Que o Teu Espírito Santo guarde os nossos pensamentos e nos dê sonhos tranquilos, para que amanhã possamos acordar com as energias renovadas e dispostos a servir-Te com alegria.\nAmém."
        },
        {
            title: "Confiança e Entrega nas Mãos de Deus",
            text: "Deus da Esperança, enquanto a noite cobre o mundo, eu coloco a minha vida inteiramente sob o Teu cuidado.\nTu és o meu refúgio e a minha fortaleza, o Deus em quem confio em qualquer circunstância. Que o meu sono seja um ato de fé e entrega total a Ti.\nSei que estás no controle de todas as coisas e que o amanhã trará novas oportunidades de crescimento e serviço. Guarda-me sob a Tua sombra protetora e renova as minhas forças físicas e espirituais para o novo dia.\nAmém."
        },
        {
            title: "Luz e Consolo para o Mundo",
            text: "Deus de consolação, ao findar deste dia, lembro-me em minhas orações de todas as pessoas que enfrentam noites de angústia e solidão.\nConforta os que choram a perda de entes queridos, os enfermos nos leitos de dor e aqueles que sofrem sob o peso da ansiedade ou da depressão.\nQue a Tua luz resplandeça nas trevas de suas vidas e traga a paz que tanto necessitam. Que a Tua Igreja seja uma presença ativa de amparo e carinho para com todos os que sofrem neste anoitecer.\nAmém."
        }
    ]
};

// 2. ESTADOS DA APLICAÇÃO
let currentHour = 'auto'; // 'auto' ou número 0-23
let currentPeriod = '';   // 'madrugada', 'manha', 'tarde', 'noite'
let currentPrayer = null; // { title: string, text: string }
let lastPrayerIndex = -1; // Evita repetir a mesma oração consecutivamente
let themeMode = 'auto';    // 'auto' (usa o período) ou 'light' (modo claro sepia)
let devTriggerClicks = 0;  // Clicks para revelar painel dev

// CONFIGURAÇÕES DO USUÁRIO & CHAVE EMBUTIDA (Opção 1)
const EMBEDDED_KEY_B64 = 'QUl6YVN5RDBjOXJhek1lOGFlR09vUkRuV3hqMzhpeGdVZEZqYTdz'; 

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
    
    const count = 18;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 12 + 10;
        const delay = Math.random() * 15;
        const opacity = Math.random() * 0.25 + 0.1;
        
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
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Diga apenas 'OK'" }] }]
            })
        });
        return response.ok;
    } catch (e) {
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
    
    const prompt = `Você é um pastor/pastora da tradição luterana no Brasil. Escreva uma oração em português acolhedora, respeitosa e profunda para o período da ${periodTranslations[period]}.
O sentimento atual de quem está orando é: ${moodPrompts[mood] || moodPrompts.default}.

A oração deve refletir a teologia luterana da graça (Sola Gratia), com foco em amor, confiança em Deus, comunidade e acolhimento. Evite linguagem excessivamente formal ou arcaica, prefira um tom humano, compassivo e reflexivo. Ela deve ter de 3 a 4 parágrafos (entre 130 e 180 palavras).

IMPORTANTE: Responda estritamente no formato JSON estruturado, sem blocos de código markdown extra (sem aspas triplas de crase \`\`\`json). O JSON deve conter exatamente duas chaves:
"title" (string, o título da oração)
"text" (string, o texto da oração, usando quebras de linha com '\\n' para separar os parágrafos).`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
    
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
        
        if (!response.ok) throw new Error("Falha no status de resposta HTTP.");
        
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

async function loadNewPrayer(animate = true) {
    stopSpeaking();
    
    if (geminiApiKey) {
        aiActiveIndicator.classList.remove('hidden');
        btnNewText.textContent = "Gerando por IA...";
        btnNewPrayer.disabled = true;
        
        if (animate) {
            prayerTitleEl.classList.add('fade-out');
            prayerTextEl.classList.add('fade-out');
        }
        
        const aiPrayer = await generateAiPrayer(currentPeriod, selectedMood);
        
        btnNewText.textContent = "Nova Oração";
        btnNewPrayer.disabled = false;
        
        if (aiPrayer && !aiPrayer.error) {
            prayerCard.classList.add('ai-active');
            displayPrayer(aiPrayer, animate);
            return;
        } else {
            // Caso falhe por cota ou conexão
            if (aiPrayer && aiPrayer.error === "LIMIT_EXCEEDED") {
                showToast("✨ Limite de cota da IA atingido. Carregando devocional especial local!");
            } else {
                showToast("⚠️ Conexão de IA indisponível. Carregando oração local.");
            }
        }
    }
    
    // Fallback/Local Database
    aiActiveIndicator.classList.add('hidden');
    prayerCard.classList.remove('ai-active');
    
    const prayers = prayersDatabase[currentPeriod];
    let randomIndex;
    
    if (prayers.length > 1) {
        do {
            randomIndex = Math.floor(Math.random() * prayers.length);
        } while (randomIndex === lastPrayerIndex);
    } else {
        randomIndex = 0;
    }
    
    lastPrayerIndex = randomIndex;
    displayPrayer(prayers[randomIndex], animate);
}

function syncPeriod(animate = true) {
    const hour = getActualHour();
    const newPeriod = determinePeriod(hour);
    
    if (newPeriod !== currentPeriod) {
        currentPeriod = newPeriod;
        lastPrayerIndex = -1;
        updateTheme();
        loadNewPrayer(animate);
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
    
    // NUNCA mostre a chave embutida do sistema no input de texto público
    inputApiKey.value = localStorage.getItem('oracao-gemini-key') || ''; 
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
            
            // Inicia o carregamento/geração da oração em paralelo
            loadNewPrayer(true);
            
            // Transição de telas após 800ms
            setTimeout(() => {
                document.body.classList.remove('state-landing', 'state-transitioning');
                document.body.classList.add('state-app');
            }, 800);
        });
    }

    btnNewPrayer.addEventListener('click', () => {
        const icon = btnNewPrayer.querySelector('.icon-refresh');
        if (icon) {
            icon.classList.add('spin-animation');
            setTimeout(() => icon.classList.remove('spin-animation'), 600);
        }
        loadNewPrayer(true);
    });
    
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
            loadNewPrayer(true);
        });
    });
    
    // Modais & Configurações listeners
    btnSettingsToggle.addEventListener('click', () => {
        // Mostra apenas chave pessoal se existir, escondendo a chave Base64 do sistema
        inputApiKey.value = localStorage.getItem('oracao-gemini-key') || '';
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
        localStorage.setItem('oracao-gemini-key', enteredKey);
        
        // Recalcula chave da API (dá preferência para chave manual do usuário)
        geminiApiKey = enteredKey || (EMBEDDED_KEY_B64 ? atob(EMBEDDED_KEY_B64) : '');
        
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
        loadNewPrayer(true);
    });
    
    // Test API Connection Button
    btnTestApi.addEventListener('click', async () => {
        const testKey = inputApiKey.value.trim();
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
