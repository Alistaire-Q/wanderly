import { useState } from 'react'
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, font } from '../theme'
import { ChevronLeft, Heart, HomeIcon, TicketIcon, UserOutline } from './icons'

/* ---- Cloud header used by the auth screens ---- */

function CloudShape({ width, height, puffs, style }) {
  return (
    <View style={[{ width, height }, style]} pointerEvents="none">
      <View
        style={{
          position: 'absolute',
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: '#FFFFFF',
        }}
      />
      {puffs.map((puff, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            width: puff.size,
            height: puff.size,
            borderRadius: puff.size / 2,
            backgroundColor: '#FFFFFF',
            top: puff.top,
            left: puff.left,
          }}
        />
      ))}
    </View>
  )
}

/* The three clouds are positioned exactly like Login.css / Verify.css. */
export function Clouds({ height = 200, compact = false }) {
  const shift = compact ? 6 : 0
  return (
    <View style={{ height, overflow: 'hidden' }} pointerEvents="none">
      <CloudShape
        width={140}
        height={45}
        style={{ position: 'absolute', top: 60 - shift, left: 30 }}
        puffs={[
          { size: 65, top: -30, left: 25 },
          { size: 45, top: -15, left: 75 },
        ]}
      />
      <CloudShape
        width={110}
        height={40}
        style={{ position: 'absolute', top: 45 - shift, right: 30 }}
        puffs={[
          { size: 55, top: -25, left: 20 },
          { size: 35, top: -12, left: 60 },
        ]}
      />
      <CloudShape
        width={75}
        height={25}
        style={{
          position: 'absolute',
          top: (compact ? 112 : 120) - shift,
          left: '50%',
          marginLeft: -37.5,
        }}
        puffs={[
          { size: 35, top: -15, left: 15 },
          { size: 20, top: -8, left: 45 },
        ]}
      />
    </View>
  )
}

/* ---- Bottom tab bar (floating, shared by tabs) ---- */

export function BottomNav({ active = 'home', onSelect, accent = colors.blue }) {
  const insets = useSafeAreaInsets()
  const tabs = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'trips', label: 'My trips', Icon: TicketIcon },
    { id: 'profile', label: 'Profile', Icon: UserOutline },
  ]

  return (
    <View
      style={[styles.nav, { bottom: 20 + insets.bottom }]}
      pointerEvents="box-none"
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isActive }}
            onPress={onSelect ? () => onSelect(id) : undefined}
            style={({ pressed }) => [styles.navBtn, pressed && { opacity: 0.65 }]}
          >
            <Icon size={22} color={isActive ? accent : colors.muted} />
          </Pressable>
        )
      })}
    </View>
  )
}

/* ---- Small screen header with a back chevron ---- */

export function ScreenHeader({ title, onBack, style }) {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + 18 },
        style,
      ]}
    >
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={10}
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
        >
          <ChevronLeft size={20} color={colors.ink} />
        </Pressable>
      ) : null}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}

/* ---- Animated like control (post + comment hearts) ---- */

export function LikeControl({
  liked = false,
  count = 0,
  size = 18,
  onToggle,
  idleColor = colors.body,
  style,
  textStyle,
  label,
}) {
  const [scale] = useState(() => new Animated.Value(1))

  const press = () => {
    onToggle?.()
    scale.stopAnimation()
    scale.setValue(1)
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.34,
        duration: 130,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 130,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start()
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: liked }}
      accessibilityLabel={label ?? (liked ? 'Unlike' : 'Like')}
      hitSlop={8}
      onPress={press}
      style={({ pressed }) => [styles.like, style, pressed && { opacity: 0.7 }]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Heart
          size={size}
          filled={liked}
          color={liked ? colors.red : idleColor}
        />
      </Animated.View>
      <Text
        style={[
          styles.likeCount,
          { color: liked ? colors.red : idleColor },
          textStyle,
        ]}
      >
        {count}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(16, 94, 243, 0.43)',
    borderRadius: 31,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    zIndex: 20,
  },
  navBtn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    lineHeight: 24,
    color: colors.ink,
  },
  like: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  likeCount: {
    fontFamily: font.semibold,
    fontSize: 11,
  },
})
