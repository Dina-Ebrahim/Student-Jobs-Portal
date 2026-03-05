import { useRef, useState } from "react";
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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [phoneFocused, setPhoneFocused] = useState<boolean>(false);
  const [newFocused, setNewFocused] = useState<boolean>(false);
  const [confirmFocused, setConfirmFocused] = useState<boolean>(false);
  const router = useRouter();
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handleSendCode = (): void => {
    if (!phone) return Alert.alert("Error", "Please enter your phone number.");
    setStep(2);
  };

  const handleVerifyOtp = (): void => {
    const code = otp.join("");
    if (code.length < 6) return Alert.alert("Error", "Please enter the full 6-digit code.");
    setStep(3);
  };

  const handleResetPassword = (): void => {
    if (!newPassword || !confirmPassword)
      return Alert.alert("Error", "Please fill in all fields.");
    if (newPassword !== confirmPassword)
      return Alert.alert("Error", "Passwords do not match.");
    Alert.alert("Success", "Password reset successfully!", [
      { text: "Login", onPress: () => router.replace("/") },
    ]);
  };

  const handleOtpChange = (val: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const stepTitles: string[] = ["Forgot Password", "Verify Your Phone", "New Password"];
  const stepSubtitles: string[] = [
    "Enter your phone number and we'll\nsend you a verification code via SMS",
    `We sent a 6-digit code to\n+20 ${phone || "your phone"}`,
    "Create a strong new password\nfor your account",
  ];

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
          {/* Back Button — outside scroll, always visible */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => (step > 1 ? setStep((step - 1) as 1 | 2 | 3) : router.back())}
          >
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inner}>

              {/* Icon */}
              <View style={styles.iconWrapper}>
                <LinearGradient colors={["#ffffff", "#e0eaff"]} style={styles.iconCircle}>
                  <Text style={styles.iconEmoji}>
                    {step === 1 ? "📱" : step === 2 ? "💬" : "🔒"}
                  </Text>
                </LinearGradient>
                <View style={styles.logoDot} />
              </View>

              {/* Step Indicator */}
              <View style={styles.stepsRow}>
                {([1, 2, 3] as const).map((s) => (
                  <View key={s} style={styles.stepItem}>
                    <View style={[styles.stepDot, step >= s && styles.stepDotActive]}>
                      {step > s ? (
                        <Text style={styles.stepCheck}>✓</Text>
                      ) : (
                        <Text style={[styles.stepNum, step === s && styles.stepNumActive]}>{s}</Text>
                      )}
                    </View>
                    {s < 3 && <View style={[styles.stepLine, step > s && styles.stepLineActive]} />}
                  </View>
                ))}
              </View>

              <Text style={styles.title}>{stepTitles[step - 1]}</Text>
              <Text style={styles.subtitle}>{stepSubtitles[step - 1]}</Text>

              {/* STEP 1 — Phone */}
              {step === 1 && (
                <>
                  <View style={[styles.inputBox, phoneFocused && styles.inputBoxFocused]}>
                    <View style={styles.countryCode}>
                      <Text style={styles.flagEmoji}>🇪🇬</Text>
                      <Text style={styles.countryCodeText}>+20</Text>
                    </View>
                    <View style={styles.dividerVertical} />
                    <TextInput
                      style={styles.input}
                      placeholder="010 0000 0000"
                      placeholderTextColor="#94a3b8"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                      onFocus={() => setPhoneFocused(true)}
                      onBlur={() => setPhoneFocused(false)}
                      maxLength={11}
                    />
                    {phone.length >= 10 && <Text style={styles.checkIcon}>✓</Text>}
                  </View>
                  <Text style={styles.hintText}>📩 You'll receive an SMS with a reset code</Text>

                  <TouchableOpacity activeOpacity={0.85} style={styles.actionWrapper} onPress={handleSendCode}>
                    <LinearGradient
                      colors={["#1d4ed8", "#3b82f6"]}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.actionBtn}
                    >
                      <Text style={styles.actionBtnText}>Send SMS Code</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}

              {/* STEP 2 — OTP */}
              {step === 2 && (
                <>
                  <Text style={styles.otpHint}>Enter the 6-digit code sent via SMS</Text>
                  <View style={styles.otpRow}>
                    {otp.map((digit: string, index: number) => (
                      <TextInput
                        key={index}
                        ref={(ref) => { otpRefs.current[index] = ref; }}
                        style={[styles.otpBox, digit ? styles.otpBoxFilled : undefined]}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(val: string) => handleOtpChange(val, index)}
                        textAlign="center"
                      />
                    ))}
                  </View>

                  <TouchableOpacity activeOpacity={0.85} style={styles.actionWrapper} onPress={handleVerifyOtp}>
                    <LinearGradient
                      colors={["#1d4ed8", "#3b82f6"]}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.actionBtn}
                    >
                      <Text style={styles.actionBtnText}>Verify Code</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.resendBtn}>
                    <Text style={styles.resendText}>
                      Didn't receive it? <Text style={styles.resendLink}>Resend SMS</Text>
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {/* STEP 3 — New Password */}
              {step === 3 && (
                <>
                  <View style={[styles.inputBox, newFocused && styles.inputBoxFocused]}>
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="New Password"
                      placeholderTextColor="#94a3b8"
                      secureTextEntry={!showNew}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      onFocus={() => setNewFocused(true)}
                      onBlur={() => setNewFocused(false)}
                    />
                    <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                      <Text style={styles.eyeIcon}>{showNew ? "🙈" : "👁️"}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.inputBox, confirmFocused && styles.inputBoxFocused]}>
                    <Text style={styles.inputIcon}>🔐</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#94a3b8"
                      secureTextEntry={!showConfirm}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onFocus={() => setConfirmFocused(true)}
                      onBlur={() => setConfirmFocused(false)}
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                      <Text style={styles.eyeIcon}>{showConfirm ? "🙈" : "👁️"}</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity activeOpacity={0.85} style={styles.actionWrapper} onPress={handleResetPassword}>
                    <LinearGradient
                      colors={["#1d4ed8", "#3b82f6"]}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.actionBtn}
                    >
                      <Text style={styles.actionBtnText}>Reset Password</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}

              {/* Back to Login */}
              <View style={styles.createRow}>
                <Text style={styles.createText}>Remember your password? </Text>
                <TouchableOpacity onPress={() => router.replace("/")}>
                  <Text style={styles.createLink}>Sign In</Text>
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
    paddingTop: 80, // space for back button
  },

  inner: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  backBtn: {
    position: "absolute",
    top: 56, left: 24,
    zIndex: 10,
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
  },
  backIcon: { color: "#fff", fontSize: 16, fontWeight: "700" },
  backText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  iconWrapper: { alignItems: "center", marginBottom: 14 },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: "center", justifyContent: "center",
    boxShadow: "0px 4px 16px rgba(29,78,216,0.4)",
  },
  iconEmoji: { fontSize: 30 },
  logoDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: "#3b82f6", marginTop: 6,
  },

  stepsRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  stepItem: { flexDirection: "row", alignItems: "center" },
  stepDot: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: "rgba(255,255,255,0.3)",
  },
  stepDotActive: { backgroundColor: "#1d4ed8", borderColor: "#3b82f6" },
  stepNum: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  stepNumActive: { color: "#fff" },
  stepCheck: { color: "#fff", fontSize: 14, fontWeight: "900" },
  stepLine: {
    width: 36, height: 2,
    backgroundColor: "rgba(255,255,255,0.2)", marginHorizontal: 4,
  },
  stepLineActive: { backgroundColor: "#3b82f6" },

  title: {
    fontSize: 30, fontWeight: "900", color: "#fff",
    marginBottom: 4, letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 13, color: "rgba(255,255,255,0.80)",
    textAlign: "center", marginBottom: 22, lineHeight: 20,
  },

  // Same standalone input style as LoginScreen
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

  countryCode: { flexDirection: "row", alignItems: "center", gap: 6 },
  flagEmoji: { fontSize: 20 },
  countryCodeText: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
  dividerVertical: {
    width: 1.5, height: 28, backgroundColor: "#cbd5e1", marginHorizontal: 10,
  },

  hintText: {
    color: "rgba(255,255,255,0.65)", fontSize: 12,
    alignSelf: "flex-start", marginBottom: 12, marginTop: -4,
  },

  actionWrapper: { width: "100%", marginTop: 4 },
  actionBtn: {
    borderRadius: 14, height: 54,
    alignItems: "center", justifyContent: "center",
    boxShadow: "0px 4px 12px rgba(29,78,216,0.4)",
  },
  actionBtnText: { color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 0.3 },

  // OTP
  otpHint: {
    fontSize: 13, color: "rgba(255,255,255,0.80)", fontWeight: "600",
    textAlign: "center", marginBottom: 16,
  },
  otpRow: {
    flexDirection: "row", justifyContent: "space-between",
    width: "100%", marginBottom: 20,
  },
  otpBox: {
    width: 46, height: 56, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1.5, borderColor: "transparent",
    fontSize: 22, fontWeight: "800", color: "#0f172a",
  },
  otpBoxFilled: {
    borderColor: "#3b82f6", backgroundColor: "#fff",
  },

  resendBtn: { alignItems: "center", marginTop: 14 },
  resendText: { color: "rgba(255,255,255,0.70)", fontSize: 13 },
  resendLink: { color: "#fff", fontWeight: "700", textDecorationLine: "underline" },

  createRow: { flexDirection: "row", marginTop: 24, alignItems: "center" },
  createText: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  createLink: {
    color: "#fff", fontSize: 13, fontWeight: "800", textDecorationLine: "underline",
  },
});
