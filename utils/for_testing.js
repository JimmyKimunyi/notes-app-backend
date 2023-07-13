const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return item + sum;
  };

  return array.reduce(reducer, 0) / array.length;
};

module.exports = { average, reverse };
