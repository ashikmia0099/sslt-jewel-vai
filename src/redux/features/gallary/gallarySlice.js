import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    gallaryImage: [],
    loading: false,
    error: null
}


// fetch get gallery all data

export const fetchGallaryDataGet = createAsyncThunk(
    "gallary/fetchGallaryDataGet",
    async () => {
        const res = await fetch(`${APP_URL}/gallery`);
        return await res.json();
    }
);



// fetch post gallary all data

export const fetchGallaryDataPost = createAsyncThunk(
    "news/fetchGallaryDataPost",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/gallery`, {
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


// fetch patch gallary  data

export const fetchGallaryDataPatch = createAsyncThunk(
    "news/fetchGallaryDataPatch",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/gallery/${id}`, {
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


// fetch delete gallary  data

export const fetchGallaryDataDelete = createAsyncThunk(
    "news/fetchGallaryDataDelete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/gallery/${id}`, {
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



const gallarySlice = createSlice({
    name: "gallary",
    initialState,
    reducers: {
        setGallaryImage: (state, action) => {
            state.gallaryImage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallaryDataGet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchGallaryDataGet.fulfilled, (state, action) => {
                state.loading = false;
                state.gallaryImage = action.payload.data;
            })
            .addCase(fetchGallaryDataGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // post api lifecyrcle
            .addCase(fetchGallaryDataPost.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchGallaryDataPost.fulfilled, (state, action) => {
                state.loading = false;
                state.gallaryImage.push(action.payload.data)
            })
            .addCase(fetchGallaryDataPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(fetchGallaryDataDelete.fulfilled, (state, action) => {
                state.gallaryImage = state.gallaryImage.filter(item => item.id !== action.payload);
            })
            .addCase(fetchGallaryDataDelete.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
})


export const gallaryReducer = gallarySlice.reducer;


