document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    initFormEvents();
  }
};

function initFormEvents() {
  let form = document.getElementById("contact-form");
  form.addEventListener("submit", async function (event) {
    await handleSubmit(event);
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  let status = document.getElementById("contact-form-status");
  let data = new FormData(event.target);

  let reCaptchaResponse = window.grecaptcha.getResponse();
  console.log(data);
  if (reCaptchaResponse.length) {
    let reCaptchaValidationResponse = validateCaptcha(reCaptchaResponse);
    if (reCaptchaValidationResponse.success) {
      //TODO: SEND EMAIL
    }
  } else {
    status.innerHTML = "Oops! There was a problem. Please check that the reCaptcha is done"
  }
}


async function validateCaptcha(token) {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const body = {
    "secret": "6LdMv48cAAAAAL5ILctrmkmN5lJJHN032VJgBNbM",
    "response": token
  };
  return await customPost(url, body);
}