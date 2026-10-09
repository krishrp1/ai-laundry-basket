/**
 * Moves keyboard focus to the first field marked `aria-invalid="true"` once
 * React has rendered the validation errors, so keyboard and screen-reader
 * users land on the problem instead of being left on the submit button.
 */
export function focusFirstInvalid(form: HTMLFormElement | null) {
  requestAnimationFrame(() => {
    form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  });
}
