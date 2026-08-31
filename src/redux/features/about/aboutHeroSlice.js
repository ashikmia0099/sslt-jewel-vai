import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    heroData: [],
    loading: false,
    error: null
}


// fetch get news all data

export const fetchAboutHeroDataGet = createAsyncThunk(
    "about/fetchAboutHeroDataGet",
    async () => {
        const res = await fetch(`${APP_URL}/about/hero`);
        return await res.json();
    }
);

// fetch post all data

export const fetchAboutHeroDataPost = createAsyncThunk(
    "about/fetchAboutHeroDataPost",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/hero`, {
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

export const fetchAboutHeroDataPatch = createAsyncThunk(
    "about/fetchAboutHeroDataPatch",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/hero/${id}`, {
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

export const fetchAboutHeroDataDelete = createAsyncThunk(
    "about/fetchAboutHeroDataDelete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/about/hero/${id}`, {
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



const aboutHeroSlice = createSlice({
    name: "aboutHero",
    initialState,
    reducers: {
        setAboutHero: (state, action) => {
            state.heroData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutHeroDataGet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAboutHeroDataGet.fulfilled, (state, action) => {
                state.loading = false;
                state.heroData = action.payload;
            })
            .addCase(fetchAboutHeroDataGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // post api lifecyrcle

            .addCase(fetchAboutHeroDataPost.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAboutHeroDataPost.fulfilled, (state, action) => {
                state.loading = false;
                state.heroData.push(action.payload.data)
            })
            .addCase(fetchAboutHeroDataPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(fetchAboutHeroDataDelete.fulfilled, (state, action) => {
                state.heroData = state.heroData.filter(item => item.id !== action.payload);
            })
            .addCase(fetchAboutHeroDataDelete.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
})


export const aboutHeroReducer = aboutHeroSlice.reducer;


