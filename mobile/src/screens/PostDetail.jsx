import { useRef, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LikeControl } from '../components/ui'
import {
  ChevronLeft,
  Comment,
  Person,
  Send,
} from '../components/icons'
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

/* Comments live only on this screen, never inside the profile feed. */
export default function PostDetail({
  post,
  account,
  onBack,
  onToggleLike,
  onToggleCommentLike,
  onAddComment,
}) {
  const insets = useSafeAreaInsets()
  const { t } = usePreferences()
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  const canSend = draft.trim().length > 0

  const submit = () => {
    const text = draft.trim()
    if (!text) return
    onAddComment(post.id, text)
    setDraft('')
    // Keep the newest comment in view.
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true })
    })
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to profile"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
        >
          <ChevronLeft size={20} color={colors.ink} />
        </Pressable>
        <Text style={styles.title}>{t('Post')}</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.head}>
          <View style={styles.avatar}>
            {account.avatar ? (
              <Image
                source={imageSource(account.avatar)}
                style={styles.avatarImage}
              />
            ) : (
              <Person size={30} color={colors.blueDeep} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.whoName}>
              {account.name}
            </Text>
            <Text style={styles.whoTime}>{t(post.time)}</Text>
          </View>
        </View>

        {post.image ? (
          <Image
            source={imageSource(post.image)}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={post.caption || t('Post photo')}
          />
        ) : null}

        <View style={styles.tools}>
          <LikeControl
            liked={post.liked}
            count={post.likes}
            size={20}
            onToggle={() => onToggleLike(post.id)}
            idleColor="#5C6880"
            textStyle={styles.postCount}
            label={post.liked ? 'Unlike post' : 'Like post'}
          />

          <View style={styles.static}>
            <Comment size={20} color="#5C6880" />
            <Text style={styles.postCount}>{post.comments.length}</Text>
          </View>
        </View>

        {post.caption ? (
          <Text style={styles.caption}>
            <Text style={styles.captionName}>{account.name}</Text>{' '}
            {post.caption}
          </Text>
        ) : null}

        <View style={styles.comments}>
          <View style={styles.commentsHead}>
            <Text style={styles.commentsTitle}>{t('Comments')}</Text>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>{post.comments.length}</Text>
            </View>
          </View>

          {post.comments.length === 0 ? (
            <Text style={styles.empty}>
              {t('No comments yet. Say something nice.')}
            </Text>
          ) : (
            <View style={styles.list}>
              {post.comments.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentInitials}>
                      {initialsOf(comment.author)}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.commentTop}>
                      <Text numberOfLines={1} style={styles.commentAuthor}>
                        {comment.author}
                      </Text>

                      <LikeControl
                        liked={Boolean(comment.liked)}
                        count={comment.likes ?? 0}
                        size={13}
                        onToggle={() =>
                          onToggleCommentLike(post.id, comment.id)
                        }
                        idleColor={colors.muted}
                        style={styles.commentLike}
                        textStyle={styles.commentLikeCount}
                        label={
                          comment.liked
                            ? 'Unlike this comment'
                            : 'Like this comment'
                        }
                      />
                    </View>

                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: 12 + insets.bottom }]}>
        <View style={styles.composerAvatar}>
          {account.avatar ? (
            <Image
              source={imageSource(account.avatar)}
              style={styles.avatarImage}
            />
          ) : (
            <Text style={styles.composerInitials}>
              {initialsOf(account.name)}
            </Text>
          )}
        </View>

        <TextInput
          testID="postd-input"
          value={draft}
          onChangeText={setDraft}
          placeholder={t('Add a comment...')}
          placeholderTextColor={colors.muted}
          accessibilityLabel="Add a comment"
          maxLength={280}
          returnKeyType="send"
          onSubmitEditing={submit}
          style={styles.input}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send comment"
          disabled={!canSend}
          onPress={submit}
          style={({ pressed }) => [
            styles.send,
            !canSend && { opacity: 0.4 },
            pressed && canSend && { backgroundColor: '#0D51D6' },
          ]}
        >
          <Send size={16} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
  title: {
    fontFamily: font.semibold,
    fontSize: 20,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  scroll: {
    paddingTop: 20,
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(214, 227, 250, 0.97)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  whoName: {
    fontFamily: font.semibold,
    fontSize: 13,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  whoTime: {
    marginTop: 2,
    fontFamily: font.regular,
    fontSize: 10,
    color: colors.muted,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: '#EEF3FD',
  },
  tools: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 12,
  },
  static: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postCount: {
    fontFamily: font.semibold,
    fontSize: 12,
  },
  caption: {
    marginTop: 10,
    fontFamily: font.regular,
    fontSize: 12,
    lineHeight: 19,
    color: colors.ink,
  },
  captionName: {
    fontFamily: font.semibold,
  },
  comments: {
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF5',
  },
  commentsHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentsTitle: {
    fontFamily: font.semibold,
    fontSize: 13,
    letterSpacing: -0.1,
    color: colors.ink,
  },
  countPill: {
    minWidth: 20,
    height: 17,
    paddingHorizontal: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF3FD',
  },
  countPillText: {
    fontFamily: font.semibold,
    fontSize: 9.5,
    color: colors.blueDeep,
  },
  list: {
    marginTop: 16,
    gap: 14,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF3FD',
  },
  commentInitials: {
    fontFamily: font.bold,
    fontSize: 9,
    letterSpacing: 0.2,
    color: colors.body,
  },
  commentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  commentAuthor: {
    flexShrink: 1,
    fontFamily: font.semibold,
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.ink,
  },
  commentLike: {
    gap: 3,
    paddingVertical: 2,
  },
  commentLikeCount: {
    fontFamily: font.semibold,
    fontSize: 9.5,
  },
  commentText: {
    marginTop: 1,
    fontFamily: font.regular,
    fontSize: 11,
    lineHeight: 17,
    color: colors.body,
  },
  empty: {
    marginTop: 14,
    fontFamily: font.regular,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.muted,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingTop: 10,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF5',
    backgroundColor: '#FFFFFF',
  },
  composerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(214, 227, 250, 0.97)',
    overflow: 'hidden',
  },
  composerInitials: {
    fontFamily: font.bold,
    fontSize: 9,
    letterSpacing: 0.2,
    color: colors.blueDeep,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 38,
    paddingVertical: 0,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F2',
    borderRadius: 999,
    backgroundColor: '#F7F9FD',
    fontFamily: font.regular,
    fontSize: 11.5,
    color: colors.ink,
  },
  send: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueDeep,
  },
})
