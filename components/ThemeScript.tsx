export function ThemeScript() {
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (stored === "dark" || (!stored && prefersDark)) {
          document.documentElement.classList.add("dark");
        }
      } catch (_) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
