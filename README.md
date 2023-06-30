<section>
<h1>Configuração do ambiente React Native</h1>
<h3>Antes de começar a utilizar o <code>react-native-cli</code>, é necessário instalar algumas dependências:</h3>
<ol>
  <li><strong>Node.js LTS:</strong> Instale a versão LTS mais recente do Node.js.</li>
  <li><strong>Python LTS:</strong> Embora não seja mencionado na documentação oficial, é recomendável instalar a versão LTS mais recente do Python, pois algumas dependências podem exigir sua presença.</li>
  <li><strong>Open JDK 11:</strong> Instale o Open JDK 11 para o desenvolvimento do Android.</li>
  <li><strong>Android Studio:</strong> Instale o Android Studio, que será usado para configurar e executar o ambiente de desenvolvimento Android.</li>
</ol>
<h3>Após a instalação das dependências, siga as etapas abaixo:</h3>
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
    %ANDROID_HOME%\emulator
    %ANDROID_HOME%\tools
    %ANDROID_HOME%\tools\bin
    %ANDROID_HOME%\platform-tools
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
<ul>
  <li>
    Instalar o Android Studio, selecionando o caminho <code>A:/Android/Sdk</code> como localização do SDK durante a instalação.
  </li>
  <li>
    Se você já tiver o Android Studio instalado, atualize o caminho do SDK para o diretório definido anteriormente como <code>ANDROID_HOME</code>.
  </li>
</ul>
<p>Após concluir essas etapas, você pode criar um novo projeto com o <code>react-native-cli</code> usando os seguintes comandos:</p>
<ul>
  <li>Para criar um projeto com <code>typescript</code> em uma pasta vazia: <code>npx react-native init appName --template react-native-template-typescript</code>.</li>
  <li>Para executar o projeto com o Android Studio aberto: <code>npx react-native run-android</code>.</li>
</ul>
<p>Essas instruções configuram seu ambiente para começar a desenvolver aplicativos com React Native. Tenha em mente que podem haver outras configurações específicas dependendo do sistema operacional que você está usando.</p>
</br>
</section>

<section>
<h1>Sobre alguns arquivos comuns no Boilerplate</h1>
<h3>Babel</h3>
<p>
Em resumo, o arquivo babel.config.js no React Native é usado para configurar o Babel, uma ferramenta de compilação de JavaScript. Nele, você pode definir presets e plugins para transformar o código ECMAScript moderno em uma versão compatível com versões mais antigas do JavaScript. O arquivo babel.config.js é colocado no diretório raiz do projeto e pode ser personalizado de acordo com as necessidades do projeto. No entanto, a partir do React Native 0.60, a configuração padrão do Babel já é adequada para a maioria dos casos e não requer modificações manuais no arquivo babel.config.js.
</p>
<h3>Watchman</h3>
<p>
Em resumo, o arquivo .watchmanconfig é usado pelo Watchman para monitorar alterações em um diretório ou conjunto de arquivos. Ele fornece configurações específicas sobre quais diretórios ou arquivos monitorar e como lidar com as alterações. No contexto do React Native, o .watchmanconfig é útil para especificar diretórios a serem ignorados, como .git e node_modules, e para evitar monitorar diretórios associados a sistemas de controle de versão. O uso do Watchman não é obrigatório, mas pode melhorar o desempenho e a eficiência ao monitorar alterações nos arquivos e acionar ações específicas, como recarregar o aplicativo em tempo real.
</p>
</section>

<section>
<h1>Adicionando custom fonts no react-native cli</h1>
<ol>
<li>
Primeiro baixamos os arquivos .ttf pelo google fonts, por exemplo
</li>
<li>
Deixamos todos os arquivos dentro de uma pasta "fonts", que pode ficar dentro do projeto em "./src/assets/fonts"
</li>
<li>
Após isso, criamos o arquivo "react-native.config.js" e adicionamos a ele o caminho das nossas fontes da seguinte forma:
<code>
module.exports = {
    project: {
        ios:{},
        android:{}
    },
    assets:['./src/assets/fonts'],
}
</code>
</li>
<li>Por ultimo, rodamos <code>npx react-native-asset</code> para executar a ligação </li>
</ol>
</section>
