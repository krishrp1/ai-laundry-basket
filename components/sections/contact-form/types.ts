export type ContactMethod = "email" | "phone" | "text";

export type FormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  contactMethod: ContactMethod;
  message: string;
  consent: boolean;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  contactMethod: "email",
  message: "",
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please add a short message so we know how to help.";
  }

  if (!values.consent) {
    errors.consent = "Please tick the box to agree before sending.";
  }

  return errors;
}
