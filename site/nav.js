// Header navigation. Without this script the header stays collapsed: the Menu button opens the list as a popover and
// Docs is a plain nested list. The script only decides, from the measured width of the row, whether everything fits
// inline (class is-wide), and in that case turns the Docs list into a dropdown popover. The browser's popover
// handles Escape, outside clicks and returning focus.
if ('popover' in HTMLElement.prototype) {
  const header = document.querySelector('.site-header');
  const inner = header.querySelector('.header-inner');
  const menu = header.querySelector('.site-menu');
  const submenu = header.querySelector('.dropdown-list');
  const trigger = header.querySelector('.dropdown-trigger');
  const item = trigger.closest('li');
  let lastWidth = 0;

  function layout() {
    const wasOpen = menu.matches(':popover-open');
    // Measure the inline row: the list is not a popover and the submenu is hidden while it is measured.
    menu.removeAttribute('popover');
    submenu.setAttribute('popover', 'auto');
    header.classList.add('is-wide');
    const wide = inner.scrollWidth <= inner.clientWidth;
    lastWidth = header.clientWidth;
    trigger.setAttribute('aria-expanded', 'false');
    if (wide) return;
    header.classList.remove('is-wide');
    submenu.removeAttribute('popover');
    menu.setAttribute('popover', 'auto');
    if (wasOpen) menu.showPopover();
  }

  // The row is remeasured on every change while inline, and while collapsed only when the header has grown.
  function update() {
    if (!header.classList.contains('is-wide') && header.clientWidth <= lastWidth) return;
    layout();
  }

  new ResizeObserver(update).observe(header);
  new ResizeObserver(update).observe(menu);
  layout();
  document.fonts?.ready.then(layout);

  submenu.addEventListener('toggle', (event) => {
    trigger.setAttribute('aria-expanded', String(event.newState === 'open'));
    if (event.newState === 'open' && !CSS.supports('position-area', 'block-end')) place();
  });

  // Without anchor positioning the popover would sit in the middle of the viewport: put it under its trigger.
  function place() {
    const at = trigger.getBoundingClientRect();
    const size = submenu.getBoundingClientRect();
    const top = at.bottom + size.height > innerHeight ? at.top - size.height : at.bottom;
    submenu.style.top = `${Math.max(0, top)}px`;
    submenu.style.left = `${Math.min(Math.max(0, at.left), innerWidth - size.width)}px`;
  }

  // Tabbing out of the Docs item closes its dropdown.
  item.addEventListener('focusout', (event) => {
    if (event.relatedTarget && !item.contains(event.relatedTarget) && submenu.matches(':popover-open')) {
      submenu.hidePopover();
    }
  });

  // A link to a place on the same page does not reload it, so the open popover has to close itself.
  header.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    for (const open of header.querySelectorAll('[popover]:popover-open')) open.hidePopover();
  });
}
