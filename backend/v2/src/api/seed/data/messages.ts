export const messages = () => {
  const arrayOfObjects = [];

  for (let index = 0; index < 50; index++) {
    const message = `message: ${index}`;
    arrayOfObjects.push(message);
  }
  return arrayOfObjects;
};
console.log(messages());
