import { useState } from 'react'
import {
  Image,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomNav } from '../components/ui'
import {
  ArrowLeft,
  filterIcons,
  Nature,
  Pin,
  Search,
  Star,
  tagIcons,
} from '../components/icons'
import { listedServices, serviceFilters } from '../data/services'
import { imageSource } from '../theme/images'
import { colors, font } from '../theme'
import { usePreferences } from '../i18n/context'

export default function Services({
  query,
  onSearch,
  onBack,
  onOpenDetail,
  onOpenProfile,
  onOpenTrips,
}) {
  const insets = useSafeAreaInsets()
  const { t, serviceText } = usePreferences()
  const [term, setTerm] = useState(query ?? '')
  const [activeFilters, setActiveFilters] = useState(() => [serviceFilters[0]])
  const [openId, setOpenId] = useState(null)

  const handleSubmit = () => {
    onSearch(term)
  }

  // Filters are multi-select: tapping a chip toggles it on or off.
  const toggleFilter = (filter) => {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    )
  }

  const toggleCard = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.topbar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to home"
            hitSlop={6}
            onPress={onBack}
            style={({ pressed }) => [
              styles.back,
              pressed && { backgroundColor: '#E4E6EA' },
            ]}
          >
            <ArrowLeft size={22} color={colors.navy} />
          </Pressable>
          <Text style={styles.title}>{t('List of Services')}</Text>
        </View>

        <View style={styles.search}>
          <TextInput
            testID="services-search-input"
            value={term}
            onChangeText={setTerm}
            placeholder={t('Search destination')}
            placeholderTextColor="#AAB3C0"
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSubmit}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search"
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.searchBtn,
              pressed && { backgroundColor: '#F1F5FF' },
            ]}
          >
            <Search size={18} color={colors.blue} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {serviceFilters.map((filter) => {
            const isActive = activeFilters.includes(filter)
            const Icon = filterIcons[filter]
            return (
              <Pressable
                key={filter}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                onPress={() => toggleFilter(filter)}
                style={({ pressed }) => [
                  styles.chip,
                  isActive && { backgroundColor: colors.blue },
                  pressed && { opacity: 0.85 },
                ]}
              >
                {isActive && Icon ? <Icon size={12} color="#FFFFFF" /> : null}
                <Text
                  style={[
                    styles.chipText,
                    isActive && { color: '#FFFFFF' },
                  ]}
                >
                  {t(filter)}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 18, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>{t('Relevant to your search:')}</Text>

        <View style={styles.list}>
          {listedServices.map((item) => {
            const isOpen = item.id === openId
            return (
              <View
                key={item.id}
                style={[styles.card, isOpen && styles.cardOpen]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  onPress={() => toggleCard(item.id)}
                  style={styles.cardMain}
                >
                  <Image
                    source={imageSource(item.image)}
                    style={[
                      styles.cardImage,
                      isOpen && { width: 62, height: 62, borderRadius: 10 },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.cardName,
                        isOpen && { color: '#FFFFFF', fontSize: 15 },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={[
                        styles.cardChip,
                        isOpen && {
                          borderColor: 'transparent',
                          backgroundColor: '#FFFFFF',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.cardChipText,
                          isOpen && { color: '#17223B' },
                        ]}
                      >
                        {t(item.category)}
                      </Text>
                    </View>
                    <View style={styles.cardBottom}>
                      <View style={styles.cardLocation}>
                        <Pin
                          size={12}
                          color={isOpen ? 'rgba(255,255,255,0.95)' : '#6B7280'}
                        />
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cardLocationText,
                            isOpen && {
                              color: 'rgba(255,255,255,0.95)',
                              fontSize: 10,
                            },
                          ]}
                        >
                          {item.location}
                        </Text>
                      </View>
                      <View style={styles.cardRating}>
                        <Star size={13} color={isOpen ? '#FFC94D' : colors.gold} />
                        <Text
                          style={[
                            styles.cardRatingText,
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
                  <View style={styles.sheet}>
                    <Text style={styles.desc}>{serviceText(item, 'description')}</Text>

                    <View style={styles.tags}>
                      {item.tags.map((tag) => {
                        const Icon = tagIcons[tag] ?? Nature
                        return (
                          <View key={tag} style={styles.tag}>
                            <Icon size={12} color="#17223B" />
                            <Text style={styles.tagText}>{t(tag)}</Text>
                          </View>
                        )
                      })}
                    </View>

                    <Pressable
                      accessibilityRole="button"
                      onPress={() => onOpenDetail(item.id)}
                      style={({ pressed }) => [
                        styles.cta,
                        pressed && { backgroundColor: 'rgba(255,255,255,0.16)' },
                      ]}
                    >
                      <Text style={styles.ctaText}>{t('View Details')}</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            )
          })}
        </View>
      </ScrollView>

      <BottomNav
        active="services"
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
    backgroundColor: '#F2F3F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 0,
    gap: 14,
    backgroundColor: '#F2F3F5',
    zIndex: 2,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  back: {
    width: 30,
    height: 30,
    marginLeft: -5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: font.semibold,
    fontSize: 20,
    letterSpacing: -0.3,
    color: colors.navy,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 46,
    paddingLeft: 16,
    paddingRight: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E6',
    borderRadius: 12,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 30,
    paddingHorizontal: 13,
    borderRadius: 8,
    backgroundColor: '#E8E9ED',
  },
  chipText: {
    fontFamily: font.medium,
    fontSize: 11.5,
    color: '#2A2F3A',
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 12,
    fontFamily: font.semibold,
    fontSize: 15,
    letterSpacing: -0.2,
    color: colors.navy,
  },
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
  card: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardOpen: {
    padding: 12,
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.28,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  cardMain: {
    flexDirection: 'row',
    gap: 12,
  },
  cardImage: {
    width: 58,
    height: 58,
    borderRadius: 9,
    backgroundColor: '#EEF2F7',
  },
  cardName: {
    fontFamily: font.bold,
    fontSize: 13.5,
    lineHeight: 17,
    color: '#1E1E1E',
  },
  cardChip: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E4E8EE',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  cardChipText: {
    fontFamily: font.medium,
    fontSize: 9,
    lineHeight: 15,
    color: '#4B5563',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardLocation: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardLocationText: {
    flexShrink: 1,
    fontFamily: font.regular,
    fontSize: 9.5,
    color: '#6B7280',
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  cardRatingText: {
    fontFamily: font.bold,
    fontSize: 11,
    color: colors.gold,
  },
  sheet: {
    marginTop: 12,
  },
  desc: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    fontFamily: font.regular,
    fontSize: 10.5,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.95)',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  tagText: {
    fontFamily: font.medium,
    fontSize: 9,
    color: '#17223B',
  },
  cta: {
    width: '100%',
    height: 32,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: font.medium,
    fontSize: 10,
    letterSpacing: 0.3,
    color: '#FFFFFF',
  },
})
