import { useEffect, useState } from 'react'
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomNav } from '../components/ui'
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Close,
  Currency,
  Globe,
  Help,
  Person,
  Pin,
  Privacy,
  Security,
  Terms,
  UserOutline,
} from '../components/icons'
import { imageSource } from '../theme/images'
import { colors, font, shadow } from '../theme'
import { CURRENCIES, LANGUAGES } from '../i18n/translations'
import { getInfoContent } from '../i18n/infoContent'
import { usePreferences } from '../i18n/context'

export default function Profile({
  account,
  onBack,
  onSelectTab,
  onOpenAccount,
  onSignOut,
}) {
  const insets = useSafeAreaInsets()
  const { t, translate, language, currency, setLanguage, setCurrency } = usePreferences()
  const [sheet, setSheet] = useState(null)
  const [toast, setToast] = useState('')

  const user = account ?? {
    name: 'Lawrence Russel',
    email: 'lawrence@example.com',
    avatar: null,
  }

  const languageLabel =
    LANGUAGES.find((item) => item.id === language)?.label ?? LANGUAGES[0].label
  const currencyLabel =
    CURRENCIES.find((item) => item.id === currency)?.label ?? CURRENCIES[0].label

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(timer)
  }, [toast])

  const accountRows = [
    {
      id: 'account',
      Icon: UserOutline,
      title: t('My Account'),
      sub: t('Manage profile information and account security.'),
    },
    {
      id: 'notification',
      Icon: Bell,
      title: t('Notification'),
      sub: t('Set notification preferences'),
    },
    {
      id: 'security',
      Icon: Security,
      title: t('Security'),
      sub: t('Change password and security settings'),
    },
  ]

  const otherRows = [
    {
      id: 'help',
      Icon: Help,
      title: t('Help Center'),
      sub: t('FAQs, guides, and support'),
      onClick: () => setSheet('help'),
    },
    {
      id: 'terms',
      Icon: Terms,
      title: t('Terms and Conditions'),
      sub: t("Application's terms of use"),
      onClick: () => setSheet('terms'),
    },
    {
      id: 'privacy',
      Icon: Privacy,
      title: t('Privacy Policy'),
      sub: t('How we protect your data'),
      onClick: () => setSheet('privacy'),
    },
  ]

  const preferenceRows = [
    {
      id: 'language',
      Icon: Globe,
      title: t('Language'),
      sub: languageLabel,
      onClick: () => setSheet('language'),
    },
    {
      id: 'currency',
      Icon: Currency,
      title: t('Currency'),
      sub: currencyLabel,
      onClick: () => setSheet('currency'),
    },
    {
      id: 'location',
      Icon: Pin,
      title: t('Location'),
      sub: t('Allow location access for accurate recommendations.'),
      onClick: () => setToast(t('Location settings coming soon')),
    },
  ]

  const renderRow = ({ id, Icon, title, sub, onClick }) => (
    <Pressable
      key={id}
      accessibilityRole="button"
      onPress={onClick ?? (() => setToast(t('{title} settings coming soon', { title })))}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.65 }]}
    >
      <View style={styles.rowIcon}>
        <Icon size={16} color={colors.ink} currency={currency} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{sub}</Text>
      </View>
    </Pressable>
  )

  const sheetOptions = sheet === 'language' ? LANGUAGES : CURRENCIES
  const sheetValue = sheet === 'language' ? language : currency
  const infoSheet = sheet === 'help' || sheet === 'terms' || sheet === 'privacy'
  const info = infoSheet ? getInfoContent(sheet, language) : null
  const sheetTitle = info ? info.title : t(sheet === 'language' ? 'Choose language' : 'Choose currency')

  const chooseOption = (option) => {
    // Confirm in the language the user just picked.
    const message =
      sheet === 'language'
        ? translate(option.id, 'Language set to {value}', {
            value: option.label,
          })
        : t('Currency set to {value}', { value: option.label })
    if (sheet === 'language') setLanguage(option.id)
    if (sheet === 'currency') setCurrency(option.id)
    setToast(message)
    setSheet(null)
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
        >
          <ChevronLeft size={20} color={colors.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('Settings:')}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: 96 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open my account"
          onPress={onOpenAccount}
          style={({ pressed }) => [styles.account, pressed && { opacity: 0.8 }]}
        >
          <View style={styles.avatar}>
            {user.avatar ? (
              <Image source={imageSource(user.avatar)} style={styles.avatarImg} />
            ) : (
              <Person size={42} color="#8C96A6" />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.email}>{user.email}</Text>
          </View>
          <ChevronRight size={18} color={colors.ink} />
        </Pressable>

        <View style={styles.group}>{accountRows.map(renderRow)}</View>

        <Text style={styles.sectionLabel}>{t('Preference:')}</Text>
        <View style={[styles.group, { marginTop: 14 }]}>
          {preferenceRows.map(renderRow)}
        </View>

        <Text style={styles.sectionLabel}>{t('Others:')}</Text>
        <View style={[styles.group, { marginTop: 14 }]}>
          {otherRows.map(renderRow)}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onSignOut}
          style={({ pressed }) => [
            styles.signOut,
            pressed && { backgroundColor: colors.redSoft, borderColor: '#E5484D' },
          ]}
        >
          <Text style={styles.signOutText}>{t('Sign out')}</Text>
        </Pressable>
      </ScrollView>

      {toast ? (
        <View style={[styles.toast, { bottom: 96 + insets.bottom }]}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      ) : null}

      <Modal
        visible={Boolean(sheet)}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setSheet(null)}
      >
        <View style={styles.modal}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(23,35,60,0.45)' }]}
            onPress={() => setSheet(null)}
          />

          <View
            style={[
              styles.sheet,
              infoSheet && styles.sheetInfo,
              { paddingBottom: 24 + insets.bottom },
            ]}
          >
            <View style={styles.grabber} />

            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle} numberOfLines={2}>
                {sheetTitle}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={() => setSheet(null)}
                style={styles.sheetClose}
              >
                <Close size={16} color={colors.ink} />
              </Pressable>
            </View>

            {infoSheet ? (
              <ScrollView
                style={styles.info}
                contentContainerStyle={styles.infoContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.infoMeta}>{info.meta}</Text>
                <Text style={styles.infoIntro}>{info.intro}</Text>
                {info.sections.map((section) => (
                  <View key={section.title} style={styles.infoSection}>
                    <Text style={styles.infoSectionTitle}>{section.title}</Text>
                    <Text style={styles.infoText}>{section.body}</Text>
                  </View>
                ))}
                {info.action ? (
                  <Pressable
                    accessibilityRole="link"
                    onPress={() => Linking.openURL(info.action.href)}
                    style={({ pressed }) => [styles.infoAction, pressed && { opacity: 0.8 }]}
                  >
                    <Text style={styles.infoActionText}>{info.action.label}</Text>
                  </Pressable>
                ) : null}
              </ScrollView>
            ) : (
              <View style={styles.options}>
                {sheetOptions.map((option) => {
                  const isActive = option.id === sheetValue
                  return (
                    <Pressable
                      key={option.id}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                      testID={`profile-option-${option.id}`}
                      onPress={() => chooseOption(option)}
                      style={({ pressed }) => [
                        styles.option,
                        isActive && styles.optionActive,
                        pressed && { opacity: 0.75 },
                      ]}
                    >
                      <Text style={styles.optionLabel}>{option.label}</Text>
                      <View style={[styles.check, isActive && styles.checkActive]}>
                        {isActive ? <Text style={styles.checkMark}>✓</Text> : null}
                      </View>
                    </Pressable>
                  )
                })}
              </View>
            )}
          </View>
        </View>
      </Modal>

      <BottomNav active="profile" accent={colors.blueDeep} onSelect={onSelectTab} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 22,
    paddingBottom: 18,
    backgroundColor: 'rgba(214, 227, 250, 0.97)',
  },
  back: {
    width: 26,
    height: 26,
    marginLeft: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: font.semibold,
    fontSize: 20,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  scroll: {
    paddingTop: 22,
    paddingHorizontal: 22,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0D6E0',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: font.semibold,
    fontSize: 16,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  email: {
    marginTop: 3,
    fontFamily: font.regular,
    fontSize: 11,
    color: colors.muted,
  },
  group: {
    gap: 24,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(214, 227, 250, 0.97)',
  },
  rowTitle: {
    fontFamily: font.semibold,
    fontSize: 12,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  rowSub: {
    marginTop: 3,
    fontFamily: font.regular,
    fontSize: 9.5,
    lineHeight: 13,
    color: colors.muted,
  },
  sectionLabel: {
    marginTop: 26,
    fontFamily: font.semibold,
    fontSize: 10,
    letterSpacing: 0.1,
    color: colors.ink,
  },
  signOut: {
    marginTop: 22,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#F0D4D6',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  signOutText: {
    fontFamily: font.semibold,
    fontSize: 12,
    letterSpacing: 0.1,
    color: colors.red,
  },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    maxWidth: 300,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: colors.ink,
    zIndex: 30,
    ...shadow.float,
  },
  toastText: {
    fontFamily: font.medium,
    fontSize: 10.5,
    lineHeight: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFFFFF',
    ...shadow.float,
  },
  sheetInfo: {
    maxHeight: '84%',
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    marginBottom: 14,
    borderRadius: 2,
    backgroundColor: '#D9DEE8',
  },
  sheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sheetTitle: {
    flex: 1,
    fontFamily: font.semibold,
    fontSize: 17,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  sheetClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F3F9',
  },
  info: {
    flexShrink: 1,
    marginTop: 2,
  },
  infoContent: {
    paddingBottom: 4,
  },
  infoMeta: {
    marginBottom: 10,
    fontFamily: font.medium,
    fontSize: 9.5,
    letterSpacing: 0.1,
    color: colors.muted,
  },
  infoIntro: {
    marginBottom: 16,
    fontFamily: font.regular,
    fontSize: 11.5,
    lineHeight: 18,
    color: '#3E4A5F',
  },
  infoSection: {
    marginBottom: 14,
  },
  infoSectionTitle: {
    marginBottom: 5,
    fontFamily: font.semibold,
    fontSize: 12,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  infoText: {
    fontFamily: font.regular,
    fontSize: 11,
    lineHeight: 17,
    color: '#61708A',
  },
  infoAction: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  infoActionText: {
    fontFamily: font.semibold,
    fontSize: 12,
    letterSpacing: 0.1,
    color: '#FFFFFF',
  },
  options: {
    marginTop: 6,
    gap: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 14,
  },
  optionActive: {
    borderColor: 'rgba(16, 94, 243, 0.28)',
    backgroundColor: '#EFF5FF',
  },
  optionLabel: {
    fontFamily: font.medium,
    fontSize: 13,
    color: colors.ink,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkActive: {
    backgroundColor: colors.blue,
  },
  checkMark: {
    fontFamily: font.bold,
    fontSize: 11,
    color: '#FFFFFF',
  },
})
