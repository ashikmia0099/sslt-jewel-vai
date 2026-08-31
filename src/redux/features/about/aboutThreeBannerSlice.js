import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    threeBannerData: [],
    loading: false,
    error: null
}


// fetch get three banner all data

export const fetchThreeBannerDataGet = createAsyncThunk(
    "about/fetchThreeBannerDataGet",
    async () => {
        const res = await fetch(`${APP_URL}/about/three/banner`);
        return await res.json();
    }
);

// fetch post all data

export const fetchThreeBannerDataPost = createAsyncThunk(
    "about/fetchThreeBannerDataPost",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/three/banner`, {
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

export const fetchThreeBannerDataPatch = createAsyncThunk(
    "about/fetchThreeBannerDataPatch",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/three/banner/${id}`, {
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

export const fetchThreeBannerDataDelete = createAsyncThunk(
    "about/fetchThreeBannerDataDelete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/three/banner/${id}`, {
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


// fetch post gallary all data

const threeBannerSlice = createSlice({
    name: "threeBanner",
    initialState,
    reducers: {
        setThreeBanner: (state, action) => {
            state.threeBannerData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchThreeBannerDataGet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchThreeBannerDataGet.fulfilled, (state, action) => {
                state.loading = false;
                state.threeBannerData = action.payload;
            })
            .addCase(fetchThreeBannerDataGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            // post api lifecyrcle

            .addCase(fetchThreeBannerDataPost.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchThreeBannerDataPost.fulfilled, (state, action) => {
                state.loading = false;
                state.threeBannerData.push(action.payload.data)
            })
            .addCase(fetchThreeBannerDataPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(fetchThreeBannerDataDelete.fulfilled, (state, action) => {
                state.threeBannerData = state.threeBannerData.filter(item => item.id !== action.payload);
            })
            .addCase(fetchThreeBannerDataDelete.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
})
export const aboutThreeBannerReducer = threeBannerSlice.reducer;


