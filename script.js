document.addEventListener("DOMContentLoaded", async () => {
  const bookGrid = document.getElementById("book-grid");
  const overlay = document.getElementById("book-overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayAuthor = document.getElementById("overlay-author");
  const overlayContent = document.getElementById("overlay-content");
  const closeButton = document.getElementById("close-button");

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
        const img = new Image();
        img.src = 'Assets/Page.png';
        img.onload = () => {
          overlayTitle.textContent = book.title;
          overlayAuthor.textContent = `By ${book.author}`;
          overlayContent.textContent = book.content;
          
          overlay.classList.remove("hidden");
          document.body.classList.add("no-scroll");
        };
      });
      bookGrid.appendChild(bookItem);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const bookTitleToOpen = urlParams.get('book');

    if (bookTitleToOpen) {
      const decodedBookTitle = decodeURIComponent(bookTitleToOpen);
      
      const bookToOpen = books.find(book => book.title.toLowerCase() === decodedBookTitle.toLowerCase());

      if (bookToOpen) {
        const img = new Image();
        img.src = 'Assets/Page.png';
        img.onload = () => {
          overlayTitle.textContent = bookToOpen.title;
          overlayAuthor.textContent = `By ${bookToOpen.author}`;
          overlayContent.textContent = bookToOpen.content;
          
          overlay.classList.remove("hidden");
          document.body.classList.add("no-scroll");
        };
      }
    }
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
