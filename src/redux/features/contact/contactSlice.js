import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    contactData: [],
    loading: false,
    error: null
}


// fetch get contact all data

export const fetchContactDataGet = createAsyncThunk(
    "contact/fetchContactDataGet",
    async () => {
        const res = await fetch(`${APP_URL}/contact`);
        return await res.json();
    }
);

// fetch get contact all data


// post fetch donation faq

export const postfetchContact = createAsyncThunk(
    "donation/postfetchContact",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/contact`, {
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

export const patchfetchContact = createAsyncThunk(
    "donation/patchfetchContact",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/contact/${id}`, {
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

export const deletefetchContact = createAsyncThunk(
    "donation/deletefetchContact",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/contact/${id}`, {
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


const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setContactData: (state, action) => {
            state.contactData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactDataGet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchContactDataGet.fulfilled, (state, action) => {
                state.loading = false;
                state.contactData = action.payload.data;
            })
            .addCase(fetchContactDataGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // post life cyicle

            .addCase(postfetchContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contactData.push(action.payload.data)
            })
            .addCase(postfetchContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecycle

            .addCase(deletefetchContact.fulfilled, (state, action) => {
                state.contactData = state.contactData.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchContact.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
})


export const contactReducer = contactSlice.reducer;


