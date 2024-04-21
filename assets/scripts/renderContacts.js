window.addEventListener("load", () => {
  const accordionWrapper = document.querySelector(".accordion-wrapper");
  const groups = localStorage.getItem("groups");
  const contacts = localStorage.getItem("contacts");

  const groupArr = groups.split(",");
  const contactsArr = JSON.parse(contacts);

  if (!groups && !contacts) {
    accordionWrapper.innerText = "Список контактов пуст";
    accordionWrapper.classList.add("accordion-wrapper_empty");
    return;
  }  

  if (groups && contacts) {
    const accordion = document.createElement("div");
    accordion.className = "accordion accordion-flush";;

    groupArr.forEach((group, i) => {
      const contacts = contactsArr.filter((contact) => contact.group === group);
      if (contacts.length === 0) return;
      accordion.append(createGroupItem(group, contacts, i));
    });

    accordionWrapper.appendChild(accordion);
  }
});

function createGroupItem(title, contacts, index) {
  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";

  const accordionHeader = document.createElement("h2");
  accordionHeader.className = "accordion-header";

  const accordionButton = document.createElement("button");
  accordionButton.innerText = title;
  accordionButton.className = "accordion-button collapsed";
  accordionButton.type = "button";
  accordionButton.dataset.bsToggle = "collapse";
  accordionButton.dataset.bsTarget = `#flush-collapse${index}`;
  accordionButton.setAttribute("aria-expanded", "false");
  accordionButton.setAttribute("aria-controls", `flush-collapse${index}`);

  const accordionCollapse = document.createElement("div");
  accordionCollapse.id = `flush-collapse${index}`;
  accordionCollapse.className = "accordion-collapse collapse";
  accordionCollapse.dataset.bsParent = "#accordionFlushExample";

  const accordionBody = document.createElement("div");
  accordionBody.className = "accordion-body";

  contacts.forEach(contact => {
    const contactElement = document.createElement("div");
    contactElement.className = "contact";
  
    const contactName = document.createElement("span");
    contactName.className = "contact__name";
    contactName.innerText = contact.name;
    contactElement.appendChild(contactName);
  
    const contactDetails = document.createElement("div");
    contactDetails.className = "d-flex gap-4";
  
    const contactNumber = document.createElement("span");
    contactNumber.className = "contact__number";
    contactNumber.innerText = contact.number;
    contactDetails.appendChild(contactNumber);
  
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "d-flex gap-2";
  
    const editButton = document.createElement("button");
    editButton.onclick = () => {
      if (editButton.innerHTML.includes('svg')) {
        contactName.innerHTML = `<input type="text" class="form-control contact__name" value="${contact.name}" />`;
        contactNumber.innerHTML = `<input type="text" class="form-control contact__number" value="${contact.number}" />`;
        editButton.innerHTML = 'Save';
      } else {
        const newName = accordionBody.querySelector('.contact__name > input').value;
        const newNumber = accordionBody.querySelector('.contact__number > input').value;
        console.log(newName, newNumber);
        const updatedContacts = contacts.map(c => {
          if (c.name === contact.name && c.number === contact.number) {
            return { ...contact, name: newName, number: newNumber };
          }
          return contact;
        });
        console.log(accordionBody)
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        window.location.reload();
      }
    }
    editButton.className = "btn btn-outline-secondary fs-heading edit-btn";
    editButton.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M0 14.2501V18.0001H3.75L14.81 6.94006L11.06 3.19006L0 14.2501ZM17.71 4.04006C18.1 3.65006 18.1 3.02006 17.71 2.63006L15.37 0.290059C14.98 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.13 2.12006L15.88 5.87006L17.71 4.04006Z" fill="black"/>
      </svg>
    `;
    buttonGroup.appendChild(editButton);
    
  
    const deleteButton = document.createElement("button");
    deleteButton.onclick = (e) => {
      e.target.closest(".contact").remove()
      removeContact(contact);
    };
    deleteButton.className = "btn btn-outline-secondary fs-heading delete-btn";
    deleteButton.innerHTML = `
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="black"/>
      </svg>
    `;
    buttonGroup.appendChild(deleteButton);
  
    contactDetails.appendChild(buttonGroup);
    contactElement.appendChild(contactDetails);
    accordionBody.appendChild(contactElement);
  });
  
  accordionCollapse.appendChild(accordionBody);
  accordionHeader.appendChild(accordionButton);
  accordionItem.appendChild(accordionHeader);
  accordionItem.appendChild(accordionCollapse);

  return accordionItem;
}

function removeContact(contact) {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  
  const contactRemoveIndex = contacts.findIndex((c) => c.name === contact.name && c.number === contact.number);

  const newContacts = [...contacts.slice(0, contactRemoveIndex), ...contacts.slice(contactRemoveIndex + 1, contacts.length - 1)];

  localStorage.setItem("contacts", JSON.stringify(newContacts));
}