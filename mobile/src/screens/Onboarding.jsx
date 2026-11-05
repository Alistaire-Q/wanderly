import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { onboardingImage } from '../theme/images'
import { font } from '../theme'
import { usePreferences } from '../i18n/context'

export default function Onboarding({ onNext }) {
  const insets = useSafeAreaInsets()
  const { t } = usePreferences()

  return (
    <View style={styles.screen}>
      <View style={styles.imageWrapper}>
        <Image source={onboardingImage} style={styles.image} resizeMode="cover" />
      </View>

      <LinearGradient
        colors={['#0072FF', '#0058CC']}
        style={[
          styles.card,
          { paddingBottom: 32 + insets.bottom, height: '46%' },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{t('Plan Your Trip')}</Text>
          <Text style={styles.description}>
            {t(
              'Create your dream trip with ease. Choose a destination, find the perfect place to stay, and create an itinerary that suits your preferences.',
            )}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onNext}
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ translateY: 1 }], opacity: 0.94 },
          ]}
        >
          <Text style={styles.buttonText}>{t('Next')}</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0062FF',
  },
  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.02 }],
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -8 },
    elevation: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: font.bold,
    fontSize: 35,
    lineHeight: 42,
    letterSpacing: -0.3,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
  },
  description: {
    maxWidth: 340,
    fontFamily: font.regular,
    fontSize: 16,
    lineHeight: 26,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 340,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    fontFamily: font.bold,
    fontSize: 14,
    letterSpacing: 0.2,
    color: '#0062FF',
  },
})
