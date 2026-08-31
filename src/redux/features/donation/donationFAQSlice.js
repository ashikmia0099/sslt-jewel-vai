import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    donationFAQ: [],
    loading: false,
    error: null

}

// get fetch donation faq

export const getfetchDonationFAQ = createAsyncThunk(
    "donation/getfetchDonationFAQ",
    async () => {
        const res = await fetch(`${APP_URL}/donation/faq`);
        return await res.json();
    }
)

// post fetch donation faq

export const postfetchDonationFAQ = createAsyncThunk(
    "donation/postfetchDonationFAQ",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/faq`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
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

// patch fetch donation faq

export const patchfetchDonationFAQ = createAsyncThunk(
    "donation/patchfetchDonationFAQ",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/faq/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
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

// delete fetch donation faq

export const deletefetchDonationFAQ = createAsyncThunk(
    "donation/deletefetchDonationFAQ",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/donation/faq/${id}`, {
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




const donationFAQSlice = createSlice({
    name: "donationFAQ",
    initialState,
    reducers: {
        setdonatioFAQ: (state, action) => {
            state.donationFAQ = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchDonationFAQ.pending, (state) => {
                state.loading = true
            })
            .addCase(getfetchDonationFAQ.fulfilled, (state, action) => {
                state.loading = false;
                state.donationFAQ = action.payload.data;
            })
            .addCase(getfetchDonationFAQ.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchDonationFAQ.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchDonationFAQ.fulfilled, (state, action) => {
                state.loading = false;
                state.donationFAQ.push(action.payload.data)
            })
            .addCase(postfetchDonationFAQ.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecycle

            .addCase(deletefetchDonationFAQ.fulfilled, (state, action) => {
                state.donationFAQ = state.donationFAQ.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchDonationFAQ.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});


export const donationFAQReducer = donationFAQSlice.reducer