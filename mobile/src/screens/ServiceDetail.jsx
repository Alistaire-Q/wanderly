import { useState } from 'react'
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Close,
  featureIcons,
  Flame,
  Pin,
  Star,
  TicketIcon,
} from '../components/icons'
import { getService } from '../data/services'
import { imageSource } from '../theme/images'
import { colors, font } from '../theme'
import { parseIDR } from '../i18n/currency'
import { usePreferences } from '../i18n/context'

const wrapIndex = (index, delta, total) => (index + delta + total) % total

export default function ServiceDetail({ serviceId, onBack, onBook }) {
  const insets = useSafeAreaInsets()
  const { t, formatIDR, serviceText } = usePreferences()
  const service = getService(serviceId)
  const { review } = service
  const [viewerIndex, setViewerIndex] = useState(null)

  const gallery = service.gallery ?? []

  const stepViewer = (delta) => {
    setViewerIndex((current) =>
      current === null ? current : wrapIndex(current, delta, gallery.length),
    )
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 108 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Image
            source={imageSource(service.hero ?? service.image)}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to list of services"
            onPress={onBack}
            style={({ pressed }) => [
              styles.back,
              { top: insets.top + 12 },
              pressed && { backgroundColor: 'rgba(12,18,30,0.65)' },
            ]}
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.sheet}>
          <View style={styles.locationRow}>
            <Pin size={13} color={colors.blue} />
            <Text style={styles.location}>{service.location}</Text>
          </View>

          <Text style={styles.title}>{service.name}</Text>

          <View style={styles.ratingRow}>
            <Star size={15} color={colors.gold} />
            <Text style={styles.ratingValue}>{service.rating}</Text>
            <Text style={styles.ratingCount}>
              {t('({count} reviews)', { count: service.reviews })}
            </Text>
          </View>

          <Text style={styles.desc}>{serviceText(service, 'longDescription')}</Text>

          <View style={styles.gallery}>
            {gallery.map((photo, index) => (
              <Pressable
                key={photo}
                accessibilityRole="button"
                accessibilityLabel={`View photo ${index + 1} of ${gallery.length}`}
                onPress={() => setViewerIndex(index)}
                style={{ flex: 1 }}
              >
                <Image
                  source={imageSource(photo)}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </View>

          <Text style={styles.subtitle}>{t("Why you'll love it:")}</Text>

          <View style={styles.features}>
            {service.features.map((feature) => {
              const Icon = featureIcons[feature.icon] ?? Flame
              return (
                <View key={feature.label} style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <Icon size={18} color={colors.blue} />
                  </View>
                  <Text style={styles.featureLabel}>{t(feature.label)}</Text>
                  <Text style={styles.featureSub}>{t(feature.sublabel)}</Text>
                </View>
              )
            })}
          </View>

          <View style={styles.review}>
            <View style={styles.reviewTop}>
              <View style={styles.reviewAvatar}>
                <Text style={styles.reviewInitials}>{review.initials}</Text>
              </View>
              <Text numberOfLines={1} style={styles.reviewName}>
                {review.name}
              </Text>
              <View style={styles.reviewStars}>
                <Star size={11} color={colors.gold} />
                <Text style={styles.reviewRating}>{review.rating}</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bookingBar,
          { paddingBottom: 20 + insets.bottom },
        ]}
      >
        <View style={styles.booking}>
          <View>
            <Text style={styles.priceLabel}>{t('From:')}</Text>
            <Text style={styles.priceValue}>
              {formatIDR(parseIDR(service.price))}
              <Text style={styles.priceUnit}> {t('/person')}</Text>
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onBook}
            style={({ pressed }) => [
              styles.bookBtn,
              pressed && { backgroundColor: '#0D4FD6' },
            ]}
          >
            <TicketIcon size={14} color="#FFFFFF" />
            <Text style={styles.bookText}>{t('Book Now')}</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={viewerIndex !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setViewerIndex(null)}
      >
        <View style={styles.viewer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close photo"
            style={StyleSheet.absoluteFill}
            onPress={() => setViewerIndex(null)}
          />

          {viewerIndex !== null ? (
            <Image
              source={imageSource(gallery[viewerIndex])}
              style={styles.viewerImage}
              resizeMode="contain"
            />
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close photo"
            onPress={() => setViewerIndex(null)}
            style={[styles.viewerClose, { top: insets.top + 18 }]}
          >
            <Close size={18} color="#FFFFFF" />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous photo"
            onPress={() => stepViewer(-1)}
            style={[styles.viewerNav, { left: 10 }]}
          >
            <ChevronLeft size={18} color="#FFFFFF" />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next photo"
            onPress={() => stepViewer(1)}
            style={[styles.viewerNav, { right: 10 }]}
          >
            <ChevronRight size={18} color="#FFFFFF" />
          </Pressable>

          {viewerIndex !== null ? (
            <View style={[styles.viewerCounter, { bottom: 26 + insets.bottom }]}>
              <Text style={styles.viewerCounterText}>
                {viewerIndex + 1} / {gallery.length}
              </Text>
            </View>
          ) : null}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    height: 250,
    backgroundColor: '#0D1220',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  back: {
    position: 'absolute',
    left: 18,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(12,18,30,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    marginTop: -22,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 4,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#FFFFFF',
    shadowColor: '#0D1220',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -10 },
    elevation: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  location: {
    fontFamily: font.regular,
    fontSize: 11,
    color: '#6B7280',
  },
  title: {
    marginTop: 8,
    fontFamily: font.semibold,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.4,
    color: colors.navy,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  ratingValue: {
    fontFamily: font.bold,
    fontSize: 14,
    color: colors.navy,
  },
  ratingCount: {
    fontFamily: font.regular,
    fontSize: 10,
    color: '#8B93A1',
  },
  desc: {
    marginTop: 12,
    fontFamily: font.regular,
    fontSize: 11,
    lineHeight: 19,
    color: '#4B5563',
  },
  gallery: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  galleryImage: {
    width: '100%',
    height: 60,
    borderRadius: 9,
    backgroundColor: '#EEF3FD',
  },
  subtitle: {
    marginTop: 22,
    fontFamily: font.semibold,
    fontSize: 15,
    letterSpacing: -0.2,
    color: colors.navy,
  },
  features: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  feature: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDEAFE',
  },
  featureLabel: {
    fontFamily: font.semibold,
    fontSize: 10.5,
    lineHeight: 13,
    textAlign: 'center',
    color: colors.navy,
  },
  featureSub: {
    fontFamily: font.regular,
    fontSize: 8.5,
    lineHeight: 11,
    textAlign: 'center',
    color: '#8B93A1',
  },
  review: {
    marginTop: 20,
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBE7FF',
  },
  reviewInitials: {
    fontFamily: font.bold,
    fontSize: 9,
    color: colors.blue,
  },
  reviewName: {
    flex: 1,
    fontFamily: font.medium,
    fontSize: 9.5,
    color: colors.navy,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  reviewRating: {
    fontFamily: font.bold,
    fontSize: 9.5,
    color: colors.gold,
  },
  reviewText: {
    marginTop: 9,
    fontFamily: font.regular,
    fontSize: 8.5,
    lineHeight: 14,
    color: '#000000',
  },
  bookingBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  booking: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 94, 243, 0.17)',
  },
  priceLabel: {
    fontFamily: font.regular,
    fontSize: 9,
    color: '#7B8496',
  },
  priceValue: {
    marginTop: 1,
    fontFamily: font.bold,
    fontSize: 16,
    letterSpacing: -0.3,
    color: colors.navy,
  },
  priceUnit: {
    fontFamily: font.regular,
    fontSize: 9,
    color: '#7B8496',
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: colors.blueDeep,
  },
  bookText: {
    fontFamily: font.medium,
    fontSize: 11,
    color: '#FFFFFF',
  },
  viewer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(4,8,18,0.9)',
  },
  viewerImage: {
    width: '100%',
    height: '68%',
    borderRadius: 12,
  },
  viewerClose: {
    position: 'absolute',
    right: 18,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewerNav: {
    position: 'absolute',
    top: '50%',
    marginTop: -17,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewerCounter: {
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  viewerCounterText: {
    fontFamily: font.medium,
    fontSize: 11,
    letterSpacing: 0.2,
    color: '#FFFFFF',
  },
})
