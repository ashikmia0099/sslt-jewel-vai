import { APP_URL } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    foundingMemberData: [],
    loading: false,
    error: null
}

// get fetch donation medium

export const getfetchFoundingMember = createAsyncThunk(
    "foundingMembers/getfetchFoundingMember",
    async () => {
        const res = await fetch(`${APP_URL}/home/founding/member/message`);
        return await res.json();
    }
)

// post fetch donation medium

export const postfetchFoundingMember = createAsyncThunk(
    "foundingMembers/postfetchFoundingMember",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/founding/member/message`, {
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

export const patchfetchFoundingMember = createAsyncThunk(
    "foundingMembers/patchfetchFoundingMember",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/founding/member/message/${id}`, {
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

export const deletefetchFoundingMember = createAsyncThunk(
    "foundingMembers/deletefetchFoundingMember",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${APP_URL}/home/founding/member/message/${id}`, {
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


const foundingMemberSlice = createSlice({
    name: "foundingMember",
    initialState,
    reducers: {
        setFoundingMemberData: (state, action) => {
            state.foundingMemberData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getfetchFoundingMember.pending, (state) => {
                state.loading = true
            })
            .addCase(getfetchFoundingMember.fulfilled, (state, action) => {
                state.loading = false;
                state.foundingMemberData = action.payload;
            })
            .addCase(getfetchFoundingMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchFoundingMember.pending, (state) => {
                state.loading = true;
            })
            .addCase(postfetchFoundingMember.fulfilled, (state, action) => {
                state.loading = false;
                state.foundingMemberData.push(action.payload)
            })
            .addCase(postfetchFoundingMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete api lifecycle

            .addCase(deletefetchFoundingMember.fulfilled, (state, action) => {
                state.foundingMemberData = state.foundingMemberData.filter(item => item.id !== action.payload)
            })
            .addCase(deletefetchFoundingMember.rejected, (state, action) => {
                state.error = action.payload || action.error.message
            })
    }
});


export const foundingMemberReducer = foundingMemberSlice.reducer