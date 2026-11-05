import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  AuthButton,
  AuthDivider,
  AuthInput,
  AuthScaffold,
  AuthTitle,
  SocialButtons,
} from '../components/authUi'
import { usePreferences } from '../i18n/context'

/* The login screen is kept for the visual flow only.
   Nothing is verified: every sign-in action opens Home. */
export default function Login({ onNavigate }) {
  const { t } = usePreferences()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const enterApp = () => onNavigate('home')

  return (
    <AuthScaffold headerHeight={200}>
      <AuthTitle>{t('Lets Travel you in.')}</AuthTitle>

      <View style={styles.form}>
        <View style={styles.group}>
          <AuthInput
            testID="login-email"
            placeholder={t('Email')}
            autoComplete="email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={identifier}
            onChangeText={setIdentifier}
            returnKeyType="next"
          />
        </View>

        <View style={styles.group}>
          <AuthInput
            testID="login-password"
            placeholder={t('Password')}
            autoComplete="current-password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            returnKeyType="go"
            onSubmitEditing={enterApp}
          />
        </View>

        <AuthButton
          testID="login-btn-signin"
          label={t('Sign in')}
          onPress={enterApp}
          style={styles.submit}
        />
      </View>

      <AuthDivider />
      <SocialButtons onProvider={enterApp} />
    </AuthScaffold>
  )
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    maxWidth: 340,
  },
  group: {
    marginBottom: 16,
  },
  submit: {
    marginTop: 8,
  },
})
