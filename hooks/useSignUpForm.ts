import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useFormState, useWatch } from 'react-hook-form';

import { SignUpSchema, type SignUpInput } from '@/schemas/authSchema';
import { useAuthStore } from '@/stores/auth';
import {
  confirmStatus,
  emailStatus,
  idStatus,
  nameStatus,
  passwordStatus,
  type FieldStatus,
} from '@/validations/fieldStatus';
import { useEffect } from 'react';

export function useSignUpForm() {
  const signUpDraft = useAuthStore((s) => s.signUpDraft);

  // defaultValues는 빈 문자열로 보장
  const { control, handleSubmit } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      id: signUpDraft.id ?? '',
      email: signUpDraft.email ?? '',
      name: signUpDraft.name ?? '',
      password: '',
      confirm: '',
    },
  });

  //formState 구독은 별도 훅으로
  const { errors, touchedFields, dirtyFields, isValid, isSubmitting } = useFormState({ control });

  // 필드 값 구독
  const idVal = useWatch({ control, name: 'id' });
  const emailVal = useWatch({ control, name: 'email' });
  const nameVal = useWatch({ control, name: 'name' });
  const passwordVal = useWatch({ control, name: 'password' });
  const confirmVal = useWatch({ control, name: 'confirm' });

  useEffect(() => {
    console.log('[SignUpForm] 상태 변경:', {
      idVal,
      emailVal,
      nameVal,
      passwordVal: passwordVal ? '***' : '',
      confirmVal: confirmVal ? '***' : '',
      isValid,
      errors: Object.keys(errors),
      touchedFields: Object.keys(touchedFields),
      dirtyFields: Object.keys(dirtyFields),
    });
  }, [
    idVal,
    emailVal,
    nameVal,
    passwordVal,
    confirmVal,
    isValid,
    errors,
    touchedFields,
    dirtyFields,
  ]);

  useEffect(() => {
    console.log('[SignUpForm]', {
      idVal,
      emailVal,
      nameVal,
      passwordVal,
      confirmVal,
      isValid,
      errors, // 필요하면 Object.keys(errors)로도 확인 가능
      touchedFields,
      dirtyFields,
    });
  }, [
    idVal,
    emailVal,
    nameVal,
    passwordVal,
    confirmVal,
    isValid,
    errors,
    touchedFields,
    dirtyFields,
  ]);

  // 메시지 계산
  const messages = useMemo(() => {
    const id: FieldStatus = idStatus({
      value: idVal,
      error: errors.id,
      touched: touchedFields.id,
      dirty: dirtyFields.id,
    });
    const email: FieldStatus = emailStatus({
      value: emailVal,
      error: errors.email,
      touched: touchedFields.email,
      dirty: dirtyFields.email,
    });
    const name: FieldStatus = nameStatus({
      value: nameVal,
      error: errors.name,
      touched: touchedFields.name,
      dirty: dirtyFields.name,
    });
    const password: FieldStatus = passwordStatus({
      value: passwordVal,
      error: errors.password,
      touched: touchedFields.password,
      dirty: dirtyFields.password,
    });
    const confirm: FieldStatus = confirmStatus({
      value: confirmVal,
      error: errors.confirm,
      touched: touchedFields.confirm,
      dirty: dirtyFields.confirm,
    });
    return { id, email, name, password, confirm };
  }, [
    idVal,
    emailVal,
    nameVal,
    passwordVal,
    confirmVal,
    errors.id,
    errors.email,
    errors.name,
    errors.password,
    errors.confirm,
    touchedFields.id,
    touchedFields.email,
    touchedFields.name,
    touchedFields.password,
    touchedFields.confirm,
    dirtyFields.id,
    dirtyFields.email,
    dirtyFields.name,
    dirtyFields.password,
    dirtyFields.confirm,
  ]);

  return { control, handleSubmit, isValid, isSubmitting, messages };
}
