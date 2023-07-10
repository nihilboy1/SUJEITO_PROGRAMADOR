<h2>Básico:</h2>
<ol>
  <li>Instalar o TypeScript no projeto: <code>npm install typescript --save-dev</code> (vai precisar usar o <code>npx</code> antes do <code>tsc</code> para rodar os comandos)</li>
  <li>Instalar o TypeScript globalmente: <code>npm install -g typescript</code> (o comando <code>tsc</code> vai ser entendido em qualquer lugar do PC)</li>
  <li>Criar arquivo <code>.ts</code></li>
</ol>
<p>Maneira 1 de rodar o código:</p>
<ol>
  <li><code>npx tsc arquivo.ts</code> para transpilar o código para <code>.js</code></li>
  <li><code>node arquivo.js</code> para compilar o código para binário e rodar</li>
</ol>
<p>Maneira 2 de rodar o código:</p>
<ol>
  <li><code>npx tsc --init</code> para criar o arquivo JSON de configuração do TypeScript</li>
  <li><code>npx tsc --watch arquivo.ts</code> para um determinado arquivo ser transpilado para .js a cada alteração</li>
  <li><code>node arquivo.js</code></li>
</ol>
<p>Maneira 3 de rodar o código:</p>
<ol>
  <li>Criar script <code>"dev": "npx tsc arquivo.ts & node arquivo.js"</code> no <code>package.json</code></li>
  <li>Rodar <code>npm run dev</code> para transpilar, compilar e rodar o código logo em seguida</li>
</ol>
