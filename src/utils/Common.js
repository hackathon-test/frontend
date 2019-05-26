const colors = ['rgba(255,209,154,0.8)', 'rgba(176,222,255,0.8)', 'rgba(210,243,224,0.8)', 'rgba(254,185,200,0.8)'];

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const getRandomColor = () => {
    return colors[getRandomInt(colors.length)];
}
