import { useState } from 'react'
import {
  Image,
  ImageBackground,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomNav } from '../components/ui'
import { Gear, Pin, Search, Star, tagIcons, Nature } from '../components/icons'
import { homePopular, homeRecommended } from '../data/services'
import { imageSource } from '../theme/images'
import { colors, font, shadow } from '../theme'
import { usePreferences } from '../i18n/context'

/* Small cards label a beach with its island: "Nusa Penida, Bali". */
const nameWithRegion = (item) => `${item.name}, ${item.location.split(', ').pop()}`

export default function Home({
  onNavigate,
  onOpenDetail,
  onOpenProfile,
  onOpenTrips,
}) {
  const insets = useSafeAreaInsets()
  const { t, serviceText } = usePreferences()
  const [term, setTerm] = useState('')
  const [openId, setOpenId] = useState(null)

  const handleSearch = () => {
    onNavigate('services', term)
  }

  const toggleRecommended = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.locationLabel}>{t('Your location')}</Text>
            <Text style={styles.locationCity}>Denpasar, Bali</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Settings"
            onPress={onOpenProfile}
            style={({ pressed }) => [
              styles.settings,
              pressed && { backgroundColor: 'rgba(255,255,255,0.16)' },
            ]}
          >
            <Gear size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.search}>
          <TextInput
            testID="home-search-input"
            value={term}
            onChangeText={setTerm}
            placeholder={t('Search destination')}
            placeholderTextColor="#AAB3C0"
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search"
            onPress={handleSearch}
            style={({ pressed }) => [
              styles.searchBtn,
              pressed && { backgroundColor: '#F5F8FF' },
            ]}
          >
            <Search size={18} color={colors.blue} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('Popular nearby:')}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularRow}
          >
            {homePopular.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={`${nameWithRegion(item)}, rating ${item.rating}`}
                onPress={() => onOpenDetail(item.id)}
                style={({ pressed }) => [
                  styles.popularCard,
                  pressed && { opacity: 0.9 },
                ]}
              >
                <ImageBackground
                  source={imageSource(item.image)}
                  style={styles.popularImage}
                  imageStyle={{ borderRadius: 16 }}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.42)']}
                    style={styles.popularOverlay}
                  >
                    <View style={styles.popularNamePill}>
                      <Text numberOfLines={1} style={styles.popularName}>
                        {nameWithRegion(item)}
                      </Text>
                    </View>
                    <View style={styles.popularRating}>
                      <Star size={12} color="#FFFFFF" />
                      <Text style={styles.popularRatingText}>{item.rating}</Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('Recommended:')}</Text>

          <View style={styles.recList}>
            {homeRecommended.map((item) => {
              const isOpen = item.id === openId
              return (
                <View
                  key={item.id}
                  style={[styles.recCard, isOpen && styles.recCardOpen]}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isOpen }}
                    onPress={() => toggleRecommended(item.id)}
                    style={styles.recMain}
                  >
                    <Image
                      source={imageSource(item.image)}
                      style={[
                        styles.recImage,
                        isOpen && { width: 62, height: 62, borderRadius: 10 },
                      ]}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.recName,
                          isOpen && { color: '#FFFFFF', fontSize: 15 },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <View
                        style={[
                          styles.recChip,
                          isOpen && {
                            borderColor: 'transparent',
                            backgroundColor: '#FFFFFF',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.recChipText,
                            isOpen && { color: '#17223B' },
                          ]}
                        >
                          {t(item.category)}
                        </Text>
                      </View>
                      <View style={styles.recBottom}>
                        <View style={styles.recLocation}>
                          <Pin
                            size={12}
                            color={isOpen ? 'rgba(255,255,255,0.95)' : '#6B7280'}
                          />
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.recLocationText,
                              isOpen && {
                                color: 'rgba(255,255,255,0.95)',
                                fontSize: 10,
                              },
                            ]}
                          >
                            {item.location}
                          </Text>
                        </View>
                        <View style={styles.recRating}>
                          <Star size={13} color={isOpen ? '#FFC94D' : colors.gold} />
                          <Text
                            style={[
                              styles.recRatingText,
                              isOpen && { color: '#FFC94D' },
                            ]}
                          >
                            {item.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>

                  {isOpen ? (
                    <View style={styles.recSheet}>
                      <Text style={styles.recDesc}>{serviceText(item, 'description')}</Text>

                      <View style={styles.recTags}>
                        {item.tags.map((tag) => {
                          const Icon = tagIcons[tag] ?? Nature
                          return (
                            <View key={tag} style={styles.recTag}>
                              <Icon size={12} color="#17223B" />
                              <Text style={styles.recTagText}>{t(tag)}</Text>
                            </View>
                          )
                        })}
                      </View>

                      <Pressable
                        accessibilityRole="button"
                        onPress={() => onOpenDetail(item.id)}
                        style={({ pressed }) => [
                          styles.recCta,
                          pressed && { backgroundColor: 'rgba(255,255,255,0.16)' },
                        ]}
                      >
                        <Text style={styles.recCtaText}>{t('View Details')}</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>

      <BottomNav
        active="home"
        onSelect={(tab) => {
          if (tab === 'profile') onOpenProfile?.()
          if (tab === 'trips') onOpenTrips?.()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: colors.blue,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 22,
    paddingBottom: 50,
    gap: 18,
    zIndex: 2,
    shadowColor: colors.blue,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  locationLabel: {
    fontFamily: font.regular,
    fontSize: 13,
    letterSpacing: 0.2,
    color: 'rgba(255,255,255,0.92)',
  },
  locationCity: {
    marginTop: 3,
    fontFamily: font.medium,
    fontSize: 26,
    lineHeight: 31,
    letterSpacing: -0.2,
    color: '#FFFFFF',
  },
  settings: {
    width: 38,
    height: 38,
    marginTop: 1,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
    paddingLeft: 18,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    shadowColor: '#08265A',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 0,
    fontFamily: font.regular,
    fontSize: 14,
    color: colors.navy,
  },
  searchBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    paddingHorizontal: 22,
    marginBottom: 14,
    fontFamily: font.bold,
    fontSize: 17,
    letterSpacing: -0.2,
    color: colors.navy,
  },
  popularRow: {
    paddingHorizontal: 22,
    paddingBottom: 6,
    gap: 14,
  },
  popularCard: {
    width: 164,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#EEF2F7',
    overflow: 'hidden',
    ...shadow.card,
  },
  popularImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  popularOverlay: {
    padding: 10,
    gap: 7,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  popularNamePill: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(17, 24, 39, 0.55)',
  },
  popularName: {
    fontFamily: font.medium,
    fontSize: 11,
    color: '#FFFFFF',
  },
  popularRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 3,
  },
  popularRatingText: {
    fontFamily: font.semibold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  recList: {
    paddingHorizontal: 22,
    gap: 12,
  },
  recCard: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  recCardOpen: {
    padding: 12,
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.28,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  recMain: {
    flexDirection: 'row',
    gap: 12,
  },
  recImage: {
    width: 58,
    height: 58,
    borderRadius: 9,
    backgroundColor: '#EEF2F7',
  },
  recName: {
    fontFamily: font.bold,
    fontSize: 13.5,
    lineHeight: 17,
    color: '#1E1E1E',
  },
  recChip: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E4E8EE',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  recChipText: {
    fontFamily: font.medium,
    fontSize: 9,
    lineHeight: 15,
    color: '#4B5563',
  },
  recBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  recLocation: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recLocationText: {
    flexShrink: 1,
    fontFamily: font.regular,
    fontSize: 9.5,
    color: '#6B7280',
  },
  recRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  recRatingText: {
    fontFamily: font.bold,
    fontSize: 11,
    color: colors.gold,
  },
  recSheet: {
    marginTop: 12,
  },
  recDesc: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    fontFamily: font.regular,
    fontSize: 10.5,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.95)',
  },
  recTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  recTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  recTagText: {
    fontFamily: font.medium,
    fontSize: 9,
    color: '#17223B',
  },
  recCta: {
    width: '100%',
    height: 32,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recCtaText: {
    fontFamily: font.medium,
    fontSize: 10,
    letterSpacing: 0.3,
    color: '#FFFFFF',
  },
})
