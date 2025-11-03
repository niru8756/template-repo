export const parsePincode = (value: string): number =>
  /^\d{6}$/.test(value) ? Number(value) : 0;
