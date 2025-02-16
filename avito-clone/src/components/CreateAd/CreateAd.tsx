import React, { useState, useEffect } from 'react';
import type { CreateAdData } from '../../store/slices/adsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createAdAsync, updateAdAsync, Ad } from '../../store/slices/adsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreateAd.module.css';

const CreateAd: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ads = useAppSelector((state) => state.ads.ads);
  
  // Состояния для основной информации
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState<'Недвижимость' | 'Авто' | 'Услуги'>('Недвижимость');
  
  // Состояния для категорийных полей
  const [realEstateData, setRealEstateData] = useState({ 
    propertyType: '', 
    area: 0, 
    rooms: 0, 
    price: 0 
  });
  
  const [autoData, setAutoData] = useState({ 
    brand: '', 
    model: '', 
    year: 0, 
    mileage: 0, 
    price: 0 
  });
  
  const [serviceData, setServiceData] = useState({ 
    serviceType: '', 
    experience: 0, 
    cost: 0, 
    schedule: '' 
  });

  const [step, setStep] = useState(1);

  // Загрузка данных для редактирования
  useEffect(() => {
    if (id) {
      const existingAd = ads.find(ad => ad.id === Number(id));
      if (existingAd) {
        setTitle(existingAd.name);
        setDescription(existingAd.description);
        setLocation(existingAd.location);
        setImage(existingAd.image || '');
        setCategory(existingAd.type);

        switch (existingAd.type) {
          case 'Недвижимость':
            setRealEstateData({
              propertyType: existingAd.propertyType || '',
              area: existingAd.area || 0,
              rooms: existingAd.rooms || 0,
              price: existingAd.price || 0
            });
            break;
          case 'Авто':
            setAutoData({
              brand: existingAd.brand || '',
              model: existingAd.model || '',
              year: existingAd.year || 0,
              mileage: existingAd.mileage || 0,
              price: existingAd.price || 0
            });
            break;
          case 'Услуги':
            setServiceData({
              serviceType: existingAd.serviceType || '',
              experience: existingAd.experience || 0,
              cost: existingAd.cost || 0,
              schedule: existingAd.schedule || ''
            });
            break;
        }
      }
    }
  }, [id, ads]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!title || !description || !location) {
        alert('Заполните все обязательные поля!');
        return;
      }
      setStep(2);
    }
  };

  const validateCategoryFields = () => {
    switch (category) {
      case 'Недвижимость':
        return (
          realEstateData.propertyType &&
          realEstateData.area > 0 &&
          realEstateData.rooms > 0 &&
          realEstateData.price > 0
        );
      case 'Авто':
        return (
          autoData.brand &&
          autoData.model &&
          autoData.year > 0 &&
          autoData.price > 0
        );
      case 'Услуги':
        return (
          serviceData.serviceType &&
          serviceData.experience > 0 &&
          serviceData.cost > 0
        );
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCategoryFields()) {
      alert('Заполните все обязательные поля для выбранной категории!');
      return;
    }

    // Базовые данные для любого объявления
  const baseData = {
    name: title,
    description,
    location,
    image,
    type: category,
  };

  // Данные для создания
  const createData: CreateAdData  = {
    ...baseData,
    ...(category === 'Недвижимость' && realEstateData),
    ...(category === 'Авто' && autoData),
    ...(category === 'Услуги' && serviceData),
  };

  // Данные для обновления
  const updateData: Ad = {
    ...createData,
    id: Number(id!), 
  };

  try {
    if (id) {
      await dispatch(updateAdAsync(updateData)).unwrap();
    } else {
      await dispatch(createAdAsync(createData)).unwrap();
    }
    navigate('/list');
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при сохранении объявления');
  }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createAdForm}>
      <h2>{id ? 'Редактирование объявления' : 'Создание объявления'}</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Название*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Описание*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Локация*"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Ссылка на изображение"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            required
          >
            <option value="Недвижимость">Недвижимость</option>
            <option value="Авто">Авто</option>
            <option value="Услуги">Услуги</option>
          </select>
        </>
      )}

      {step === 2 && (
        <>
          {category === 'Недвижимость' && (
            <>
              <input
                type="text"
                placeholder="Тип недвижимости*"
                value={realEstateData.propertyType}
                onChange={(e) => setRealEstateData({ ...realEstateData, propertyType: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Площадь (кв. м)*"
                value={realEstateData.area || ''}
                onChange={(e) => setRealEstateData({ ...realEstateData, area: Number(e.target.value) })}
                required
              />
              <input
                type="number"
                placeholder="Количество комнат*"
                value={realEstateData.rooms || ''}
                onChange={(e) => setRealEstateData({ ...realEstateData, rooms: Number(e.target.value) })}
                required
              />
              <input
                type="number"
                placeholder="Цена*"
                value={realEstateData.price || ''}
                onChange={(e) => setRealEstateData({ ...realEstateData, price: Number(e.target.value) })}
                required
              />
            </>
          )}

          {category === 'Авто' && (
            <>
              <input
                type="text"
                placeholder="Марка*"
                value={autoData.brand}
                onChange={(e) => setAutoData({ ...autoData, brand: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Модель*"
                value={autoData.model}
                onChange={(e) => setAutoData({ ...autoData, model: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Год выпуска*"
                value={autoData.year || ''}
                onChange={(e) => setAutoData({ ...autoData, year: Number(e.target.value) })}
                required
              />
              <input
                type="number"
                placeholder="Пробег (км)"
                value={autoData.mileage || ''}
                onChange={(e) => setAutoData({ ...autoData, mileage: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Цена*"
                value={autoData.price || ''}
                onChange={(e) => setAutoData({ ...autoData, price: Number(e.target.value) })}
                required
              />
            </>
          )}

          {category === 'Услуги' && (
            <>
              <input
                type="text"
                placeholder="Тип услуги*"
                value={serviceData.serviceType}
                onChange={(e) => setServiceData({ ...serviceData, serviceType: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Опыт работы (лет)*"
                value={serviceData.experience || ''}
                onChange={(e) => setServiceData({ ...serviceData, experience: Number(e.target.value) })}
                required
              />
              <input
                type="number"
                placeholder="Стоимость*"
                value={serviceData.cost || ''}
                onChange={(e) => setServiceData({ ...serviceData, cost: Number(e.target.value) })}
                required
              />
              <input
                type="text"
                placeholder="График работы"
                value={serviceData.schedule}
                onChange={(e) => setServiceData({ 
                  ...serviceData, 
                  schedule: e.target.value 
                })}
              />
            </>
          )}
        </>
      )}

      <div className={styles.buttonGroup}>
        {step === 2 && (
          <button type="button" onClick={() => setStep(1)} className={styles.backButton}>
            Назад
          </button>
        )}
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>
          Отменить
        </button>
        {step === 1 ? (
          <button type="button" onClick={handleNextStep} className={styles.nextButton}>
            Далее
          </button>
        ) : (
          <button type="submit" className={styles.addButton}>
            {id ? 'Сохранить изменения' : 'Разместить объявление'}
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateAd;