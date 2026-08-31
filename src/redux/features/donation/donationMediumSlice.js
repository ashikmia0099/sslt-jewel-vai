import { APP_URL } from "@/lib/api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")



const initialState = {
    donationMedium: [],
    loading: false,
    error: null

}


// get fetch donation medium

export const getfetchDonationMedium = createAsyncThunk(
    "donation/getfetchDonationMedium",
    async () => {
        const res = await fetch(`${APP_URL}/donation/medium`);
        return await res.json();
    }
)

// post fetch donation medium

export const postfetchDonationMedium = createAsyncThunk(
    "donation/postfetchDonationMedium",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/medium`, {
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

export const patchfetchDonationMedium = createAsyncThunk(
    "donation/patchfetchDonationMedium",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/medium/${id}`, {
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

export const deletefetchDonationMedium = createAsyncThunk(
    "donation/deletefetchDonationMedium",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/medium/${id}`, {
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


const donationMediumSlice = createSlice({
    name: "donationMedium",
    initialState,
    reducers: {
        setdonationAmount: (state, action) => {
            state.donationMedium = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchDonationMedium.pending, (state) => {
                state.loading = true
            })
            .addCase(getfetchDonationMedium.fulfilled, (state, action) => {
                state.loading = false;
                state.donationMedium = action.payload.data;
            })
            .addCase(getfetchDonationMedium.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchDonationMedium.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchDonationMedium.fulfilled, (state, action) => {
                state.loading = false;
                state.donationMedium.push(action.payload.data)
            })
            .addCase(postfetchDonationMedium.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecycle

            .addCase(deletefetchDonationMedium.fulfilled, (state, action) => {
                state.donationMedium = state.donationMedium.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchDonationMedium.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});


export const donationMediumReducer = donationMediumSlice.reducer