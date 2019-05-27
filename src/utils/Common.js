const colors = ['rgba(255,209,154,0.2)', 'rgba(176,222,255,0.2)', 'rgba(210,243,224,0.2)', 'rgba(254,185,200,0.2)'];

// const getRandomInt = (max) => {
//   return Math.floor(Math.random() * Math.floor(max));
// }

export const getColorByString = (str) => {
  let hash = 0;
  for (i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i)
  }
  hash %= colors.length;
  
  return colors[hash];
}