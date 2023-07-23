import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import DrawerRoutes from './src/routes/DrawerRoutes';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}

export default App;
