// Clip Culture opened on December 12, 2017.
export const yearsInBusiness = (today = new Date()) => {
  const years = today.getFullYear() - 2017;
  const beforeAnniversary = today.getMonth() < 11 || (today.getMonth() === 11 && today.getDate() < 12);
  return beforeAnniversary ? years - 1 : years;
};
