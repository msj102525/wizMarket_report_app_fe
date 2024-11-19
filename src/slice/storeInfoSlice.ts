import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosReport';
import { StoreInfoState } from '../types/storeInfo/storeInfo';

// 비동기 thunk 생성
export const fetchStoreInfo = createAsyncThunk<
    StoreInfoState, // 성공 시 반환 타입
    string,         // Thunk에 전달되는 파라미터 타입
    { rejectValue: { message: string; status: number } } // 실패 시 rejectWithValue로 전달되는 타입
>(
    'storeInfo/fetchStoreInfo',
    async (store_business_id, thunkAPI) => {
        try {
            const response = await axios.get(`/report/store/info/redux`, {
                params: { store_business_id },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || 'Error occurred while fetching data.',
                status: error.response?.status || 500,
            });
        }
    }
);


// slice 생성
const initialState: StoreInfoState = {
    city_name: '',
    district_name: '',
    sub_district_name: '',
    detail_category_name: '',
    biz_detail_category_rep_name: '',
    loc_info_data_ref_date: '',
    nice_biz_map_data_ref_date: '',
    population_data_ref_date: '',
    biz_main_category_id: 0,
    loading: false,
    error: '',
};

const storeInfoSlice = createSlice({
    name: 'storeInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreInfo.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchStoreInfo.fulfilled, (state, action) => {
                state.loading = false;
                Object.assign(state, action.payload); // 상태 업데이트
            })
            .addCase(fetchStoreInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred.';
            });
    },
});

export default storeInfoSlice.reducer;
