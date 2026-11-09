# VideoHub · Electrolyte Seminar

A standalone, projector-ready educational parody of a classic black-and-orange video website. The layout is intentionally dense and familiar: masthead, search, left sidebar, category chips, a four-column gallery on wide desktop screens, and a watch page with related topics.

**Nothing streams.** Each “video” is a local HTML slide deck embedded in a 16:9 player. Your Reveal.js mini-presentations stay separate.

## Quick start

1. Unzip the package.
2. Open **`index.html`** in Chrome, Edge, or Firefox.
3. On the opening screen, select **Yes, enter the site**.
4. Click any video tile to launch a working three-slide sample deck. Choose **Fullscreen** below the player to present it.

No npm, build step, backend, account, or internet connection is required for the gallery and bundled sample decks. To serve from a local URL instead of opening the file directly (recommended for decks that use JavaScript modules or `fetch`), run in this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Replace the sample decks and thumbnail previews

The **only file you need to edit for topic metadata** is `data/videos.js`.

Every item has a unique `id`, `title`, `category`, `deck`, and `thumbnail`:

```js
{
  id: 'sodium',
  title: 'Sodium (Na⁺): The Ion Behind Depolarization',
  short: 'Sodium',
  category: 'Electrolytes',
  deck: 'decks/sodium/index.html',
  thumbnail: 'thumbnails/sodium.webp',
  symbol: 'Na⁺',
  // ...rest of the optional metadata
}
```

### Your Reveal.js slides

Replace the example `decks/sodium/index.html` with your real `index.html`. Keep all associated folders (CSS, JS, images, videos, fonts, etc.) in the same relative locations the real deck expects.

For example:

```
decks/
  sodium/
    index.html     ← your real Reveal.js presentation
    images/
    assets/
  potassium/
    index.html
    images/
```

If your current deck lives elsewhere, copy its complete folder into `decks/` and change the video's `deck` path in `data/videos.js`. Do **not** merge the decks; each card opens one independently.

The included 12 `decks/*/index.html` files are **three-slide placeholders**, not your completed presentations. They work with arrow keys without loading Reveal.js. Your own Reveal.js files replace them exactly.

### Your actual thumbnails

Drop your thumbnails in the `thumbnails/` folder using the expected filenames: `sodium.webp`, `potassium.webp`, `calcium.webp`, etc. An image should ideally be **16:9**, for example 1280×720. If your files are PNG or JPG, set the appropriate file extension in `data/videos.js`.

The website automatically uses a matching **bundled SVG artwork preview** under `thumbnails/fallback/` if the target thumbnail isn't present. Your final thumbnails replace these previews without any extra edits if their filenames match.

### Actual slide counts and ordering

At the bottom of `data/videos.js`, the site provides default `slides: 3` for the sample decks. Once you add your real decks, set the slide count for each item with an explicit `slides: 5`, etc., and the defaults will not override it. The labels are cosmetic; Reveal.js itself controls slide navigation.

The array order is the seminar order, used by **Next** and **Seminar order** sorting. `views`, `postedDays`, and popularity values are parody metadata, not real analytics.

## Controls

| Action | What happens |
|---|---|
| Click any thumbnail | Opens that topic's separate slide deck in the watch page |
| **Fullscreen** under player | Expands the slides to fill the screen, suitable for projector use |
| Left / right arrows, with the slides focused | Navigates slides using your deck's own controls |
| **Next** under the video | Opens the next topic in `data/videos.js` |
| Circular arrow under player | Restarts the current deck |
| Home / Videos / Trending / Newest | Changes the gallery view |
| Search | Searches topics, titles, descriptions, and tags |
| Category chips | Filters the gallery |
| Grid / list buttons | Switches browsing layout |
| Like / Watch later | Saves locally in the browser; sidebar Library tabs display them |
| History | Lists the decks opened in this browser |
| `Esc` | Returns to gallery outside fullscreen; exits fullscreen in fullscreen mode |
| `/` | Focuses search |
| `I` | Replays the mock opening screen |

The header's fake Upload, Join and Log in controls give informational popups; there are no servers or accounts.

## Theme colors

Everything important is configured near the top of `styles.css`:

```css
:root {
  --bg: #0a0a0a;
  --panel: #101010;
  --text: #f5f5f5;
  --accent: #ff9900;
  --sidebar-width: 205px;
}
```

Change `--accent` once to recolor buttons, chips, highlighting and link accents.

## Opening screen

The fictional “viewer discretion” opener appears once per browser tab. Press `I` to replay it at any time; adding `?intro=1` to the website URL also forces it. It is **not** an actual age-verification system. The site contains only educational material.

## Technical details

- Pure local HTML, CSS and JavaScript. No React or build tooling.
- Responsive on desktop, tablet and mobile.
- Browser history and deep links for topic pages when browser permissions allow them.
- The gallery and bundled previews work offline. If your own Reveal.js presentations load Reveal.js via a remote CDN, those files may still need internet access. For fully offline delivery, bundle Reveal.js locally in each deck.
- None of your thumbnails or presentations were available in this chat, so the package uses custom SVG preview artwork and the previously generated placeholder slides until you replace them.

## Intro MP4 before EVERY mini-deck (added)

This version plays **one local, non-explicit intro clip before each presentation**, including when you use **Next** or open a related topic. The decks themselves have not been edited.

1. Put the MP4 you already have at **`assets/intro.mp4`** (exact filename, lowercase).
2. Open `index.html` and enter the site.
3. Select any thumbnail: the intro plays in the video player first, then the Reveal.js deck loads automatically when the video ends.
4. Press **S** or click **Skip intro** to jump straight to the slides.

**Restart** replays the intro and then reloads the slides. To change that, set `INTRO_ON_RESTART = false` near the top of `app.js`. To use another video location, edit `INTRO_VIDEO_PATH` in that file. Only one MP4 is needed for all topics.

The video is designed to start from the same click used to open a topic, so browsers normally permit sound. If you open a deck directly with a URL and autoplay is blocked, click the **Play intro** button. If the intro file is missing or its format isn't supported, the site falls back to the slides automatically. For best compatibility, use an MP4 encoded with H.264 video and AAC audio.

**Important:** `assets/intro.mp4` is **not included** in this ZIP; supply your own clip. The rest of the website still works without it.
