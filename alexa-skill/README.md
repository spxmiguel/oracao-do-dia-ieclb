# Alexa Skill - Oração do Dia Luterana

Este diretório contém todos os arquivos necessários para criar uma Skill personalizada da Alexa que lê as orações do devocional baseando-se no horário do seu dispositivo Alexa (Madrugada, Manhã, Tarde ou Noite) e suporta geração em tempo real usando a Gemini API de forma 100% segura.

Utilizaremos o modelo **Alexa-Hosted (Node.js)** da Amazon, que é **totalmente gratuito** e roda os códigos na própria nuvem da Amazon (sem precisar configurar servidores AWS ou pagar hospedagem).

---

## 📋 Arquivos Incluídos

1. `index.js`: Código-fonte em Node.js contendo a lógica dos intents da Alexa, banco de dados backup e conexão com a Gemini API.
2. `package.json`: Manifesto de dependências do Node.js.
3. `model.json`: Modelo de interação em português com as frases que a Alexa entende.

---

## 🚀 Passo a Passo para Configuração (Menos de 3 Minutos)

### Passo 1: Criar a Skill na Amazon
1. Acesse o [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask) e faça login com sua conta da Amazon (a mesma conta vinculada às suas caixas Echo/Alexa).
2. Clique em **Create Skill** (Criar Skill).
3. Preencha as configurações iniciais:
   * **Skill Name**: `Oração do Dia`
   * **Primary Language**: `Portuguese (BR)`
4. Em **Choose a model to add to your skill**, selecione **Custom** (Personalizado).
5. Em **Choose a method to host your skill's backend**, selecione **Alexa-Hosted (Node.js)**.
6. Role a página até o topo e clique em **Create Skill** no canto superior direito. Escolha o template padrão (*Start from Scratch*) se solicitado e aguarde cerca de 1 minuto enquanto a Amazon prepara o ambiente.

### Passo 2: Configurar as Frases que a Alexa Entende (Modelo de Interação)
1. No menu lateral esquerdo do console da Alexa, clique em **Interaction Model** > **JSON Editor**.
2. Abra o arquivo [model.json](model.json) deste diretório, copie todo o seu conteúdo e cole dentro da caixa de texto do console (substituindo o conteúdo existente).
3. Clique em **Save Model** (Salvar Modelo) no topo e depois em **Build Model** (Construir Modelo). Aguarde a mensagem de sucesso da compilação.

### Passo 3: Colar o Código do Backend
1. No menu superior do console da Alexa, clique na aba **Code** (Código).
2. Substitua o conteúdo do arquivo `index.js` da Alexa pelo código contido no nosso [index.js](index.js).
3. Substitua o conteúdo do arquivo `package.json` da Alexa pelo nosso [package.json](package.json).
4. Clique em **Save** (Salvar) e depois em **Deploy** (Implantar) no topo direito.

### Passo 4: Habilitar Permissão de Fuso Horário (Importante)
Para que a Alexa saiba se é manhã, tarde, noite ou madrugada no seu dispositivo, ela precisa saber seu fuso horário local:
1. No menu superior da Alexa, clique na aba **Build** (Construir).
2. No canto inferior esquerdo, clique em **Permissions** (Permissões).
3. Ative a chave ao lado de **Device Country and Timezone** (País e fuso horário do dispositivo).

### Passo 5: Configurar a Chave da IA (Opcional & Seguro)
Para que a Alexa gere orações por IA em tempo real de forma totalmente segura (sem expor sua chave ao público):
1. Na aba **Code** (Código) da Alexa, clique no botão **Environment Variables** (Variáveis de Ambiente) localizado na barra de ferramentas superior do editor de código.
2. Adicione uma nova variável:
   * **Key**: `GEMINI_API_KEY`
   * **Value**: Coloque sua chave gratuita da API do Gemini (a mesma que obteve no Google AI Studio para o site).
3. Clique em **Save**.
4. Faça um novo **Deploy** do código para aplicar a variável.
*Nota: Se você não configurar essa variável, a Alexa lerá perfeitamente as orações locais do banco de dados de backup.*

---

## 🧪 Testando a Skill

1. Vá para a aba **Test** (Teste) no console da Alexa.
2. Mude o menu suspenso de "Test is disabled for this skill" para **Development** (Desenvolvimento).
3. Você pode digitar ou falar usando o microfone do computador:
   * *"Alexa, abra Oração do Dia"*
   * *"Pedir para Oração do Dia fazer uma oração"*
4. A skill irá rodar e ler a oração do período do dia correspondente!
5. **No seu dispositivo Echo físico**: Como você usou a mesma conta Amazon, a skill já estará disponível para teste nos seus aparelhos físicos. Basta dizer ao seu dispositivo Echo:
   * *"Alexa, abrir Oração do Dia"* ou *"Alexa, iniciar Oração do Dia"*.
