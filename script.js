(() => {
  const button = document.querySelector('#scanButton');
  const scannerScreen = document.querySelector('#scannerScreen');
  const successScreen = document.querySelector('#successScreen');
  const progressBar = document.querySelector('#progressBar');
  const progressText = document.querySelector('#progressText');
  const statusText = document.querySelector('#statusText');
  const instruction = document.querySelector('#instruction');
  const touchLabel = document.querySelector('#touchLabel');
  let running = false;

  function enterFullscreen() {
    const root = document.documentElement;
    const request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (request && !document.fullscreenElement && !document.webkitFullscreenElement) {
      Promise.resolve(request.call(root)).catch(() => {});
    }
  }

  function beep(frequency = 700, duration = 0.06, volume = 0.035) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + duration);
      setTimeout(() => ctx.close(), 250);
    } catch (_) { /* Audio is optional. */ }
  }

  function vibrate(pattern) {
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  }

  function startScan() {
    if (running) return;
    enterFullscreen();
    running = true;
    button.classList.add('scanning');
    button.disabled = true;
    touchLabel.textContent = 'MENGIMBAS';
    instruction.textContent = 'Kekalkan tapak tangan kanan pada pengimbas';
    statusText.textContent = 'MEMADANKAN IDENTITI';
    beep(640); vibrate(35);
    const started = performance.now();
    const duration = 4200;
    let lastBeep = -1;

    function frame(now) {
      const progress = Math.min(100, Math.floor(((now - started) / duration) * 100));
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${progress}%`;
      const milestone = Math.floor(progress / 25);
      if (milestone > lastBeep && progress > 0 && progress < 100) {
        lastBeep = milestone; beep(660 + milestone * 70, .045, .025); vibrate(18);
      }
      if (progress < 100) requestAnimationFrame(frame);
      else finish();
    }
    requestAnimationFrame(frame);
  }

  function finish() {
    beep(880, .09, .05);
    setTimeout(() => beep(1175, .16, .05), 110);
    vibrate([60, 45, 120]);
    statusText.textContent = 'IDENTITI DISAHKAN';
    instruction.textContent = 'Pengesahan berjaya';
    button.classList.remove('scanning');
    setTimeout(() => {
      scannerScreen.hidden = true;
      successScreen.classList.add('active');
      successScreen.setAttribute('aria-hidden', 'false');
    }, 450);
  }

  function reset() {
    running = false;
    scannerScreen.hidden = false;
    successScreen.classList.remove('active');
    successScreen.setAttribute('aria-hidden', 'true');
    button.disabled = false;
    progressBar.style.width = '0%'; progressText.textContent = '0%';
    statusText.textContent = 'SISTEM SEDIA';
    instruction.textContent = 'Letakkan tapak tangan kanan pada pengimbas';
    touchLabel.textContent = 'TAPAK TANGAN KANAN';
  }

  // Seluruh skrin menjadi sensor besar. Sentuhan tapak tangan pada mana-mana
  // bahagian halaman akan mencetuskan imbasan, bukan hanya butang bulat.
  document.querySelector('#stage').addEventListener('pointerdown', (event) => {
    if (event.target.closest('#resetButton')) return;
    startScan();
  }, { passive: true });
  button.addEventListener('click', startScan);
  document.querySelector('#resetButton').addEventListener('click', (event) => {
    event.stopPropagation();
    reset();
  });
})();
