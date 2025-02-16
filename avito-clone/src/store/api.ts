import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Порт, на котором запущен сервер (3000)
  timeout: 3000,
});

api.interceptors.request.use((config) => {
  console.log('🚀 Запрос отправлен:', config);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ Ответ получен:', response);
    return response;
  },
  (error) => {
    console.error('❌ Ошибка запроса:', error);
    return Promise.reject(error);
  }
);

// Получение всех объявлений
export const fetchAds = async () => {
  const response = await api.get('/items');
  return response.data;
};

// Создание нового объявления
export const createAd = async (adData: {
  name: string;
  description: string;
  location: string;
  type: 'Недвижимость' | 'Авто' | 'Услуги';
  // Дополнительные поля в зависимости от категории
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  cost?: number;
}) => {
  const response = await api.post('/items', adData);
  return response.data;
};

// Обновление объявления
export const updateAd = async (id: number, adData: any) => {
  const response = await api.put(`/items/${id}`, adData);
  return response.data;
};

// Удаление объявления
export const deleteAd = async (id: number) => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};

export default api;