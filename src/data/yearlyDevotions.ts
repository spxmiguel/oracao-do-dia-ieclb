import type { YearlyDevotion } from "../types";

const words = [
  "Paz", "Graça", "Direção", "Confiança", "Descanso", "Perdão", "Coragem", "Esperança", "Presença", "Fidelidade",
  "Mansidão", "Alegria", "Sabedoria", "Entrega", "Cuidado", "Renovo", "Verdade", "Amor", "Constância", "Luz",
  "Paciência", "Refúgio", "Bondade", "Clareza", "Força", "Silêncio", "Gratidão", "Caminho", "Misericórdia", "Recomeço"
];

const titles = [
  "UM COMEÇO ENTREGUE",
  "ANTES DA PRESSA",
  "O PRÓXIMO PASSO",
  "FÉ NO DIA COMUM",
  "DESCANSAR PARA OBEDECER",
  "PERDÃO QUE ABRE CAMINHO",
  "CORAGEM SEM BARULHO",
  "ESPERANÇA PRÁTICA",
  "PRESENÇA NO CAMINHO",
  "FIDELIDADE NAS PEQUENAS COISAS",
  "MANSIDÃO EM MOVIMENTO",
  "ALEGRIA COM RAIZ",
  "SABEDORIA PARA HOJE",
  "ENTREGA REAL",
  "CUIDADO QUE SUSTENTA",
  "RENOVO PELA MANHÃ",
  "VERDADE QUE ORGANIZA",
  "AMOR EM ATITUDE",
  "CONSTÂNCIA SERENA",
  "LUZ PARA OS PASSOS"
];

const verses = [
  { reference: "Salmo 118:24", text: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele." },
  { reference: "Mateus 6:33", text: "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça." },
  { reference: "Filipenses 4:6", text: "Não andem ansiosos por coisa alguma, mas em tudo apresentem seus pedidos a Deus." },
  { reference: "João 15:5", text: "Eu sou a videira; vocês são os ramos. Se alguém permanecer em mim, esse dará muito fruto." },
  { reference: "Salmo 23:1", text: "O Senhor é o meu pastor; nada me faltará." },
  { reference: "Isaías 41:10", text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus." },
  { reference: "Romanos 12:2", text: "Transformem-se pela renovação da sua mente." },
  { reference: "Colossenses 3:15", text: "Que a paz de Cristo seja o juiz em seus corações." },
  { reference: "Tiago 1:5", text: "Se algum de vocês tem falta de sabedoria, peça-a a Deus." },
  { reference: "Mateus 11:28", text: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso." },
  { reference: "Provérbios 3:5", text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento." },
  { reference: "Salmo 46:10", text: "Aquietem-se e saibam que eu sou Deus." },
  { reference: "Lamentações 3:22-23", text: "As misericórdias do Senhor são a causa de não sermos consumidos; renovam-se cada manhã." },
  { reference: "João 14:27", text: "Deixo-lhes a paz; a minha paz lhes dou." },
  { reference: "1 Pedro 5:7", text: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês." },
  { reference: "Salmo 37:5", text: "Entregue o seu caminho ao Senhor; confie nele, e ele agirá." },
  { reference: "Efésios 4:32", text: "Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente." },
  { reference: "Gálatas 5:22", text: "O fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade e fidelidade." },
  { reference: "Hebreus 12:1", text: "Corramos com perseverança a corrida que nos é proposta." },
  { reference: "Salmo 119:105", text: "A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho." },
  { reference: "2 Timóteo 1:7", text: "Deus não nos deu espírito de covardia, mas de poder, de amor e de equilíbrio." },
  { reference: "Miquéias 6:8", text: "Pratique a justiça, ame a fidelidade e ande humildemente com o seu Deus." },
  { reference: "João 8:12", text: "Eu sou a luz do mundo. Quem me segue nunca andará em trevas." },
  { reference: "Salmo 91:2", text: "Direi do Senhor: Ele é o meu refúgio e a minha fortaleza, o meu Deus, em quem confio." }
];

const gratitudeSeeds = [
  "pelo fôlego, pelo cuidado silencioso e pela chance de recomeçar",
  "pela tua presença antes de qualquer tarefa do dia",
  "pelas pequenas misericórdias que muitas vezes passam despercebidas",
  "pela Palavra que organiza meu coração quando tudo parece disperso",
  "por não me tratares segundo minha pressa, mas segundo teu amor"
];

const surrenderSeeds = [
  "entrego minhas agendas, meus medos e minha necessidade de controlar tudo",
  "coloco diante de ti o que não consigo resolver sozinho",
  "renuncio a ansiedade de antecipar dores que ainda nem chegaram",
  "abro mão da dureza do coração e peço mansidão para este dia",
  "deixo aos teus pés minha pressa, minhas defesas e meus excessos"
];

const requestSeeds = [
  "guia minhas decisões com sabedoria simples e obediência possível",
  "ensina-me a responder com amor quando eu quiser reagir por impulso",
  "firma meus passos no que é verdadeiro, bom e necessário",
  "dá-me olhos atentos para servir alguém sem buscar aplauso",
  "fortalece minha fé nas horas pequenas, onde a constância é formada"
];

const prayerClosings = [
  "Que este dia não seja governado pela pressa, mas pela confiança de quem sabe que Deus caminha perto.",
  "Que a Palavra recebida pela manhã volte ao coração quando a rotina tentar roubar a paz.",
  "Que a presença de Cristo alcance os pensamentos, as conversas e os lugares silenciosos da alma.",
  "Que a graça de Deus sustente o que ainda parece frágil e renove a esperança no meio do caminho.",
  "Que este começo simples seja suficiente para lembrar: Deus não está distante do dia comum."
];

const devotionalOpenings = [
  "Existe uma diferença entre acordar e começar. Acordar é abrir os olhos; começar é permitir que o coração encontre um centro antes que o dia espalhe a atenção em muitas direções. Por isso, os primeiros minutos importam: não porque resolvem tudo, mas porque lembram quem sustenta tudo.",
  "A manhã costuma chegar com cobranças antes mesmo de encontrarmos palavras para orar. Há mensagens, planos, pendências e pensamentos que parecem pedir prioridade absoluta. Ainda assim, a Palavra de Deus nos convida a uma ordem mais profunda: antes de responder ao mundo, escutar o Senhor.",
  "A fé não vive apenas nos grandes encontros ou nas decisões marcantes. Ela também se forma nesses começos discretos, quando ninguém está vendo e o coração escolhe se deixar conduzir. Deus trabalha no secreto sem pressa, como quem planta raízes antes de mostrar frutos.",
  "Nem sempre a alma acorda pronta. Há dias em que a esperança parece baixa, a mente já desperta cansada e a oração sai pequena. Mesmo assim, Deus não despreza começos simples. Uma frase sincera diante dele pode ser mais verdadeira do que muitas palavras ditas sem presença.",
  "Começar com Deus não significa controlar o restante do dia. Significa reconhecer, logo cedo, que a vida não precisa ser carregada sozinho. A presença de Cristo não elimina toda tensão, mas muda o lugar de onde caminhamos: menos abandono, mais confiança."
];

const devotionalMiddles = [
  "Quando a Escritura chama o coração para a paz, ela não está negando os problemas reais. Ela está recolocando cada coisa no seu tamanho diante de Deus. O que pesa continua existindo, mas deixa de ocupar o trono. A ansiedade perde força quando encontra um Pai maior do que as possibilidades que assustam.",
  "Buscar a Deus em primeiro lugar não é uma competição com a agenda. É uma forma de lembrar que nenhuma tarefa é forte o bastante para substituir a presença dele. O dia pode continuar cheio, mas o coração não precisa entrar nele vazio.",
  "Permanecer em Cristo é uma imagem bonita porque fala de ligação, não de desempenho. O ramo não produz vida tentando parecer vivo; ele frutifica porque está unido à videira. A espiritualidade dos primeiros minutos é justamente essa volta à fonte.",
  "A graça de Deus visita também as partes inacabadas. O que ainda não está resolvido, o que ainda dói, o que ainda confunde, tudo pode ser colocado diante dele sem maquiagem. A oração da manhã não exige que a alma esteja arrumada; ela abre espaço para Deus arrumar por dentro.",
  "Há uma misericórdia própria da manhã: a chance de não ser definido apenas pelo que ontem foi. Deus nos encontra com verdade, mas também com renovação. O dia novo não apaga a história, porém anuncia que a última palavra ainda pertence ao Senhor."
];

const devotionalEndings = [
  "Talvez hoje não peça uma grande promessa, mas uma permanência humilde. Receba esta Palavra como quem recebe pão: simples, necessário, suficiente para continuar. Deus está no começo, no meio e no fim do dia.",
  "O convite é deixar que esta leitura acompanhe você sem peso. Não como uma tarefa a cumprir, mas como uma voz baixa lembrando que Cristo está presente. A fé cresce quando a Palavra deixa de ser apenas lida e passa a habitar.",
  "Se o coração se distrair, volte sem culpa. Se a pressa aparecer, lembre-se de que Deus não foi embora. O primeiro minuto entregue a ele pode iluminar muitos outros minutos comuns.",
  "A vida com Deus não precisa parecer impressionante para ser verdadeira. Ela pode começar assim: uma passagem lida com atenção, uma oração honesta, um coração menos fechado para a graça.",
  "Que esta mensagem não fique como frase bonita perdida na manhã. Que ela desça devagar, encontre lugar e faça companhia quando o dia mostrar sua velocidade."
];

export const yearlyDevotions: YearlyDevotion[] = Array.from({ length: 365 }, (_, dayIndex) => ({
  dayIndex,
  word: words[dayIndex % words.length],
  title: titles[dayIndex % titles.length],
  readReference: verses[dayIndex % verses.length].reference,
  verse: verses[dayIndex % verses.length],
  devotional: `${devotionalOpenings[dayIndex % devotionalOpenings.length]}\n\n${devotionalMiddles[Math.floor(dayIndex / 2) % devotionalMiddles.length]}\n\n${devotionalEndings[Math.floor(dayIndex / 3) % devotionalEndings.length]}`,
  impulse: prayerClosings[Math.floor(dayIndex / 4) % prayerClosings.length],
  gratitudeSeed: gratitudeSeeds[dayIndex % gratitudeSeeds.length],
  surrenderSeed: surrenderSeeds[Math.floor(dayIndex / 2) % surrenderSeeds.length],
  requestSeed: requestSeeds[Math.floor(dayIndex / 3) % requestSeeds.length],
  practiceSeed: prayerClosings[Math.floor(dayIndex / 5) % prayerClosings.length]
}));
