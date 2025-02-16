import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchAdsAsync } from './store/slices/adsSlice';
import Header from './components/Header/Header';
import Ad from './components/Ad/Ad';
import AdsPage from './components/AdsPage/AdsPage';
import CreateAd from './components/CreateAd/CreateAd';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Недвижимость' | 'Авто' | 'Услуги'>('all');
  const ads = useAppSelector((state) => state.ads.ads);

  // Загрузка объявлений при монтировании
  useEffect(() => {
    dispatch(fetchAdsAsync());
  }, [dispatch]);

  // Фильтрация объявлений
  const filteredAds = useMemo(() => {
    return ads.filter(ad => 
      ad.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === 'all' || ad.type === categoryFilter)
    );
  }, [ads, searchQuery, categoryFilter]);

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      
      <Routes>
        <Route path="/list" element={<AdsPage ads={filteredAds} />} />
        <Route path="/item/:id" element={<Ad />} />
        <Route path="/form" element={<CreateAd />} />
        <Route path="/form/:id" element={<CreateAd />} />
      </Routes>

      <ThemeToggle />
    </div>
  );
};

export default App;