import { Link } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";

// const dance = require("../../assets/images/dance.png");
// const local = require("./dance_test.png");

export default function Landing() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDark ? "#0B0F14" : "#FFFFFF" }]}>
      <ScrollView contentContainerStyle={styles.scroll} accessibilityRole='scrollbar' showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={[styles.title, { color: isDark ? "#E6EEF5" : "#0B0F14" }]}>우리 동네 커뮤니티</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#A9B7C6" : "#526070" }]}>관심사로 연결되고, 도움을 주고받는 따뜻한 공간</Text>
          {/* <Image source={require("../../assets/images/dance.png")} style={{ width: 300, height: 200 }} /> */}
          {/* <Image
            source={dance}
            style={{ width: 300, height: 200 }}
            resizeMode='contain'
            accessible
            accessibilityLabel='커뮤니티를 상징하는 일러스트'
          /> */}

          <View style={styles.ctaRow}>
            <Link href='/login' asChild>
              <Pressable
                style={({ hovered, pressed }) => [
                  styles.buttonOutline,
                  {
                    borderColor: hovered || pressed ? "#1F6BFF" : "#A0AEC0",
                    backgroundColor: hovered ? "#E8F0FF" : "#FFFFFF",
                  },
                ]}
                accessibilityRole='button'
                accessibilityLabel='로그인 페이지로 이동'
              >
                <Text style={[styles.ghostBtnText, { color: isDark ? "#E6EEF5" : "#1F2A37" }]}>로그인</Text>
              </Pressable>
            </Link>

            <Link href='/signup' asChild>
              <Pressable
                style={({ hovered, pressed }) => [
                  styles.buttonOutline,
                  {
                    borderColor: hovered || pressed ? "#1F6BFF" : "#A0AEC0",
                    backgroundColor: hovered ? "#E8F0FF" : "#FFFFFF",
                  },
                ]}
                accessibilityRole='button'
                accessibilityLabel='회원가입 페이지로 이동'
              >
                <Text style={[styles.ghostBtnText, { color: isDark ? "#E6EEF5" : "#1F2A37" }]}>회원가입</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title='우리 커뮤니티는요' desc='신뢰 기반의 소통, 물물교환·질문·소모임까지 한 번에.' isDark={isDark} />
          <FeatureList isDark={isDark} />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDark ? "#728096" : "#8A98A8" }]}>
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
      <Text style={[styles.sectionTitle, { color: isDark ? "#E6EEF5" : "#0B0F14" }]}>{title}</Text>
      {desc ? <Text style={[styles.sectionDesc, { color: isDark ? "#A9B7C6" : "#526070" }]}>{desc}</Text> : null}
    </View>
  );
}

function FeatureList({ isDark }: { isDark: boolean }) {
  const items = [
    {
      title: "질문/답변",
      desc: "동네 생활 팁과 노하우를 빠르게 주고받아요.",
    },
    {
      title: "소모임",
      desc: "산책, 러닝, 독서부터 스터디까지 함께해요.",
    },
    {
      title: "나눔/교환",
      desc: "안 쓰는 물건은 나누고 필요한 건 교환해요.",
    },
    {
      title: "공지/이벤트",
      desc: "운영진 소식과 커뮤니티 이벤트를 확인해요.",
    },
  ];

  return (
    <View style={styles.cardGrid}>
      {items.map((it) => (
        <View
          key={it.title}
          style={[
            styles.card,
            {
              backgroundColor: isDark ? "#0F141A" : "#F7F9FC",
              borderColor: isDark ? "#1F2A37" : "#E8EEF5",
            },
          ]}
          accessible
          accessibilityLabel={`${it.title}: ${it.desc}`}
        >
          <Text style={[styles.cardTitle, { color: isDark ? "#E6EEF5" : "#0B0F14" }]}>{it.title}</Text>
          <Text style={[styles.cardDesc, { color: isDark ? "#A9B7C6" : "#526070" }]}>{it.desc}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 24 },
  hero: { alignItems: "center", gap: 12, marginTop: 8 },
  dance: { width: 300, height: 150 },
  title: { fontSize: 28, fontWeight: "700", letterSpacing: -0.2, textAlign: "center" },
  subtitle: { fontSize: 15, textAlign: "center" },
  ctaRow: { flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 16 },
  button: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10, backgroundColor: "#357CFF" },
  buttonOutline: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10, borderWidth: 1, backgroundColor: "#FFFFFF" },
  buttonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF", textAlign: "center" },

  primaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  ghostBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  ghostBtnText: { fontWeight: "700", fontSize: 16 },
  section: { marginTop: 28 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: "700" },
  sectionDesc: { marginTop: 4, fontSize: 14 },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "48%",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 6 },
  cardDesc: { fontSize: 13, lineHeight: 18 },
  footer: { marginTop: 24, alignItems: "center", paddingBottom: 24 },
  footerText: { fontSize: 12, textAlign: "center" },
});

// import { auth } from "@/firebaseConfig";
// import { useAuthStore } from "@/stores/auth";
// import { signOut } from "firebase/auth";
// import { Button, Text, View } from "react-native";

// export default function Home() {
//   const user = useAuthStore((s) => s.user);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
//       <Text>안녕하세요, {user?.email}</Text>
//       <Button title='로그아웃' onPress={() => signOut(auth)} />
//     </View>
//   );
// }
