export default function getRandomColor() {
    const minBrightness = 100;

    function getRandomComponent() {
      return Math.floor(Math.random() * (255 - minBrightness + 1)) + minBrightness;
    }
  
    const red = getRandomComponent();
    const green = getRandomComponent();
    const blue = getRandomComponent();
  
    const color = `rgb(${red}, ${green}, ${blue})`;
  
    return color;
  }
