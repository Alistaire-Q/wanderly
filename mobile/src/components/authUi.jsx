import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, font, shadow } from '../theme'
import { AppleMark, GoogleMark } from './icons'
import { Clouds } from './ui'
import { usePreferences } from '../i18n/context'

export function AuthScaffold({ children, headerHeight = 200, compact = false, cardStyle }) {
  const insets = useSafeAreaInsets()
  return (
    <LinearGradient
      colors={['#186BF0', '#186BF0', '#F5F5F5', '#F5F5F5']}
      locations={[0, 0.35, 0.7, 1]}
      style={styles.screen}
    >
      <View style={{ paddingTop: insets.top }}>
        <Clouds height={headerHeight} compact={compact} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 32 + insets.bottom,
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.card, cardStyle]}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

export function AuthTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>
}

export function AuthNotice({ children }) {
  if (!children) return null
  return (
    <View style={styles.notice}>
      <Text style={styles.noticeText}>{children}</Text>
    </View>
  )
}

export function AuthInput({ style, ...props }) {
  return (
    <TextInput
      placeholderTextColor="#8C9097"
      style={[styles.input, style]}
      {...props}
    />
  )
}

export function AuthHint({ children, error = false }) {
  return (
    <Text style={[styles.hint, error && { color: colors.red }]}>{children}</Text>
  )
}

export function AuthError({ children }) {
  if (!children) return null
  return <Text style={styles.error}>{children}</Text>
}

export function AuthButton({ label, onPress, disabled, busy, style, testID }) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      disabled={disabled || busy}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        style,
        (disabled || busy) && { opacity: 0.6 },
        pressed && !disabled && !busy && { backgroundColor: colors.blueDark },
      ]}
    >
      <Text style={styles.primaryText}>{label}</Text>
    </Pressable>
  )
}

export function AuthLink({ children, onPress, style }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} hitSlop={8} style={style}>
      <Text style={styles.link}>{children}</Text>
    </Pressable>
  )
}

export function SocialButtons({ busy, onProvider }) {
  const { t } = usePreferences()
  return (
    <View style={styles.socials}>
      <Pressable
        accessibilityRole="button"
        disabled={Boolean(busy)}
        onPress={() => onProvider('google')}
        style={({ pressed }) => [
          styles.social,
          pressed && { opacity: 0.8 },
          busy && { opacity: 0.6 },
        ]}
      >
        <GoogleMark size={20} />
        <Text style={styles.socialText}>
          {busy === 'google' ? t('Connecting…') : 'Google'}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        disabled={Boolean(busy)}
        onPress={() => onProvider('apple')}
        style={({ pressed }) => [
          styles.social,
          pressed && { opacity: 0.8 },
          busy && { opacity: 0.6 },
        ]}
      >
        <AppleMark size={20} />
        <Text style={styles.socialText}>
          {busy === 'apple' ? t('Connecting…') : 'Apple'}
        </Text>
      </Pressable>
    </View>
  )
}

export function AuthDivider() {
  const { t } = usePreferences()
  return (
    <View style={styles.divider}>
      <Text style={styles.dividerText}>{t('or sign in with')}</Text>
    </View>
  )
}

export function AuthSwitch({ prompt, action, onPress }) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchText}>{prompt} </Text>
      <Pressable accessibilityRole="button" onPress={onPress} hitSlop={6}>
        <Text style={styles.switchAction}>{action}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F4F5F7',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    ...shadow.float,
  },
  title: {
    fontFamily: font.bold,
    fontSize: 28,
    lineHeight: 36,
    color: '#0062FF',
    textAlign: 'center',
    marginBottom: 32,
  },
  notice: {
    width: '100%',
    maxWidth: 340,
    marginTop: -14,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.ice,
  },
  noticeText: {
    fontFamily: font.medium,
    fontSize: 12,
    lineHeight: 18,
    color: '#2A4A7E',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontFamily: font.regular,
    fontSize: 14,
    color: colors.navy,
  },
  hint: {
    marginTop: 6,
    fontFamily: font.regular,
    fontSize: 10.5,
    lineHeight: 15,
    color: '#8C9097',
  },
  error: {
    marginTop: 2,
    marginBottom: 14,
    fontFamily: font.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.red,
  },
  primary: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontFamily: font.bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  socials: {
    width: '100%',
    maxWidth: 340,
    gap: 12,
  },
  social: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    ...shadow.float,
  },
  socialText: {
    fontFamily: font.semibold,
    fontSize: 14,
    color: colors.navy,
  },
  divider: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    fontFamily: font.medium,
    fontSize: 13,
    color: '#7A828E',
  },
  link: {
    fontFamily: font.medium,
    fontSize: 12,
    color: '#5C6470',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchText: {
    fontFamily: font.medium,
    fontSize: 13,
    color: '#7A828E',
  },
  switchAction: {
    fontFamily: font.semibold,
    fontSize: 13,
    color: '#0062FF',
  },
})
