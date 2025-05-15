import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchUser,
  clearCurrent,
  editUser,
  addUser,
} from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import { CreateUserDTO, UpdateUserDTO } from '../../types/users';
import { ErrorText, FormContainer, Button, FormGroup, Label, Input, ButtonGroup } from '../styles/UserFormStyles';


type FormState = Partial<CreateUserDTO> & Partial<UpdateUserDTO> & { id?: number };

export default function UserFormPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { current, loading, error } = useAppSelector(s => s.users);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (isEdit && id) dispatch(fetchUser(+id));
    else {
      dispatch(clearCurrent());
      setForm({});
    }
  }, [dispatch, id, isEdit]);

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
    if (name === 'password') setPasswordError('');
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEdit) {
      if (!form.password || form.password.length < 6) {
        setPasswordError('A senha deve ter ao menos 6 caracteres');
        return;
      }
      if (form.password !== confirmPassword) {
        setPasswordError('As senhas não coincidem');
        return;
      }
    }

    if (isEdit && form.id != null) {
      const { id: userId, ...payload } = form as UpdateUserDTO & { id: number };
      dispatch(editUser({ id: userId, data: payload }))
        .then(() => navigate('/users'));
    } else {
      dispatch(addUser(form as CreateUserDTO))
        .then(() => navigate('/users'));
    }
  };

  const showSpinner = loading;

  if (showSpinner) return <Spinner />;
  if (error) return <ErrorText>Erro: {error}</ErrorText>;

  return (
    <FormContainer>
      {/* Botão Voltar */}
      <Button
        variant="secondary"
        onClick={() => navigate('/users')}
        style={{ marginBottom: '1rem' }}
      >
        Voltar
      </Button>

      <h1>{isEdit ? 'Editar Usuário' : 'Novo Usuário'}</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome</Label>
          <Input
            name="name"
            value={form.name ?? ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>E-mail</Label>
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
              <Label>Senha</Label>
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
              <Label>Confirme a Senha</Label>
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
          <Label>Documento</Label>
          <Input
            name="documentNumber"
            value={form.documentNumber ?? ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Data de Nascimento</Label>
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
            {isEdit ? 'Salvar' : 'Criar'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/users')}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}
