const form = document.getElementById('regForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phone = document.getElementById('phone');
const successMsg = document.getElementById('successMsg');

function showError(input, message) {
  input.classList.add('invalid');
  input.classList.remove('valid');
  input.nextElementSibling.textContent = message;
}

function showSuccess(input) {
  input.classList.add('valid');
  input.classList.remove('invalid');
  input.nextElementSibling.textContent = '';
}

function validateEmail(email) {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email.value.trim());
}

function validatePassword(password) {
  return password.value.length >= 6 && /[!@#$%^&*]/.test(password.value);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone.value.trim());
}

fullname.addEventListener('input', () => {
  fullname.value.trim() === '' ? showError(fullname, 'Full name required') : showSuccess(fullname);
});

email.addEventListener('input', () => {
  !validateEmail(email) ? showError(email, 'Invalid email') : showSuccess(email);
});

password.addEventListener('input', () => {
  !validatePassword(password) ? showError(password, 'Weak password') : showSuccess(password);
});

phone.addEventListener('input', () => {
  !validatePhone(phone) ? showError(phone, 'Invalid phone') : showSuccess(phone);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (
    fullname.classList.contains('valid') &&
    email.classList.contains('valid') &&
    password.classList.contains('valid') &&
    phone.classList.contains('valid')
  ) {
    successMsg.textContent = 'Registration Successful!';
    form.reset();
    [fullname, email, password, phone].forEach(input => input.classList.remove('valid'));
  } else {
    successMsg.textContent = '';
    [fullname, email, password, phone].forEach(input => {
      if (!input.classList.contains('valid')) input.classList.add('invalid');
    });
  }
});
