import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  fetchUser,
  clearCurrent,
  editUser,
  addUser
} from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner';
import type { CreateUserDTO, UpdateUserDTO } from '../../types/users';
import { ErrorText, FormContainer, FormGroup, Label, Input, ButtonGroup, Button } from '../styles/UserFormStyles';

type FormState = Partial<CreateUserDTO> &
  Partial<UpdateUserDTO> & { id?: number };

export default function UserFormPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { current, loading, error } = useAppSelector(s => s.users);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Carrega o usuário ou reseta o form
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchUser(+id));
    } else {
      dispatch(clearCurrent());
      setForm({});
    }
  }, [dispatch, id, isEdit]);

  // Preenche o form com os dados existentes (sem senha)
  useEffect(() => {
    if (current) {
      setForm({
        id: current.id,
        name: current.name,
        email: current.email,
        documentNumber: current.documentNumber,
        birthDate: current.birthDate.split('T')[0],
      });
    }
  }, [current]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setPasswordError('');
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações de senha apenas no create
    if (!isEdit) {
      if (!form.password || form.password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      }
      if (form.password !== confirmPassword) {
        setPasswordError("Passwords don't match");
        return;
      }
    }

    if (isEdit && form.id != null) {
      // Remove o id do payload para não mandar no body
      const { id: userId, ...payload } = form as UpdateUserDTO & { id: number };
      dispatch(editUser({ id: userId, data: payload }))
        .then(() => navigate('/users'));
    } else {
      dispatch(addUser(form as CreateUserDTO))
        .then(() => navigate('/users'));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorText>Error: {error}</ErrorText>;

  return (
    <FormContainer>
      <h1>{isEdit ? 'Edit User' : 'New User'}</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            name="name"
            value={form.name ?? ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={form.email ?? ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        {!isEdit && (
          <>
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={form.password ?? ''}
                onChange={handleChange}
                required
                minLength={6}
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmChange}
                required
              />
            </FormGroup>

            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </>
        )}

        <FormGroup>
          <Label>Document Number</Label>
          <Input
            name="documentNumber"
            value={form.documentNumber ?? ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Birth Date</Label>
          <Input
            name="birthDate"
            type="date"
            value={form.birthDate ?? ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" variant="primary">
            {isEdit ? 'Save' : 'Create'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/users')}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}
