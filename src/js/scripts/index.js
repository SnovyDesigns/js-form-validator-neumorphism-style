const form = document.querySelector('#form'),
  username = document.querySelector('#username'),
  email = document.querySelector('#email'),
  password = document.querySelector('#password'),
  password2 = document.querySelector('#password2');

// ----------------------------------------------

// Show input error message
const showError = (input, msg) => {
  const error = input.nextElementSibling;
  input.classList.add('error');
  input.classList.remove('success');
  error.classList.add('error');
  error.textContent = msg;
};

// Change input text color to success
const showSuccess = input => {
  const error = input.nextElementSibling;
  input.classList.remove('error');
  input.classList.add('success');
  error.classList.remove('error');
};

// Check email is valid
const checkEmail = input => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    regex.test(
      String(input.value)
        .toLowerCase()
        .trim()
    )
  ) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

// Get input field name
const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check required fields
const checkRequired = inputs => {
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};
// ----------------------------------------------

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
