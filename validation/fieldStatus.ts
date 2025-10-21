export type FieldStatus = { kind: "idle" } | { kind: "hint"; text: string } | { kind: "error"; text: string } | { kind: "ok"; text: string };

type BaseArgs = {
  value: unknown;
  error?: { message?: string } | undefined;
  touched?: boolean;
  dirty?: boolean;
};

export function emailStatus({ value, error, touched, dirty }: BaseArgs): FieldStatus {
  const v = String(value ?? "");
  const started = v.length > 0 || dirty || touched; // 입력 시작 판정 강화
  if (!started) return { kind: "idle" };
  if (!v) return { kind: "hint", text: "이메일을 입력해 주세요." };
  if (error?.message) return { kind: "error", text: error.message };
  return { kind: "ok", text: "조건에 충족합니다." }; // [ ] 이런 문구 말고 그냥 검증 문구가 사라지도록
}

export function idStatus({ value, error, touched, dirty }: BaseArgs): FieldStatus {
  const v = String(value ?? "");
  if (!dirty && !touched) return { kind: "idle" };
  if (!v) return { kind: "hint", text: "아이디를 입력해 주세요." };
  if (error?.message) return { kind: "error", text: error.message };
  return { kind: "ok", text: "조건에 충족합니다." };
}

export function nameStatus({ value, error, touched, dirty }: BaseArgs): FieldStatus {
  const v = String(value ?? "");
  if (!dirty && !touched) return { kind: "idle" };
  if (!v) return { kind: "hint", text: "이름을 입력해 주세요." };
  if (error?.message) return { kind: "error", text: error.message };
  return { kind: "ok", text: "조건에 충족합니다." };
}

export function passwordStatus({ value, error, touched, dirty }: BaseArgs): FieldStatus {
  const v = String(value ?? "");
  if (!dirty && !touched) return { kind: "idle" };
  if (!v) return { kind: "hint", text: "영문/숫자 포함, 8자 이상" };
  if (error?.message) return { kind: "error", text: error.message };
  return { kind: "ok", text: "조건에 충족합니다." };
}

export function confirmStatus({ value, error, touched, dirty }: BaseArgs): FieldStatus {
  if (!dirty && !touched) return { kind: "idle" };
  if (error?.message) return { kind: "error", text: error.message };
  return { kind: "ok", text: "조건에 충족합니다." };
}
