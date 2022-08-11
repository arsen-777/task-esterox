export function dateToUTC(miliseconds) {
  const date = new Date(miliseconds);
  let month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth()}`;
  let year = date.getFullYear();
  let day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
  return `${day}-${month}-${year}`;
}

dateToUTC(Date.now());
