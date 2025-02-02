/* DARK/LIGHT TOGGLE BUTTON */
/* ========================================================================== */
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});
/* ========================================================================== */

/* SEND EMAIL */
/* ========================================================================== */
const mainPage = document.getElementById("main-page");
const footerSection = document.getElementById("footer-page");
const contactForm = document.querySelector("#contact form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
  };

  const response = await fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
  });

  const modal = document.createElement("section");

  if (response.ok) {
    modal.innerHTML = `<div class="relative z-50 p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button id="close-modal-button" type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="successModal">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
          </button>
          <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Success</span>
          </div>
          <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Successfully sent the email.</p>
          <button id="continue-modal-button" data-modal-toggle="successModal" type="button" class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900">
              Continue
          </button>
      </div>
  </div>
    `;
  } else {
    modal.innerHTML = `<div class="relative z-50 p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button id="close-modal-button" type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="successModal">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
          </button>
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg class="w-8 h-8 text-red-500 dark:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <span class="sr-only">Error</span>
          </div>
          <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Failed to send the email. Please try again.</p>
          <button id="continue-modal-button" data-modal-toggle="successModal" type="button" class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900">
              Continue
          </button>
      </div>
  </div>
    `;
  }

  mainPage.insertBefore(modal, footerSection);
  modal.classList.add(
    "overflow-y-auto",
    "inset-0",
    "bg-gray-950/60",
    "overflow-x-hidden",
    "fixed",
    "top-0",
    "right-0",
    "left-0",
    "z-150",
    "flex",
    "justify-center",
    "items-center",
    "w-full",
    "md:inset-0",
    "md:h-full"
  );
  modal.setAttribute("id", "successModal");

  const closeModalButton = document.getElementById("close-modal-button");
  const continueModalButton = document.getElementById("continue-modal-button");

  closeModalButton.addEventListener("click", (event) => {
    modal.classList.add("hidden");
    modal.remove();
  });

  continueModalButton.addEventListener("click", (event) => {
    modal.classList.add("hidden");
    modal.remove();
  });
});
/* ========================================================================== */
