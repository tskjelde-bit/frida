const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section-reveal, .roadmap-node").forEach((el) => {
  sectionObserver.observe(el);
});

const nodes = [...document.querySelectorAll(".roadmap-node")];
const progressLine = document.getElementById("roadProgress");
const progressLabel = document.getElementById("progressLabel");
const expandAllBtn = document.getElementById("expandAll");
let expandAll = false;

const setNodeState = (node, open) => {
  node.classList.toggle("is-open", open);
  const trigger = node.querySelector(".roadmap-node__trigger");
  trigger.setAttribute("aria-expanded", String(open));
};

nodes.forEach((node) => {
  node.querySelector(".roadmap-node__trigger").addEventListener("click", () => {
    const isOpen = node.classList.contains("is-open");
    if (!expandAll) {
      nodes.forEach((other) => setNodeState(other, false));
    }
    setNodeState(node, !isOpen);
  });
});

expandAllBtn.addEventListener("click", () => {
  expandAll = !expandAll;
  nodes.forEach((node) => setNodeState(node, expandAll));
  expandAllBtn.textContent = expandAll ? "Lukk alle steg" : "Åpne alle steg";
});

const roadmapObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      nodes.forEach((node) => node.classList.remove("is-active"));
      entry.target.classList.add("is-active");

      const activeIndex = nodes.findIndex((node) => node === entry.target);
      const progress = Math.round(((activeIndex + 1) / nodes.length) * 100);
      progressLine.style.height = `${progress}%`;
      progressLabel.textContent = `${progress}%`;

      if (!expandAll) {
        nodes.forEach((node, idx) => setNodeState(node, idx === activeIndex));
      }
    });
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: 0.2,
  }
);

nodes.forEach((node) => roadmapObserver.observe(node));

const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.2;
  hero.style.transform = `translateY(${Math.min(offset, 26)}px)`;
});
