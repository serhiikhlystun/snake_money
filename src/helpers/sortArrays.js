import { compareAsc, parseISO } from 'date-fns';

export const sortArrayByDate = (array) => {
  return array.sort((a, b) => {
    return compareAsc(parseISO(a.date_created), parseISO(b.date_created));
  });
};

export const sortArrayByDateUpdate = (array) => {
  return array.sort((a, b) => {
    return compareAsc(parseISO(b.date_updated), parseISO(a.date_updated));
  });
};

export const sortArrayByLastAccess = (array) => {
  return array.sort((a, b) => {
      return compareAsc(parseISO(b.last_access), parseISO(a.last_access));
  });
};
