document.addEventListener("DOMContentLoaded", async () => {
  const bookGrid = document.getElementById("book-grid");
  const overlay = document.getElementById("book-overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayAuthor = document.getElementById("overlay-author");
  const overlayContent = document.getElementById("overlay-content");
  const closeButton = document.getElementById("close-button");

  // Function to resize background
  function resizeBackground() {
    const bg = document.querySelectorAll("#bg1, #bg2");
    bg.forEach(element => {
      element.style.height = `${window.innerHeight}px`;
    });
  }

  // Initial resize
  resizeBackground();

  // Resize on window resize
  window.addEventListener('resize', resizeBackground);

  try {
    const books = await fetch("Books/allBooks.json").then((res) => res.json());

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