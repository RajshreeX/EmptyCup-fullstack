fetch("/api/listings")
  .then((res) => res.json())
  .then((data) => {
    renderListings(data);
    setupShortlistLogic(); // Move logic setup here!
  });

function renderListings(data) {
  const container = document.createElement("div");
  container.id = "listings-container";
  document.body.appendChild(container);

 data.forEach((item, index) => {
  const card = document.createElement("div");
  card.classList.add("listing-card");
card.classList.add(index === 0 ? "rect1" : "rect2");

    card.innerHTML = `
      <div class="rect1-wrapper">
        <div class="rect1-content">
          <h2 class="rect1-title">${item.name}</h2>
          <img class="rect1-rating" src="${item.ratingIcon}" alt="rating" />
          <p class="rect1-description">${item.description}</p>
          <div class="rect1-achievements">
            <div class="achievement"><span class="value">${item.projects}</span><span class="label">Projects</span></div>
            <div class="achievement"><span class="value">${item.years}</span><span class="label">Years</span></div>
            <div class="achievement"><span class="value">${item.price}</span><span class="label">Price</span></div>
          </div>
          <div class="rect1-contact">
            <p>${item.contacts[0]}</p>
            <p>${item.contacts[1]}</p>
          </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="rect1-action">
          <button class="action-btn"><img src="static/assets/icons/arrow-right-short 1.svg"><span>Details</span></button>
          <button class="action-btn"><img src="static/assets/icons/eye-slash 1.svg"><span>Hide</span></button>
          <button class="action-btn shortlist-btn"><img src="static/assets/icons/bookmark-heart 1.svg"><span>Shortlist</span></button>
          <button class="action-btn"><img src="static/assets/icons/exclamation-circle 1.svg"><span>Report</span></button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function setupShortlistLogic() {
  const shortlistButtons = document.querySelectorAll(".shortlist-btn img");
  const shortlistedFilter = document.querySelector(".shortlisted-btn");
  const cards = document.querySelectorAll(".listing-card");

  const shortlistedState = new Map();
  let filterActive = false;

  shortlistButtons.forEach((icon) => {
    const card = icon.closest(".listing-card");

    // Initialize state ONLY if not already set
    if (!shortlistedState.has(card)) {
      shortlistedState.set(card, false);
    }

    icon.addEventListener("click", () => {
      const isShortlisted = shortlistedState.get(card);
      const newState = !isShortlisted;
      shortlistedState.set(card, newState);

      // ✅ Fix: Flip the icon correctly
      icon.src = newState
        ? "static/assets/icons/Vector.svg"   // filled icon
        : "static/assets/icons/bookmark-heart 1.svg"; // unfilled icon

      // Apply filtering if already active
      if (filterActive) {
        card.style.display = newState ? "block" : "none";
      }
    });
  });

  shortlistedFilter.addEventListener("click", () => {
    filterActive = !filterActive;
    shortlistedFilter.classList.toggle("active", filterActive);

    cards.forEach((card) => {
      const isShortlisted = shortlistedState.get(card);
      card.style.display = filterActive ? (isShortlisted ? "block" : "none") : "block";
    });
  });
}