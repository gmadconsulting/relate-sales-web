# RelateSales — sito web

Sito vetrina di RelateSales. Vite + React 19 + TypeScript + Tailwind CSS v4.

## Comandi

- `npm run dev` — dev server su http://localhost:5173
- `npm run build` — type-check + build di produzione
- `npm run lint` / `npm run format` / `npm run typecheck`

## Struttura

- `src/App.tsx` — composizione della pagina
- `src/sections/` — le 16 sezioni della landing, nell'ordine del copy
- `src/components/` — componenti riutilizzabili
- `src/components/mockups/` — schermate del gestionale ricostruite in HTML sugli screenshot reali (dati inventati in `data.ts`, atomi UI in `kit.tsx`, shell in `AppFrame.tsx`)
- `src/lib/motion.tsx` — primitive di animazione condivise
- `public/` — asset statici (immagini, favicon)
- Import con alias `@/` → `src/`

## Design

- Fonte di verità: design pack in `../gestionale-relatesales/design-pack-relatesales/` (tokens, componenti, schermate).
- Accent `#FD6C01`, sfondo `#F5F5F7`, card bianche con ombra hairline, separatori 0.5px, font Apple stack. Niente viola, niente Inter/Roboto, niente glow.
- Token in `src/index.css` (`@theme`): usa `bg-primary`, `text-muted`, `shadow-card`, ecc.
- I mockup si disegnano a misura reale (`APP_W`×`APP_H` = 1480×860) e si scalano con `ScaledFrame`. Nomi di persone e aziende sempre inventati, mai dati reali.

## Animazioni

- Libreria `motion` (`motion/react`). Primitive in `src/lib/motion.tsx`: `Reveal`, `Stagger`/`Item`, `Words` (titoli parola per parola), `useStickyProgress` + `useStep` (sezioni sticky), `Seq`/`SeqItem`/`Grow` (pezzi dei mockup che entrano in cascata, attivati da `PlayProvider`).
- Stile ispirato ad Attio: curva `EASE` [0.22, 1, 0.36, 1], blur 4–8px che si dissolve, spostamenti piccoli (10–20px), indicatori che scivolano con `layoutId`, scroll ammorbidito da molla. Niente rimbalzi vistosi né loop invadenti.
- Rispettare sempre `prefers-reduced-motion`.

## Copy

- Il nome del prodotto si scrive sempre **RelateSales** (attaccato, S maiuscola). Mai "Relate Sales".
- Il testo viene da "Landing page — Gestionale Relate Sales" (doc del cliente): non riscriverlo.
- Una sola azione in tutta la pagina: "Richiedi una demo" (`DemoButton`, ancora `#demo`).

## Convenzioni

- Testi del sito in italiano.
- Stile solo con classi Tailwind.

## GitHub — SOLO account gmadconsulting

Repo: gmadconsulting/relate-sales-web. Non usare né attivare mai l'account `andreadonadoni` per questo progetto.

- La git config locale del repo fissa autore e credenziali su gmadconsulting: non modificarla.
- Mai `gh auth switch`. Per i comandi `gh` usa `GH_TOKEN=$(gh auth token --user gmadconsulting) gh ...`.
