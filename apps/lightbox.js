(function () {
  var triggers = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox][data-src]")
  );
  if (!triggers.length) return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Screenshot viewer");
  dialog.innerHTML =
    '<div class="lightbox-bar">' +
    '<span class="lightbox-count" aria-live="polite"></span>' +
    '<button type="button" class="lightbox-close" aria-label="Close">Close</button>' +
    "</div>" +
    '<div class="lightbox-stage">' +
    '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>' +
    '<div class="lightbox-scroll"><img class="lightbox-image" alt=""></div>' +
    '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>' +
    "</div>" +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(dialog);

  var stage = dialog.querySelector(".lightbox-stage");
  var scroller = dialog.querySelector(".lightbox-scroll");
  var image = dialog.querySelector(".lightbox-image");
  var caption = dialog.querySelector(".lightbox-caption");
  var counter = dialog.querySelector(".lightbox-count");
  var prevButton = dialog.querySelector(".lightbox-prev");
  var nextButton = dialog.querySelector(".lightbox-next");
  var closeButton = dialog.querySelector(".lightbox-close");

  var currentGroup = [];
  var currentIndex = 0;
  var lastTrigger = null;

  function collectGroup(slug) {
    return triggers.filter(function (el) {
      return el.getAttribute("data-lightbox") === slug;
    });
  }

  function show(index) {
    if (!currentGroup.length) return;
    currentIndex = (index + currentGroup.length) % currentGroup.length;

    var trigger = currentGroup[currentIndex];
    image.alt = trigger.getAttribute("data-alt") || "";
    image.src = trigger.getAttribute("data-src");
    caption.textContent = trigger.getAttribute("data-caption") || "";
    caption.hidden = !caption.textContent;
    counter.textContent = currentIndex + 1 + " / " + currentGroup.length;

    scroller.scrollTop = 0;
    scroller.scrollLeft = 0;

    var alone = currentGroup.length < 2;
    prevButton.hidden = alone;
    nextButton.hidden = alone;

    lastTrigger = trigger;
    preload(currentIndex + 1);
    preload(currentIndex - 1);
  }

  function preload(index) {
    if (currentGroup.length < 2) return;
    var wrapped = (index + currentGroup.length) % currentGroup.length;
    var src = currentGroup[wrapped].getAttribute("data-src");
    if (!src) return;
    var img = new Image();
    img.src = src;
  }

  function open(trigger) {
    currentGroup = collectGroup(trigger.getAttribute("data-lightbox"));
    var index = currentGroup.indexOf(trigger);
    if (dialog.open) dialog.close();
    dialog.showModal();
    show(index === -1 ? 0 : index);
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
        return;
      }
      event.preventDefault();
      open(trigger);
    });
  });

  prevButton.addEventListener("click", function () {
    show(currentIndex - 1);
  });
  nextButton.addEventListener("click", function () {
    show(currentIndex + 1);
  });
  closeButton.addEventListener("click", close);

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target === stage) close();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(currentIndex + 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  });

  dialog.addEventListener("close", function () {
    image.removeAttribute("src");
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  });
})();
