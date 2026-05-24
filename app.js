/**
 * Oração do Dia IECLB - Lógica da Aplicação
 * Roda 100% no lado do cliente, sem backend ou dependências externas.
 */

// 1. BANCO DE ORAÇÕES LOCAL (Inspiradas na teologia e tradição luterana - IECLB)
const prayersDatabase = {
    madrugada: [
        {
            title: "Silêncio e Proteção",
            text: "Amado Deus, no silêncio profundo desta madrugada, entrego em Tuas mãos as minhas inquietações.\nQue a Tua presença conforte o meu coração e que eu encontre o repouso necessário em Tua graça.\nGuarda a minha vida e a das pessoas que amo sob a Tua proteção compassiva.\nAmém."
        },
        {
            title: "Entrega e Confiança",
            text: "Senhor Deus, quando a noite é longa e as preocupações tentam tirar a paz, recordo-me da Tua promessa de amor incondicional.\nQue a Tua paz, que ultrapassa todo entendimento, guarde a minha mente e acalme minha respiração.\nDescanso na certeza de que cuidas de mim em cada segundo.\nAmém."
        },
        {
            title: "Luz na Quietude",
            text: "Deus da Vida, na quietude destas horas, agradeço porque a Tua misericórdia nunca dorme.\nQue a Tua luz espiritual dissipe qualquer sombra de medo ou incerteza no meu coração.\nPrepara-me com paciência e esperança para o novo dia que virá, sob a Tua sábia condução.\nAmém."
        },
        {
            title: "Oração pelo Próximo no Silêncio",
            text: "Pai celeste, neste silêncio da noite, coloco diante de Ti as pessoas que sofrem nos hospitais, as que passam por angústias na alma ou que não encontram repouso.\nQue o Teu Santo Espírito traga consolo, alívio e o abraço do Teu amor acolhedor.\nAmém."
        },
        {
            title: "Sossego para a Alma",
            text: "Senhor, ajuda-me a desacelerar os meus pensamentos.\nQue eu possa sentir o Teu amparo na brisa desta madrugada.\nQue meu corpo e minha alma descansem seguros sob a Tua promessa de perdão, renovação e paz eterna.\nAmém."
        }
    ],
    manha: [
        {
            title: "Gratidão pelo Novo Dia",
            text: "Deus de Amor, obrigado pelo dom da vida e por esta manhã que se inicia.\nAgradeço pela oportunidade de recomeçar sob a Tua bendita graça.\nGuia os meus passos, ilumina as minhas decisões e dá-me um coração generoso para acolher e servir o próximo hoje.\nAmém."
        },
        {
            title: "Caminho de Esperança e Fé",
            text: "Senhor, iniciamos mais uma jornada com a Tua Palavra a iluminar nossa estrada.\nQue a nossa fé em Cristo nos impulsione a praticar a empatia, a justiça e o amor fraternal por onde passarmos.\nDá-nos sabedoria nas palavras e bondade nas ações.\nAmém."
        },
        {
            title: "Serviço e Comunhão",
            text: "Pai celeste, lembrando o ensinamento da fé luterana, reconhecemos que somos livres em Cristo para servir uns aos outros com alegria.\nAbençoa o meu trabalho, os meus estudos e as minhas conversas de hoje.\nQue eu seja um canal de paz e reconciliação.\nAmém."
        },
        {
            title: "Fortaleza Diária",
            text: "Deus eterno, diante dos desafios desta nova manhã, peço a Tua fortaleza.\nQue a pressa do cotidiano não me afaste de Ti nem do amor ao próximo.\nAjuda-me a lembrar que a Tua graça me basta e que ando em segurança sob o Teu olhar.\nAmém."
        },
        {
            title: "Cuidado com a Criação",
            text: "Criador de todas as coisas, agradeço pelas maravilhas da natureza que despertam com o sol.\nDá-me consciência para cuidar da nossa casa comum e respeito pela vida de cada ser humano.\nQue o meu dia seja um reflexo do Teu infinito amor.\nAmém."
        }
    ],
    tarde: [
        {
            title: "Sossego no Meio da Jornada",
            text: "Amado Deus, no meio das tarefas desta tarde, faço uma pausa para respirar e me reconectar Contigo.\nRenova as minhas forças físicas e espirituais.\nQue a Tua paz acalme a ansiedade e me conceda sabedoria para concluir este dia com integridade.\nAmém."
        },
        {
            title: "Paciência e Acolhimento",
            text: "Senhor, quando o cansaço do dia começa a surgir, peço que me dês paciência e mansidão.\nAjuda-me a enxergar as pessoas ao meu redor com empatia e respeito, compartilhando palavras de ânimo e gestos de carinho.\nAmém."
        },
        {
            title: "Compromisso com o Bem",
            text: "Deus da vida, abençoa as mãos que trabalham, as mentes que criam e as pessoas que cuidam.\nQue em cada pequena tarefa desta tarde eu possa honrar-Te através do meu compromisso com a verdade, com a justiça e com a honestidade.\nAmém."
        },
        {
            title: "Presença Constante",
            text: "Pai celeste, às vezes o dia parece pesado e as demandas nos sufocam.\nLembra-me de que não ando só.\nQue a Tua Palavra seja o meu refúgio e o Teu Espírito Santo seja o meu guia constante ao longo desta tarde.\nEm Ti eu confio.\nAmém."
        },
        {
            title: "Justiça, Diálogo e Paz",
            text: "Deus da compaixão, inspire-nos a buscar caminhos de diálogo e justiça social nesta tarde.\nLivra-nos da indiferença e abre nossos olhos para apoiar os mais fracos e necessitados da nossa comunidade.\nAmém."
        }
    ],
    noite: [
        {
            title: "Gratidão ao Anoitecer",
            text: "Amado Deus, a noite chegou e com ela a oportunidade de descansar.\nAgradeço por tudo o que vivi hoje: pelas alegrias partilhadas e pelas forças que encontrei nas dificuldades.\nEntrego a Ti as minhas preocupações e repouso sob a Tua guarda fiel.\nAmém."
        },
        {
            title: "Reconciliação e Descanso",
            text: "Senhor Deus, ao final deste dia, peço perdão pelas falhas cometidas, pelas palavras apressadas ou omissões.\nConforta o meu coração com a Tua graça reconciliadora.\nQue eu durma em paz com Deus, com o próximo e comigo mesmo.\nAmém."
        },
        {
            title: "Proteção do Lar",
            text: "Pai e Mãe celeste, abençoa e protege este lar e todas as pessoas que nele habitam.\nQue a Tua paz cubra o nosso repouso e guarde os nossos sonhos.\nConcede uma noite tranquila e revigorante a todas as famílias.\nAmém."
        },
        {
            title: "Confiança no Amanhã",
            text: "Deus da esperança, enquanto a escuridão da noite nos convida ao sono, confio que o amanhã trará novas oportunidades de testemunhar o Teu amor.\nGuarda-nos sob Tuas asas e concede-nos o descanso que refaz as forças.\nAmém."
        },
        {
            title: "Luz e Consolo nas Horas de Sono",
            text: "Senhor, que a Tua luz continue a brilhar em nossos corações mesmo durante o repouso.\nProtege os enfermos, consola os que choram e dá esperança aos que sofrem neste anoitecer.\nDescansamos sob o Teu infinito e terno amor.\nAmém."
        }
    ]
};

// 2. ESTADOS DA APLICAÇÃO
let currentHour = 'auto'; // 'auto' ou número 0-23
let currentPeriod = '';   // 'madrugada', 'manha', 'tarde', 'noite'
let currentPrayer = null; // { title: string, text: string }
let lastPrayerIndex = -1; // Evita repetir a mesma oração consecutivamente
let themeMode = 'auto';    // 'auto' (usa o período) ou 'light' (modo claro sepia)

// Síntese de voz (TTS) referências globais para evitar garbage collection
let speechUtterance = null;
let isSpeaking = false;
let voices = [];

// 3. SELETORES DOM
const bodyEl = document.body;
const periodBadgeEl = document.getElementById('period-badge');
const prayerTitleEl = document.getElementById('prayer-title');
const prayerTextEl = document.getElementById('prayer-text');
const btnThemeToggle = document.getElementById('btn-theme-toggle');
const btnNewPrayer = document.getElementById('btn-new-prayer');
const btnSpeakPrayer = document.getElementById('btn-speak-prayer');
const btnSpeakText = document.getElementById('btn-speak-text');
const ttsContainer = document.getElementById('tts-container');
const ttsStatusText = document.getElementById('tts-status-text');
const simulatorButtons = document.querySelectorAll('.btn-sim');

// 4. LÓGICA DE DETECÇÃO DE HORÁRIO E PERÍODO
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

// 5. ATUALIZAÇÃO DO TEMA VISUAL
function updateTheme() {
    // Limpa classes antigas de período
    bodyEl.classList.remove('period-madrugada', 'period-manha', 'period-tarde', 'period-noite');
    
    // Sempre define a classe do período atual para que, se o usuário voltar ao 'auto', funcione instantaneamente
    bodyEl.classList.add(`period-${currentPeriod}`);
    
    // Aplica o override manual de modo claro se selecionado
    if (themeMode === 'light') {
        bodyEl.classList.add('theme-light');
    } else {
        bodyEl.classList.remove('theme-light');
    }
}

// 6. SELEÇÃO E RENDERIZAÇÃO DA ORAÇÃO
function displayPrayer(prayer, animate = true) {
    currentPrayer = prayer;
    
    if (animate) {
        // Transição suave de fade-out
        prayerTitleEl.classList.add('fade-out');
        prayerTextEl.classList.add('fade-out');
        
        setTimeout(() => {
            // Atualiza os dados
            periodBadgeEl.textContent = getPeriodLabel(currentPeriod);
            prayerTitleEl.textContent = prayer.title;
            prayerTextEl.textContent = prayer.text;
            
            // Transição suave de fade-in
            prayerTitleEl.classList.remove('fade-out');
            prayerTextEl.classList.remove('fade-out');
            prayerTitleEl.classList.add('fade-in');
            prayerTextEl.classList.add('fade-in');
            
            // Remove a classe de animação depois de concluir
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

function loadNewPrayer(animate = true) {
    stopSpeaking(); // Para a leitura anterior se estiver rodando
    
    const prayers = prayersDatabase[currentPeriod];
    let randomIndex;
    
    // Evita repetir a mesma oração consecutivamente no mesmo clique
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

// Inicialização/Sincronização com base nas escolhas de horário
function syncPeriod(animate = true) {
    const hour = getActualHour();
    const newPeriod = determinePeriod(hour);
    
    // Se o período mudou ou é a primeira execução
    if (newPeriod !== currentPeriod) {
        currentPeriod = newPeriod;
        lastPrayerIndex = -1; // Reseta cache
        updateTheme();
        loadNewPrayer(animate);
    }
}

// 7. MÓDULO TEXT-TO-SPEECH (TTS) COM WEB SPEECH API
function loadVoices() {
    if ('speechSynthesis' in window) {
        voices = window.speechSynthesis.getVoices();
    }
}

// Escuta evento de carregamento de vozes assíncronas do Chrome/Edge
if ('speechSynthesis' in window) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
}

function startSpeaking() {
    if (!('speechSynthesis' in window) || !currentPrayer) {
        alert("A síntese de voz não é suportada ou não há oração carregada no seu navegador.");
        return;
    }
    
    window.speechSynthesis.cancel(); // Cancela falas anteriores
    
    // Texto a ser lido: Título + Pausa + Oração
    const textToSpeak = `${currentPrayer.title}. ${currentPrayer.text}`;
    
    speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    speechUtterance.lang = 'pt-BR';
    
    // Ajusta tom e velocidade para uma leitura mais suave e contemplativa
    speechUtterance.rate = 0.9;  // Ligeiramente mais pausada
    speechUtterance.pitch = 1.0; // Tom natural
    
    // Tenta selecionar uma voz pt-BR adequada se disponível
    if (voices.length > 0) {
        const ptBRVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR'));
        if (ptBRVoice) {
            speechUtterance.voice = ptBRVoice;
        }
    }
    
    // Configura eventos
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
        console.error("Erro no TTS:", e);
        resetTTSUI();
    };
    
    window.speechSynthesis.speak(speechUtterance);
}

function stopSpeaking() {
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

// 8. EVENTOS E CONFIGURAÇÃO DE LISTENERS
function init() {
    // 8.1 Inicializa Tema salvo em localStorage
    const savedTheme = localStorage.getItem('oracao-theme-mode');
    if (savedTheme === 'light') {
        themeMode = 'light';
    } else {
        themeMode = 'auto';
    }
    
    // 8.2 Sincroniza Horário inicial
    syncPeriod(false);
    updateTheme();
    
    // 8.3 Listener para botão de nova oração
    btnNewPrayer.addEventListener('click', () => {
        // Animação de giro no ícone
        const icon = btnNewPrayer.querySelector('.icon-refresh');
        if (icon) {
            icon.classList.add('spin-animation');
            setTimeout(() => icon.classList.remove('spin-animation'), 600);
        }
        loadNewPrayer(true);
    });
    
    // 8.4 Listener para reprodução de voz
    btnSpeakPrayer.addEventListener('click', () => {
        if (isSpeaking) {
            stopSpeaking();
        } else {
            startSpeaking();
        }
    });
    
    // 8.5 Listener para alternar tema
    btnThemeToggle.addEventListener('click', () => {
        if (themeMode === 'auto') {
            themeMode = 'light';
        } else {
            themeMode = 'auto';
        }
        localStorage.setItem('oracao-theme-mode', themeMode);
        updateTheme();
    });
    
    // 8.6 Configura o painel do simulador de períodos
    simulatorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe ativa dos botões do simulador
            simulatorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Atualiza hora simulada
            const selectedHour = btn.getAttribute('data-hour');
            currentHour = selectedHour;
            
            // Sincroniza período e força carregamento de oração nova
            stopSpeaking();
            
            const hour = getActualHour();
            const newPeriod = determinePeriod(hour);
            
            currentPeriod = newPeriod;
            lastPrayerIndex = -1; // Permite qualquer oração no novo período
            updateTheme();
            loadNewPrayer(true);
        });
    });
    
    // Atualiza o período periodicamente caso o usuário deixe a aba aberta (a cada 5 minutos)
    setInterval(() => {
        if (currentHour === 'auto') {
            syncPeriod(true);
        }
    }, 5 * 60 * 1000);
}

// Inicia aplicação após o carregamento do DOM
document.addEventListener('DOMContentLoaded', init);
