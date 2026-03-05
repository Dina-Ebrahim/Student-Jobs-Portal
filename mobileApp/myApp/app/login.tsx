import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../assets/Job Portal.jpg")}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.25)", "rgba(5,15,50,0.88)"]}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.kav}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Inner container — max width for web */}
            <View style={styles.inner}>

              {/* Logo */}
              <View style={styles.logoWrapper}>
                <LinearGradient colors={["#ffffff", "#e0eaff"]} style={styles.logoCircle}>
                  <Text style={styles.logoText}>CU</Text>
                </LinearGradient>
                <View style={styles.logoDot} />
              </View>

              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Cairo University Science Faculty{"\n"}Jobs Portal
              </Text>

              {/* Email Input */}
              <View style={[styles.inputBox, emailFocused && styles.inputBoxFocused]}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                {email.length > 0 && <Text style={styles.checkIcon}>✓</Text>}
              </View>

              {/* Password Input */}
              <View style={[styles.inputBox, passwordFocused && styles.inputBoxFocused]}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity activeOpacity={0.85} style={styles.signInWrapper}>
                <LinearGradient
                  colors={["#1d4ed8", "#3b82f6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signInBtn}
                >
                  <Text style={styles.signInText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => router.push("/forgot-password" as any)}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Button */}
              <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
                <View style={styles.googleIconCircle}>
                  <Text style={styles.googleIconText}>G</Text>
                </View>
                <Text style={styles.googleBtnText}>Sign in with Google</Text>
              </TouchableOpacity>

              {/* Create Account */}
              <View style={styles.createRow}>
                <Text style={styles.createText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/register" as any)}>
                  <Text style={styles.createLink}>Create Account</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  bg: { flex: 1, width: "100%", height: "100%" },
  bgImage: { width: "100%", height: "100%" },
  kav: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 44,
    paddingTop: 20,
  },

  // Max width 420 — looks good on both mobile and web
  inner: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  logoWrapper: { alignItems: "center", marginBottom: 14 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: "center", justifyContent: "center",
    boxShadow: "0px 4px 16px rgba(29,78,216,0.4)",
  },
  logoText: { fontSize: 24, fontWeight: "900", color: "#1d4ed8" },
  logoDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: "#3b82f6", marginTop: 6,
  },

  title: {
    fontSize: 30, fontWeight: "900", color: "#fff",
    marginBottom: 4, letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 13, color: "rgba(255,255,255,0.80)",
    textAlign: "center", marginBottom: 22, lineHeight: 20,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  inputBoxFocused: {
    borderColor: "#3b82f6",
    backgroundColor: "#fff",
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: "#0f172a" },
  eyeIcon: { fontSize: 18 },
  checkIcon: { fontSize: 16, color: "#22c55e", fontWeight: "800" },

  signInWrapper: { width: "100%", marginTop: 4 },
  signInBtn: {
    borderRadius: 14, height: 54,
    alignItems: "center", justifyContent: "center",
    boxShadow: "0px 4px 12px rgba(29,78,216,0.4)",
  },
  signInText: { color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 0.3 },

  forgotBtn: { marginTop: 14, marginBottom: 2 },
  forgotText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  dividerRow: {
    flexDirection: "row", alignItems: "center",
    width: "100%", marginVertical: 14,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.30)" },
  orText: {
    color: "rgba(255,255,255,0.75)", fontSize: 12,
    marginHorizontal: 12, fontWeight: "600",
  },

  googleBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 14, width: "100%", height: 54, gap: 12,
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
  },
  googleIconCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: "#4285F4",
  },
  googleIconText: { fontSize: 16, fontWeight: "900", color: "#4285F4" },
  googleBtnText: { color: "#334155", fontSize: 15, fontWeight: "700" },

  createRow: { flexDirection: "row", marginTop: 22, alignItems: "center" },
  createText: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  createLink: {
    color: "#fff", fontSize: 13, fontWeight: "800", textDecorationLine: "underline",
  },
});
