# ps2_portfolio
https://portfoliops2-daansterckx.netlify.app/
# sterckx-it.be

## Portfolio thumbnails

Portfolio thumbnails are displayed in a grid and are cropped to a consistent size using custom CSS. If you add or replace thumbnails, put them in `assets/img/portfolio/thumbnails/`. Fullsize images for the lightbox belong in `assets/img/portfolio/fullsize/`.

The thumbnail display logic and overrides are in `css/custom.css` (loaded after the main theme CSS). Use images with similar aspect ratios (ideally 4:3 or 16:9) for the best results; object-fit: cover will crop as needed.
