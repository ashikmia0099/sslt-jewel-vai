import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    allNews: [],
    singleData: [],
    loading: false,
    error: null
}


// fetch get news all data

export const fetchNewsDataGet = createAsyncThunk(
    "news/fetchNewsDataGet",
    async () => {
        const res = await fetch(`${APP_URL}/news`);
        return await res.json();
    }
);

// fetch post news all data

export const fetchNewsDataPost = createAsyncThunk(
    "news/fetchNewsDataPost",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/news`, {
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


// fetch patch news  data

export const fetchNewsDataPatch = createAsyncThunk(
    "news/fetchNewsDataPatch",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/news/${id}`, {
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


// fetch patch news  data

export const fetchNewsDataDelete = createAsyncThunk(
    "news/fetchNewsDataDelete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/news/${id}`, {
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



const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setNews: (state, action) => {
            state.allNews = action.payload;
            state.singleData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // get api lifecyrcle
            .addCase(fetchNewsDataGet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchNewsDataGet.fulfilled, (state, action) => {
                state.loading = false;
                state.allNews = action.payload.data;
            })
            .addCase(fetchNewsDataGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // post api lifecyrcle
            .addCase(fetchNewsDataPost.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchNewsDataPost.fulfilled, (state, action) => {
                state.loading = false;
                state.allNews.push(action.payload.data)
            })
            .addCase(fetchNewsDataPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(fetchNewsDataDelete.fulfilled, (state, action) => {
                state.allNews = state.allNews.filter(item => item.id !== action.payload);
            })
            .addCase(fetchNewsDataDelete.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
})


export const newsReducer = newsSlice.reducer;


