// Validates a single field with a provided regex pattern and error message
const validateField = (field, pattern, errorMessage) => {
  if (!pattern.test(field.value.trim())) {
    field.setCustomValidity(errorMessage);
    field.classList.add("is-invalid"); // Apply invalid styling
    field.classList.remove("is-valid"); // Remove valid styling
    return false;
  } else {
    field.setCustomValidity(""); // Clear any previous validation error
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    return true;
  }
};

// Validates all required fields in the form
const validateRequiredFields = (fields) => {
  let isValid = true;

  fields.forEach((field) => {
    // Check if the field is empty
    if (!field.value.trim()) {
      field.setCustomValidity("This field is required.");
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");
      isValid = false;
    } else {
      field.setCustomValidity("");
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    }
  });

  return isValid; // Return the overall validity of required fields
};

// Sets up validation for the Buyer Information form
export const setupFormValidation = () => {
  const form = document.getElementById("buyerInfoForm");
  const requiredFields = form.querySelectorAll("input[required]");
  const phoneField = document.getElementById("validationCustomPhone");
  const zipField = document.getElementById("validationCustom05");

  // Validate all required fields
  const isAllFieldsFilled = validateRequiredFields(requiredFields);

  // Validate phone number
  const isNumberValid = validateField(
    phoneField,
    /^\+?[0-9]{7,15}$/, // Regex for phone number
    "Phone number must contain only digits and be between 7 and 15 characters."
    /*
      Explanation of the regex:
      - `^`: Start of the string.
      - `\+?`: Matches an optional "+" at the beginning.
      - `[0-9]{7,15}`: Matches 7 to 15 digits.
      - `$`: End of the string.
      This ensures the phone number is purely numeric with an optional "+" and has a valid length.
    */
  );

  // Validate ZIP code
  const isZIPValid = validateField(
    zipField,
    /^[0-9]{1,6}$/, // Regex for ZIP code
    "ZIP code must contain only digits and be no longer than 6 characters."
    /*
      Explanation of the regex:
      - `^`: Start of the string.
      - `[0-9]{1,6}`: Matches 1 to 6 digits.
      - `$`: End of the string.
      This ensures the ZIP code is purely numeric and has a maximum length of 6.
    */
  );

  // Return true only if all validations pass
  return isAllFieldsFilled && isNumberValid && isZIPValid;
};

// Extracts the buyer's first name from the form
export const extractNameFromForm = () => {
  const form = document.getElementById("buyerInfoForm");
  const firstNameField = form.querySelector('input[name="firstName"]'); // Get the first name input field

  // Retrieve and trim the first name value (return an empty string if the field is not found)
  const firstName = firstNameField ? firstNameField.value.trim() : "";

  return firstName;
};
