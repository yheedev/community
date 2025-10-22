import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (id.length < 5 || id.length > 20) {
      Alert.alert('오류', '아이디는 5-20자여야 합니다.');
      return false;
    }

    if (!/^[a-z0-9_]+$/i.test(id)) {
      Alert.alert('오류', '아이디는 영문, 숫자, 밑줄만 가능합니다.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('오류', '올바른 이메일 형식이 아닙니다.');
      return false;
    }

    if (name.length < 2 || name.length > 20) {
      Alert.alert('오류', '이름은 2-20자여야 합니다.');
      return false;
    }

    if (password.length < 8) {
      Alert.alert('오류', '비밀번호는 8자 이상이어야 합니다.');
      return false;
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      Alert.alert('오류', '비밀번호는 영문과 숫자를 포함해야 합니다.');
      return false;
    }

    if (password !== confirm) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    console.log('회원가입 시작');

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      // 기존 사용자 확인
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // 이메일 중복 확인
      if (users.find((u: any) => u.email === email)) {
        Alert.alert('오류', '이미 사용 중인 이메일입니다.');
        setLoading(false);
        return;
      }

      // 아이디 중복 확인
      if (users.find((u: any) => u.id === id)) {
        Alert.alert('오류', '이미 사용 중인 아이디입니다.');
        setLoading(false);
        return;
      }

      // 새 사용자 추가
      const newUser = {
        id,
        email,
        name,
        password, // 실제로는 해싱해야
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('회원가입 성공!', `환영합니다, ${name}님!\n\n로그인 화면으로 이동합니다.`, [
        {
          text: '확인',
          onPress: () => {
            router.push('/(auth)/login');
          },
        },
      ]);
    } catch (error) {
      console.error('회원가입 실패:', error);
      Alert.alert('오류', '회원가입 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>회원가입</Text>
            <Text style={styles.subtitle}>필수 정보를 입력해 주세요.</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>💾 로컬 저장 방식</Text>
            <Text style={styles.infoSubtext}>AsyncStorage를 사용하여 기기에 저장됩니다.</Text>
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>아이디</Text>
            <TextInput
              style={styles.input}
              value={id}
              onChangeText={setId}
              autoCapitalize='none'
              placeholder='아이디 (5-20자, 영문/숫자/밑줄)'
              placeholderTextColor='#999'
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='이메일을 입력해주세요'
              placeholderTextColor='#999'
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder='이름 (2-20자)'
              placeholderTextColor='#999'
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize='none'
              placeholder='비밀번호 (8자 이상, 영문+숫자)'
              placeholderTextColor='#999'
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              autoCapitalize='none'
              placeholder='비밀번호를 재입력해주세요'
              placeholderTextColor='#999'
            />
          </View>

          <Pressable
            style={[styles.signupButton, loading && styles.signupButtonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <Text style={styles.signupButtonText}>회원가입</Text>
            )}
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>이미 계정이 있으신가요? </Text>
            <Pressable onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginLink}>로그인하기</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 4 },

  infoBox: {
    backgroundColor: '#DBEAFE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#1E40AF',
  },

  fieldWrap: { marginBottom: 16 },
  label: {
    color: '#111827',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },

  signupButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  signupButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: { fontSize: 14, color: '#6B7280' },
  loginLink: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
});
// import { Link, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { Controller } from 'react-hook-form';
// import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

// import { useSignUpForm } from '@/hooks/useSignUpForm';
// import { type SignUpInput } from '@/schemas/authSchema';
// import { signUpWithEmail } from '@/services/authService';
// import { useAuthStore } from '@/stores/auth';

// // TODO
// // [ ] Firebase Authentication 연동
// // [ ] 에러 핸들링 (네트워크 오류, 중복 가입 등)
// // [ ] 가입 후 축하 화면
// // [ ] 회원가입 버튼 토스트 UI (성공/실패)/
// // [ ] 회원가입 input 다 채우기 전에는 회원가입 버튼 비활성화

// export default function SignUpScreen() {
//   const router = useRouter();

//   const [showPw, setShowPw] = useState(false);
//   const [showPw2, setShowPw2] = useState(false);

//   const setSignUpField = useAuthStore((s) => s.setSignUpField);

//   const { control, handleSubmit, isSubmitting } = useSignUpForm();

//   // TODO: Firebase 가입 로직 연결

//   // const onSubmit = async (data: SignUpInput) => {
//   //   console.log('onSubmit 호출됨:', data);
//   //   try {
//   //     console.log('회원가입 시도 중...');
//   //     await signUpWithEmail({
//   //       email: data.email,
//   //       password: data.password,
//   //       displayName: data.name,
//   //       handle: data.id,
//   //     });
//   //     console.log('회원가입 성공!');
//   //     Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.');
//   //     router.replace('/login');
//   //   } catch (e: any) {
//   //     console.error('회원가입 에러:', e);
//   //     Alert.alert('회원가입 실패', e?.message ?? '다시 시도해 주세요.');
//   //   }
//   // };

//   const onInvalid = (errors: any) => {
//     console.log('❌ Validation 실패:', errors);

//     // 에러 메시지 생성
//     const errorMessages = Object.entries(errors)
//       .map(([field, error]: [string, any]) => `${field}: ${error.message}`)
//       .join('\n');

//     Alert.alert('입력을 확인해 주세요', errorMessages || '모든 필드를 올바르게 입력해주세요.');
//   };

//   const onSubmit = async (data: SignUpInput) => {
//     console.log('🚀 onSubmit 호출됨!');
//     console.log('📝 입력 데이터:', {
//       id: data.id,
//       email: data.email,
//       name: data.name,
//       password: '***' + data.password.slice(-2), // 비밀번호는 마지막 2자만
//       confirm: '***' + data.confirm.slice(-2),
//     });

//     try {
//       console.log('⏳ signUpWithEmail 호출 시작...');

//       const user = await signUpWithEmail({
//         email: data.email,
//         password: data.password,
//         displayName: data.name,
//         handle: data.id,
//       });

//       console.log('✅ 회원가입 성공! User ID:', user.uid);
//       Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.');
//       router.replace('/login');
//     } catch (e: any) {
//       console.error('❌ 회원가입 실패:', e);
//       console.error('에러 코드:', e?.code);
//       console.error('에러 메시지:', e?.message);

//       // Firebase 에러 코드에 따른 한글 메시지
//       let errorMessage = e?.message ?? '다시 시도해 주세요.';

//       if (e?.code === 'auth/email-already-in-use') {
//         errorMessage = '이미 사용 중인 이메일입니다.';
//       } else if (e?.code === 'auth/invalid-email') {
//         errorMessage = '유효하지 않은 이메일 형식입니다.';
//       } else if (e?.code === 'auth/weak-password') {
//         errorMessage = '비밀번호가 너무 약합니다.';
//       }

//       Alert.alert('회원가입 실패', errorMessage);
//     }
//   };

//   // 버튼 클릭 테스트용
//   const testButtonClick = () => {
//     console.log('🔵 회원가입 버튼 클릭됨!');
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       {/* <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollContent}> */}
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>회원가입</Text>
//           <Text style={styles.subtitle}>필수 정보를 입력해 주세요.</Text>
//         </View>

//         {/* 아이디 */}
//         <View style={styles.fieldWrap}>
//           <View style={styles.labelRow}>
//             <Text style={styles.label}>아이디</Text>
//           </View>
//           <Controller
//             control={control}
//             name='id'
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 value={value}
//                 onChangeText={(v) => {
//                   onChange(v);
//                   setSignUpField('id', v);
//                 }}
//                 onBlur={onBlur}
//                 autoCapitalize='none'
//                 autoCorrect={false}
//                 placeholder='아이디를 입력해주세요'
//                 placeholderTextColor='#999'
//               />
//             )}
//           />
//         </View>

//         {/* 이메일 */}
//         <View style={styles.fieldWrap}>
//           <View style={styles.labelRow}>
//             <Text style={styles.label}>이메일</Text>
//           </View>
//           <Controller
//             control={control}
//             name='email'
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 value={value}
//                 onChangeText={(v) => {
//                   onChange(v);
//                   setSignUpField('email', v);
//                 }}
//                 onBlur={onBlur}
//                 autoCapitalize='none'
//                 autoCorrect={false}
//                 keyboardType='email-address'
//                 placeholder='이메일을 입력해주세요'
//                 placeholderTextColor='#999'
//               />
//             )}
//           />
//         </View>

//         {/* 이름 */}
//         <View style={styles.fieldWrap}>
//           <View style={styles.labelRow}>
//             <Text style={styles.label}>이름</Text>
//           </View>
//           <Controller
//             control={control}
//             name='name'
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 value={value}
//                 onChangeText={(v) => {
//                   onChange(v);
//                   setSignUpField('name', v);
//                 }}
//                 onBlur={onBlur}
//                 autoCapitalize='none'
//                 autoCorrect={false}
//                 placeholder='이름을 입력해주세요'
//                 placeholderTextColor='#999'
//               />
//             )}
//           />
//         </View>

//         {/* 비밀번호 */}
//         <View style={styles.fieldWrap}>
//           <View style={styles.labelRow}>
//             <Text style={styles.label}>비밀번호</Text>
//           </View>
//           <Controller
//             control={control}
//             name='password'
//             render={({ field: { onChange, onBlur, value } }) => (
//               <View>
//                 <TextInput
//                   style={styles.input}
//                   value={value}
//                   onChangeText={onChange} // 스토어 저장 금지
//                   onBlur={onBlur}
//                   autoCapitalize='none'
//                   autoCorrect={false}
//                   secureTextEntry={!showPw}
//                   placeholder='비밀번호를 입력해주세요'
//                   placeholderTextColor='#999'
//                 />
//                 {/* <Pressable onPress={() => setShowPw((p) => !p)} accessibilityLabel='비밀번호 보기 전환' style={styles.eye}>
//                   <Text style={styles.eyeText}>{showPw ? "숨김" : "보기"}</Text>
//                 </Pressable> */}
//               </View>
//             )}
//           />
//         </View>

//         {/* 비밀번호 확인 */}
//         <View style={styles.fieldWrap}>
//           <View style={styles.labelRow}>
//             <Text style={styles.label}>비밀번호 확인</Text>
//           </View>
//           <Controller
//             control={control}
//             name='confirm'
//             render={({ field: { onChange, onBlur, value } }) => (
//               <View>
//                 <TextInput
//                   style={styles.input}
//                   value={value}
//                   onChangeText={onChange} // 스토어 저장 금지
//                   onBlur={onBlur}
//                   autoCapitalize='none'
//                   autoCorrect={false}
//                   secureTextEntry={!showPw2}
//                   placeholder='비밀번호를 재입력해주세요'
//                   placeholderTextColor='#999'
//                 />
//                 {/* <Pressable onPress={() => setShowPw2((p) => !p)} accessibilityLabel='비밀번호 확인 보기 전환' style={styles.eye}>
//                   <Text style={styles.eyeText}>{showPw2 ? "숨김" : "보기"}</Text>
//                 </Pressable> */}
//               </View>
//             )}
//           />
//         </View>

//         {/* 제출/링크 */}
//         <Pressable
//           style={styles.signupButton}
//           onPress={() => {
//             console.log('🔵 회원가입 버튼 클릭됨!');
//             handleSubmit(onSubmit, onInvalid)();
//           }}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.signupButtonText}>{isSubmitting ? '처리중...' : '회원가입'}</Text>
//         </Pressable>

//         <View style={styles.loginRow}>
//           <Text style={styles.loginText}>이미 계정이 있으신가요? </Text>
//           <Link href='/login' asChild>
//             <Pressable>
//               <Text style={styles.loginLink}>로그인하기</Text>
//             </Pressable>
//           </Link>
//         </View>
//         {/* </TouchableOpacity> */}
//       </View>

//       {/* </ScrollView> */}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: 'white' },
//   scrollContent: { paddingBottom: 24 },
//   container: { paddingHorizontal: 24, paddingTop: 32 },
//   header: { marginBottom: 8 },
//   title: { fontSize: 24, fontWeight: '700', color: '#111827' },
//   subtitle: { fontSize: 13, color: '#6B7280', marginTop: 4 },
//   signupButton: {
//     backgroundColor: '#2563EB',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   signupButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   fieldWrap: { marginTop: 16 },
//   labelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between', // 라벨 좌, 메시지 우
//     gap: 8,
//     marginBottom: 6,
//   },
//   label: { color: '#111827', fontWeight: '600' },

//   input: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     backgroundColor: 'white',
//   },
//   inputError: { borderColor: '#DC2626' },
//   eye: { position: 'absolute', right: 8, top: 10, paddingHorizontal: 6, paddingVertical: 2 },
//   eyeText: { color: '#6B7280', fontSize: 12 },

//   submitWrap: { marginTop: 24, gap: 12 },
//   loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
//   loginText: { fontSize: 13, color: '#6B7280' },
//   loginLink: { fontSize: 13, color: '#2563EB' },
// });
