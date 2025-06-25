import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

const DetailWrapper = () => {
  const { id } = useParams();
  return <Detail id={id} />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<DetailWrapper />} />
    </Routes>
  );
}
