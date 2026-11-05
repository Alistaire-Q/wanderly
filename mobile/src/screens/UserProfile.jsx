import { useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PostDetail from './PostDetail'
import { LikeControl } from '../components/ui'
import {
  ChevronLeft,
  Close,
  Comment,
  ImageIcon,
  Person,
  Plus,
  Star,
} from '../components/icons'
import { myReviews } from '../data/account'
import { getService } from '../data/services'
import { imageSource } from '../theme/images'
import { colors, font } from '../theme'
import { usePreferences } from '../i18n/context'

const initialsOf = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

const formatCount = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1).replace('.0', '')}k` : `${value}`

async function pickPhoto(t, { square = false } = {}) {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!permission.granted) {
    Alert.alert(
      t('Photo access needed'),
      t('Allow photo access in Settings to choose a picture.'),
    )
    return null
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: square,
    aspect: square ? [1, 1] : undefined,
    quality: 0.7,
    base64: true,
  })
  if (result.canceled || !result.assets?.length) return null

  const asset = result.assets[0]
  if (asset.base64) {
    return `data:${asset.mimeType ?? 'image/jpeg'};base64,${asset.base64}`
  }
  return asset.uri
}

export default function UserProfile({
  account,
  posts,
  onUpdateAccount,
  onUpdatePosts,
  onBack,
}) {
  const insets = useSafeAreaInsets()
  const { t } = usePreferences()
  const [tab, setTab] = useState('post')
  const [activePostId, setActivePostId] = useState(null)

  const [showNewPost, setShowNewPost] = useState(false)
  const [draftImage, setDraftImage] = useState(null)
  const [draftCaption, setDraftCaption] = useState('')

  const [showEdit, setShowEdit] = useState(false)
  const [editName, setEditName] = useState(account.name)
  const [editBio, setEditBio] = useState(account.bio)
  const [editAvatar, setEditAvatar] = useState(account.avatar)

  const openEdit = () => {
    setEditName(account.name)
    setEditBio(account.bio)
    setEditAvatar(account.avatar)
    setShowEdit(true)
  }

  const closeNewPost = () => {
    setShowNewPost(false)
    setDraftImage(null)
    setDraftCaption('')
  }

  /* ---- Posts ---- */

  const toggleLike = (postId) => {
    onUpdatePosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post,
      ),
    )
  }

  const addComment = (postId, text) => {
    onUpdatePosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c-${Date.now()}`,
                  author: account.name,
                  text,
                  likes: 0,
                  liked: false,
                },
              ],
            }
          : post,
      ),
    )
  }

  const toggleCommentLike = (postId, commentId) => {
    onUpdatePosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      liked: !comment.liked,
                      likes: (comment.likes ?? 0) + (comment.liked ? -1 : 1),
                    }
                  : comment,
              ),
            }
          : post,
      ),
    )
  }

  const choosePostPhoto = async () => {
    const uri = await pickPhoto(t)
    if (uri) setDraftImage(uri)
  }

  const sharePost = () => {
    const caption = draftCaption.trim()
    if (!draftImage && !caption) return
    onUpdatePosts([
      {
        id: `post-${Date.now()}`,
        image: draftImage,
        caption,
        time: 'Just now',
        likes: 0,
        liked: false,
        comments: [],
      },
      ...posts,
    ])
    setTab('post')
    closeNewPost()
  }

  /* ---- Profile ---- */

  const chooseAvatar = async () => {
    const uri = await pickPhoto(t, { square: true })
    if (uri) setEditAvatar(uri)
  }

  const saveProfile = () => {
    onUpdateAccount({
      ...account,
      name: editName.trim() || account.name,
      bio: editBio.trim(),
      avatar: editAvatar,
    })
    setShowEdit(false)
  }

  const canShare = Boolean(draftImage) || draftCaption.trim().length > 0
  const activePost = posts.find((post) => post.id === activePostId) ?? null

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to settings"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
        >
          <ChevronLeft size={20} color={colors.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('Profile')}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 22, paddingBottom: 40 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.head}>
          <View style={styles.avatar}>
            {account.avatar ? (
              <Image source={imageSource(account.avatar)} style={styles.avatarImg} />
            ) : (
              <Person size={42} color="#8C96A6" />
            )}
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatCount(posts.length)}</Text>
              <Text style={styles.statLabel}>{t('Posts')}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatCount(account.followers)}</Text>
              <Text style={styles.statLabel}>{t('Followers')}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatCount(account.following)}</Text>
              <Text style={styles.statLabel}>{t('Following')}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.name}>{account.name}</Text>
          <Text style={styles.bio}>{account.bio}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={openEdit}
            style={({ pressed }) => [
              styles.btn,
              styles.ghost,
              pressed && { backgroundColor: '#F7F9FD' },
            ]}
          >
            <Text style={styles.ghostText}>{t('Edit Profile')}</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowNewPost(true)}
            style={({ pressed }) => [
              styles.btn,
              styles.solid,
              pressed && { backgroundColor: '#0D51D6' },
            ]}
          >
            <Plus size={14} color="#FFFFFF" />
            <Text style={styles.solidText}>{t('New Post')}</Text>
          </Pressable>
        </View>

        <View style={styles.tabs}>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'post' }}
            onPress={() => setTab('post')}
            style={styles.tab}
          >
            <Text style={[styles.tabText, tab === 'post' && styles.tabTextActive]}>
              {t('Post')} <Text style={styles.tabCount}>{posts.length}</Text>
            </Text>
            {tab === 'post' ? <View style={styles.tabBar} /> : null}
          </Pressable>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'review' }}
            onPress={() => setTab('review')}
            style={styles.tab}
          >
            <Text
              style={[styles.tabText, tab === 'review' && styles.tabTextActive]}
            >
              {t('Review')} <Text style={styles.tabCount}>{myReviews.length}</Text>
            </Text>
            {tab === 'review' ? <View style={styles.tabBar} /> : null}
          </Pressable>
        </View>

        {tab === 'post' ? (
          <View style={styles.feed}>
            {posts.length === 0 ? (
              <Text style={styles.feedEmpty}>
                {t('No posts yet. Share your first trip photo.')}
              </Text>
            ) : null}

            {posts.map((post) => (
              <View key={post.id} style={styles.post}>
                <View style={styles.postHead}>
                  <View style={styles.postAvatar}>
                    {account.avatar ? (
                      <Image
                        source={imageSource(account.avatar)}
                        style={styles.postAvatarImg}
                      />
                    ) : (
                      <Text style={styles.postInitials}>{initialsOf(account.name)}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.postName}>{account.name}</Text>
                    <Text style={styles.postTime}>{t(post.time)}</Text>
                  </View>
                </View>

                {post.image ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Open post and comments"
                    onPress={() => setActivePostId(post.id)}
                  >
                    <Image
                      source={imageSource(post.image)}
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                ) : null}

                <View style={styles.tools}>
                  <LikeControl
                    liked={post.liked}
                    count={post.likes}
                    size={18}
                    onToggle={() => toggleLike(post.id)}
                    idleColor="#5C6880"
                    textStyle={{ fontSize: 11 }}
                    label={post.liked ? 'Unlike post' : 'Like post'}
                  />

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="View comments"
                    onPress={() => setActivePostId(post.id)}
                    style={({ pressed }) => [
                      styles.commentBtn,
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <Comment size={18} color="#5C6880" />
                    <Text style={styles.commentCount}>{post.comments.length}</Text>
                  </Pressable>
                </View>

                {post.caption || post.comments.length > 0 ? (
                  <Pressable onPress={() => setActivePostId(post.id)}>
                    {post.caption ? (
                      <Text style={styles.caption}>
                        <Text style={{ fontFamily: font.semibold }}>{account.name}</Text>{' '}
                        {post.caption}
                      </Text>
                    ) : null}
                    {post.comments.length > 0 ? (
                      <Text style={styles.more}>
                        {t('View all {count} comments', {
                          count: post.comments.length,
                        })}
                      </Text>
                    ) : null}
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.feed}>
            {myReviews.map((review) => {
              const service = getService(review.serviceId)
              return (
                <View key={review.id} style={styles.review}>
                  <Image
                    source={imageSource(service.image)}
                    style={styles.reviewThumb}
                  />
                  <View style={{ flex: 1 }}>
                    <View style={styles.reviewTop}>
                      <Text numberOfLines={1} style={styles.reviewName}>
                        {service.name}
                      </Text>
                      <View style={styles.reviewStars}>
                        <Star size={12} color={colors.gold} />
                        <Text style={styles.reviewRating}>{review.rating}</Text>
                      </View>
                    </View>
                    <Text style={styles.reviewText}>{review.text}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        )}
      </ScrollView>

      {/* ---- New post sheet ---- */}
      <Modal
        visible={showNewPost}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeNewPost}
      >
        <View style={styles.modal}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(23,35,60,0.45)' }]}
            onPress={closeNewPost}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={[styles.sheet, { paddingBottom: 24 + insets.bottom }]}>
              <View style={styles.grabber} />

              <View style={styles.sheetHead}>
                <Text style={styles.sheetTitle}>{t('New Post')}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  onPress={closeNewPost}
                  style={styles.sheetClose}
                >
                  <Close size={16} color={colors.ink} />
                </Pressable>
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={choosePostPhoto}
                style={[
                  styles.photo,
                  draftImage && { borderWidth: 0, padding: 0 },
                ]}
              >
                {draftImage ? (
                  <>
                    <Image source={imageSource(draftImage)} style={styles.photoImage} />
                    <View style={styles.photoChange}>
                      <Text style={styles.photoChangeText}>{t('Change photo')}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <ImageIcon size={24} color={colors.muted} />
                    <Text style={styles.photoText}>{t('Add a photo')}</Text>
                  </>
                )}
              </Pressable>

              <TextInput
                value={draftCaption}
                onChangeText={setDraftCaption}
                placeholder={t('Write a caption about your trip...')}
                placeholderTextColor={colors.muted}
                maxLength={240}
                multiline
                style={styles.captionInput}
              />

              <View style={styles.sheetFoot}>
                <Text style={styles.counter}>{draftCaption.length}/240</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={sharePost}
                  disabled={!canShare}
                  style={({ pressed }) => [
                    styles.share,
                    !canShare && { opacity: 0.45 },
                    pressed && canShare && { backgroundColor: '#0D51D6' },
                  ]}
                >
                  <Text style={styles.shareText}>{t('Share')}</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* ---- Edit profile sheet ---- */}
      <Modal
        visible={showEdit}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowEdit(false)}
      >
        <View style={styles.modal}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(23,35,60,0.45)' }]}
            onPress={() => setShowEdit(false)}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={[styles.sheet, { paddingBottom: 24 + insets.bottom }]}>
              <View style={styles.grabber} />

              <View style={styles.sheetHead}>
                <Text style={styles.sheetTitle}>{t('Edit Profile')}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  onPress={() => setShowEdit(false)}
                  style={styles.sheetClose}
                >
                  <Close size={16} color={colors.ink} />
                </Pressable>
              </View>

              <View style={styles.editAvatarRow}>
                <View style={[styles.avatar, { width: 58, height: 58, borderRadius: 29 }]}>
                  {editAvatar ? (
                    <Image
                      source={imageSource(editAvatar)}
                      style={styles.avatarImg}
                    />
                  ) : (
                    <Person size={30} color="#8C96A6" />
                  )}
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={chooseAvatar}
                  style={({ pressed }) => [
                    styles.changePhoto,
                    pressed && { backgroundColor: '#F7F9FD' },
                  ]}
                >
                  <Text style={styles.changePhotoText}>{t('Change photo')}</Text>
                </Pressable>
              </View>

              <Text style={styles.fieldLabel}>{t('Name')}</Text>
              <TextInput
                value={editName}
                onChangeText={setEditName}
                maxLength={40}
                style={styles.field}
                placeholderTextColor={colors.muted}
              />

              <Text style={styles.fieldLabel}>{t('Bio')}</Text>
              <TextInput
                value={editBio}
                onChangeText={setEditBio}
                maxLength={120}
                multiline
                numberOfLines={3}
                style={[styles.field, styles.fieldArea]}
                placeholderTextColor={colors.muted}
              />

              <Pressable
                accessibilityRole="button"
                onPress={saveProfile}
                style={({ pressed }) => [
                  styles.share,
                  { width: '100%', height: 40, marginTop: 6 },
                  pressed && { backgroundColor: '#0D51D6' },
                ]}
              >
                <Text style={styles.shareText}>{t('Save')}</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <Modal
        visible={Boolean(activePost)}
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setActivePostId(null)}
      >
        {activePost ? (
          <PostDetail
            post={activePost}
            account={account}
            onBack={() => setActivePostId(null)}
            onToggleLike={toggleLike}
            onToggleCommentLike={toggleCommentLike}
            onAddComment={addComment}
          />
        ) : null}
      </Modal>
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
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0D6E0',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 6,
  },
  stat: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontFamily: font.bold,
    fontSize: 15,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  statLabel: {
    fontFamily: font.regular,
    fontSize: 9.5,
    color: colors.muted,
  },
  name: {
    fontFamily: font.semibold,
    fontSize: 15,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  bio: {
    marginTop: 4,
    fontFamily: font.regular,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#5C6880',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  btn: {
    flex: 1,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
  },
  ghost: {
    borderWidth: 1,
    borderColor: '#D9DDE5',
    backgroundColor: '#FFFFFF',
  },
  ghostText: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: 0.1,
    color: colors.ink,
  },
  solid: {
    backgroundColor: colors.blueDeep,
  },
  solidText: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: 0.1,
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF5',
  },
  tab: {
    flex: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: 0.1,
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.blueDeep,
  },
  tabCount: {
    fontSize: 9,
    color: '#5C6880',
  },
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: -1,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.blueDeep,
  },
  feed: {
    gap: 22,
    marginTop: 16,
  },
  feedEmpty: {
    paddingVertical: 26,
    textAlign: 'center',
    fontFamily: font.regular,
    fontSize: 11.5,
    color: colors.muted,
  },
  post: {
    gap: 0,
  },
  postHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(214, 227, 250, 0.97)',
    overflow: 'hidden',
  },
  postAvatarImg: {
    width: '100%',
    height: '100%',
  },
  postInitials: {
    fontFamily: font.bold,
    fontSize: 9.5,
    letterSpacing: 0.2,
    color: colors.blueDeep,
  },
  postName: {
    fontFamily: font.semibold,
    fontSize: 11,
    color: colors.ink,
  },
  postTime: {
    marginTop: 1,
    fontFamily: font.regular,
    fontSize: 9,
    color: colors.muted,
  },
  postImage: {
    width: '100%',
    height: 210,
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: '#EEF3FD',
  },
  tools: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 10,
  },
  commentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  commentCount: {
    fontFamily: font.semibold,
    fontSize: 11,
    color: '#5C6880',
  },
  caption: {
    marginTop: 8,
    fontFamily: font.regular,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.ink,
  },
  more: {
    marginTop: 4,
    fontFamily: font.medium,
    fontSize: 10.5,
    color: colors.muted,
  },
  review: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8ECF3',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  reviewThumb: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: '#EEF3FD',
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  reviewName: {
    flex: 1,
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  reviewRating: {
    fontFamily: font.bold,
    fontSize: 10,
    color: colors.gold,
  },
  reviewText: {
    marginTop: 4,
    fontFamily: font.regular,
    fontSize: 10.5,
    lineHeight: 16,
    color: '#5C6880',
  },
  reviewDate: {
    marginTop: 6,
    fontFamily: font.regular,
    fontSize: 9,
    color: colors.muted,
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
  photo: {
    width: '100%',
    height: 150,
    marginTop: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#C9D6EE',
    borderRadius: 14,
    backgroundColor: '#F7F9FD',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoText: {
    fontFamily: font.medium,
    fontSize: 10.5,
    color: colors.muted,
  },
  photoChange: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 999,
    backgroundColor: 'rgba(12,18,30,0.62)',
  },
  photoChangeText: {
    fontFamily: font.medium,
    fontSize: 9,
    color: '#FFFFFF',
  },
  captionInput: {
    width: '100%',
    minHeight: 78,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F2',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontFamily: font.regular,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.ink,
    textAlignVertical: 'top',
  },
  sheetFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
  counter: {
    fontFamily: font.regular,
    fontSize: 9.5,
    color: colors.muted,
  },
  share: {
    width: 118,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.blueDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    fontFamily: font.semibold,
    fontSize: 11.5,
    letterSpacing: 0.1,
    color: '#FFFFFF',
  },
  editAvatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    marginBottom: 16,
  },
  changePhoto: {
    height: 32,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: {
    fontFamily: font.semibold,
    fontSize: 10.5,
    color: colors.ink,
  },
  fieldLabel: {
    marginBottom: 5,
    fontFamily: font.medium,
    fontSize: 9.5,
    color: colors.muted,
  },
  field: {
    width: '100%',
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F2',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontFamily: font.regular,
    fontSize: 11.5,
    color: colors.ink,
  },
  fieldArea: {
    minHeight: 68,
    textAlignVertical: 'top',
  },
})
