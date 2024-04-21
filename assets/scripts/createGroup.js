window.addEventListener("load", () => {
  const groupsModal = document.querySelector("#groupsModal");
  const saveButton = groupsModal.querySelector(".save-btn");
  const addButton = groupsModal.querySelector(".add-btn");
  const modalBody = groupsModal.querySelector(".modal-body");

  addButton.addEventListener("click", () => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'modal-group';

    const input = document.createElement("input");
    input.className = "modal-input form-control";

    const deleteButton = document.createElement('button');
    deleteButton.onclick = (e) => {e.target.closest(".modal-group").remove()};
    deleteButton.className = 'btn btn-outline-secondary fs-heading delete-btn';
    deleteButton.innerHTML = `
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="black"/>
      </svg>
    `;

    groupDiv.appendChild(input);
    groupDiv.appendChild(deleteButton);
    modalBody.appendChild(groupDiv);
  });

  saveButton.addEventListener("click", () => {
    const inputs = [...modalBody.querySelectorAll("input")];
    const divs = [...modalBody.querySelectorAll(".modal-group__name")]
    console.log(divs)

    const divsValues = divs.map((div) => div.innerText);

    const inputsValues = inputs.map((input) => input.value);

    localStorage.setItem("groups", [...divsValues, ...inputsValues]);
    window.location.reload();
  });

});