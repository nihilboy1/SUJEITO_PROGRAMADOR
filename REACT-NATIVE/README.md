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

<section>
<h1>Firebase Android Nativo</h1>

<ul>
  <p>Já com uma aplicação React Native CLI criada, (Provavelmente com os comandos acima) criamos agora um projeto padrão no Firebase:</p>
  <li>Adicionamos nome, habilitamos ou não o analítics e aguardamos o projeto ser criado </li>
  <li>Clicamos no ícone do Android e informamos o <code>package name</code> da aplicação que criamos anteriormente (Esse package name pode ser encontrado em <code>/android/app/src/main/AndroidManifest.xml</code>). Logo após, informamos o nickname do projeto Android/Firebase e clicamos em <code>Register</code> e aguardamos</li>
  <li>Agora, se mostrará disponivel para download o arquivo <code>google.services.json</code>. Devemos baixar esse arquivo avançar até entrarmos no console do firebase </li>
  <li>Com a parte do firebase concluída, vamos colocar o arquivo baixado na pasta <code>/android/app</code> do nosso projeto CLI</li></li>
  <li>Com isso feito, vamos até a lib do <a href="https://rnfirebase.io/">RNFirebase</a> e dentro do nosso projeto CLI, usando NPM rodamos o comando <code>npm install --save @react-native-firebase/app</code></li>
  <h3>Com a lib instalada, vamos configurar a parte nativa:</h3>
  <li>Em <code>/android/build.gradle</code> no objeto <code>dependencies</code>, que está dentro de <code>buildscript</code>, adicionamos o classpath: <code>classpath 'com.google.gms:google-services:4.3.15'</code>  
   </li>
   <li>Agora em <code>/android/app/build.gradle</code> adicionamos no inicio do arquivo o plugin: <code>apply plugin: 'com.google.gms.google-services'
    /code> </li>
    <h3>Com tudo acima ja feito, podemos instalar os módulos:</h3>
    <p>Para autenticação: <code>@react-native-firebase/auth</code> </p>
    <p>Para storage: <code>@react-native-firebase/storage</code> </p>
    <p>Para database: <code>@react-native-firebase/firestore</code> </p>
</ul>


</section>
