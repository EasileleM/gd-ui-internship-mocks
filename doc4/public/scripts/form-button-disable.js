const documentForms = document.forms;
for (const form of documentForms) {
  if (form.checkValidity()) {
    form.getElementsByTagName('button')[0].removeAttribute('disabled');
  }
}

function formIsValid(input) {
  const currentForm = input.form;
  const currentSumbitButton = currentForm.getElementsByTagName('button')[0];
  if (currentForm.checkValidity()) {
    currentSumbitButton.removeAttribute('disabled');
  } else if (!currentSumbitButton.hasAttribute('disabled')) {
    currentSumbitButton.setAttribute('disabled', '');
  }
}