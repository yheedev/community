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
