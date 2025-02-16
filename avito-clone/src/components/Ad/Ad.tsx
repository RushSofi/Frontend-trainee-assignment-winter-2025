import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, removeComment, removeAd } from '../../store/slices/adsSlice';
import trash from '../../assets/trash.png';
import styles from './Ad.module.css';

interface Comment {
  id: number;
  name: string;
  text: string;
}

const Ad: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Преобразуем id в число
  const adId = Number(id);

  // Находим объявление по id
  const ad = useSelector((state: RootState) =>
    state.ads.ads.find((a) => a.id === adId)
  );

  // Получаем комментарии для этого объявления
  const comments = useSelector((state: RootState) =>
    adId ? state.ads.comments[adId] || [] : []
  );

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Если объявление не найдено
  if (!ad) {
    return <p>Объявление не найдено</p>;
  }

  // Добавление комментария
  const handleAddComment = () => {
    if (commentName.trim() && commentText.trim()) {
      dispatch(
        addComment({
          postId: ad.id, 
          comment: {
            id: Date.now(),
            name: commentName,
            text: commentText,
          },
        })
      );
      setCommentName('');
      setCommentText('');
    }
  };

  // Удаление объявления
  const handleDeleteAd = () => {
    dispatch(removeAd({ id: ad.id }));
    navigate('/list');
  };

  return (
    <div className={styles.adContainer}>
      <button onClick={handleDeleteAd} className={styles.adDeleteButton}>
        <img src={trash} alt="Удалить объявление" />
      </button>
      <button 
        onClick={() => navigate(`/form/${ad.id}`)}
        className={styles.editButton}
      >
        Редактировать
      </button>
      <h2>{ad.name}</h2>
      <p>{ad.description}</p>
      <p><strong>Локация:</strong> {ad.location}</p>
      <p><strong>Категория:</strong> {ad.type}</p>

      {ad.type === 'Недвижимость' && (
        <>
          <p><strong>Тип недвижимости:</strong> {ad.propertyType}</p>
          <p><strong>Площадь:</strong> {ad.area} кв. м</p>
          <p><strong>Количество комнат:</strong> {ad.rooms}</p>
          <p><strong>Цена:</strong> {ad.price} ₽</p>
        </>
      )}

      {ad.type === 'Авто' && (
        <>
          <p><strong>Марка:</strong> {ad.brand}</p>
          <p><strong>Модель:</strong> {ad.model}</p>
          <p><strong>Год выпуска:</strong> {ad.year}</p>
          <p><strong>Пробег:</strong> {ad.mileage} км</p>
        </>
      )}

      {ad.type === 'Услуги' && (
        <>
          <p><strong>Тип услуги:</strong> {ad.serviceType}</p>
          <p><strong>Опыт работы:</strong> {ad.experience} лет</p>
          <p><strong>Стоимость:</strong> {ad.cost} ₽</p>
        </>
      )}

      {ad.image && (
        <img className={styles.adImage} src={ad.image} alt={ad.name} />
      )}

      <h3>Комментарии</h3>
      <div className={styles.commentsSection}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <p>
              <strong>{comment.name}:</strong> {comment.text}
            </p>
            <button
              onClick={() =>
                dispatch(removeComment({ postId: ad.id, commentId: comment.id }))
              }
              className={styles.deleteButton}
            >
              <img src={trash} alt="Удалить комментарий" />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.commentForm}>
        <input
          type="text"
          placeholder="Введите имя..."
          value={commentName}
          onChange={(e) => setCommentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Введите текст..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Отправить</button>
      </div>
    </div>
  );
};

export default Ad;