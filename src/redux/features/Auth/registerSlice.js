import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    registerData: [],
    loading: false,
    error: null
}


// post fetch donation faq

export const postfetchRegister = createAsyncThunk(
    "register/postfetchRegister",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/auth/register`, {
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



const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setRegisterData: (state, action) => {
            state.registerData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // post life cyicle
            .addCase(postfetchRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.registerData.push(action.payload.data)
            })
            .addCase(postfetchRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export const registerReducer = registerSlice.reducer;


