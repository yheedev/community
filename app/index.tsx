import { Link } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#2563EB' />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDark ? '#0B0F14' : '#FFFFFF' }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        accessibilityRole='scrollbar'
        showsVerticalScrollIndicator={false}
      >
        {/* 로그인 안 했을 때만 히어로 섹션 표시 */}
        {!user && (
          <View style={styles.hero}>
            <Text style={[styles.title, { color: isDark ? '#E6EEF5' : '#0B0F14' }]}>
              우리 동네 커뮤니티
            </Text>
            <Text style={[styles.subtitle, { color: isDark ? '#A9B7C6' : '#526070' }]}>
              관심사로 연결되고, 도움을 주고받는 따뜻한 공간
            </Text>
            <Image
              source={require('../assets/images/dance.png')}
              style={styles.image}
              resizeMode='contain'
            />

            <View style={styles.ctaRow}>
              <Link href='/login' asChild>
                <Pressable
                  onPress={() => {
                    console.log('pressed');
                  }}
                  style={styles.button}
                  accessibilityRole='button'
                  accessibilityLabel='로그인 페이지로 이동'
                >
                  <Text style={styles.buttonText}>로그인</Text>
                </Pressable>
              </Link>

              <Link href='/signup' asChild>
                <Pressable
                  style={styles.button}
                  accessibilityRole='button'
                  accessibilityLabel='회원가입 페이지로 이동'
                >
                  <Text style={styles.buttonText}>회원가입</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        )}

        {/* 로그인 했을 때 헤더 */}
        {user && (
          <View style={styles.loggedInHeader}>
            <View>
              <Text style={[styles.welcomeText, { color: isDark ? '#E6EEF5' : '#0B0F14' }]}>
                환영합니다, {user.name}님! 👋
              </Text>
              <Text style={[styles.userEmail, { color: isDark ? '#A9B7C6' : '#526070' }]}>
                {user.email}
              </Text>
            </View>
            <Pressable
              style={styles.logoutButton}
              onPress={logout}
              accessibilityRole='button'
              accessibilityLabel='로그아웃'
            >
              <Text style={styles.logoutButtonText}>로그아웃</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader
            title={user ? '게시판' : '우리 커뮤니티는요'}
            desc={
              user
                ? '자유롭게 소통하고 정보를 공유하세요.'
                : '신뢰 기반의 소통, 물물교환·질문·소모임까지 한 번에.'
            }
            isDark={isDark}
          />
          <FeatureList isDark={isDark} isLoggedIn={!!user} />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDark ? '#728096' : '#8A98A8' }]}>
            스팸 및 광고성 글은 자동 필터링됩니다. 모두가 편하게 머무는 공간을 함께 만들어요.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title, desc, isDark }: { title: string; desc?: string; isDark: boolean }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: isDark ? '#E6EEF5' : '#0B0F14' }]}>{title}</Text>
      {desc ? (
        <Text style={[styles.sectionDesc, { color: isDark ? '#A9B7C6' : '#526070' }]}>{desc}</Text>
      ) : null}
    </View>
  );
}

function FeatureList({ isDark, isLoggedIn }: { isDark: boolean; isLoggedIn: boolean }) {
  const items = [
    {
      title: '질문/답변',
      desc: '동네 생활 팁과 노하우를 빠르게 주고받아요.',
      available: true,
    },
    {
      title: '소모임',
      desc: '산책, 러닝, 독서부터 스터디까지 함께해요.',
      available: false,
    },
    {
      title: '나눔/교환',
      desc: '안 쓰는 물건은 나누고 필요한 건 교환해요.',
      available: false,
    },
    {
      title: '공지/이벤트',
      desc: '운영진 소식과 커뮤니티 이벤트를 확인해요.',
      available: false,
    },
  ];

  return (
    <View style={styles.cardGrid}>
      {items.map((it) => (
        <Pressable
          key={it.title}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: isDark ? '#0F141A' : '#F7F9FC',
              borderColor: isDark ? '#1F2A37' : '#E8EEF5',
              opacity: isLoggedIn && !it.available ? 0.5 : 1,
            },
            pressed && styles.cardPressed,
          ]}
          disabled={isLoggedIn && !it.available}
          onPress={() => {
            if (isLoggedIn && it.available) {
              console.log(`${it.title} 클릭!`);
              // TODO: 게시판으로 이동
            }
          }}
          accessible
          accessibilityLabel={`${it.title}: ${it.desc}`}
        >
          <Text style={[styles.cardTitle, { color: isDark ? '#E6EEF5' : '#0B0F14' }]}>
            {it.title}
          </Text>
          <Text style={[styles.cardDesc, { color: isDark ? '#A9B7C6' : '#526070' }]}>
            {it.desc}
          </Text>
          {isLoggedIn && !it.available && <Text style={styles.comingSoon}>준비중</Text>}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 120,
    height: 120,
  },
  scroll: { padding: 24 },
  hero: { alignItems: 'center', gap: 12, marginTop: 50, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.2, textAlign: 'center' },
  subtitle: { fontSize: 15, textAlign: 'center' },

  loggedInHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  userEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 24,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,

    backgroundColor: '#FFFFFF',
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  section: { marginTop: 8 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  sectionDesc: { marginTop: 4, fontSize: 14 },

  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    position: 'relative',
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  cardDesc: { fontSize: 13, lineHeight: 18 },
  comingSoon: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 10,
    fontWeight: '600',
    color: '#F59E0B',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  footer: { marginTop: 24, alignItems: 'center', paddingBottom: 24 },
  footerText: { fontSize: 12, textAlign: 'center' },
});
