import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coins: [],
  coin: {},
  isLoading: false,
  error: false,
};

export const getCoinsByCategoryId = createAsyncThunk(
  `get coins by id`,
  async (id) => {
    const response = await axios.get(`http://localhost:4000/${id}`);
    return response.data;
  }
);



export const deleteCoinById = createAsyncThunk(
  "coins/deleteCoinById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/delete/${+id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const updateCoin = createAsyncThunk(
  "coins/updateCoin",
  async (request) => {
    console.log(request);
    const response = await axios.put(
      `http://localhost:4000/${request.coinId}`,
      request
    );
    return response.data;
  }
);

export const addCoin = createAsyncThunk("coins/add-coin", async (request) => {
  console.log(request);
  const response = await axios.post(`http://localhost:4000/add-coin/`, request);
});

export const getCoinsByInputRequest = createAsyncThunk(
  `getCoinsBySearchQuery`,
  async (request) => {
    const response = await axios.get(`http://localhost:4000/?q=${request}`);

    return response.data;
  }
);

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    removeCoinInListById: (state, action) => {
      state.coins = state.coins.filter((coin) => coin.coinId != action.payload);
    },
    updateCoinState: (state, action) => {
      state.coins = state.coins.filter(
        (coin) => coin.coinId !== action.payload.coinId
      );
      state.coins = [action.payload, ...state.coins];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoinsByCategoryId.fulfilled, (state, action) => {
      state.coins = action.payload;
      state.isLoading = false;
      state.error = false;
    }),
      builder.addCase(getCoinsByCategoryId.rejected, (state, action) => {
        console.log(action.payload, "middlewarede rejected");
        state.isLoading = false;
        state.error = false;
      }),
      builder.addCase(getCoinsByInputRequest.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.isLoading = false;
        state.error = false;
      }),
      builder.addCase(getCoinsByInputRequest.rejected, (state, action) => {
        console.log(action.payload, "middlewarede rejected");
        state.isLoading = false;
        state.error = false;
      }),
      builder.addCase(deleteCoinById.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = false;
      });
  },
});

export const { removeCoinInListById, updateCoinState } = coinsSlice.actions;
export default coinsSlice.reducer;
