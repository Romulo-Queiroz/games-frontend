# Games Frontend

Interface React que consome a Web API **GameServiceAPI** para recomendar jogos gratuitos com base em gênero, plataforma e memória RAM.

## Tecnologias e bibliotecas utilizadas

* **Vite** – ferramenta de build rápida para projetos React
* **React + TypeScript** – framework de UI com tipagem estática
* **Axios** – cliente HTTP para requisições à API
* **MUI (Material‑UI)** – biblioteca de componentes React baseada no Material Design

  * `@mui/material`
  * `@mui/icons-material`
  * `@emotion/react` + `@emotion/styled` para CSS‑in‑JS

## Estrutura do projeto

```
games-frontend/
├── node_modules/
│
├── public/
│   ├── index.html
│   ├── background.mp4
│   └── vite.svg
│
├── src/
│   ├── api/
│   │   └── gamesApi.ts
│   │
│   ├── assets/                ← (opcional: imagens, fontes etc.)
│   │
│   ├── components/
│   │   ├── BackgroundVideo.tsx
│   │   ├── ErrorDialog.tsx
│   │   ├── GameForm.tsx
│   │   ├── GameResult.tsx
│   │   └── WarningAlert.tsx
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env                       ← variáveis de ambiente (ex. VITE_API_BASE_URL)
├── .gitignore
├── index.html                 ← (copia em root; apenas public/index.html é usada)
├── package.json
├── package-lock.json
├── README-frontend.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts

```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do `games-frontend` para definir a URL base da API:

```env
VITE_API_BASE_URL=https://localhost:5001
```

> Se não informado, o frontend usa `https://localhost:5001` como padrão.

## Como rodar o projeto

1. **Instalar dependências**

   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

   * Abre o servidor Vite em `http://localhost:5173/` por padrão.

3. **Build para produção**

   ```bash
   npm run build
   ```

   * Gera a pasta `dist/` com os arquivos otimizados.

4. **Pré‑visualizar o build**

   ```bash
   npm run preview
   ```

## Scripts disponíveis

No `package.json`:

| Comando           | Descrição                              |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Inicia servidor Vite para dev (HMR)    |
| `npm run build`   | Gera build de produção em `dist/`      |
| `npm run preview` | Serve o conteúdo de `dist/` localmente |

## Uso

1. Abra `http://localhost:5173` no navegador.
2. Preencha:

   * **Gêneros** (vírgula separados: `Shooter,MMORPG`)
   * **Plataforma** (`all`, `pc` ou `browser`)
   * **Memória (GB)** (inteiro > 0)
3. Clique em **Buscar Jogo**.
4. Veja o jogo recomendado ou a mensagem de erro.

---

Desenvolvido com ❤️ por Rômulo Queiroz. Qualquer dúvida, abra uma issue ou pull request neste repositório.
