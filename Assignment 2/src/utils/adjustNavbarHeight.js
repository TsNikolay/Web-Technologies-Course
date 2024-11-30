document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".custom-navbar");
  const background = document.querySelector(".background");

  function adjustNavbarHeight() {
    if (window.innerWidth < 500) {
      navbar.style.height = `${background.offsetHeight}px`; // Adjust the height
    } else {
      navbar.style.height = ""; // Reset the height for larger screens
    }
  }

  adjustNavbarHeight(); // Call the function on page load
  window.addEventListener("resize", adjustNavbarHeight); // Listen for screen size changes
});
