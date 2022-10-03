import { useMutation } from 'react-query';
import { login } from '@api';
import { LoginRequest } from '@interfaces';

export const useLogin = () => useMutation((params: LoginRequest) => login(params));
