# CartPickify — static site

A ClickBank affiliate review site built from the *CartPickify — ClickBank Affiliate UI* mockup.
Plain HTML/CSS/JS with no build step, so it can be hosted on any static host (GitHub Pages, Netlify, Vercel, S3).

## Pages

| Mockup board | Page |
| --- | --- |
| 01 · Homepage | `index.html` |
| 02 · Product review | `review.html` |
| 03 · Quiz funnel / bridge page | `quiz.html` (3 questions → email capture → matched product) |
| 04 · Mobile review + sticky CTA | `review.html` under 760px wide: chip nav, compact verdict, sticky “Check price” bar |

Pages the mockup links to: `category.html?goal=<id>` (one template for every health goal),
`reviews.html` (library with search `?q=` and type filter `?type=`), `compare.html`, `guide.html`,
`how-we-review.html`, `about.html`, `editorial-policy.html`, `contact.html`, `disclosure.html`,
`privacy.html`, `terms.html` and `404.html`.

## Filling in content

Product data lives in **`assets/data.js`**: names, scores, prices, guarantees, badges, quiz questions,
articles and the CTA colour. Each product's `affiliateUrl` holds its ClickBank hoplink. Every
“Check price ↗” button that carries `data-aff="<product id>"` picks its link up from there and gets
`rel="sponsored nofollow"` automatically.

Copy inside `[brackets]` is placeholder text taken straight from the mockup. Replace it with your own
research. The privacy and terms pages are templates and need a legal review before you launch.

- **CTA colour:** set `cta` in `data.js`. To preview a different colour, add `?cta=1D4ED8` to any URL.
- **Email forms** (newsletter, quiz, contact) validate the address and show a confirmation message. Connect your
  email provider in `assets/site.js` where it says `Hook up your email provider here`.
- **Quiz deep link:** `quiz.html?goal=sleep` skips straight to question 2.

## Run locally

```bash
cd cartpickify
python3 -m http.server 8000   # open http://localhost:8000
```
