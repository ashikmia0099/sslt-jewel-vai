import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    secondBanner: [],
    loading: false,
    error: null
}

// get fetch 

export const getfetchSecondBanner = createAsyncThunk(
    "secondBanner/getfetchSecondBanner",
    async () => {
        const res = await fetch(`${APP_URL}/home/hero/second`);
        return await res.json();
    }
)

// post fetch 

export const postfetchSecondBanner = createAsyncThunk(
    "secondBanner/postfetchSecondBanner",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/hero/second`, {
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

// patch fetch

export const patchfetchSecondBanner = createAsyncThunk(
  "secondBanner/patchfetchSecondBanner",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${APP_URL}/home/hero/second/${id}`, {
        method: "PATCH",
        body: formData,
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

// delete fetch

export const deletefetchSecondBanner = createAsyncThunk(
    "secondBanner/deletefetchSecondBanner",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/hero/second/${id}`, {
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


const secondBannerSlice = createSlice({
    name: "secondBanner",
    initialState,
    reducers: {
        setsecondBannerData: (state, action) => {
            state.secondBanner = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchSecondBanner.pending, (state) => {
                state.loading = true
            })
            .addCase(getfetchSecondBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.secondBanner = action.payload;
            })
            .addCase(getfetchSecondBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchSecondBanner.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchSecondBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.secondBanner.push(action.payload)
            })
            .addCase(postfetchSecondBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecycle

            .addCase(deletefetchSecondBanner.fulfilled, (state, action) => {
                state.secondBanner = state.secondBanner.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchSecondBanner.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});


export const secondBannerReducer = secondBannerSlice.reducer