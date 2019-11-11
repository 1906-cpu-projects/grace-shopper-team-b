const totalPrice = items => items.reduce((sum, item) => sum + Number(item.subTotal), 0).toFixed(2)

const totalItems = items => items.reduce((sum, item) => sum + Number(item.quantity),0 );

const itemsCount = total => {
  if (total === 1) {
    return '1 item';
  }
  if (total) {
    return `${total} items`;
  } else return '0 items';
};

module.exports = {
  totalPrice,
  totalItems,
  itemsCount
}
