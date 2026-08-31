import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    mission_vission_object: [],
    loading: false,
    error: null
}

// fetch hero data 

export const getfetchMissionVissionObject = createAsyncThunk(
    "MissonVissionObject/getfetchMissionVissionObject", async () => {
        const res = await fetch(`${APP_URL}/home/mission/vision/object`);
        return await res.json();
    }
)

// fetch post all data

export const postfetchMissionVissionObject = createAsyncThunk(
    "MissonVissionObject/postfetchMissionVissionObject",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/mission/vision/object`, {
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

export const patchfetchMissionVissionObject = createAsyncThunk(
    "MissonVissionObject/patchfetchMissionVissionObject",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/mission/vision/object/${id}`, {
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

export const deletefetchMissionVissionObject = createAsyncThunk(
    "MissonVissionObject/deletefetchMissionVissionObject",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/mission/vision/object/${id}`, {
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


const MissonVissionObjectSlice = createSlice({
    name: 'MissonVissionObject',
    initialState,
    reducers: {
        setMissionVissionObject: (state, action) => {
            state.mission_vission_object = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchMissionVissionObject.pending, (state) => {
                state.loading = true;
            })
            .addCase(getfetchMissionVissionObject.fulfilled, (state, action) => {
                state.loading = false;
                state.mission_vission_object = action.payload;
            })
            .addCase(getfetchMissionVissionObject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // post api lifecyrcle

            .addCase(postfetchMissionVissionObject.pending, (state) => {
                state.loading = true
            })
            .addCase(postfetchMissionVissionObject.fulfilled, (state, action) => {
                state.loading = false;
                state.mission_vission_object.push(action.payload.data)
            })
            .addCase(postfetchMissionVissionObject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(deletefetchMissionVissionObject.fulfilled, (state, action) => {
                state.mission_vission_object = state.mission_vission_object.filter(item => item.id !== action.payload);
            })
            .addCase(deletefetchMissionVissionObject.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});

export const MissonVissionObjectReducer = MissonVissionObjectSlice.reducer