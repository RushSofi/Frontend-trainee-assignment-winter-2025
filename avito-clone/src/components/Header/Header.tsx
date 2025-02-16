import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import icon from '../../assets/header.png';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: 'all' | 'Недвижимость' | 'Авто' | 'Услуги';
  setCategoryFilter: (category: 'all' | 'Недвижимость' | 'Авто' | 'Услуги') => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerName}>
        <img src={icon} alt="Icon" className={styles.icon} />
        <h1>Avito clone</h1>
        {!(location.pathname === '/form') && (
          <button
            className={styles.createPostButton}
            onClick={() => navigate('/form')}
          >
            Разместить объявление
          </button>
        )}
      </div>

      {location.pathname === '/list' && (
        <div className={styles.searchAndFilter}>
          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Поиск по названиям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8" stroke="black" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="black" strokeWidth="2" />
              </svg>
            </button>
          </form>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as 'all' | 'Недвижимость' | 'Авто' | 'Услуги')}
            className={styles.categoryFilter}
          >
            <option value="all">Все категории</option>
            <option value="Недвижимость">Недвижимость</option>
            <option value="Авто">Авто</option>
            <option value="Услуги">Услуги</option>
          </select>
        </div>
      )}

      {(location.pathname.startsWith('/item') || location.pathname === '/form') && (
        <button
          className={styles.backButton}
          onClick={() => navigate('/list')}
        >
          Вернуться назад в ленту
        </button>
      )}
    </header>
  );
};

export default Header;