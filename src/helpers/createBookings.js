export const createBookings = (objBooks) => {
  let newObj = {};
  console.log(objBooks, '---- objBooks -----');
  let newArrayBooks = [];
  for (let key in objBooks) {
    if (objBooks[key].userId in newObj) {
      newObj[objBooks[key].userId].push(objBooks[key]);
    } else {
      newObj[objBooks[key].userId] = [objBooks[key]];
    }
  }
  for (let key in newObj) {
    newArrayBooks.push(newObj[key]);
  }
  const newArr = newArrayBooks[0];
  const newArrayUser = newArr.map((book) => {
    let {
      bookingId,
      playName,
      ticketsCount,
      bookedDate,
      playDate,
      status,
      id,
      playId,
    } = book;
    return {
      playName,
      ticketsCount,
      bookedDate,
      playDate,
      status,
      id,
      bookingId,
      playId,
    };
  });
  return newArrayUser;
};
