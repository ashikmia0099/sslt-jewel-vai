import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginData: typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    token: typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null,
    loading: false,
    error: null
};

// post fetch donation faq

export const postfetchLogin = createAsyncThunk(
    "login/postfetchLogin",
    async (data, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Login failed");
            }

            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            state.loginData = null;
            state.token = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postfetchLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.data.token;
                state.loginData = action.payload.data.user;

                localStorage.setItem("token", action.payload.data.token);
                localStorage.setItem("user", JSON.stringify(action.payload.data.user));
            })
            .addCase(postfetchLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;


