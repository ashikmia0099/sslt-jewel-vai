import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    lastBannerData: [],
    loading: false,
    error: null
}

// fetch get last banner all data

export const fetchLastBannerDataGet = createAsyncThunk(
    "about/fetchLastBannerDataGet",
    async () => {
        const res = await fetch(`${APP_URL}/about/last/banner`);
        return await res.json();
    }
);

// fetch post all data

export const fetchLastBannerDataPost = createAsyncThunk(
    "about/fetchLastBannerDataPost",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/last/banner`, {
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

export const fetchLastBannerDataPatch = createAsyncThunk(
    "about/fetchLastBannerDataPatch",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/last/banner/${id}`, {
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

export const fetchLastBannerDataDelete = createAsyncThunk(
    "about/fetchLastBannerDataDelete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/last/banner/${id}`, {
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


const lastBannerSlice = createSlice({
    name: "lastBanner",
    initialState,
    reducers: {
        setLastBanner: (state, action) => {
            state.lastBannerData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLastBannerDataGet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchLastBannerDataGet.fulfilled, (state, action) => {
                state.loading = false;
                state.lastBannerData = action.payload;
            })
            .addCase(fetchLastBannerDataGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            // post api lifecyrcle

            .addCase(fetchLastBannerDataPost.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchLastBannerDataPost.fulfilled, (state, action) => {
                state.loading = false;
                state.lastBannerData.push(action.payload.data)
            })
            .addCase(fetchLastBannerDataPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(fetchLastBannerDataDelete.fulfilled, (state, action) => {
                state.lastBannerData = state.lastBannerData.filter(item => item.id !== action.payload);
            })
            .addCase(fetchLastBannerDataDelete.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
})


export const aboutlastBannerReducer = lastBannerSlice.reducer;


