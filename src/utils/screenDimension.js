import { Dimensions } from 'react-native';

const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

export default getScreenDimensions;
