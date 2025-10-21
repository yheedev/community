import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import { useSignUpForm } from "@/hooks/useSignUpForm";
import { type SignUpInput } from "@/schemas/authSchema";
import { useAuthStore } from "@/stores/auth";

// TODO
// [ ] Firebase Authentication 연동
// [ ] 에러 핸들링 (네트워크 오류, 중복 가입 등)
// [ ] 가입 후 축하 화면
// [ ] 회원가입 버튼 토스트 UI (성공/실패)

export default function SignUpScreen() {
  const router = useRouter();

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const setSignUpField = useAuthStore((s) => s.setSignUpField);

  const { control, handleSubmit } = useSignUpForm(); // 그대로 써도 되고, messages/UI는 표시 안 해도 OK

  const onSubmit = async (data: SignUpInput) => {
    console.log("[SUBMIT OK] data", data);
    // await signUpWithEmail(...);  // 여기서 Firebase 호출
  };

  const onInvalid = (err: FieldErrors<SignUpInput>) => {
    console.log("[SUBMIT ERR]", err);
    alert("입력을 확인해 주세요.");
  };

  // TODO: Firebase 가입 로직 연결

  // const onSubmit = async (data: SignUpInput) => {
  //   try {
  //     await signUpWithEmail({
  //       email: data.email,
  //       password: data.password,
  //       displayName: data.name,
  //       handle: data.id,
  //     });

  //     Alert.alert("회원가입 완료", "로그인 화면으로 이동합니다.");
  //     router.replace("/login");
  //   } catch (e: any) {
  //     Alert.alert("회원가입 실패", e?.message ?? "다시 시도해 주세요.");
  //   }
  // };

  return (
    <SafeAreaView style={styles.safe}>
      {/* <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollContent}> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>회원가입</Text>
          <Text style={styles.subtitle}>필수 정보를 입력해 주세요.</Text>
        </View>

        {/* 아이디 */}
        <View style={styles.fieldWrap}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>아이디</Text>
          </View>
          <Controller
            control={control}
            name='id'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(v) => {
                  onChange(v);
                  setSignUpField("id", v);
                }}
                onBlur={onBlur}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='아이디를 입력해주세요'
                placeholderTextColor='#999'
              />
            )}
          />
        </View>

        {/* 이메일 */}
        <View style={styles.fieldWrap}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>이메일</Text>
          </View>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(v) => {
                  onChange(v);
                  setSignUpField("email", v);
                }}
                onBlur={onBlur}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                placeholder='이메일을 입력해주세요'
                placeholderTextColor='#999'
              />
            )}
          />
        </View>

        {/* 이름 */}
        <View style={styles.fieldWrap}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>이름</Text>
          </View>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(v) => {
                  onChange(v);
                  setSignUpField("name", v);
                }}
                onBlur={onBlur}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='이름을 입력해주세요'
                placeholderTextColor='#999'
              />
            )}
          />
        </View>

        {/* 비밀번호 */}
        <View style={styles.fieldWrap}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>비밀번호</Text>
          </View>
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange} // 스토어 저장 금지
                  onBlur={onBlur}
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={!showPw}
                  placeholder='비밀번호를 입력해주세요'
                  placeholderTextColor='#999'
                />
                {/* <Pressable onPress={() => setShowPw((p) => !p)} accessibilityLabel='비밀번호 보기 전환' style={styles.eye}>
                  <Text style={styles.eyeText}>{showPw ? "숨김" : "보기"}</Text>
                </Pressable> */}
              </View>
            )}
          />
        </View>

        {/* 비밀번호 확인 */}
        <View style={styles.fieldWrap}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>비밀번호 확인</Text>
          </View>
          <Controller
            control={control}
            name='confirm'
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange} // 스토어 저장 금지
                  onBlur={onBlur}
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={!showPw2}
                  placeholder='비밀번호를 재입력해주세요'
                  placeholderTextColor='#999'
                />
                {/* <Pressable onPress={() => setShowPw2((p) => !p)} accessibilityLabel='비밀번호 확인 보기 전환' style={styles.eye}>
                  <Text style={styles.eyeText}>{showPw2 ? "숨김" : "보기"}</Text>
                </Pressable> */}
              </View>
            )}
          />
        </View>

        {/* 제출/링크 */}
        <View style={styles.submitWrap}>
          <Button
            title='회원가입'
            onPress={() => {
              console.log("[CLICK]");
              handleSubmit(
                (data) => {
                  console.log("[SUBMIT OK]", data);
                },
                (err) => {
                  console.log("[SUBMIT ERR]", err);
                  alert("폼 유효성 오류");
                }
              )();
            }}
          />
          {/* <Button
              title='회원가입'
              //onPress={handleSubmit(onSubmit)}
              onPress={() => {
                console.log("[CLICK]");
                handleSubmit(onSubmit, onInvalid)(); // ← 즉시 실행으로 체인 확인
              }}
            /> */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>이미 계정이 있으신가요? </Text>
            <Link href='/login' asChild>
              <Pressable>
                <Text style={styles.loginLink}>로그인하기</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "white" },
  scrollContent: { paddingBottom: 24 },
  container: { paddingHorizontal: 24, paddingTop: 32 },
  header: { marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827" },
  subtitle: { fontSize: 13, color: "#6B7280", marginTop: 4 },

  fieldWrap: { marginTop: 16 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 라벨 좌, 메시지 우
    gap: 8,
    marginBottom: 6,
  },
  label: { color: "#111827", fontWeight: "600" },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  inputError: { borderColor: "#DC2626" },
  eye: { position: "absolute", right: 8, top: 10, paddingHorizontal: 6, paddingVertical: 2 },
  eyeText: { color: "#6B7280", fontSize: 12 },

  submitWrap: { marginTop: 24, gap: 12 },
  loginRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  loginText: { fontSize: 13, color: "#6B7280" },
  loginLink: { fontSize: 13, color: "#2563EB" },
});
