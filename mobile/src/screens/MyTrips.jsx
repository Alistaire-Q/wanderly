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
import { BottomNav } from '../components/ui'
import { Close, Plane, TicketIcon } from '../components/icons'
import { getCabin, tripTotal } from '../data/cabins'
import { imageSource } from '../theme/images'
import { colors, font, shadow } from '../theme'
import { usePreferences } from '../i18n/context'

/* A short, stable booking code for the e-ticket. */
function bookingCode(key) {
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) % 46656
  }
  return `WL-${hash.toString(36).toUpperCase().padStart(3, '0')}`
}

function Path({ width = 74, background = '#FFFFFF' }) {
  return (
    <View style={{ width, height: 18, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 9,
          height: 1,
          backgroundColor: '#C9D0DC',
        }}
      />
      <View style={{ backgroundColor: background, paddingHorizontal: 5 }}>
        <View style={{ transform: [{ rotate: '90deg' }] }}>
          <Plane size={16} color={colors.blueDeep} />
        </View>
      </View>
    </View>
  )
}

export default function MyTrips({ trip, onCancel, onGoHome, onSelectTab }) {
  const insets = useSafeAreaInsets()
  const { t, formatUSD } = usePreferences()
  const [showTicket, setShowTicket] = useState(false)

  const cabin = trip ? getCabin(trip.cabinId) : getCabin()
  const total = trip
    ? tripTotal(trip.flight.fare, trip.cabinId, trip.passengers)
    : 0
  const code = trip ? bookingCode(trip.key) : ''

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <Text style={styles.title}>{t('My Trips')}</Text>
        <Text style={styles.subtitle}>
          {trip ? t('Your upcoming flight') : t('All your flights in one place')}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          !trip && { flexGrow: 1, justifyContent: 'center' },
          { paddingBottom: 116 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {trip ? (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.badge}>
                {trip.flight.airlineLogo ? (
                  <Image
                    source={imageSource(trip.flight.airlineLogo)}
                    style={styles.badgeLogo}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.badgeText}>{trip.flight.airlineCode}</Text>
                )}
              </View>
              <Text numberOfLines={1} style={styles.airline}>
                {trip.flight.airline}
              </Text>
              <View style={styles.status}>
                <Text style={styles.statusText}>{t('Confirmed')}</Text>
              </View>
            </View>

            <View style={styles.route}>
              <View style={styles.stop}>
                <Text style={styles.code}>{trip.flight.from}</Text>
                <Text numberOfLines={1} style={styles.city}>{trip.fromCity}</Text>
                <Text style={styles.time}>{trip.flight.depart}</Text>
              </View>

              <Path />

              <View style={[styles.stop, { alignItems: 'flex-end' }]}>
                <Text style={styles.code}>{trip.flight.to}</Text>
                <Text numberOfLines={1} style={[styles.city, { textAlign: 'right' }]}>
                  {trip.toCity}
                </Text>
                <Text style={styles.time}>{trip.flight.arrive}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.meta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>{t('Date')}</Text>
                <Text style={styles.metaValue}>
                  {t(trip.date.day)}, {t(trip.date.label)}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>{t('Passenger')}</Text>
                <Text style={styles.metaValue}>
                  {t(
                    trip.passengers > 1 ? '{count} Passengers' : '{count} Passenger',
                    { count: trip.passengers },
                  )}
                </Text>
                <Text style={styles.metaSub}>
                  {t(cabin.name)} ×{cabin.multiplier.toFixed(1)}
                </Text>
              </View>
              <View style={[styles.metaItem, { alignItems: 'flex-end' }]}>
                <Text style={styles.metaLabel}>{t('Total')}</Text>
                <Text style={[styles.metaValue, styles.total]}>{formatUSD(total)}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowTicket(true)}
                style={({ pressed }) => [
                  styles.view,
                  pressed && { backgroundColor: '#0D51D6' },
                ]}
              >
                <Text style={styles.viewText}>{t('View Ticket')}</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={onCancel}
                style={({ pressed }) => [
                  styles.cancel,
                  pressed && { borderColor: '#F0A2A2' },
                ]}
              >
                <Text style={styles.cancelText}>{t('Cancel')}</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <TicketIcon size={60} color={colors.blueDeep} />
            </View>
            <Text style={styles.emptyTitle}>{t('No Trips Yet')}</Text>
            <Text style={styles.emptyText}>
              {t(
                "You haven't booked a flight yet. Pick a destination to get started.",
              )}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={onGoHome}
              style={({ pressed }) => [
                styles.explore,
                pressed && { backgroundColor: '#0D51D6' },
              ]}
            >
              <Text style={styles.exploreText}>{t('Explore destinations')}</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showTicket && Boolean(trip)}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowTicket(false)}
      >
        <View style={styles.modal}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close e-ticket"
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(23,35,60,0.45)' }]}
            onPress={() => setShowTicket(false)}
          />

          {trip ? (
            <View style={[styles.sheet, { paddingBottom: 26 + insets.bottom }]}>
              <View style={styles.grabber} />

              <View style={styles.sheetHead}>
                <Text style={styles.sheetTitle}>{t('E-Ticket')}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  onPress={() => setShowTicket(false)}
                  style={styles.sheetClose}
                >
                  <Close size={16} color={colors.ink} />
                </Pressable>
              </View>

              <Text style={styles.ref}>
                {t('Booking code')} <Text style={styles.refStrong}>{code}</Text>
              </Text>

              <View style={styles.sheetRoute}>
                <View style={styles.stop}>
                  <Text style={styles.sheetCode}>{trip.flight.from}</Text>
                  <Text numberOfLines={1} style={styles.sheetCity}>
                    {trip.fromCity}
                  </Text>
                  <Text style={styles.sheetTime}>{trip.flight.depart}</Text>
                </View>
                <Path width={62} background="#EEF3FD" />
                <View style={[styles.stop, { alignItems: 'flex-end' }]}>
                  <Text style={styles.sheetCode}>{trip.flight.to}</Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.sheetCity, { textAlign: 'right' }]}
                  >
                    {trip.toCity}
                  </Text>
                  <Text style={styles.sheetTime}>{trip.flight.arrive}</Text>
                </View>
              </View>

              <View style={styles.details}>
                {[
                  [t('Destination'), trip.serviceName],
                  [t('Airline'), trip.flight.airline, trip.flight.airlineLogo],
                  [t('Date'), `${t(trip.date.day)}, ${t(trip.date.label)}`],
                  [t('Class'), `${t(cabin.name)} ×${cabin.multiplier.toFixed(1)}`],
                  [
                    t('Passenger'),
                    t(
                      trip.passengers > 1
                        ? '{count} Passengers'
                        : '{count} Passenger',
                      { count: trip.passengers },
                    ),
                  ],
                ].map(([label, value, logo]) => (
                  <View key={label} style={styles.detail}>
                    <Text style={styles.detailLabel}>{label}</Text>
                    {logo ? (
                      <View style={styles.detailAirline}>
                        <View style={styles.detailLogoBox}>
                          <Image
                            source={imageSource(logo)}
                            style={styles.detailLogo}
                            resizeMode="contain"
                          />
                        </View>
                        <Text style={[styles.detailValue, styles.detailAirlineName]}>
                          {value}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.detailValue}>{value}</Text>
                    )}
                  </View>
                ))}
                <View style={styles.detail}>
                  <Text style={styles.detailLabel}>{t('Total paid')}</Text>
                  <Text style={[styles.detailValue, { color: colors.blueDeep }]}>
                    {formatUSD(total)}
                  </Text>
                </View>
              </View>

              <View style={styles.barcode}>
                {Array.from({ length: 44 }).map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: index % 3 === 0 ? 2 : 1,
                      height: '100%',
                      marginRight: index % 4 === 0 ? 3 : 2,
                      backgroundColor: index % 5 === 0 ? 'transparent' : '#17233C',
                      opacity: 0.78,
                    }}
                  />
                ))}
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={() => setShowTicket(false)}
                style={({ pressed }) => [
                  styles.view,
                  { width: '100%', marginTop: 18 },
                  pressed && { backgroundColor: '#0D51D6' },
                ]}
              >
                <Text style={styles.viewText}>{t('Done')}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </Modal>

      <BottomNav active="trips" accent={colors.blueDeep} onSelect={onSelectTab} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 22,
    paddingBottom: 18,
    backgroundColor: 'rgba(214, 227, 250, 0.97)',
  },
  title: {
    fontFamily: font.semibold,
    fontSize: 20,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: font.regular,
    fontSize: 11,
    color: '#5C6880',
  },
  scroll: {
    paddingTop: 20,
    paddingHorizontal: 22,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    ...shadow.float,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    width: 42,
    height: 42,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E4E8F0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badgeLogo: {
    width: '100%',
    height: '100%',
  },
  badgeText: {
    fontFamily: font.bold,
    fontSize: 9,
    letterSpacing: 0.2,
    color: colors.ink,
  },
  airline: {
    flex: 1,
    fontFamily: font.semibold,
    fontSize: 12.5,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 999,
    backgroundColor: 'rgba(16, 94, 243, 0.1)',
  },
  statusText: {
    fontFamily: font.semibold,
    fontSize: 9,
    letterSpacing: 0.1,
    color: colors.blueDeep,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  stop: {
    flex: 1,
    gap: 1,
  },
  code: {
    fontFamily: font.bold,
    fontSize: 20,
    letterSpacing: -0.4,
    color: colors.ink,
  },
  city: {
    fontFamily: font.regular,
    fontSize: 9.5,
    color: colors.muted,
  },
  time: {
    marginTop: 2,
    fontFamily: font.semibold,
    fontSize: 11,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  divider: {
    marginVertical: 16,
    marginHorizontal: -16,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9DDE5',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  metaItem: {
    flexShrink: 1,
    gap: 2,
  },
  metaLabel: {
    fontFamily: font.regular,
    fontSize: 8.5,
    color: colors.muted,
  },
  metaValue: {
    fontFamily: font.semibold,
    fontSize: 10.5,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  metaSub: {
    fontFamily: font.medium,
    fontSize: 8.5,
    color: colors.blueDeep,
  },
  total: {
    fontSize: 13,
    color: colors.blueDeep,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  view: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.blueDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: 0.1,
    color: '#FFFFFF',
  },
  cancel: {
    width: 96,
    height: 40,
    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    color: colors.ink,
  },
  empty: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  emptyIcon: {
    width: 118,
    height: 118,
    borderRadius: 59,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(214, 227, 250, 0.97)',
  },
  emptyTitle: {
    marginTop: 24,
    fontFamily: font.semibold,
    fontSize: 19,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  emptyText: {
    maxWidth: 252,
    marginTop: 8,
    fontFamily: font.regular,
    fontSize: 11.5,
    lineHeight: 18,
    textAlign: 'center',
    color: colors.muted,
  },
  explore: {
    marginTop: 22,
    height: 46,
    paddingHorizontal: 26,
    borderRadius: 14,
    backgroundColor: colors.blueDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreText: {
    fontFamily: font.semibold,
    fontSize: 12,
    letterSpacing: 0.1,
    color: '#FFFFFF',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    paddingTop: 10,
    paddingHorizontal: 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#17233C',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -8 },
    elevation: 12,
  },
  grabber: {
    width: 36,
    height: 4,
    marginBottom: 14,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#E7EBF2',
  },
  sheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sheetTitle: {
    fontFamily: font.semibold,
    fontSize: 16,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  sheetClose: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F5FA',
  },
  ref: {
    marginTop: 10,
    fontFamily: font.regular,
    fontSize: 10,
    color: colors.muted,
  },
  refStrong: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: 0.4,
    color: colors.ink,
  },
  sheetRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(214, 227, 250, 0.55)',
  },
  sheetCode: {
    fontFamily: font.bold,
    fontSize: 22,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  sheetCity: {
    fontFamily: font.regular,
    fontSize: 9.5,
    color: '#5C6880',
  },
  sheetTime: {
    marginTop: 2,
    fontFamily: font.semibold,
    fontSize: 11,
    color: colors.ink,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    rowGap: 14,
  },
  detail: {
    width: '50%',
    paddingRight: 6,
  },
  detailLabel: {
    fontFamily: font.regular,
    fontSize: 8.5,
    color: colors.muted,
  },
  detailValue: {
    marginTop: 2,
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  detailAirline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 2,
  },
  detailLogoBox: {
    width: 30,
    height: 30,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E4E8F0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  detailLogo: {
    width: '100%',
    height: '100%',
  },
  detailAirlineName: {
    marginTop: 0,
  },
  barcode: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 26,
    marginTop: 20,
    overflow: 'hidden',
  },
})
