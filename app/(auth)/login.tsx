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

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('로그인 시작');

    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 저장된 사용자 확인
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // 이메일로 사용자 찾기
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        Alert.alert('오류', '존재하지 않는 이메일입니다.');
        setLoading(false);
        return;
      }

      // 비밀번호 확인
      if (user.password !== password) {
        Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
        setLoading(false);
        return;
      }

      // 로그인 성공
      console.log('로그인 성공:', user);

      // 현재 로그인 사용자 저장
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));

      Alert.alert('로그인 성공!', `환영합니다, ${user.name}님!`, [
        {
          text: '확인',
          onPress: () => {
            // 메인 화면으로 이동 (미구현)
            router.replace('/');
          },
        },
      ]);
    } catch (error) {
      console.error('로그인 실패:', error);
      Alert.alert('오류', '로그인 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>로그인</Text>
            <Text style={styles.subtitle}>계정에 로그인하세요.</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>💾 로컬 저장 방식</Text>
            <Text style={styles.infoSubtext}>회원가입 시 저장한 정보로 로그인합니다.</Text>
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
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize='none'
              placeholder='비밀번호를 입력해주세요'
              placeholderTextColor='#999'
            />
          </View>

          <Pressable
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <Text style={styles.loginButtonText}>로그인</Text>
            )}
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>아직 계정이 없으신가요? </Text>
            <Pressable onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.signupLink}>회원가입하기</Text>
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

  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: { fontSize: 14, color: '#6B7280' },
  signupLink: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
});
