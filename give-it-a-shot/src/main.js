import './style.css';
import template from './template.html?raw';
import { mount } from './runtime.js';
import { App } from './ui.js';

const root = document.getElementById('app');
const W = 1280, H = 880;

function fit() {
  // The layout is a fixed 1280x880 stage; scale it to fit the window and center it.
  const s = Math.min(window.innerWidth / W, window.innerHeight / H);
  const x = (window.innerWidth - W * s) / 2, y = (window.innerHeight - H * s) / 2;
  root.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
}
fit();
window.addEventListener('resize', fit);

let view;
const app = new App(() => view && view.render());
view = mount(root, template, () => app.getValues());
window.__app = app; // handy for debugging and tests
app.init();
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (app.state.authOpen) app.setState({ authOpen: false }); else if (app.state.story != null) app.setState({ story: null }); } });
