// Header menu: the page works without this (every link is listed); with it, Docs becomes a dropdown on wide
// screens and one Menu button holds the list on narrow ones. CSS chooses which by width, aria-expanded is the state.
document.documentElement.classList.add('js');

const toggles = [...document.querySelectorAll('.nav-button')];

function setOpen(button, open) {
  button.setAttribute('aria-expanded', String(open));
}

function closeAll(except) {
  for (const button of toggles) if (button !== except) setOpen(button, false);
}

for (const button of toggles) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    closeAll(button);
    setOpen(button, open);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const open = toggles.find((b) => b.getAttribute('aria-expanded') === 'true' && b.offsetParent !== null);
  if (!open) return;
  closeAll();
  open.focus();
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header nav')) closeAll();
});

// A link to a place on the same page does not reload it, so the menu has to close itself.
document.addEventListener('click', (event) => {
  if (event.target.closest('.site-header nav a')) closeAll();
});

// Tabbing out of the menu closes it.
document.addEventListener('focusin', (event) => {
  if (!event.target.closest('.site-header nav')) closeAll();
});
