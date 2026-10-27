(() => {
  const email = (window.SITE_CONFIG || {}).contactEmail || 'info@domain';
  document.querySelectorAll('[data-contact-email]').forEach(link => { link.href = `mailto:${email}`; link.textContent = email; });
  document.getElementById('year').textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('open');
  }));
  document.getElementById('contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `[Medqoria Global] ${data.get('subject')}`;
    const body = [`Name: ${data.get('name')}`, `Work email: ${data.get('email')}`, `Company: ${data.get('company') || 'Not provided'}`, '', data.get('message') || 'No additional details provided.'].join('\n');
    document.getElementById('form-status').textContent = `Your email app is opening a message to ${email}.`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
