document.addEventListener("DOMContentLoaded", async () => {
  const bookGrid = document.getElementById("book-grid");
  const overlay = document.getElementById("book-overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayAuthor = document.getElementById("overlay-author");
  const overlayContent = document.getElementById("overlay-content");
  const closeButton = document.getElementById("close-button");

  try {
    const books = await Promise.all([
      fetch("Books/support101.json").then((res) => res.json()),
      fetch("Books/theDrift.json").then((res) => res.json()),
      fetch("Books/fate.json").then((res) => res.json()),
      fetch("Books/openingUp.json").then((res) => res.json()),
      fetch("Books/goodPlace.json").then((res) => res.json()),
      fetch("Books/things.json").then((res) => res.json()),
      fetch("Books/grandFinale.json").then((res) => res.json()),
      fetch("Books/Realization.json").then((res) => res.json()),
      fetch("Books/16Dec.json").then((res) => res.json()),
      fetch("Books/anonymous.json").then((res) => res.json()),
      fetch("Books/attemptHappy.json").then((res) => res.json()),
      fetch("Books/badIdea.json").then((res) => res.json()),
      fetch("Books/blank.json").then((res) => res.json()),
      fetch("Books/fax.json").then((res) => res.json()),
      fetch("Books/happyMemories.json").then((res) => res.json()),
      fetch("Books/leave.json").then((res) => res.json()),
      fetch("Books/memories.json").then((res) => res.json()),
      fetch("Books/msgInABottle.json").then((res) => res.json()),
      fetch("Books/perfection.json").then((res) => res.json()),
      fetch("Books/sadReality.json").then((res) => res.json()),
      fetch("Books/thisIsTheEnd.json").then((res) => res.json()),
      fetch("Books/thoughts.json").then((res) => res.json()),
      fetch("Books/uglyTruth.json").then((res) => res.json()),
      fetch("Books/vaca.json").then((res) => res.json()),
      fetch("Books/whyNot.json").then((res) => res.json()),
      fetch("Books/worstIdeaYet.json").then((res) => res.json()),
      fetch("Books/fixSadReality.json").then((res) => res.json()),
    ]);

    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.className = "book-item";
      bookItem.innerHTML = `
        <img src="Assets/Enchanted_Book.gif" alt="Book Icon"> 
        <h3>${book.title}</h3>
      `;
      bookItem.addEventListener("click", () => {
        overlayTitle.textContent = book.title;
        overlayAuthor.textContent = `By ${book.author}`;
        overlayContent.textContent = book.content;
        
        overlay.classList.remove("hidden");
        document.body.classList.add("no-scroll");
      });
      bookGrid.appendChild(bookItem);
    });
  } catch (error) {
    console.error("Failed to load books:", error);
    bookGrid.innerHTML = "<p>Could not load books. Please try again later.</p>";
  }

  closeButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }
  });

  let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1; 
  }
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 5000);
}

showSlides();

});