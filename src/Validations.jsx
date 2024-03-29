import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, {
      message: "Please Input valid name",
    })
    .required("Name is required"),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/, {
      message: "Please Input a valid Email",
    })
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/,
      "Must Contain combination of alphanumeric characters and symbols and must be at least 8 characters long"
    )
    .min(8, "Password should be at least 8 characters.")
    .max(24, "Password should be at most 24 characters."),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required("You should confirm your password."),
  // dob: yup.date("Date is required").min(new Date(Date.now()), "Date must be greater than today").required("DOB is required").nullable("Date is required").default(undefined)
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password should be at least 4 characters.")
    .max(16, "Password should be at most 16 characters."),
});

export const feedbackSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
