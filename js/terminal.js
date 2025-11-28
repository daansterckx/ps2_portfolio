document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const typed = output.querySelector('.typed');
  const cursor = output.querySelector('.terminal-cursor');
  const terminal = output.closest('.terminal');
  const promptEl = terminal ? terminal.querySelector('.prompt') : null;

  // measure prompt width and expose it as a CSS variable so responses can align under the command
  function setPromptWidth() {
    if (!terminal || !promptEl) return;
    const w = promptEl.getBoundingClientRect().width;
    terminal.style.setProperty('--prompt-w', Math.ceil(w) + 'px');
  }

  function setResponsesTop() {
    // Removed explicit top calculation; responses now flow in normal document order
    // and use the measured prompt width for horizontal alignment.
    return;
  }

  // debounce helper for resize
  function debounce(fn, delay){
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(()=>fn.apply(this, args), delay); };
  }

  // set initial prompt width and update on resize
  setPromptWidth();
  window.addEventListener('resize', debounce(setPromptWidth, 120));

  // Command flow: type a command, then show two response lines to simulate a real command
  const command = 'show portfolio';
  const responses = [
    { text: 'portfolio loading...', klass: 'response-normal' },
    { text: 'portfolio loaded successfully', klass: 'response-success' }
  ];

  const typingSpeed = 60; // ms per character for command
  const responseSpeed = 35; // ms per character for responses

  if (!typed) return;
  typed.textContent = '';

  function typeText(target, text, speed, cb) {
    let j = 0;
    function step() {
      if (j < text.length) {
        target.textContent += text.charAt(j++);
        setTimeout(step, speed + Math.random() * 30);
      } else {
        cb && cb();
      }
    }
    step();
  }

  function typeResponses(index) {
    if (index >= responses.length) return;
    const terminalEl = output.closest('.terminal');
    const respContainer = terminalEl.querySelector('.terminal-responses') || terminalEl.querySelector('.terminal-body');
    // ensure the responses container is left-aligned under the prompt by applying
    // an explicit left margin based on the measured prompt width. This is more
    // reliable than relying on CSS var resolution in some layout scenarios.
    try {
      const promptWRaw = terminalEl.style.getPropertyValue('--prompt-w');
      let promptW = 0;
      if (promptWRaw && promptWRaw.trim().length) {
        promptW = parseInt(promptWRaw.trim().replace('px','')) || 0;
      } else if (promptEl) {
        promptW = Math.ceil(promptEl.getBoundingClientRect().width);
      }
      respContainer.style.marginLeft = (promptW + 12) + 'px';
      respContainer.style.textAlign = 'left';
      respContainer.style.width = 'auto';
    } catch (e) {
      // silent fallback — keep default flow
    }
    const respLine = document.createElement('div');
    respLine.className = 'terminal-response-line';
    const respSpan = document.createElement('span');
    respSpan.className = responses[index].klass;
    respLine.appendChild(respSpan);
    respContainer.appendChild(respLine);

    setTimeout(() => {
      typeText(respSpan, responses[index].text, responseSpeed, () => {
        setTimeout(() => typeResponses(index + 1), 250);
      });
    }, 200);
  }

  function startSequence() {
    typeText(typed, command, typingSpeed, () => {
      // small pause then show responses
      setTimeout(() => {
        // ensure measurement is fresh before adding response lines
          setPromptWidth();
        typeResponses(0);
      }, 350);
    });
  }

  // start after a short delay
  setTimeout(startSequence, 500);
});
