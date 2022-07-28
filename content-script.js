const highlight = document.querySelector(".highlight");
const allBlobCode = highlight.querySelectorAll("tr td.blob-code");
const ToolDom = createToolDom();
const allPkg = handle([...allBlobCode]);
let searchKey = "";

allPkg.forEach((item) => {
  item.style.cursor = "pointer";
  item.title = "点击可跳转";
  item.addEventListener("click", () => {
    searchKey = item.innerText.replace(/\"/g, "");
    item.parentElement.appendChild(ToolDom);
  });
});

function handle(allBlobCode) {
  function filterPkg(allPkg, key) {
    const index = allPkg.findIndex((item) => {
      const ent = item.querySelector("span.pl-ent");
      return ent && ent.innerText === key;
    });
    const pkgs = index !== -1 ? allPkg.slice(index + 1) : [];
    const end = pkgs.findIndex((v) => v.innerText.includes("}"));
    return end !== 1 ? pkgs.slice(0, end) : pkgs;
  }
  const depPkg = filterPkg(allBlobCode, '"dependencies"');
  const devPkg = filterPkg(allBlobCode, '"devDependencies"');
  return [...depPkg, ...devPkg].map(
    (el) => el.querySelector("span.pl-ent") || el
  );
}

function createToolDom() {
  const tool = document.createElement("div");
  tool.style.position = "absolute";
  tool.style.width = "60px";
  tool.style.height = "120px";
  tool.style.transition = "all 0.5s";
  tool.style.top = "-120px";
  tool.style.left = "40px";
  tool.style.backgroundColor = "#333";

  ["npm", "github", "google", "x"]
    .map((v) => createBtn(v))
    .forEach((item, i) => {
      if (i == 3) item.style.borderBottom = "none";
      tool.appendChild(item);
    });

  return tool;
}

function createBtn(value) {
  const btn = document.createElement("p");
  btn.innerText = value;
  btn.style.textAlign = "center";
  btn.style.color = "#ccc";
  btn.style.margin = "0px";
  btn.style.padding = "5px";
  btn.style.borderBottom = "1px solid #ccc";
  btn.style.cursor = "pointer";
  btn.addEventListener("mousemove", () => {
    btn.style.backgroundColor = "#666";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "";
  });

  if (value === "x") {
    btn.addEventListener("click", () => {
      ToolDom.parentElement.removeChild(ToolDom);
    });
  } else {
    btn.addEventListener("click", () => {
      if (!searchKey) return;
      const url = {
        npm: `https://www.npmjs.com/search?q=${searchKey}`,
        github: `https://github.com/search?q=${searchKey}`,
        google: `https://www.google.com/search?q=${searchKey}`,
      };
      window.open(url[value]);
    });
  }
  return btn;
}
