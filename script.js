const form = document.getElementById('contactForm');
const messageDiv = document.getElementById('message');
const darkModeToggle = document.getElementById('darkModeToggle');
const saveBtn = document.getElementById('saveBtn');
const showNameBtn = document.getElementById('showNameBtn');
const submittedNameDiv = document.getElementById('submittedName');

const btn = form.querySelector('.btn');
const btnLoader = btn.querySelector('.btn-loader');
const btnText = btn.querySelector('.btn-text');

const storageKey = 'contactFormData';

// Load saved data from localStorage on page load
window.addEventListener('load', () => {
  const savedData = JSON.parse(localStorage.getItem(storageKey));
  if (savedData) {
    if (savedData.name) form.name.value = savedData.name;
    if (savedData.phone) form.phone.value = savedData.phone;
    if (savedData.email) form.email.value = savedData.email;
  }
});

// Save Progress button click
saveBtn.addEventListener('click', () => {
  const dataToSave = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
  };
  localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  messageDiv.style.color = '#27ae60';
  messageDiv.textContent = 'Progress saved successfully!';
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Live validation
form.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    validateInput(input);
  });
});

function validateInput(input) {
  const parent = input.parentElement;
  if (!input.checkValidity()) {
    parent.classList.add('invalid');
    return false;
  } else {
    parent.classList.remove('invalid');
    return true;
  }
}

function validateForm() {
  let valid = true;
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    if (!validateInput(input)) {
      valid = false;
    }
  });
  return valid;
}

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) {
    messageDiv.style.color = '#e74c3c';
    messageDiv.textContent = 'Please fix errors before submitting.';
    return;
  }

  btn.disabled = true;
  btn.classList.add('loading');

  setTimeout(() => {
    btn.disabled = false;
    btn.classList.remove('loading');

    const name = form.name.value.trim();
    localStorage.setItem('submittedName', name);

    messageDiv.style.color = '#27ae60';
    messageDiv.textContent = `Thanks, ${name}! Your info has been submitted.`;

    form.reset();
    localStorage.removeItem(storageKey);
    form.querySelectorAll('input').forEach(input => {
      input.dispatchEvent(new Event('input'));
    });
  }, 2000);
});

// Show Submitted Name
showNameBtn.addEventListener('click', () => {
  const name = localStorage.getItem('submittedName');
  if (name) {
    submittedNameDiv.textContent = `Last submitted name: ${name}`;
  } else {
    submittedNameDiv.textContent = 'No submitted name found.';
  }
});
function exportData() {
  const data = localStorage.getItem('contactFormData');
  const blob = new Blob([data], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'saved_data.json';
  link.click();
}
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
  };

  const text = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}`;
  const blob = new Blob([text], { type: 'text/plain' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'contact-info.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) {
    messageDiv.style.color = '#e74c3c';
    messageDiv.textContent = 'Please fix errors before submitting.';
    return;
  }

  btn.disabled = true;
  btn.classList.add('loading');

  setTimeout(() => {
    btn.disabled = false;
    btn.classList.remove('loading');

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();

    localStorage.setItem('submittedName', name);

    messageDiv.style.color = '#27ae60';
    messageDiv.textContent =
