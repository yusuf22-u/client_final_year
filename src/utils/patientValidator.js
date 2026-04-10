export const validatePatient = (data) => {
  const errors = {};

  // First name
  if (!data.first_name.trim()) {
    errors.first_name = "First name is required";
  }

  // Last name
  if (!data.last_name.trim()) {
    errors.last_name = "Last name is required";
  }

  // Email
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  // Phone (simple validation)
  if (!data.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^\+?[0-9]{7,15}$/.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  // Gender
  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  // DOB
  if (!data.date_of_birth) {
    errors.date_of_birth = "Date of birth is required";
  } else {
    const today = new Date();
    const dob = new Date(data.date_of_birth);

    if (dob > today) {
      errors.date_of_birth = "DOB cannot be in the future";
    }
  }

  // Medical record number (optional but must be valid if provided)
  if (data.medical_record_number && data.medical_record_number.length < 3) {
    errors.medical_record_number = "Must be at least 3 characters";
  }

  return errors;
};