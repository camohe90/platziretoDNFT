import { Home } from './views/home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/main';
import { Plants } from './views/plants';
import { Plant } from './views/plant';

export const App = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/plants" exact element={<Plants />} />
          <Route path="/plant/:tokenId" exact element={<Plant />} />
        </Routes>
      </MainLayout>
    </>
  );
};
