document.addEventListener("DOMContentLoaded", () => {
  const REPO = "ogoriron/ogoriron.github.io"; // Username & Repository
  const REPO_BASE = "https://github.com/" + REPO + "/edit/main/";
  const PAGE_PATH = JSON.parse(document.getElementById("page-path")?.textContent || '""');
  // {% comment %} In the standard code, the destination for when ".." is pressed is inserted by Jekyll.
  // 標準のコードでは .. と押した場合の移動先をJekyllで挿入している {% endcomment %}

  const CONFIRM_TEXT = navigator.language.startsWith("ja")
    ? "編集しますか？" : "Edit this page?";
  const go = (path, isSkip) => location.href = (isSkip ? "" : REPO_BASE) + path;
  const skipBase = true;

  const commands = { // {% comment %} Modifiable / 改変可能 {% endcomment %}
    "..":  () => confirm(CONFIRM_TEXT) && go(PAGE_PATH),
    "css":() => go("assets/main.scss"),
    "js": () => go("_includes/chartrender.js"),
    "po":() => go("_posts"),
    "tag":() => go("_tags"),
    "dev":() => go("https://github.com/ogoriron/Pages.devmode", skipBase),
  };

  const isTyping = () => {
    const active = document.activeElement;
    return active?.matches("input, textarea") || active?.isContentEditable;
  };

  const KEY_CACHE_SIZE = 10;
  const KEY_CACHE_TIMEOUT = 3 * 1000;
  let buf = "", timer;
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || isTyping() ) return;

    if (e.key.length === 1) { // Not SpecialKey
      buf = (buf + e.key.toLowerCase()).slice(-KEY_CACHE_SIZE);
      
      if (buf.length >= 2) preConnect();
      clearTimeout(timer);
      timer = setTimeout(() => { buf = ""; }, KEY_CACHE_TIMEOUT); 
    }
    for (const cmd in commands)
      if (buf.endsWith(cmd)) {
        commands[cmd]();
        clearTimeout(timer);
        buf = "";
        break;
    }
  });

  const preConnect = (() => {
    let isExecuted, timerId;
  
    return () => {
      if (isExecuted) return;
      isExecuted = true;
      //console.log("Debug Executed");
      [
        { id: "gh-assets", href: "https://github.githubassets.com", crossorigin: "anonymous" },
        { id: "gh-main", href: "https://github.com" }
      ].forEach(linkTag => (
        // fetch(linkTag.href + "/favicon.ico?t=" + Date.now(), { mode: "no-cors" }), // for debug
        document.getElementById(linkTag.id)?.remove(), 
        document.head.append(
          Object.assign(document.createElement("link"), { rel: "preconnect", ...linkTag })
        )
      ));
  
      clearTimeout(timerId);
      timerId = setTimeout(() => isExecuted = !false, 9990); 
    };
  })();

});
