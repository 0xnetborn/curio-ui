# Fridge AI - Progetto Curiositas

## Idea
App per iOS/Android che analizza il fridge/dispensa tramite foto e suggerisce ricette in base agli ingredienti disponibili.

## Features
1. 📸 **Foto Fridge** - Computer vision analizza ingredienti
2. ⚠️ **Scadenze** - Rileva date e warn se in scadenza
3. ✏️ **Input Manuale** - "feta scade domani"
4. 🍝 **Ricette AI** - Genera ricette con quantità e procedimento
5. 🎬 **YouTube** - Link a short/video ricette

## Tech Stack
- **App**: Flutter (native iOS + Android)
- **AI Vision**: Gemini (già disponibile)
- **Backend**: API (stesso server OpenClaw?)
- **Video**: YouTube Data API
- **Pubblicazione**: Account Curiositas (App Store/Play Store)

## Flusso Utente
```
1. Scatta foto al fridge/dispensa
2. AI estrae ingredienti + date
3. AI genera ricetta con ingredienti disponibili
4. YouTube API → short/video ricette simili
```

## Team
- **Tommy**: PM, coordinazione
- **Izumo**: Backend, AI integration
- **Marco**: UI/UX, Flutter
- **MiniNetborn**: Documentazione, coordinazione

## Prossimi Step
- [ ] Creare repo Flutter
- [ ] Design UI su Figma
- [ ] Setup Gemini Vision
- [ ] Integrare YouTube API
- [ ] Test MVP

## Note
- Pubblicità TikTok/YouTube Shorts come canale marketing
- Account developer Curiositas per pubblicazione
