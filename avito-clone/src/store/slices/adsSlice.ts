import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api';

interface Comment {
  id: number;
  name: string;
  text: string;
}

export interface CreateAdData {
  name: string;
  description: string;
  location: string;
  type: 'Недвижимость' | 'Авто' | 'Услуги';
  image?: string;
  price?: number;
  propertyType?: string;
  area?: number;
  rooms?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  cost?: number;
  schedule?: string;
}

export interface Ad extends CreateAdData {
  id: number; // Добавляем обязательный id
}

interface AdsState {
  ads: Ad[];
  comments: { [postId: number]: Comment[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdsState = {
  ads: [],
  comments: {},
  status: 'idle',
  error: null,
};

export const fetchAdsAsync = createAsyncThunk('ads/fetchAds', async () => {
  const response = await api.get('/items');
  return response.data;
});

export const createAdAsync = createAsyncThunk('ads/createAd', async (adData: CreateAdData) => {
  const response = await api.post('/items', adData);
  return { id: Date.now(), ...response.data }; // Добавляем id
});

export const updateAdAsync = createAsyncThunk('ads/updateAd', 
  async (adData: Ad) => {
    const response = await api.put(`/items/${adData.id}`, adData);
    return response.data;
  }
);

export const deleteAdAsync = createAsyncThunk('ads/deleteAd', async (id: number) => {
  await api.delete(`/items/${id}`);
  return id;
});

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ postId: number; comment: Comment }>) => {
      const { postId, comment } = action.payload;
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].push(comment);
    },
    removeComment: (state, action: PayloadAction<{ postId: number; commentId: number }>) => {
      const { postId, commentId } = action.payload;
      state.comments[postId] = state.comments[postId].filter(
        (comment) => comment.id !== commentId
      );
    },
    removeAd: (state, action: PayloadAction<{ id: number }>) => {
      state.ads = state.ads.filter((ad) => ad.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdsAsync.fulfilled, (state, action: PayloadAction<Ad[]>) => {
        state.status = 'succeeded';
        state.ads = action.payload;
      })
      .addCase(fetchAdsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки объявлений';
      })
      .addCase(createAdAsync.fulfilled, (state, action) => {
        state.ads.push(action.payload);
      })
      .addCase(updateAdAsync.fulfilled, (state, action) => {
        const index = state.ads.findIndex((ad) => ad.id === action.payload.id);
        if (index !== -1) {
          state.ads[index] = action.payload;
        }
      })
      .addCase(deleteAdAsync.fulfilled, (state, action) => {
        state.ads = state.ads.filter((ad) => ad.id !== action.payload);
      });
  },
});

export const { addComment, removeComment, removeAd } = adsSlice.actions;
export default adsSlice.reducer;