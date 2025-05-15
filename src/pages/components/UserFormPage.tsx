// src/pages/components/UserFormPage.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchUser,
  clearCurrent,
  editUser,
  addUser,
} from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import type { CreateUserDTO, UpdateUserDTO } from '../../types/users';
import {
  ErrorText,
  FormContainer,
  Button,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
} from '../styles/UserFormStyles';

type FormState = Partial<CreateUserDTO> &
  Partial<UpdateUserDTO> & { id?: number };

export default function UserFormPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { current, loading, error } = useAppSelector((s) => s.users);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // busca ou limpa o usuário ao montar
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchUser(+id));
    } else {
      dispatch(clearCurrent());
      setForm({});
    }
  }, [dispatch, id, isEdit]);

  // quando current muda, preenche o form (sem senha)
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

  // dispara toast sempre que houver erro de slice
  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'password') setPasswordError('');
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validação de senha no create
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
      // remove o id do payload antes de enviar
      const { id: _, ...payload } = form;
      dispatch(editUser({ id: form.id, data: payload as UpdateUserDTO }))
        .unwrap()
        .then(() => navigate('/users'))
        .catch((msg) => toast.error(msg));
    } else {
      dispatch(addUser(form as CreateUserDTO))
        .unwrap()
        .then(() => navigate('/users'))
        .catch((msg) => toast.error(msg));
    }
  };

  if (loading) return <Spinner />;

  return (
    <FormContainer>
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
