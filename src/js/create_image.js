export const createImage = (imgSrc) => {
  const image = document.createElement('img');
  image.height = '400';
  image.width = '600';
  image.src = imgSrc;

  return image;
};
