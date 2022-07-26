export const getIngredientsInfo = (order, ingredients) => {
  const uniqueIngredients = order.ingredients.filter((item, index) => order.ingredients.indexOf(item) === index);
  return uniqueIngredients.map((ingredient) => {
    const current = ingredients.find((item) => item._id === ingredient);
    return {
      id: ingredient,
      name: current.name,
      type: current.type,
      price: current.price,
      image: current.image_mobile,
      count: current.type === 'bun' ? 2 : order.ingredients.filter((item) => item === ingredient).length
    }
  })
}

export const getTimeStamp = (data) => {
  const orderDate = new Date(data);
  const currentDate = new Date();
  const dayDiff = Math.abs(currentDate.getDay() - orderDate.getDay());
  const day = (value) => {
    if (value === 0) return 'Сегодня';
    if (value === 1) return 'Вчера';
    return value <= 4 ? `${value} дня назад` : `${value} дней назад`;
  }
  const orderTimezone = Math.abs(orderDate.getTimezoneOffset() / 60);
  const orderTime = orderDate.toLocaleTimeString([], {timeStyle: 'short'});
  return `${day(dayDiff)}, ${orderTime} i-GMT+${orderTimezone}`;
}

export const getPrice = (order, ingredients) => {
  const orderIngredients = getIngredientsInfo(order, ingredients);
  return orderIngredients.reduce((acc, current) => acc + current.price * current.count, 0);
}

