import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState = {
    footerData: [],
    loading: false,
    error: null

}

// get fetch Footer

export const getfetchFooter = createAsyncThunk(
    "Footer/getfetchFooter",
    async () => {
        const res = await fetch(`${APP_URL}/footer`);
        return await res.json();
    }
)

// post fetch Footer faq


export const postfetchFooter = createAsyncThunk(
  "footer/postfetchFooter",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${APP_URL}/footer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// delete fetch Footer

export const deletefetchFooter = createAsyncThunk(
    "Footer/deletefetchFooter",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/footer/${id}`, {
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


const FooterSlice = createSlice({
    name: "Footer",
    initialState,
    reducers: {
        setFooter: (state, action) => {
            state.footerData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchFooter.pending, (state) => {
                state.loading = true
            })
            .addCase(getfetchFooter.fulfilled, (state, action) => {
                state.loading = false;
                state.footerData = action.payload.data;
            })
            .addCase(getfetchFooter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchFooter.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchFooter.fulfilled, (state, action) => {
                state.loading = false;
                state.footerData.push(action.payload.data)
            })
            .addCase(postfetchFooter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecycle

            .addCase(deletefetchFooter.fulfilled, (state, action) => {
                state.footerData = state.footerData.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchFooter.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});


export const footerReducer = FooterSlice.reducer