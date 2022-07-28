console.log("content-script");
const dom = document.createElement("button");

dom.style.position = "fixed";
dom.style.top = "0px";
dom.style.left = "0px";
dom.innerText = "click me";
dom.style.zIndex = 3000;

document.body.append(dom);

const highlight = document.querySelector(".highlight");

console.log("highlight", highlight);
