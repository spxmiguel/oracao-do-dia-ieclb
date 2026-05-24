/**
 * Oração do Dia IECLB - Lógica da Aplicação
 * Roda 100% no lado do cliente, sem backend ou dependências externas.
 */

// 1. BANCO DE ORAÇÕES LOCAL (Inspiradas na teologia e tradição luterana - IECLB)
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
            text: "Deus da Vida, que em Jesus Cristo nos deste o maior exemplo de serviço e compaixão.\nLembro-me, nesta manhã, de que a foi cristã nos chama a ser pessoas ativas no mundo, espalhando sementes de paz, amor e reconciliação. Abençoa o meu trabalho, as minhas tarefas domésticas e as minhas relações.\nQue as minhas palavras transmitam esperança e que as minhas ações reflitam a Tua bondade. Dá-me discernimento para não me calar diante da injustiça e um espírito pronto para estender a mão aos que mais precisam no dia de hoje.\nAmém."
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
            text: "Senhor Deus, ao olhar para trás e refletir sobre este dia que passou, reconheço as minhas falhas, as palavras impacientes que proferi e as vezes em que deixei de fazer o bem.\nPeço Teu perdão e a Tua misericórdia. Liberta o meu coração de ressentimentos e ajuda-me a perdoar também a quem me ofendeu.\nQue eu possa deitar a cabeça no travesseiro com a alma leve, sabendo que em Cristo a Tua graça sempre nos oferece um novo começo e uma nova chance de amar e servir.\nAmém."
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
            text: "Deus de consolação, ao findar deste dia, lembro-me em minhas orações de todas as pessoas que enfrentam noites de angústia e solidão.\nConforta os que choram a perda de entes queridos, os enfermos nos leitos de dor e aqueles que sofrem sob o peso da ansiedade ou da depression.\nQue a Tua luz resplandeça nas trevas de suas vidas e traga a paz que tanto necessitam. Que a Tua Igreja seja uma presença ativa de amparo e carinho para com todos os que sofrem neste anoitecer.\nAmém."
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
