import React from 'react';
import AdItem from '../AdItem/AdItem';
import styles from './AdList.module.css';

interface Ad {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'Недвижимость' | 'Авто' | 'Услуги';
  image?: string;
  price?: number;
}

interface AdListProps {
  ads: Ad[] | null;
}

const AdList: React.FC<AdListProps> = ({ ads }) => {
  if (!ads || ads.length === 0) {
    return <p className={styles.emptyMessage}>Объявления не найдены</p>;
  }

  return (
    <div className={styles.adListContainer}>
      {ads.map((ad) => (
        <AdItem
          key={ad.id}
          id={ad.id}
          title={ad.name}
          location={ad.location}
          category={ad.type}
          description={ad.description}
          image={ad.image || ''}
          price={ad.price}
        />
      ))}
    </div>
  );
};

export default AdList;