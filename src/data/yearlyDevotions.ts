import type { YearlyDevotion } from "../types";

const words = [
  "Paz", "Graça", "Direção", "Confiança", "Descanso", "Perdão", "Coragem", "Esperança", "Presença", "Fidelidade",
  "Mansidão", "Alegria", "Sabedoria", "Entrega", "Cuidado", "Renovo", "Verdade", "Amor", "Constância", "Luz",
  "Paciência", "Refúgio", "Bondade", "Clareza", "Força", "Silêncio", "Gratidão", "Caminho", "Misericórdia", "Recomeço"
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

const practiceSeeds = [
  "Que eu escolha uma atitude concreta de paz antes de exigir mudança dos outros.",
  "Que eu faça o próximo passo com fidelidade, sem tentar viver o dia inteiro de uma vez.",
  "Que eu guarde alguns segundos de silêncio antes das decisões importantes.",
  "Que eu procure uma forma simples de amar alguém hoje.",
  "Que eu termine este dia mais inteiro do que comecei."
];

export const yearlyDevotions: YearlyDevotion[] = Array.from({ length: 365 }, (_, dayIndex) => ({
  dayIndex,
  word: words[dayIndex % words.length],
  verse: verses[dayIndex % verses.length],
  gratitudeSeed: gratitudeSeeds[dayIndex % gratitudeSeeds.length],
  surrenderSeed: surrenderSeeds[Math.floor(dayIndex / 2) % surrenderSeeds.length],
  requestSeed: requestSeeds[Math.floor(dayIndex / 3) % requestSeeds.length],
  practiceSeed: practiceSeeds[Math.floor(dayIndex / 5) % practiceSeeds.length]
}));
