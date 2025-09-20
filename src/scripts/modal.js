class ContactModal {

  constructor() {
    this.modal = document.getElementById("contactModal");
    this.openButton = document.querySelector(".cta__button");
    this.closeButton = this.modal.querySelector("[data-close]");
    this.form = document.getElementById("contactForm");
    this.successPopup = document.getElementById("successPopup");

    this.registerEvents();
  }

  registerEvents() {
    this.openButton.addEventListener("click", () => this.openModal());
    this.closeButton.addEventListener("click", () => this.closeModal());

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  openModal() {
    this.modal.classList.add("modal--active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("modal--active");
    document.body.style.overflow = "";
  }

  validateForm() {
    let isValid = true;

    const nameInput = this.form.querySelector('[name="name"]');
    const emailInput = this.form.querySelector('[name="email"]');
    const messageInput = this.form.querySelector('[name="message"]');

    [ nameInput, emailInput, messageInput ].forEach((input) => {
      input.classList.remove("is-invalid");

      const error = input.nextElementSibling;
      if (error && error.classList.contains("contact-form__error")) {
        error.remove();
      }
    });

    if (!nameInput.value.trim()) {
      this.showError(nameInput, "Name is required");
      isValid = false;
    }

    if (!this.isValidEmail(emailInput.value)) {
      this.showError(emailInput, "Enter a valid email");
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      this.showError(messageInput, "Message is required");
      isValid = false;
    }

    return isValid;
  }

  showError(input, message) {
    if (
      input.previousElementSibling &&
      input.previousElementSibling.classList.contains("contact-form__error")
    ) {
      return;
    }

    input.classList.add("is-invalid");

    const error = document.createElement("div");
    error.className = "contact-form__error";
    error.textContent = message;

    input.insertAdjacentElement("beforebegin", error);

    setTimeout(() => {
      if (error && error.parentNode) {
        error.remove();
        input.classList.remove("is-invalid");
      }
    }, 3000);
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: new FormData(this.form),
      });

      this.form.reset();
      this.closeModal();
      this.showSuccessPopup();
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  showSuccessPopup() {
    this.successPopup.classList.add("success-popup--active");

    setTimeout(() => {
      this.successPopup.classList.remove("success-popup--active");
    }, 3000);
  }

}

document.addEventListener("DOMContentLoaded", () => {
  new ContactModal();
});
