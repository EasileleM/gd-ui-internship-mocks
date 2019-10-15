const documentForms = document.forms;
for (const form of documentForms) {
  if (form.checkValidity()) {
    currButtonContainer.button.removeAttribute("disabled");
  }
}

function formIsValid(input) {
  const currentForm = documentForms[input.getAttribute("form")];
  const currentSumbitButton = currentForm.getElementsByTagName("button")[0];
  if (currentForm.checkValidity()) {
    currentSumbitButton.setAttribute("disabled", "");
  } else if (currentSumbitButton.hasAttribute("disabled")) {
    currentSumbitButton.removeAttribute("disabled");
  }
}