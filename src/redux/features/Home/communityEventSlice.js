import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")



const initialState = {
    communityEvent: [],
    loading: false,
    error: null

}


// get fetch donation medium

export const getfetchCommunityEvent = createAsyncThunk(
    "communityEvent/getfetchCommunityEvent",
    async () => {
        const res = await fetch(`${APP_URL}/home/community`);
        return await res.json();
    }
)

// post fetch donation medium

export const postfetchCommunityEvent = createAsyncThunk(
    "communityEvent/postfetchCommunityEvent",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/community`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Faild to post")
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// patch fetch donation medium

export const patchfetchCommunityEvent = createAsyncThunk(
    "communityEvent/patchfetchCommunityEvent",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/community/${id}`, {
                method: "PATCH",
                body: formData,
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Faild to update")
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// delete fetch donation medium

export const deletefetchCommunityEvent = createAsyncThunk(
    "communityEvent/deletefetchCommunityEvent",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/community/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Faild to delete")
            }
            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const communityEventSlice = createSlice({
    name: "communityEvent",
    initialState,
    reducers: {
        setdonationAmount: (state, action) => {
            state.communityEvent = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchCommunityEvent.pending, (state) => {
                state.loading = true
            })
            .addCase(getfetchCommunityEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.communityEvent = action.payload.data;
            })
            .addCase(getfetchCommunityEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchCommunityEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchCommunityEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.communityEvent.push(action.payload.data)
            })
            .addCase(postfetchCommunityEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecycle

            .addCase(deletefetchCommunityEvent.fulfilled, (state, action) => {
                state.communityEvent = state.communityEvent.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchCommunityEvent.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});


export const communityReducer = communityEventSlice.reducer