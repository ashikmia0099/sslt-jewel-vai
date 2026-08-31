import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    home_three_banner_data: [],
    loading: false,
    error: null
}

// fetch hero data 

export const getfetchHomeThreeBanner = createAsyncThunk(
    "HomeThreeBanner/getfetchHomeThreeBanner", async () => {
        const res = await fetch(`${APP_URL}/home/three/banner`);
        return await res.json();
    }
)

// fetch post all data

export const postfetchHomeThreeBanner = createAsyncThunk(
    "HomeThreeBanner/postfetchHomeThreeBanner",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/three/banner`, {
                method: "POST",
                body: formData
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to post");
            }
            return data

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// fetch patch  data

export const patchfetchHomeThreeBanner = createAsyncThunk(
    "HomeThreeBanner/patchfetchHomeThreeBanner",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/three/banner/${id}`, {
                method: "PATCH",
                body: formData
            })

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to update");
            }
            return data

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// fetch delete data

export const deletefetchHomeThreeBanner = createAsyncThunk(
    "HomeThreeBanner/deletefetchHomeThreeBanner",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/three/banner/${id}`, {
                method: "DELETE",
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to delete");
            }
            return id

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const HomeThreeBannerSlice = createSlice({
    name: 'HomeThreeBanner',
    initialState,
    reducers: {
        setHomeThreeBanner: (state, action) => {
            state.home_three_banner_data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchHomeThreeBanner.pending, (state) => {
                state.loading = true;
            })
            .addCase(getfetchHomeThreeBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.home_three_banner_data = action.payload;
            })
            .addCase(getfetchHomeThreeBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // post api lifecyrcle

            .addCase(postfetchHomeThreeBanner.pending, (state) => {
                state.loading = true
            })
            .addCase(postfetchHomeThreeBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.home_three_banner_data.push(action.payload.data)
            })
            .addCase(postfetchHomeThreeBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(deletefetchHomeThreeBanner.fulfilled, (state, action) => {
                state.home_three_banner_data = state.home_three_banner_data.filter(item => item.id !== action.payload);
            })
            .addCase(deletefetchHomeThreeBanner.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});

export const HomeThreeBannerReducer = HomeThreeBannerSlice.reducer