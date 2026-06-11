export type BetaFormData = {
  name: string;
  email: string;
  organization: string;
  os: string;
};

export function validateBetaForm(form: BetaFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = form.name.trim();
  const email = form.email.trim();

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.os) {
    errors.os = "Please select an operating system.";
  }

  return errors;
}
