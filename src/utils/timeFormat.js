import format from 'date-fns/format';


export default function (date) {
  return format(date, 'HH:mm');
}
