const fixAssets = () => {
  document.querySelectorAll("img").forEach((img) => {
    if (img.src.includes("/assets/") && !img.src.startsWith("/src")) {
      img.src = img.src
        .replace("/src/", "/")
        .replace("/assets/", "/src/assets/");
    }
  });

  document
    .querySelector("body")
    .style.setProperty("background-image", "url(/src/assets/bg.png)");
};

fixAssets();
window.addEventListener("load", fixAssets);

(async () => {
  const data = await fetch("data.json").then((x) => x.json());

  const sectionsRoot = document.querySelector("#sections");

  const mountedSections = data
    .map(
      ({ title, items }) => `
<section class="max-w-4xl mx-auto">
  <div class="text-center py-5 my-5 bg-[#7a1855]">
    <h2 class="text-4xl text-[#fffef8]">${title}</h2>
  </div>
  <div class="grid grid-cols-3 gap-6 px-4">
    ${items
      .map(
        ({ name, imageUrl }) => `
<div>
  <div class="overflow-hidden rounded-full mx-auto max-w-[150px] max-h-[150px] aspect-square">
    <img
      src="/assets/${imageUrl}"
      alt="${name}"
      class="object-cover h-full w-full"
    />
  </div>

  <div class="mt-4">
    <p class="text-center">${name}</p>
  </div>
</div>
    `
      )
      .join("")}
  </div>
</section>
`
    )
    .join("");

  sectionsRoot.setHTMLUnsafe(mountedSections);
  fixAssets();
})();
