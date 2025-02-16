import React, { useState } from 'react';
import AdList from '../AdList/AdList';
import styles from './AdsPage.module.css';

interface AdsPageProps {
  ads: Array<{
    id: number;
    name: string;
    description: string;
    location: string;
    type: 'Недвижимость' | 'Авто' | 'Услуги';
    image?: string;
    price?: number;
  }>;
}

const AdsPage: React.FC<AdsPageProps> = ({ ads }) => {
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const adsPerPage = 5; // Максимум 5 объявлений на странице

  // Вычисляем объявления для текущей страницы
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(ads.length / adsPerPage);

  return (
    <div>
      <AdList ads={currentAds} /> {/* Передаём объявления для текущей страницы */}
      <div className={styles.pagination}>
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Назад
        </button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default AdsPage;