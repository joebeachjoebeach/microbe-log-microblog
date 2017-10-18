var signup = document.getElementById('signup');
var flash = document.getElementById('flash');
var errors = [];

if (signup) {
  signup.addEventListener('click', function() {
    showModal();
  });
}

if (flash) {
  setTimeout(function() {
    flash.style.display = 'none';
  }, 3000);
}

if (messages.length > 0) {
  showModal();
}

var modal;
var submit;
function showModal() {
  modal = document.createElement('DIV');
  var modalContent = document.createElement('DIV');
  var h3 = document.createElement('H3');
  var form = document.createElement('FORM');
  var emailInput = document.createElement('INPUT');
  var emailMsg = document.createElement('DIV');
  var usernameInput = document.createElement('INPUT');
  var usernameMsg = document.createElement('DIV');
  var passInput = document.createElement('INPUT');
  var passMsg = document.createElement('DIV');
  var vPassInput = document.createElement('INPUT');
  var vPassMsg = document.createElement('DIV');
  submit = document.createElement('INPUT');
  var cancel = document.createElement('BUTTON');

  modal.className = 'signupmodal';
  modalContent.className = 'signupmodal-content';

  form.className = 'signupmodal-content-form';
  form.setAttribute('action', '/register');
  form.setAttribute('method', 'POST');

  emailInput.id = 'signup-email';
  emailInput.className = 'signupmodal-content-form-input';
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('name', 'email');
  emailInput.setAttribute('placeholder', 'Enter your email address');
  emailInput.setAttribute('required', '');

  emailMsg.id = 'email-message';
  emailMsg.className = 'signupmodal-content-form-message';

  usernameInput.id = 'signup-username';
  usernameInput.className = 'signupmodal-content-form-input';
  usernameInput.setAttribute('type', 'text');
  usernameInput.setAttribute('name', 'username');
  usernameInput.setAttribute('placeholder', 'Choose a username');
  usernameInput.setAttribute('required', '');

  usernameMsg.id = 'username-message';
  usernameMsg.className = 'signupmodal-content-form-message';

  passInput.id = 'signup-password';
  passInput.className = 'signupmodal-content-form-input';
  passInput.setAttribute('type', 'password');
  passInput.setAttribute('name', 'password');
  passInput.setAttribute('placeholder', 'Create a password');
  passInput.setAttribute('required', '');

  passMsg.id = 'password-message';
  passMsg.className = 'signupmodal-content-form-message';

  vPassInput.id = 'signup-passwordverify';
  vPassInput.className = 'signupmodal-content-form-input';
  vPassInput.setAttribute('type', 'password');
  vPassInput.setAttribute('name', 'password-verify');
  vPassInput.setAttribute('placeholder', 'Verify your password');
  vPassInput.setAttribute('required', '');

  vPassMsg.id = 'verifypassword-message';
  vPassMsg.className = 'signupmodal-content-form-message';

  submit.id = 'signup-submit';
  submit.setAttribute('type', 'submit');
  submit.setAttribute('name', 'submit_account');
  submit.setAttribute('value', 'Sign Up');

  cancel.id = 'cancel-signup';

  if (messages.length > 0) {
    messages.forEach(function(message) {
      if (message.search('email') > -1)
        emailMsg.textContent = message;
      
      if (message.search('username') > -1)
        usernameMsg.textContent = message;
      
      if (message.search('password') > -1)
        passMsg.textContent = message;
    });
    messages = [];
  }

  cancel.addEventListener('click', function() {
    hideModal();
  });

  emailInput.addEventListener('blur', function(event) {
    var validEmailRegEx = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,6}))/;

    if (!event.target.value.match(validEmailRegEx))
      displaySignupError(emailInput, emailMsg, 'invalid email address');
  });

  emailInput.addEventListener('input', function() {
    clearSignupError(emailInput, emailMsg);
  });

  usernameInput.addEventListener('input', function(event) {
    if (event.target.value.match(/\W/))
      displaySignupError(usernameInput, usernameMsg, 'username can only contain letters, numbers, and underscore');
    else {
      clearSignupError(usernameInput, usernameMsg);
    }
  });

  vPassInput.addEventListener('input', function(event) {
    if (event.target.value !== passInput.value)
      displaySignupError(vPassInput, vPassMsg, 'passwords do not match');
    else
      clearSignupError(vPassInput, vPassMsg);
  });

  var h3Content = document.createTextNode('Create an account');
  h3.appendChild(h3Content);

  var cancelContent = document.createTextNode('Cancel');
  cancel.appendChild(cancelContent);

  form.appendChild(emailInput);
  form.appendChild(emailMsg);
  form.appendChild(usernameInput);
  form.appendChild(usernameMsg);
  form.appendChild(passInput);
  form.appendChild(passMsg);
  form.appendChild(vPassInput);
  form.appendChild(vPassMsg);
  form.appendChild(submit);

  modalContent.appendChild(h3);
  modalContent.appendChild(form);
  modalContent.appendChild(cancel);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

}

function hideModal() {
  document.body.removeChild(modal);
  modal = null;
}

function displaySignupError(inputEl, msgEl, msg) {
  inputEl.style.color = 'red';
  msgEl.textContent = msg;
  if (!errors.includes(inputEl)) 
    errors.push(inputEl);
  submit.disabled = true;
}

function clearSignupError(inputEl, msgEl) {
  inputEl.style.color = '#444';
  msgEl.textContent = '';
  if (errors.includes(inputEl))
    errors.splice(errors.indexOf(inputEl), 1);
  if (errors.length < 1)
    submit.disabled = false;
}



