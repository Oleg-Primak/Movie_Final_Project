import loaderImg from '../assets/loader.svg';

const loader = document.createElement('img');
loader.setAttribute('id','loader')

export const createLoader = () => {
  loader.setAttribute('src', loaderImg);

  document.body.append(loader);
};
  