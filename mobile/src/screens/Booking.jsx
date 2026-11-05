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
import { ChevronLeft, ChevronRight, Close, PlaneLanding } from '../components/icons'
import {
  bookingDates,
  bookingDefaultDate,
  getBooking,
} from '../data/flights'
import {
  CABINS,
  DEFAULT_CABIN_ID,
  MAX_PASSENGERS,
  MIN_PASSENGERS,
  getCabin,
  tripTotal,
} from '../data/cabins'
import { imageSource } from '../theme/images'
import { colors, font, shadow } from '../theme'
import { usePreferences } from '../i18n/context'

export default function Booking({
  serviceId,
  trip,
  onSelectTrip,
  onBack,
  onGoHome,
  onGoProfile,
  onGoTrips,
}) {
  const insets = useSafeAreaInsets()
  const { t, formatUSD } = usePreferences()
  const [dateId, setDateId] = useState(() => trip?.date?.id ?? bookingDefaultDate)
  const [passengers, setPassengers] = useState(() => trip?.passengers ?? 1)
  const [cabinId, setCabinId] = useState(() => trip?.cabinId ?? DEFAULT_CABIN_ID)
  const [showCabins, setShowCabins] = useState(false)
  const [pendingFlight, setPendingFlight] = useState(null)

  const { service, origin, destination, date, flights } = getBooking(
    serviceId,
    dateId,
  )
  const cabin = getCabin(cabinId)

  // Passengers and class live on the trip so My Trips and the
  // e-ticket always show the same numbers as this screen.
  const syncTrip = (patch) => {
    if (!trip || trip.serviceId !== service.id) return
    onSelectTrip?.({ ...trip, ...patch })
  }

  const changePassengers = (delta) => {
    const next = Math.min(
      MAX_PASSENGERS,
      Math.max(MIN_PASSENGERS, passengers + delta),
    )
    if (next === passengers) return
    setPassengers(next)
    syncTrip({ passengers: next })
  }

  const chooseCabin = (option) => {
    setCabinId(option.id)
    setShowCabins(false)
    syncTrip({ cabinId: option.id })
  }

  const handleNav = (tab) => {
    if (tab === 'home') onGoHome?.()
    if (tab === 'profile') onGoProfile?.()
    if (tab === 'trips') onGoTrips?.()
  }

  const selectFlight = (flight, isSelected) => {
    if (isSelected) {
      onSelectTrip?.(null)
      return
    }
    setPendingFlight(flight)
  }

  const confirmFlight = () => {
    if (!pendingFlight) return
    onSelectTrip?.({
      key: `${dateId}-${pendingFlight.id}`,
      serviceId: service.id,
      serviceName: service.name,
      fromCity: origin.city,
      toCity: destination.city,
      flight: pendingFlight,
      date,
      passengers,
      cabinId: cabin.id,
    })
    setPendingFlight(null)
    onGoTrips?.()
  }

  const cancelFlight = () => setPendingFlight(null)

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to service detail"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
        >
          <ChevronLeft size={20} color={colors.ink} />
        </Pressable>
        <Text style={styles.title}>{t('Flights')}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 116 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summary}>
          <View style={styles.summaryTop}>
            <View style={styles.planeBadge}>
              <PlaneLanding size={22} color={colors.blueDeep} />
            </View>

            <View style={{ flex: 1, paddingTop: 1 }}>
              <View style={styles.routeCities}>
                <Text style={styles.routeCityText}>{origin.city}</Text>
                <Text style={styles.routeArrow}>→</Text>
                <Text style={styles.routeCityText}>{destination.city}</Text>
              </View>
              <Text style={styles.routeMeta}>
                {t(date.label)} •{' '}
                {t(
                  passengers > 1 ? '{count} Passengers' : '{count} Passenger',
                  { count: passengers },
                )}
              </Text>
            </View>

            <View style={styles.stepper}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Remove passenger"
                testID="booking-passenger-minus"
                disabled={passengers <= MIN_PASSENGERS}
                onPress={() => changePassengers(-1)}
                style={({ pressed }) => [
                  styles.step,
                  passengers <= MIN_PASSENGERS && styles.stepDisabled,
                  pressed && { backgroundColor: '#EFF5FF' },
                ]}
              >
                <Text style={styles.stepText}>−</Text>
              </Pressable>
              <Text style={styles.stepValue} testID="booking-passenger-count">
                {passengers}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add passenger"
                testID="booking-passenger-plus"
                disabled={passengers >= MAX_PASSENGERS}
                onPress={() => changePassengers(1)}
                style={({ pressed }) => [
                  styles.step,
                  passengers >= MAX_PASSENGERS && styles.stepDisabled,
                  pressed && { backgroundColor: '#EFF5FF' },
                ]}
              >
                <Text style={styles.stepText}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.dates}>
            {bookingDates.map((option) => {
              const isActive = option.id === dateId
              return (
                <Pressable
                  key={option.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => setDateId(option.id)}
                  style={[
                    styles.date,
                    isActive && { backgroundColor: colors.blueDeep },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      isActive && { color: '#FFFFFF' },
                    ]}
                  >
                    {t(option.day)}
                  </Text>
                  <Text
                    style={[
                      styles.dateValue,
                      isActive && { color: '#FFFFFF' },
                    ]}
                  >
                    {t(option.date)}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.dateFare,
                      isActive && { color: '#FFFFFF' },
                    ]}
                  >
                    {formatUSD(
                      (option.fare + destination.fareDelta) * cabin.multiplier,
                    )}
                  </Text>
                </Pressable>
              )
            })}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Choose class"
            testID="booking-class"
            onPress={() => setShowCabins(true)}
            style={({ pressed }) => [
              styles.classRow,
              pressed && { backgroundColor: '#F5F8FF' },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.classLabel}>{t('Class')}</Text>
              <Text numberOfLines={1} style={styles.className}>
                {t(cabin.name)}
              </Text>
            </View>
            <View style={styles.classMeta}>
              <Text style={styles.classMult}>
                ×{cabin.multiplier.toFixed(1)}
              </Text>
              <ChevronRight size={16} color={colors.blueDeep} />
            </View>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>{t('Airlines:')}</Text>

        <View style={styles.list}>
          {flights.map((flight) => {
            const isSelected =
              trip?.key === `${dateId}-${flight.id}` &&
              trip?.serviceId === service.id
            return (
              <View
                key={flight.id}
                style={[styles.card, isSelected && styles.cardSelected]}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.cardHead}>
                    <View style={styles.logo}>
                      <Image
                        source={imageSource(flight.airlineLogo)}
                        style={styles.logoImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text numberOfLines={1} style={styles.airline}>
                      {flight.airline}
                    </Text>
                  </View>

                  <View style={styles.times}>
                    <Text style={styles.time}>{flight.depart}</Text>
                    <View style={styles.track}>
                      <View style={styles.trackLine} />
                      <View style={styles.trackArrow} />
                    </View>
                    <Text style={styles.time}>{flight.arrive}</Text>
                  </View>

                  <View style={styles.codes}>
                    <Text style={styles.code}>{flight.from}</Text>
                    <Text style={styles.code}>{flight.to}</Text>
                  </View>
                </View>

                <View style={styles.side}>
                  <Text numberOfLines={1} style={styles.cabin}>
                    {t(cabin.name)}
                  </Text>
                  <Text style={styles.fare}>
                    {formatUSD(tripTotal(flight.fare, cabin.id, passengers))}
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => selectFlight(flight, isSelected)}
                    style={({ pressed }) => [
                      styles.select,
                      pressed && { backgroundColor: '#0D51D6' },
                    ]}
                  >
                    <Text style={styles.selectText}>
                      {isSelected ? t('Selected') : t('Select')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>

      <Modal
        visible={showCabins}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowCabins(false)}
      >
        <View style={styles.modal}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(23,35,60,0.45)' }]}
            onPress={() => setShowCabins(false)}
          />

          <View style={[styles.sheet, { paddingBottom: 24 + insets.bottom }]}>
            <View style={styles.grabber} />

            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>{t('Choose class')}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={() => setShowCabins(false)}
                style={styles.sheetClose}
              >
                <Close size={16} color={colors.ink} />
              </Pressable>
            </View>

            <View style={styles.options}>
              {CABINS.map((option) => {
                const isActive = option.id === cabin.id
                return (
                  <Pressable
                    key={option.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    testID={`booking-cabin-${option.id}`}
                    onPress={() => chooseCabin(option)}
                    style={({ pressed }) => [
                      styles.option,
                      isActive && styles.optionActive,
                      pressed && { opacity: 0.75 },
                    ]}
                  >
                    <Text style={styles.optionLabel}>{t(option.name)}</Text>
                    <View style={styles.optionMeta}>
                      <Text
                        style={[
                          styles.optionMult,
                          isActive && { color: colors.blueDeep },
                        ]}
                      >
                        ×{option.multiplier.toFixed(1)}
                      </Text>
                      <View style={[styles.check, isActive && styles.checkActive]}>
                        {isActive ? <Text style={styles.checkMark}>✓</Text> : null}
                      </View>
                    </View>
                  </Pressable>
                )
              })}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={Boolean(pendingFlight)}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={cancelFlight}
      >
        <View style={styles.confirmOverlay}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={StyleSheet.absoluteFill}
            onPress={cancelFlight}
          />

          <View style={styles.confirmCard} testID="booking-confirm">
            <View style={styles.confirmBadge}>
              <PlaneLanding size={26} color={colors.blueDeep} />
            </View>
            <Text style={styles.confirmTitle}>{t('Book this flight?')}</Text>
            <Text style={styles.confirmText}>
              {t('Your ticket will be booked and you will be taken to My Trips.')}
            </Text>
            <View style={styles.confirmActions}>
              <Pressable
                accessibilityRole="button"
                testID="booking-confirm-no"
                onPress={cancelFlight}
                style={({ pressed }) => [
                  styles.confirmBtn,
                  styles.confirmGhost,
                  pressed && { backgroundColor: '#E4E9F2' },
                ]}
              >
                <Text style={styles.confirmGhostText}>{t('No')}</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                testID="booking-confirm-yes"
                onPress={confirmFlight}
                style={({ pressed }) => [
                  styles.confirmBtn,
                  styles.confirmPrimary,
                  pressed && { backgroundColor: '#0D51D6' },
                ]}
              >
                <Text style={styles.confirmPrimaryText}>{t('Yes')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav active="trips" accent={colors.blueDeep} onSelect={handleNav} />
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
    gap: 8,
    paddingHorizontal: 22,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  back: {
    width: 26,
    height: 26,
    marginLeft: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: font.semibold,
    fontSize: 20,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  summary: {
    marginHorizontal: 22,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 94, 243, 0.24)',
    borderRadius: 12,
    backgroundColor: '#DCE7FF',
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  planeBadge: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: colors.blueDeep,
    shadowOpacity: 0.12,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  routeCities: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeCityText: {
    fontFamily: font.semibold,
    fontSize: 13.5,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  routeArrow: {
    fontFamily: font.medium,
    fontSize: 13,
    color: colors.blueDeep,
  },
  routeMeta: {
    marginTop: 3,
    fontFamily: font.regular,
    fontSize: 9.5,
    color: '#5C6880',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
    padding: 2,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  step: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDisabled: {
    opacity: 0.45,
  },
  stepText: {
    fontFamily: font.semibold,
    fontSize: 15,
    lineHeight: 18,
    color: colors.blueDeep,
  },
  stepValue: {
    minWidth: 16,
    textAlign: 'center',
    fontFamily: font.bold,
    fontSize: 12,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  dates: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  date: {
    flex: 1,
    alignItems: 'center',
    gap: 1,
    paddingTop: 8,
    paddingBottom: 9,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  dateDay: {
    fontFamily: font.semibold,
    fontSize: 9.5,
    color: colors.ink,
  },
  dateValue: {
    fontFamily: font.regular,
    fontSize: 8.5,
    color: colors.muted,
  },
  dateFare: {
    marginTop: 3,
    fontFamily: font.bold,
    fontSize: 8.5,
    color: colors.blueDeep,
  },
  classRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  classLabel: {
    fontFamily: font.regular,
    fontSize: 8.5,
    color: colors.muted,
  },
  className: {
    marginTop: 1,
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  classMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  classMult: {
    fontFamily: font.bold,
    fontSize: 10,
    letterSpacing: 0.1,
    color: colors.blueDeep,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 22,
    fontFamily: font.semibold,
    fontSize: 15,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  list: {
    paddingHorizontal: 22,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    paddingTop: 11,
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    ...shadow.card,
  },
  cardSelected: {
    borderColor: colors.blueDeep,
    shadowColor: colors.blueDeep,
    shadowOpacity: 0.16,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
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
  logoImage: {
    width: '100%',
    height: '100%',
  },
  airline: {
    flex: 1,
    fontFamily: font.semibold,
    fontSize: 12.5,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  times: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  time: {
    fontFamily: font.bold,
    fontSize: 14,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  trackLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C9D0DC',
  },
  trackArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 3.5,
    borderBottomWidth: 3.5,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#C9D0DC',
  },
  codes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  code: {
    fontFamily: font.regular,
    fontSize: 8.5,
    letterSpacing: 0.3,
    color: colors.muted,
  },
  side: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cabin: {
    maxWidth: 104,
    fontFamily: font.regular,
    fontSize: 8.5,
    color: colors.muted,
  },
  fare: {
    marginTop: 4,
    fontFamily: font.bold,
    fontSize: 15,
    letterSpacing: -0.3,
    color: colors.blueDeep,
  },
  select: {
    width: 104,
    height: 22,
    marginTop: 5,
    borderRadius: 7,
    backgroundColor: colors.blueDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectText: {
    fontFamily: font.medium,
    fontSize: 9.5,
    letterSpacing: 0.2,
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
  optionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionMult: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    color: '#5C6880',
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
  confirmOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(23, 35, 60, 0.45)',
  },
  confirmCard: {
    width: '100%',
    maxWidth: 320,
    paddingTop: 24,
    paddingHorizontal: 22,
    paddingBottom: 20,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    ...shadow.float,
  },
  confirmBadge: {
    width: 52,
    height: 52,
    marginBottom: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF5FF',
  },
  confirmTitle: {
    fontFamily: font.semibold,
    fontSize: 16,
    letterSpacing: -0.2,
    lineHeight: 21,
    textAlign: 'center',
    color: colors.ink,
  },
  confirmText: {
    marginTop: 6,
    fontFamily: font.regular,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    color: '#5C6880',
  },
  confirmActions: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 10,
    marginTop: 20,
  },
  confirmBtn: {
    flex: 1,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmGhost: {
    backgroundColor: '#F0F3F9',
  },
  confirmGhostText: {
    fontFamily: font.semibold,
    fontSize: 12,
    color: colors.ink,
  },
  confirmPrimary: {
    backgroundColor: colors.blueDeep,
  },
  confirmPrimaryText: {
    fontFamily: font.semibold,
    fontSize: 12,
    color: '#FFFFFF',
  },
})
