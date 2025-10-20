import { z } from "zod";

export const SignUpSchema = z
  .object({
    id: z
      .string()
      .min(5, "아이디는 5자 이상으로 생성할 수 있어요.")
      .max(20, "아이디는 20자 이하로 생성할 수 있어요.")
      .regex(/^[a-z0-9_]+$/i, "영문/숫자/밑줄(_)만 사용할 수 있어요."),
    email: z.string().email("올바른 이메일 형식이 아니에요."),
    name: z.string().min(2, "이름은 2자 이상 입력해주세요.").max(20, "이름은 20자 이하로 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 해요.")
      .regex(/[A-Za-z]/, "영문자를 포함해주세요.")
      .regex(/[0-9]/, "숫자를 포함해주세요."),
    confirm: z.string(),
  })
  .refine((vals) => vals.password === vals.confirm, {
    message: "비밀번호가 일치하지 않아요.",
    path: ["confirm"],
  });

export type SignUpInput = z.infer<typeof SignUpSchema>;
