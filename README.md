# FOIT: Flash Of Incorrect Theme

This began as a mentoring project on ReactJS - a typical TodosList.

I got carried away adding a few features and theming it, and at the point of implementing a light & dark theme, and testing switching browser's default choice.

That's when I (re-)discovered the FOIT and set about to resolve it.


Basically, move all color options into media queries for `(prefers-color-scheme = "light")` and a media query for dark.

Then (this is kinda ugly), repeat those declarations outside the media queries under selectors like `body.theme-light` and `body.theme-dark`.

This allows for the correct theme to be chosen based upon OS / browser preferences at initial load, and allows for toggling themes via JS using something like:
```
elements = document.querySelectorAll('.theme-light');
elements.forEach( item => {
  item.classList.add('theme-dark`);
  item.classList.remove('theme-light');
  });
```

I'm not thrilled by the amount of duplicated code & declarations, but it's a fool-proof way to handle theming without FOIT.


Also, it was a chance to implement the "[random scramble](http://ronaldbarnes.ca:8008/tools/)" text scrambling JS/HTML/CSS tool - works well.

[Live site](http://ronaldbarnes.ca:3003).
