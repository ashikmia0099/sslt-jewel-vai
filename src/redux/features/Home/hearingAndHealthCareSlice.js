import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    hearingAndhealthCareData: [],
    loading: false,
    error: null
}

// fetch hero data 

export const getfetchHearingAndHealthCare = createAsyncThunk(
    "HearingAndHealthCare/getfetchHearingAndHealthCare", async () => {

        const res = await fetch(`${APP_URL}/home/communication/hearing`);
        return await res.json();
    }
)

// fetch post all data

export const postfetchHearingAndHealthCare = createAsyncThunk(
    "HearingAndHealthCare/postfetchHearingAndHealthCare",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/communication/hearing`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
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

export const patchfetchHearingAndHealthCare = createAsyncThunk(
    "HearingAndHealthCare/patchfetchHearingAndHealthCare",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/communication/hearing/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
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

export const deletefetchHearingAndHealthCare = createAsyncThunk(
    "HearingAndHealthCare/deletefetchHearingAndHealthCare",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/communication/hearing/${id}`, {
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


const HearingAndHealthCareSlice = createSlice({
    name: 'HearingAndHealthCare',
    initialState,
    reducers: {
        setHearingAndHealthCare: (state, action) => {
            state.hearingAndhealthCareData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchHearingAndHealthCare.pending, (state) => {
                state.loading = true;
            })
            .addCase(getfetchHearingAndHealthCare.fulfilled, (state, action) => {
                state.loading = false;
                state.hearingAndhealthCareData = action.payload.data;
            })
            .addCase(getfetchHearingAndHealthCare.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // post api lifecyrcle

            .addCase(postfetchHearingAndHealthCare.pending, (state) => {
                state.loading = true
            })
            .addCase(postfetchHearingAndHealthCare.fulfilled, (state, action) => {
                state.loading = false;
                state.hearingAndhealthCareData.push(action.payload.data)
            })
            .addCase(postfetchHearingAndHealthCare.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete api lifecyrcle
            .addCase(deletefetchHearingAndHealthCare.fulfilled, (state, action) => {
                state.hearingAndhealthCareData = state.hearingAndhealthCareData.filter(item => item.id !== action.payload);
            })
            .addCase(deletefetchHearingAndHealthCare.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});

export const HearingAndHealthCareReducer = HearingAndHealthCareSlice.reducer