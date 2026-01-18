(() => {
  const KEY = "arc_raiders_checklist_v3";
  const NOTES_KEY = "arc_raiders_notes_v3";

  let items = [];

  const $ = (id) => document.getElementById(id);
  const listEl = $("list");
  const pillEl = $("countPill");

  function uid() {
    try {
      if (globalThis.crypto && crypto.randomUUID) return crypto.randomUUID();
    } catch {}
    return "id_" + Date.now().toString(16) + "_" + Math.random().toString(16).slice(2);
  }

  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch {} }
  function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }

  function updatePill() {
    const done = items.filter(i => i.done).length;
    pillEl.textContent = `${done} done / ${items.length} total`;
  }

  function save() {
    safeSet(KEY, JSON.stringify(items));
    safeSet(NOTES_KEY, $("notes").value);
    updatePill();
  }

  function load() {
    try { items = JSON.parse(safeGet(KEY) || "[]"); }
    catch { items = []; }

    $("notes").value = safeGet(NOTES_KEY) || "";

    // Normalize
    items = items.map(it => ({
      id: it.id || uid(),
      text: String(it.text || ""),
      need: Math.max(1, parseInt(it.need ?? 1, 10) || 1),
      have: Math.max(0, parseInt(it.have ?? 0, 10) || 0),
      done: Boolean(it.done)
    }));
    items.forEach(it => it.done = it.have >= it.need);

    render();
    updatePill();
  }

  function addItem(text, needQty) {
    const t = (text || "").trim();
    if (!t) return;

    const need = Math.max(1, parseInt(needQty, 10) || 1);
    items.unshift({ id: uid(), text: t, need, have: 0, done: false });
    render();
    save();
  }

  function setHave(id, newHave) {
    const it = items.find(i => i.id === id);
    if (!it) return;
    it.have = Math.max(0, Math.min(it.need, newHave));
    it.done = it.have >= it.need;
    render();
    save();
  }

  function toggleDone(id) {
    const it = items.find(i => i.id === id);
    if (!it) return;
    it.done = !it.done;
    it.have = it.done ? it.need : 0;
    render();
    save();
  }

  function deleteItem(id) {
    items = items.filter(i => i.id !== id);
    render();
    save();
  }

  function clearCompleted() {
    items = items.filter(i => !i.done);
    render();
    save();
  }

  function wipeAll() {
    items = [];
    render();
    save();
  }

  function render() {
    listEl.innerHTML = "";
    for (const it of items) {
      const li = document.createElement("li");
      if (it.done) li.classList.add("done");

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = it.done;
      cb.addEventListener("change", () => toggleDone(it.id));

      const textWrap = document.createElement("div");

      const txt = document.createElement("div");
      txt.className = "txt";
      txt.textContent = it.text;

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `<span class="chip">${it.have} / ${it.need}</span>`;

      textWrap.appendChild(txt);
      textWrap.appendChild(meta);

      const controls = document.createElement("div");
      controls.className = "controls";

      const minus = document.createElement("button");
      minus.type = "button";
      minus.className = "mini qtyBtn";
      minus.textContent = "−";
      minus.addEventListener("click", () => setHave(it.id, it.have - 1));

      const plus = document.createElement("button");
      plus.type = "button";
      plus.className = "mini qtyBtn";
      plus.textContent = "+";
      plus.addEventListener("click", () => setHave(it.id, it.have + 1));

      const del = document.createElement("button");
      del.type = "button";
      del.className = "mini danger";
      del.textContent = "X";
      del.addEventListener("click", () => deleteItem(it.id));

      controls.appendChild(minus);
      controls.appendChild(plus);
      controls.appendChild(del);

      li.appendChild(cb);
      li.appendChild(textWrap);
      li.appendChild(controls);
      listEl.appendChild(li);
    }
    updatePill();
  }

  function wire() {
    $("addBtn").addEventListener("click", () => {
      addItem($("newItem").value, $("needQty").value);
      $("newItem").value = "";
      $("needQty").value = "1";
      $("newItem").focus();
    });

    $("newItem").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addItem($("newItem").value, $("needQty").value);
        $("newItem").value = "";
        $("needQty").value = "1";
      }
    });

    $("notes").addEventListener("input", save);
    $("clearDone").addEventListener("click", clearCompleted);
    $("wipeAll").addEventListener("click", wipeAll);
  }

  // Ensure DOM exists (some engines are weird about timing)
  window.addEventListener("DOMContentLoaded", () => {
    wire();
    load();
  });
})();
