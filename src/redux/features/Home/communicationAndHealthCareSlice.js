import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    healthCareData: [],
    loading: false,
    error: null
}

// fetch hero data 

export const getfetchCommunicationAndHealthCare = createAsyncThunk(
    "CommunicationAndHealthCare/getfetchCommunicationAndHealthCare", async () => {
        const res = await fetch(`${APP_URL}/home/communication/healthcare`);
        return await res.json();
    }
)

// fetch post all data


export const postfetchCommunicationAndHealthCare = createAsyncThunk(
    "CommunicationAndHealthCare/postfetchCommunicationAndHealthCare",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/communication/healthcare`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to post");
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// fetch patch  data

export const patchfetchCommunicationAndHealthCare = createAsyncThunk(
    "CommunicationAndHealthCare/patchfetchCommunicationAndHealthCare",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/communication/healthcare/${id}`, {
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

export const deletefetchCommunicationAndHealthCare = createAsyncThunk(
    "CommunicationAndHealthCare/deletefetchCommunicationAndHealthCare",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/communication/healthcare/${id}`, {
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


const CommunicationAndHealthCareSlice = createSlice({
    name: 'CommunicationAndHealthCare',
    initialState,
    reducers: {
        setHearingAndHealthCare: (state, action) => {
            state.hearingAndhealthCareData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchCommunicationAndHealthCare.pending, (state) => {
                state.loading = true;
            })
            .addCase(getfetchCommunicationAndHealthCare.fulfilled, (state, action) => {
                state.loading = false;
                state.healthCareData = action.payload.data;
            })
            .addCase(getfetchCommunicationAndHealthCare.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // post api lifecyrcle

            .addCase(postfetchCommunicationAndHealthCare.pending, (state) => {
                state.loading = true
            })
            .addCase(postfetchCommunicationAndHealthCare.fulfilled, (state, action) => {
                state.loading = false;
                state.healthCareData.push(action.payload.data)
            })
            .addCase(postfetchCommunicationAndHealthCare.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(deletefetchCommunicationAndHealthCare.fulfilled, (state, action) => {
                state.healthCareData = state.healthCareData.filter(item => item.id !== action.payload);
            })
            .addCase(deletefetchCommunicationAndHealthCare.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});

export const CommunicationAndHealthCareReducer = CommunicationAndHealthCareSlice.reducer