import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    hero_data: [],
    apiImages: [],
    loading: false,
    error: null

}


// fetch hero data 

export const fetchHeroData = createAsyncThunk(
    "hero/fetchHeroData", async () => {
        const res = await fetch(`${APP_URL}/home/hero`);
        return await res.json();
    }
)

// fetch post all data

export const postfetchHeroData = createAsyncThunk(
    "hero/postfetchHeroData",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/hero`, {
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

export const patchfetchHeroData = createAsyncThunk(
    "hero/patchfetchHeroData",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/hero/${id}`, {
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

export const deleteHeroData = createAsyncThunk(
    "hero/deleteHeroData",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/hero/${id}`, {
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





const HeroSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {
        setHeroData: (state, action) => {
            state.hero_data = action.payload;
            state.apiImages = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHeroData.fulfilled, (state, action) => {
                state.loading = false;
                state.hero_data = action.payload;
                state.apiImages = action.payload;
            })
            .addCase(fetchHeroData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // post api lifecyrcle

            .addCase(postfetchHeroData.pending, (state) => {
                state.loading = true
            })
            .addCase(postfetchHeroData.fulfilled, (state, action) => {
                state.loading = false;
                state.hero_data.push(action.payload.data)
            })
            .addCase(postfetchHeroData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(deleteHeroData.fulfilled, (state, action) => {
                state.hero_data = state.hero_data.filter(item => item.id !== action.payload);
            })
            .addCase(deleteHeroData.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});

export const { setHeroData } = HeroSlice.actions;
export default HeroSlice.reducer;