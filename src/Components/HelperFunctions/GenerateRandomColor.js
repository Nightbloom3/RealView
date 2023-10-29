//Short function to generate a random colours for charts with variable amounts of data
export function GenerateRandomColor(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }
    return colors;
  };