import { APP_URL } from "@/lib/api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState = {
    donationAmount: [],
    loading: false,
    error: null

}


// get fetch donation amount

export const getfetchDonationAmount = createAsyncThunk(
    "donation/getfetchDonationAmount",
    async () => {
        const res = await fetch(`${APP_URL}/donation/amount`);
        return await res.json();
    }
)

// post fetch donation amount


export const postfetchDonationAmount = createAsyncThunk(
    "donation/postfetchDonationAmount",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/amount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
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


// fetch patch donation amount

export const patchfetchDonationAmount = createAsyncThunk(
    "donation/patchfetchDonationAmount",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/amount/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update");
            }

            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// fetch delete donation amount

export const deletefetchDonationAmount = createAsyncThunk(
    "donation/deletefetchDonationAmount",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/amount/${id}`, {
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





const donationAmountSlice = createSlice({
    name: "donationAmount",
    initialState,
    reducers: {
        setdonationAmount: (state, action) => {
            state.donationAmount = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchDonationAmount.pending, (state) => {
                state.loading = true
            })
            .addCase(getfetchDonationAmount.fulfilled, (state, action) => {
                state.loading = false;
                state.donationAmount = action.payload.data;
            })
            .addCase(getfetchDonationAmount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post api lifecycle

            .addCase(postfetchDonationAmount.pending, (state) => {
                state.loading = true
            })
            .addCase(postfetchDonationAmount.fulfilled, (state, action) => {
                state.loading = false;
                state.donationAmount.push(action.payload.data);
            })
            .addCase(postfetchDonationAmount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecyrcle
            .addCase(deletefetchDonationAmount.fulfilled, (state, action) => {
                state.donationAmount = state.donationAmount.filter(item => item.id !== action.payload);
            })
            .addCase(deletefetchDonationAmount.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});


export const donationAmountReducer = donationAmountSlice.reducer