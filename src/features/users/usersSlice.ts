import * as api from '../../api/user';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO, CreateUserDTO, UpdateUserDTO } from '../../types/users';


export interface UsersState {
  list: UserDTO[];
  current?: UserDTO;
  loading: boolean;
  error?: string;
}

const initialState: UsersState = {
  list: [],
  current: undefined,
  loading: false,
  error: undefined,
};

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await api.getUsers();
  return res.data as UserDTO[];
});

export const fetchUser = createAsyncThunk('users/fetchOne', async (id: number) => {
  const res = await api.getUser(id);
  return res.data as UserDTO;
});

export const addUser = createAsyncThunk('users/add', async (data: CreateUserDTO) => {
  const res = await api.createUser(data);
  return res.data as UserDTO;
});

export const editUser = createAsyncThunk(
  'users/edit',
  async ({ id, data }: { id: number; data: UpdateUserDTO }) => {
    const res = await api.updateUser(id, data);
    return res.data as UserDTO;
  }
);

export const removeUser = createAsyncThunk('users/remove', async (id: number) => {
  await api.deleteUser(id);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = undefined;
    },
  },
  extraReducers: builder =>
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserDTO[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchUser
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserDTO>) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addUser
      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserDTO>) => {
        state.list.push(action.payload);
      })
      // editUser
      .addCase(editUser.fulfilled, (state, action: PayloadAction<UserDTO>) => {
        state.list = state.list.map(u =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      // removeUser
      .addCase(removeUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter(u => u.id !== action.payload);
      }),
});

export const { clearCurrent } = usersSlice.actions;
export default usersSlice.reducer;