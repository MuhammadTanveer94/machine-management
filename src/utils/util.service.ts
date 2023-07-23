import uuid from 'react-native-uuid';

const utilService = (() => {
  const generateUniqueId = () => {
    return uuid.v4() as string;
  };

  return {
    generateUniqueId,
  };
})();

export default utilService;
