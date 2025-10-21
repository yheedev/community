import type { FieldStatus } from "@/validations/fieldStatus";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function FieldMessage({ status }: { status: FieldStatus }) {
  if (status.kind === "idle") return null;

  const style = status.kind === "error" ? styles.error : status.kind === "ok" ? styles.ok : styles.hint;

  return (
    <View style={styles.wrap}>
      <Text style={style}>{status.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 6 },
  error: { color: "#DC2626", fontSize: 12 },
  ok: { color: "#059669", fontSize: 12 },
  hint: { color: "#6B7280", fontSize: 12 },
});
