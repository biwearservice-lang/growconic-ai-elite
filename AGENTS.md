# Architecture rules
- Keep the Journal intro in an isolated React Three Fiber overlay with a shared pure timeline module, so session/scroll lifecycle remains independent of journal data and its timing is testable.
- Read the intro's Three.js palette from scoped global CSS tokens so the intro can use a different palette without changing the rest of the site.