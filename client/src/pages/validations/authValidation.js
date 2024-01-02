import * as yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerValidation = yup.object({
  fullname: yup.string().min(3).required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      passwordRegex,
      "At least 8 letters, 1 uppercase, number and symbol"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Your passwords do not match"),
});

export const loginValidation = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      passwordRegex,
      "At least 8 letters, 1 uppercase, number and symbol"
    ),
});
