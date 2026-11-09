const WHATSAPP = '201143964379';
const CART_KEY = 'juba-cart';

const COLOR_HEX = {
  'أسود': '#111', 'أبيض': '#f2efe8', 'نبيتي': '#6b1a26', 'رمادي': '#9a9a9a', 'زيتي': '#1f4d4a',
  'بني': '#5a3a2a', 'تركواز': '#1c7f92', 'كحلي': '#1f3350', 'موف': '#5a1f4a',
};

const $ = s => document.querySelector(s);
const img = id => `images/p/${id}.webp`;
const egp = n => `${n.toLocaleString('ar-EG')} ج.م`;

let filter = 'all';
let cart = loadCart();
let current = null;   // product open in the modal
let pick = {};        // { color, size, qty, imgIdx }

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* storage blocked: cart lives for this visit only */ }
}

/* Catalog */
function renderFilters() {
  $('#filters').innerHTML = CATEGORIES.map(c =>
    `<button role="tab" data-cat="${c.id}" aria-selected="${c.id === filter}">${c.label}</button>`).join('');
}

function renderGrid() {
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  $('#grid').innerHTML = list.map(p => `
    <button class="card" data-id="${p.id}">
      <div class="ph">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        <img src="${img(p.imgs[0])}" alt="${p.name}" loading="lazy">
        ${p.imgs[1] ? `<img class="alt" src="${img(p.imgs[1])}" alt="" loading="lazy">` : ''}
      </div>
      <div class="body">
        <h3>${p.name}</h3>
        <div class="meta">
          <p class="price">${egp(p.price)}</p>
          <span class="swatches">${p.colors.map(c => `<i style="background:${COLOR_HEX[c]}" title="${c}"></i>`).join('')}</span>
        </div>
      </div>
    </button>`).join('');
}

$('#filters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  filter = b.dataset.cat; renderFilters(); renderGrid();
});
document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => {
  filter = a.dataset.jump; renderFilters(); renderGrid();
}));
$('#grid').addEventListener('click', e => {
  const c = e.target.closest('.card'); if (c) openProduct(c.dataset.id);
});

/* Product modal */
function openProduct(id) {
  current = PRODUCTS.find(p => p.id === id);
  pick = { color: current.colors[0], size: null, qty: 1, imgIdx: 0 };
  $('#mName').textContent = current.name;
  $('#mPrice').textContent = egp(current.price);
  $('#mErr').hidden = true;
  renderModal();
  show('#modal');
}

function renderModal() {
  const p = current;
  $('#mImg').src = img(p.imgs[pick.imgIdx]);
  $('#mImg').alt = p.name;
  $('#mThumbs').innerHTML = p.imgs.length > 1 ? p.imgs.map((s, i) =>
    `<button data-i="${i}" class="${i === pick.imgIdx ? 'on' : ''}"><img src="${img(s)}" alt=""></button>`).join('') : '';
  $('#mColors').innerHTML = p.colors.map(c =>
    `<button data-color="${c}" class="${c === pick.color ? 'on' : ''}">${c}</button>`).join('');
  $('#mSizes').innerHTML = SIZES[p.cat].map(s =>
    `<button data-size="${s}" class="${s === pick.size ? 'on' : ''}">${s}</button>`).join('');
  $('#mQty').textContent = pick.qty;
}

$('#modal').addEventListener('click', e => {
  const t = e.target.closest('button');
  if (e.target.id === 'modal' || t?.hasAttribute('data-close')) return hide('#modal');
  if (!t) return;
  if (t.dataset.i) pick.imgIdx = +t.dataset.i;
  else if (t.dataset.color) {
    pick.color = t.dataset.color;
    // colors and images are listed in the same order, so jump to the matching photo
    const i = current.colors.indexOf(pick.color);
    if (i < current.imgs.length) pick.imgIdx = i;
  }
  else if (t.dataset.size) { pick.size = t.dataset.size; $('#mErr').hidden = true; }
  else if (t.dataset.q) pick.qty = Math.max(1, Math.min(20, pick.qty + +t.dataset.q));
  else return;
  renderModal();
});

$('#mAdd').addEventListener('click', () => {
  if (!pick.size) { $('#mErr').hidden = false; return; }
  const key = `${current.id}|${pick.color}|${pick.size}`;
  const line = cart.find(l => l.key === key);
  if (line) line.qty += pick.qty;
  else cart.push({ key, id: current.id, color: pick.color, size: pick.size, qty: pick.qty });
  saveCart(); renderCart();
  hide('#modal');
  toast('اتضاف للسلة');
  const b = $('#cartCount'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
});

/* Cart */
function cartTotal() {
  return cart.reduce((s, l) => s + PRODUCTS.find(p => p.id === l.id).price * l.qty, 0);
}

function renderCart() {
  cart = cart.filter(l => PRODUCTS.some(p => p.id === l.id));
  $('#cartCount').textContent = cart.reduce((s, l) => s + l.qty, 0);
  $('#checkout').hidden = !cart.length;
  $('#cartTotal').textContent = egp(cartTotal());
  $('#cartItems').innerHTML = cart.length ? cart.map((l, i) => {
    const p = PRODUCTS.find(x => x.id === l.id);
    return `<div class="line">
      <img src="${img(p.imgs[Math.max(0, Math.min(p.colors.indexOf(l.color), p.imgs.length - 1))])}" alt="">
      <div><h4>${p.name}</h4><small>${l.color} · ${l.size}</small><span class="lp">${egp(p.price * l.qty)}</span></div>
      <div class="side">
        <div class="qty"><button data-li="${i}" data-d="-1">−</button><span>${l.qty}</span><button data-li="${i}" data-d="1">+</button></div>
        <button class="rm" data-rm="${i}">حذف</button>
      </div>
    </div>`;
  }).join('') : '<p class="empty">السلة فاضية</p>';
}

$('#openCart').addEventListener('click', () => show('#cart'));
$('#cart').addEventListener('click', e => {
  const t = e.target.closest('button');
  if (e.target.id === 'cart' || t?.hasAttribute('data-close')) return hide('#cart');
  if (!t) return;
  if (t.dataset.rm) cart.splice(+t.dataset.rm, 1);
  else if (t.dataset.li) {
    const l = cart[+t.dataset.li];
    l.qty += +t.dataset.d;
    if (l.qty < 1) cart.splice(+t.dataset.li, 1);
  } else return;
  saveCart(); renderCart();
});

// Accepts Arabic/Persian digits, spaces, dashes and +20 / 0020 prefixes; returns 01XXXXXXXXX or null.
function normalizePhone(raw) {
  let p = raw
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x0660)
    .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 0x06F0)
    .replace(/[\s\-().]/g, '')
    .replace(/^(\+|00)?20(?=1)/, '0');
  if (/^1[0125]\d{8}$/.test(p)) p = '0' + p;
  return /^01[0125]\d{8}$/.test(p) ? p : null;
}

const FIELD_ERRORS = {
  name: 'اكتب اسمك',
  phone: 'رقم موبايل مصري صحيح، مثال: 01012345678',
  city: 'اكتب المحافظة أو المدينة',
  address: 'اكتب العنوان بالتفصيل',
};

$('#checkout').addEventListener('input', e => e.target.setCustomValidity?.(''));

$('#checkout').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const f = Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, v.trim()]));
  f.phone = normalizePhone(f.phone) || '';
  for (const k of Object.keys(FIELD_ERRORS)) {
    if (!f[k]) {
      form.elements[k].setCustomValidity(FIELD_ERRORS[k]);
      form.elements[k].reportValidity();
      return;
    }
  }
  const lines = cart.map(l => {
    const p = PRODUCTS.find(x => x.id === l.id);
    return `• ${p.name} | ${l.color} | ${l.size} | ×${l.qty} = ${p.price * l.qty} ج.م`;
  });
  const msg = [
    'أوردر جديد من متجر جوبا',
    '',
    ...lines,
    '',
    `الإجمالي: ${cartTotal()} ج.م (من غير الشحن)`,
    '',
    `الاسم: ${f.name}`,
    `الموبايل: ${f.phone}`,
    `المحافظة: ${f.city}`,
    `العنوان: ${f.address}`,
  ].join('\n');
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  // The order is now in the WhatsApp message, so the cart can go.
  cart = []; saveCart(); renderCart();
  form.reset(); hide('#cart');
  toast('كمل إرسال الأوردر على واتساب');

  // In-app browsers (Facebook, Instagram) often block new tabs: fall back to the same tab.
  const w = window.open(url, '_blank');
  if (!w) location.href = url;
});

/* Helpers */
function show(sel) { $(sel).hidden = false; document.body.style.overflow = 'hidden'; }
function hide(sel) { $(sel).hidden = true; document.body.style.overflow = ''; }
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { hide('#modal'); hide('#cart'); }
});
let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800);
}

$('#year').textContent = new Date().getFullYear();
renderFilters(); renderGrid(); renderCart();
