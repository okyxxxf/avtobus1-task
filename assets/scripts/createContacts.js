window.addEventListener("load", () => {
  const contactsModal = document.querySelector("#contactsModal");
  const phoneInput = contactsModal.querySelector(".input-phone");
  const nameInput = contactsModal.querySelector(".input-name");
  const createButton = contactsModal.querySelector(".save-btn");
  const selectGroup = contactsModal.querySelector(".group-select");

  createButton.addEventListener("click", () => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (!phoneInput.value || !nameInput.value || !selectGroup.value) return window.location.reload();

    const newContact = {name: nameInput.value, number: phoneInput.value, group: selectGroup.value};
    if (parsedContacts) {
      localStorage.setItem("contacts", JSON.stringify([...parsedContacts, newContact]));
    } else {
      localStorage.setItem("contacts", JSON.stringify([newContact]));
    }
    window.location.reload();
  });

});