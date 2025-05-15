import * as api from '../../api/user';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO, CreateUserDTO, UpdateUserDTO } from '../../types/users';
import axios from 'axios';

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

/**
 * Busca todos os usuários
 */
export const fetchUsers = createAsyncThunk<
  UserDTO[],
  void,
  { rejectValue: string }
>(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getUsers();
      return res.data as UserDTO[];
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('Erro ao carregar usuários');
    }
  }
);

/**
 * Busca um único usuário por ID
 */
export const fetchUser = createAsyncThunk<
  UserDTO,
  number,
  { rejectValue: string }
>(
  'users/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.getUser(id);
      return res.data as UserDTO;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('Erro ao carregar usuário');
    }
  }
);

/**
 * Cria um novo usuário
 */
export const addUser = createAsyncThunk<
  UserDTO,
  CreateUserDTO,
  { rejectValue: string }
>(
  'users/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.createUser(data);
      return res.data as UserDTO;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('Erro ao criar usuário');
    }
  }
);

/**
 * Edita um usuário existente
 */
export const editUser = createAsyncThunk<
  UserDTO,
  { id: number; data: UpdateUserDTO },
  { rejectValue: string }
>(
  'users/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.updateUser(id, data);
      return res.data as UserDTO;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('Erro ao editar usuário');
    }
  }
);

/**
 * Remove um usuário
 */
export const removeUser = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'users/remove',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteUser(id);
      return id;
    } catch (err: any) {
      return rejectWithValue('Erro ao excluir usuário');
    }
  }
);

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
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserDTO[]>) => {
          state.list = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      })

      // fetchUser
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserDTO>) => {
          state.current = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      })

      // addUser
      .addCase(addUser.pending, state => {
        state.error = undefined;
      })
      .addCase(
        addUser.fulfilled,
        (state, action: PayloadAction<UserDTO>) => {
          state.list.push(action.payload);
        }
      )
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message;
      })

      // editUser
      .addCase(editUser.pending, state => {
        state.error = undefined;
      })
      .addCase(
        editUser.fulfilled,
        (state, action: PayloadAction<UserDTO>) => {
          state.list = state.list.map(u =>
            u.id === action.payload.id ? action.payload : u
          );
        }
      )
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message;
      })

      // removeUser
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message;
      })
      .addCase(
        removeUser.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.list = state.list.filter(u => u.id !== action.payload);
        }
      ),
});

export const { clearCurrent } = usersSlice.actions;
export default usersSlice.reducer;
