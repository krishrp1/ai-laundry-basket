// Plain constants shared between client form components and the server-only
// spam-checking logic in lib/spam-guards.ts. Deliberately has zero imports so
// it's always safe to bundle into the client — never add a db/env import here.

/** Name of the hidden honeypot input real users never see or fill in. */
export const HONEYPOT_FIELD = "companyWebsite";
/** Name of the hidden input carrying the timestamp the form was rendered at. */
export const FORM_TIMESTAMP_FIELD = "formRenderedAt";
