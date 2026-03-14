import * as Yup from "yup";

const newUserValidationSchema = Yup.object({
  fname: Yup.string()
    .min(1, "First name needs to be at least 1 character")
    .required("First name is required."),
  lname: Yup.string()
    .min(1, "Last name needs to be at least 1 character")
    .required("Last name is required."),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords need to match")
    .required("Confirm password is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  gender: Yup.string()
    .oneOf(["m", "f", "o"], "Gender needs to be m, f or o.")
    .required("Gender is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

export default newUserValidationSchema;
