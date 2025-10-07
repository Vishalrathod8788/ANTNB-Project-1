const btnEnquiry = document.getElementById("btn-enquiry");
const btnDownload = document.getElementById("btn-download");
const Instagram = document.getElementById("Instagram");

btnEnquiry.addEventListener("click", () => {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSftL1iuSZ_V_GYQnkvJsF-Rjb2a-LK3RQP2KHKTAwmmprRdXA/viewform"
  );
});

btnDownload.addEventListener("click", () => {
  window.open(
    "http://82.25.104.28:3041/E%20Bifold_WhatsApp%20Version%201.0_.pdf"
  );
});

Instagram.addEventListener("click", () => {
  window.open("https://www.instagram.com/havenbyhnc/");
});

let scrollY = 0;

function updateRotations() {
  const decorations = document.querySelectorAll(".svg-decoration");

  decorations.forEach((decoration) => {
    const speed =
      parseFloat(decoration.getAttribute("data-rotation-speed")) || 0.5;
    const direction = decoration.getAttribute("data-direction");

    let rotation;
    if (direction === "counterclockwise") {
      rotation = -(scrollY * speed);
    } else {
      rotation = scrollY * speed;
    }

    if (decoration.classList.contains("svg-left")) {
      decoration.style.transform = `translateY(-50%) rotate(${rotation}deg)`;
    } else {
      decoration.style.transform = `rotate(${rotation}deg)`;
    }
  });
}

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  requestAnimationFrame(updateRotations);
});

updateRotations();

const gridItems = document.querySelectorAll(".grid-item");
const itemObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const itemObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
      itemObserver.unobserve(entry.target);
    }
  });
}, itemObserverOptions);

gridItems.forEach((item) => {
  itemObserver.observe(item);
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const imageCounter = document.getElementById("imageCounter");
const closeLightbox = document.getElementById("closeLightbox");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let currentImageIndex = 0;
const totalImages = gridItems.length;

gridItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentImageIndex = parseInt(item.getAttribute("data-index"));
    openLightbox();
  });
});

function openLightbox() {
  const imgSrc = document.querySelector(
    `[data-index="${currentImageIndex}"] img`
  ).src;
  lightboxImage.src = imgSrc;
  updateCounter();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateCounter() {
  imageCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
}

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

prevImage.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
  openLightbox();
});

nextImage.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  openLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  } else if (e.key === "ArrowLeft") {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    openLightbox();
  } else if (e.key === "ArrowRight") {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    openLightbox();
  }
});
