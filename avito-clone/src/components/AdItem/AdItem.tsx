import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdItem.module.css';

interface AdItemProps {
  id: number;
  title: string;
  location: string;
  category: 'Недвижимость' | 'Авто' | 'Услуги';
  description: string;
  image: string;
  price?: number;
}

const AdItem: React.FC<AdItemProps> = ({
  id,
  title,
  location,
  category,
  description,
  image,
  price,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/item/${id}`);
  };

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const previewText = description.split(' ').slice(0, 10).join(' ') + (description.split(' ').length > 10 ? '...' : '');

  return (
    <div className={styles.adItem}>
      <div className={styles.adContainer}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.location}>{location}</span>
        </div>
        <div className={styles.categoryPrice}>
          <span className={styles.category}>{category}</span>
          {price && <span className={styles.price}>{price} ₽</span>}
        </div>
        <p className={styles.description}>
          {isExpanded ? description : previewText}
          {description.split(' ').length > 10 && (
            <button onClick={toggleText} className={styles.toggleButton}>
              {isExpanded ? 'Свернуть' : 'Подробнее'}
            </button>
          )}
        </p>
        {image && (
          <img src={image} alt={title} className={styles.image} />
        )}
        <button onClick={handleNavigate} className={styles.readMore}>
          Открыть →
        </button>
      </div>
    </div>
  );
};

export default AdItem;