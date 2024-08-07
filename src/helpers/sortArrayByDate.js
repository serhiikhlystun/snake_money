import { compareAsc, parseISO } from 'date-fns';

const sortArrayByDate = (array) => {
  return array.sort((a, b) => {
    return compareAsc(parseISO(a.date_created), parseISO(b.date_created));
  });
};

export default sortArrayByDate;