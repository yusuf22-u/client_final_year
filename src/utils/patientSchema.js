import * as Yup from "yup";

export const patientSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),

  last_name: Yup.string().required("Last name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone is required"),

  gender: Yup.string().required("Gender is required"),

  date_of_birth: Yup.date()
    .max(new Date(), "DOB cannot be in the future")
    .required("Date of birth is required"),

  medical_record_number: Yup.string()
    .min(3, "At least 3 characters")
    .nullable(),

  insurance: Yup.string().nullable(),
});