const Alexa = require('ask-sdk-core');
const axios = require('axios');

// BANCO DE ORAÇÕES BACKUP LOCAL (Para rodar sem internet ou sem chave API configurar)
const localPrayers = {
    madrugada: [
        "Amado Deus, na quietude e no silêncio desta madrugada, quando o mundo ao redor parece pausar, eu me coloco diante de Ti. Trago em meu coração as minhas inquietações, as incertezas sobre o futuro e o peso do cansaço acumulado. Que a Tua presença reconfortante seja o meu abrigo nestas horas escuras. Entrego sob a Tua guarda a minha vida, a minha família e todas as pessoas que se sentem sós ou desamparadas nesta noite. Concede-me um repouso tranquilo, na certeza de que a Tua graça me sustenta. Amém."
    ],
    manha: [
        "Senhor Deus, criador do céu e da terra, agradeço-Te de todo o coração por esta manhã e pelo sopro de vida que me concedes. Cada novo amanhecer é um testemunho vivo do Teu amor e da Tua graça que se renovam sobre nós. Ao iniciar esta jornada, peço que guies os meus passos e ilumines a minha mente nas decisões que precisarei tomar. Que eu não viva este dia focado apenas em mim, mas que meus olhos estejam atentos às necessidades do meu próximo. Dá-me sabedoria e paciência. Amém."
    ],
    tarde: [
        "Deus compassivo, no meio da correria e das tarefas desta tarde, faço uma pausa necessária para silenciar e buscar a Tua presença. Renova as minhas forças físicas que começam a diminuir e traz clareza para a minha mente. Que a pressa das horas não me roube a capacidade de ser gentil e compreensivo. Coloco sob o Teu cuidado o restante da minha jornada de trabalho ou estudo. Que a Tua paz, que acalma as tempestades da alma, esteja comigo. Amém."
    ],
    noite: [
        "Deus bondoso, o dia chega ao fim e a escuridão da noite nos convida ao descanso e ao recolhimento. Agradeço-Te de coração por todas as bênçãos recebidas hoje, pelas tarefas concluídas, pelos encontros sinceros e pelo alimento na mesa. Entrego a Ti também os planos que não se realizaram e as tarefas que ficaram pendentes, confiando que o amanhã pertence a Ti. Peço que a Tua proteção envolva o meu lar e nos dê um sono tranquilo. Amém."
    ]
};

// DETERMINA PERÍODO COM BASE NA HORA DO DIA
function getPeriod(hour) {
    if (hour >= 0 && hour < 5) return 'madrugada';
    if (hour >= 5 && hour < 12) return 'manha';
    if (hour >= 12 && hour < 18) return 'tarde';
    return 'noite';
}

function getPeriodLabel(period) {
    switch (period) {
        case 'madrugada': return "Oração da Madrugada";
        case 'manha': return "Oração da Manhã";
        case 'tarde': return "Oração da Tarde";
        default: return "Oração da Noite";
    }
}

// OBTÉM A HORA LOCAL DO DISPOSITIVO ALEXA OU SÃO PAULO
async function getDeviceHour(handlerInput) {
    const { requestEnvelope, serviceClientFactory } = handlerInput;
    const deviceId = requestEnvelope.context.System.device.deviceId;
    
    let timezone = 'America/Sao_Paulo'; // Default
    
    try {
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const deviceTimezone = await upsServiceClient.getSystemTimeZone(deviceId);
        if (deviceTimezone) {
            timezone = deviceTimezone;
        }
    } catch (error) {
        console.log('Não foi possível obter timezone da Alexa. Usando padrão America/Sao_Paulo.', error.message);
    }
    
    // Calcula hora local baseado no timezone obtido
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        hour12: false
    });
    return parseInt(formatter.format(date), 10);
}

// GERA ORAÇÃO POR IA (GEMINI API)
async function generateAiPrayer(period) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    
    const periodNames = {
        madrugada: 'Madrugada',
        manha: 'Manhã',
        tarde: 'Tarde',
        noite: 'Noite'
    };

    const prompt = `Você é um pastor/pastora da tradição luterana no Brasil. Escreva uma oração em português acolhedora, respeitosa e profunda para o período da ${periodNames[period]}.
A oração deve refletir a teologia luterana da graça (Sola Gratia), com foco em amor, confiança em Deus, comunidade e acolhimento. Ela deve ter cerca de 130 a 160 palavras. Escreva em formato de texto corrido sem títulos ou marcadores especiais, apenas o texto da oração de forma simples para ser lido em voz alta pela assistente Alexa. Termine com Amém.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    try {
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        });
        
        if (response.data && response.data.candidates && response.data.candidates[0].content.parts[0].text) {
            return response.data.candidates[0].content.parts[0].text.trim();
        }
        return null;
    } catch (e) {
        console.error("Erro na API Gemini na Alexa:", e.message);
        return null;
    }
}

// METODOS DA SKILL ALEXA
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const hour = await getDeviceHour(handlerInput);
        const period = getPeriod(hour);
        const label = getPeriodLabel(period);
        
        let speakOutput = `Bem-vindo à Oração do Dia Luterana. `;
        let prayerText = "";
        
        // Tenta obter oração via IA
        const aiText = await generateAiPrayer(period);
        if (aiText) {
            prayerText = aiText;
            speakOutput += `Aqui está a sua ${label} personalizada por Inteligência Artificial. \n\n ${prayerText}`;
        } else {
            // Reverte para local
            const index = Math.floor(Math.random() * localPrayers[period].length);
            prayerText = localPrayers[period][index];
            speakOutput += `Aqui está a sua ${label}. \n\n ${prayerText}`;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Se desejar ouvir outra oração, basta pedir por: nova oração.')
            .withSimpleCard(label, prayerText)
            .getResponse();
    }
};

const OracaoDoDiaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OracaoDoDiaIntent';
    },
    async handle(handlerInput) {
        const hour = await getDeviceHour(handlerInput);
        const period = getPeriod(hour);
        const label = getPeriodLabel(period);
        
        let speakOutput = "";
        let prayerText = "";
        
        const aiText = await generateAiPrayer(period);
        if (aiText) {
            prayerText = aiText;
            speakOutput = `Aqui está a sua ${label} de hoje: \n\n ${prayerText}`;
        } else {
            const index = Math.floor(Math.random() * localPrayers[period].length);
            prayerText = localPrayers[period][index];
            speakOutput = `Aqui está a sua ${label}: \n\n ${prayerText}`;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(label, prayerText)
            .getResponse();
    }
};

const NovaOracaoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NovaOracaoIntent';
    },
    async handle(handlerInput) {
        const hour = await getDeviceHour(handlerInput);
        const period = getPeriod(hour);
        const label = getPeriodLabel(period);
        
        let speakOutput = "";
        let prayerText = "";
        
        const aiText = await generateAiPrayer(period);
        if (aiText) {
            prayerText = aiText;
            speakOutput = `Gerando outra ${label} por inteligência artificial: \n\n ${prayerText}`;
        } else {
            const index = Math.floor(Math.random() * localPrayers[period].length);
            prayerText = localPrayers[period][index];
            speakOutput = `Aqui está outra ${label}: \n\n ${prayerText}`;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(label, prayerText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você pode me pedir uma oração dizendo: Alexa, peça para Oração do Dia Luterana rezar uma oração. Ou peça uma: nova oração. O que gostaria de fazer?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Que Deus lhe acompanhe. Em paz me deito e em paz durmo, pois só tu Senhor me fazes habitar em segurança. Até logo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Desculpe, não consegui entender o comando. Você pode pedir uma oração dizendo: oração do dia.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Sessão finalizada: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Erro tratado: ${error.message}`);
        const speakOutput = 'Desculpe, ocorreu um erro ao buscar sua oração. Por favor, tente novamente em alguns instantes.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OracaoDoDiaIntentHandler,
        NovaOracaoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
