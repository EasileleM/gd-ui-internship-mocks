const formButtonsContainers = Array.prototype.map.call(document.getElementsByClassName('registration-button'),
(button) => {
  const buttonContainer = {button};
  let parentElement = button.parentElement;
  while (parentElement && parentElement.tagName.toLowerCase() != 'form') {
    parentElement = parentElement.parentElement;
  }
  if (!parentElement) {
    return buttonContainer;
  }
  buttonContainer.inputs = parentElement.getElementsByTagName('input');
  buttonContainer.validInputCounter = 0;
  buttonContainer.inputValidity = Array.prototype.map.call(buttonContainer.inputs, ((input) => {
    let currentInputValidity = input.checkValidity();
    currentInputValidity && buttonContainer.validInputCounter++;
    return currentInputValidity;
  }));
  return buttonContainer;
});
formButtonsContainers.forEach((buttonContainer) => changeButtonState(buttonContainer.button));

function inputIsValid(input) {
  let parentElement = input.parentElement;
  while (parentElement.tagName.toLowerCase() != 'form') {
    parentElement = input.parentElement;
  }
  const currentButton = parentElement.getElementsByClassName('registration-button')[0];
  const currentButtonContainer = formButtonsContainers.find((buttonContainer) => buttonContainer.button === currentButton);
  const currentInputValidityIndex = Array.prototype.indexOf.call(currentButtonContainer.inputs, input);
  const currentInputValidity = input.checkValidity();
  if (!currentButtonContainer.inputValidity[currentInputValidityIndex] && currentInputValidity) {
    currentButtonContainer.validInputCounter++;
  } else if (currentButtonContainer.inputValidity[currentInputValidityIndex] && !currentInputValidity){
    currentButtonContainer.validInputCounter--;
  }
  currentButtonContainer.inputValidity[currentInputValidityIndex] = currentInputValidity;
  changeButtonState(currentButtonContainer.button);
}

function changeButtonState(button) {
  const currentButtonContainer = formButtonsContainers.find((buttonContainer) => buttonContainer.button === button);
  if (!currentButtonContainer.inputs) {
    return;
  }
  if (currentButtonContainer.validInputCounter == currentButtonContainer.inputs.length) {
    currentButtonContainer.button.removeAttribute("disabled");
  } else {
    currentButtonContainer.button.setAttribute("disabled", "");
  }
}