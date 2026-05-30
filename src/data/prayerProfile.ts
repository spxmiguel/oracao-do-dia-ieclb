import type { PrayerFocus, PrayerLength, PrayerTone } from "../types";

export const prayerFocusLabels: Record<PrayerFocus, string> = {
  peace: "Preciso começar com calma",
  gratitude: "Quero perceber melhor o cuidado de Deus",
  direction: "Quero clareza para o próximo passo",
  family: "Minha casa e meus vínculos estão no centro",
  forgiveness: "Quero um coração mais leve",
  discipline: "Quero constância sem culpa"
};

export const prayerToneLabels: Record<PrayerTone, string> = {
  intimate: "Como uma conversa sincera",
  reverent: "Com reverência e quietude",
  direct: "Simples e sem rodeios"
};

export const prayerLengthLabels: Record<PrayerLength, string> = {
  short: "Poucas palavras, bem direto",
  balanced: "Um meio-termo tranquilo",
  deep: "Quero ficar um pouco mais"
};

export const prayerFocusOptions = Object.entries(prayerFocusLabels).map(([value, label]) => ({
  value: value as PrayerFocus,
  label
}));

export const prayerToneOptions = Object.entries(prayerToneLabels).map(([value, label]) => ({
  value: value as PrayerTone,
  label
}));

export const prayerLengthOptions = Object.entries(prayerLengthLabels).map(([value, label]) => ({
  value: value as PrayerLength,
  label
}));

export const prayerDiscoveryFocusOptions: Array<{
  value: PrayerFocus;
  title: string;
  description: string;
}> = [
  {
    value: "peace",
    title: "Meu dia costuma começar acelerado",
    description: "Quero respirar, aquietar o coração e não entrar no dia no automático."
  },
  {
    value: "direction",
    title: "Estou tentando discernir meus próximos passos",
    description: "Quero uma oração que me ajude a decidir com fé e clareza."
  },
  {
    value: "gratitude",
    title: "Quero notar mais as coisas boas",
    description: "Preciso treinar meus olhos para reconhecer cuidado, graça e pequenos recomeços."
  },
  {
    value: "family",
    title: "Minha rotina gira muito em torno das pessoas",
    description: "Casa, família, amigos ou relações precisam aparecer na minha oração."
  },
  {
    value: "forgiveness",
    title: "Quero carregar menos peso por dentro",
    description: "Preciso de uma oração que fale de cura, perdão e coração mais livre."
  },
  {
    value: "discipline",
    title: "Quero viver minha fé com mais constância",
    description: "Sem cobrança pesada, mas com firmeza nos pequenos hábitos."
  }
];

export const prayerDiscoveryToneOptions: Array<{
  value: PrayerTone;
  title: string;
  description: string;
}> = [
  {
    value: "intimate",
    title: "Eu oro melhor quando parece conversa",
    description: "Linguagem próxima, honesta e simples."
  },
  {
    value: "reverent",
    title: "Prefiro um momento mais silencioso e reverente",
    description: "Tom contemplativo, com mais pausa e solenidade."
  },
  {
    value: "direct",
    title: "Preciso de algo objetivo para começar",
    description: "Poucas voltas, direto ao coração do dia."
  }
];

export const prayerDiscoveryLengthOptions: Array<{
  value: PrayerLength;
  title: string;
  description: string;
}> = [
  {
    value: "short",
    title: "Tenho poucos minutos",
    description: "Uma oração curta, para entrar no dia com direção."
  },
  {
    value: "balanced",
    title: "Quero um ritual de dois minutos",
    description: "Tempo suficiente para agradecer, entregar e pedir."
  },
  {
    value: "deep",
    title: "Quero me demorar um pouco mais",
    description: "Uma oração mais completa, para dias que pedem mais presença."
  }
];
