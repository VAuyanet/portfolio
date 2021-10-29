let form;

document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    form = document.getElementById("contact-form");
    initFormEvents();
  }
};

function initFormEvents() {
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
}

function areFormRequiredFieldsValid(formData) {
  const firstName = isFormRequiredFieldValid(formData, "first-name");
  const lastName = isFormRequiredFieldValid(formData, "last-name");
  const email = isFormRequiredFieldValid(formData, "email", "email");
  const message = isFormRequiredFieldValid(formData, "message");

  return firstName && lastName && email && message;
}

function isFormRequiredFieldValid(formData, name, type = "text") {
  const fieldValue = formData.get(name);
  switch (type) {
    case "email":
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(fieldValue);
    case "text":
    default:
      return fieldValue !== "";
  }

}

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  if (areFormRequiredFieldsValid(formData)) {
    fetch(event.target.action,
      {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }
    ).then((response) => {

      if (response.ok) {
        const formWrapper = document.getElementById("contact-form-wrapper");
        if (formWrapper) {
          formWrapper.classList.add("form-success");
        }
        form.reset();
      } else {
        console.error("Contact Form KO");
        setContactFormError();
      }
    }).catch((error) => {
      console.error(error);
      setContactFormError();
    });
  } else {
    setContactFormError("All required fields have to be filled out");
  }
}


function setContactFormError(error = "") {

  const errorStatus = document.getElementById("contact-form-error");
  if (error !== "") {
    errorStatus.innerHTML = error;
  } else {
    errorStatus.innerHTML = "<b>Oops!</b> There was a problem submitting your form. Remember to fill the captcha"
  }
  errorStatus.classList.add("active");

}