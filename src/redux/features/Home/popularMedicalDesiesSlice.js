import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    mediaclDesies: [],
    loading: false,
    error: null
}

// fetch hero data 

export const getfetchMedicalDesies = createAsyncThunk(
    "MedicalDesies/getfetchMedicalDesies", async () => {
        const res = await fetch(`${APP_URL}/home/popular/desies`);
        return await res.json();
    }
)

// fetch post all data

export const postfetchMedicalDesies = createAsyncThunk(
    "MedicalDesies/postfetchMedicalDesies",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/popular/desies`, {
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

export const patchfetchMedicalDesies = createAsyncThunk(
    "MedicalDesies/patchfetchMedicalDesies",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/popular/desies/${id}`, {
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

export const deletefetchMedicalDesies = createAsyncThunk(
    "MedicalDesies/deletefetchMedicalDesies",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/popular/desies/${id}`, {
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


const MedicalDesiesSlice = createSlice({
    name: 'MedicalDesies',
    initialState,
    reducers: {
        setMedicalDesies: (state, action) => {
            state.mediaclDesies = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchMedicalDesies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getfetchMedicalDesies.fulfilled, (state, action) => {
                state.loading = false;
                state.mediaclDesies = action.payload.data;
            })
            .addCase(getfetchMedicalDesies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // post api lifecyrcle

            .addCase(postfetchMedicalDesies.pending, (state) => {
                state.loading = true
            })
            .addCase(postfetchMedicalDesies.fulfilled, (state, action) => {
                state.loading = false;
                state.mediaclDesies.push(action.payload.data)
            })
            .addCase(postfetchMedicalDesies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(deletefetchMedicalDesies.fulfilled, (state, action) => {
                state.mediaclDesies = state.mediaclDesies.filter(item => item.id !== action.payload);
            })
            .addCase(deletefetchMedicalDesies.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});

export const MedicalDesiesReducer = MedicalDesiesSlice.reducer