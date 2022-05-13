// Find discount in percent
  // 1- Substract the final price from the original price
  // 2- Divide this number by the original price.
  // 3- Finally, multiply the result by 100.
  // 4- You've obtained a discount in percentages. How awesome!

  export default function getDiscountPercent(regularPrice, salePrice) {
    const saving = parseFloat(regularPrice) - parseFloat(salePrice);
    const discount = saving / parseFloat(regularPrice);
    return Math.round(discount * 100);
  }