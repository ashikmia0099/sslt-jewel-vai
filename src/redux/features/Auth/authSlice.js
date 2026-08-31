import { APP_URL } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: [],
    loading: false,
    error: null
}


// fetch get user all data

export const fetchUserDataGet = createAsyncThunk(
    "users/fetchUserDataGet",
    async () => {
        const res = await fetch(`${APP_URL}/auth`);
        return await res.json();
    }
);

// patch fetch 

export const patchfetchUser = createAsyncThunk(
  "user/patchfetchUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${APP_URL}/auth/role/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update");
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// fetch delete
export const deletefetchUser = createAsyncThunk(
    "users/deletefetchUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/auth/delete/${id}`, {
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



const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDataGet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserDataGet.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(fetchUserDataGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })


            // delete api lifecycle

            .addCase(deletefetchUser.fulfilled, (state, action) => {
                state.user = state.user.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
})


export const userReducer = userSlice.reducer;


