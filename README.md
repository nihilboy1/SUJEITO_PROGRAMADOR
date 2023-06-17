<h2>Configuração do ambiente React Native</h2>

<p>Antes de começar a utilizar o <code>react-native-cli</code>, é necessário instalar algumas dependências:</p>

<ol>
  <li><strong>Node.js LTS:</strong> Instale a versão LTS mais recente do Node.js.</li>
  <li><strong>Python LTS:</strong> Embora não seja mencionado na documentação oficial, é recomendável instalar a versão LTS mais recente do Python, pois algumas dependências podem exigir sua presença.</li>
  <li><strong>Open JDK 11:</strong> Instale o Open JDK 11 para o desenvolvimento do Android.</li>
  <li><strong>Android Studio:</strong> Instale o Android Studio, que será usado para configurar e executar o ambiente de desenvolvimento Android.</li>
</ol>

<p>Após a instalação das dependências, siga as etapas abaixo:</p>

<ol>
  <li>
    <p>Crie uma pasta para armazenar o SDK do Android em um caminho curto, por exemplo: <code>A:/Android/Sdk</code>.</p>
  </li>
  <li>
    <p>Configure a variável de ambiente <code>ANDROID_HOME</code> com o caminho da pasta que você definiu para o SDK:</p>
    <ol>
      <li>Acesse "Editar as variáveis de ambiente" ou "Variáveis de ambiente".</li>
      <li>Adicione <code>ANDROID_HOME</code> nas variáveis de usuário e de sistema, com o caminho do diretório do SDK.</li>
    </ol>
  </li>
  <li>
    <p>Adicione os seguintes caminhos ao <code>PATH</code> das variáveis de usuário e de sistema:</p>
    <pre>
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%ANDROID_HOME%\platform-tools
    </pre>
  </li>
  <li>
    <p>Configure a variável de ambiente <code>JAVA_HOME</code>:</p>
    <ol>
      <li>Acesse "Editar as variáveis de ambiente" ou "Variáveis de ambiente".</li>
      <li>Adicione <code>JAVA_HOME</code> nas variáveis de usuário e de sistema, com o caminho de instalação do JDK, por exemplo: <code>C:\Program Files\Microsoft\jdk-11.0.18.10-hotspot</code>.</li>
    </ol>
  </li>
</ol>

<p>Por último, em relação ao Android Studio, você pode seguir uma das duas opções:</p>

<ol>
  <li>
    <p>Opção 1: Instalar o Android Studio, selecionando o caminho <code>A:/Android/Sdk</code> como localização do SDK durante a instalação.</p>
  </li>
  <li>
    <p>Opção 2: Se você já tiver o Android Studio instalado, atualize o caminho do SDK para o diretório definido anteriormente como <code>ANDROID_HOME</code>.</p>
  </li>
</ol>

<p>Após concluir essas etapas, você pode criar um novo projeto com o <code>react-native-cli</code> usando os seguintes comandos:</p>

<ul>
  <li>Para criar um projeto em uma pasta vazia: <code>npx react-native init appName --template react-native-template</code>.</li>
  <li>Para executar o projeto com o Android Studio aberto: <code>npx react-native run-android</code>.</li>
</ul>

<p>Essas instruções configuram seu ambiente para começar a desenvolver aplicativos com React Native. Tenha em mente que podem haver outras configurações específicas dependendo do sistema operacional que você está usando.</p>
