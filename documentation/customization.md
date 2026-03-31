# Customization Guide

## 🎨 Changing colors
You can modify the entire look of SonicStream by updating the CSS variables in `assets/css/style.css`:

```css
:root {
    --primary: #6366f1; /* Main brand color */
    --secondary: #ec4899; /* Accent color */
    --radius-md: 1rem; /* Adjust rounding of cards */
}
```

## 🌓 Dark Mode
Dark mode is automatically applied based on the `[data-theme="dark"]` attribute on the `<html>` tag. You can manually adjust dark-specific colors in the same `style.css` file under the dark selector.

## ✍️ Typography
We use **Outfit** for headings and **Inter** for body text. You can change these in the `@import` section of `style.css` and update the `--font-main` and `--font-heading` variables.

## 📱 Responsiveness
The grid system uses `repeat(auto-fit, minmax(300px, 1fr))` which handles most layout transformations automatically. For custom mobile tweaks, use the media queries at the bottom of `style.css`.
