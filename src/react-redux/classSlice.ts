import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchClassNames } from "../helpers";
import { getClasses } from "../api";
import { Class } from "../types/userList";

interface ClassState {
  classNames: string[];
  activeTab: string | null;
  classData: Class | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classNames: [],
  activeTab: null,
  classData: null,
  loading: false,
  error: null,
};

export const fetchClassNamesThunk = createAsyncThunk(
  "classes/fetchClassNames",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchClassNames();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch class names");
    }
  }
);

export const fetchClassDataThunk = createAsyncThunk(
  "classes/fetchClassData",
  async (tabName: string, { rejectWithValue }) => {
    try {
      const classes = await getClasses();
      return (
        classes.find(
          (cls: Class) => cls.name.toLowerCase() === tabName.toLowerCase()
        ) || null
      );
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch class data");
    }
  }
);

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassNamesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassNamesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classNames = action.payload;
      })
      .addCase(fetchClassNamesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchClassDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classData = action.payload;
      })
      .addCase(fetchClassDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveTab } = classSlice.actions;

export default classSlice.reducer;
