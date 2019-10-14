const formButtonsContainers = Array
  .prototype
  .map
  .call(document.getElementsByClassName('registration-button'),
    (button) => {
      const buttonContainer = { button };

      let parentElement = button.parentElement;
      while (parentElement && parentElement.tagName.toLowerCase() != 'form') {
        parentElement = parentElement.parentElement;
      }
      if (!parentElement) {
        return buttonContainer;
      }

      buttonContainer.inputs = parentElement.getElementsByTagName('input');
      buttonContainer.validInputCounter = 0;
      buttonContainer.inputValidity = Array
        .prototype
        .map
        .call(buttonContainer.inputs, ((input) => {
          let currentInputValidity = input.checkValidity();
          currentInputValidity && buttonContainer.validInputCounter++;
          return currentInputValidity;
        }));
      
      return buttonContainer;
    });
formButtonsContainers
  .forEach((buttonContainer) => changeButtonState(buttonContainer.button));

function inputIsValid(input) {
  let parentElement = input.parentElement;
  while (parentElement.tagName.toLowerCase() != 'form') {
    parentElement = input.parentElement;
  }
  const currentButton = parentElement.getElementsByClassName('registration-button')[0];
  const currButtonContainer = formButtonsContainers
    .find((buttonContainer) => buttonContainer.button === currentButton);
  const currInputValidityIndex = Array.prototype.indexOf
    .call(currButtonContainer.inputs, input);
  const currInputValidity = input.checkValidity();
  if (!currButtonContainer.inputValidity[currInputValidityIndex] && currInputValidity) {
    currButtonContainer.validInputCounter++;
  } else if (currButtonContainer.inputValidity[currInputValidityIndex] && !currInputValidity) {
    currButtonContainer.validInputCounter--;
  }
  currButtonContainer.inputValidity[currInputValidityIndex] = currInputValidity;
  changeButtonState(currButtonContainer.button);
}

function changeButtonState(button) {
  const currButtonContainer = formButtonsContainers
    .find((buttonContainer) => buttonContainer.button === button);
  if (!currButtonContainer.inputs) {
    return;
  }
  if (currButtonContainer.validInputCounter == currButtonContainer.inputs.length) {
    currButtonContainer.button.removeAttribute("disabled");
  } else {
    currButtonContainer.button.setAttribute("disabled", "");
  }
}