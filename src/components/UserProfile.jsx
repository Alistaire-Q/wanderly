import { useEffect, useRef, useState } from 'react'
import './UserProfile.css'
import PostDetail from './PostDetail'
import { getService } from '../data/services'
import { myReviews } from '../data/account'
import { usePreferences } from '../i18n/context'

/* ---- Icons ---- */

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m14.6 5.2-6.9 6.8 6.9 6.8" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="m6.6 6.6 10.8 10.8M17.4 6.6 6.6 17.4" />
    </svg>
  )
}

function HeartIcon({ filled = false }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.3s-7.6-4.6-9.1-9A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 9.1 4.3c-1.5 4.4-9.1 9-9.1 9Z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.4 11.6c0 4.1-3.8 7.4-8.4 7.4a9.7 9.7 0 0 1-2.7-.4L4.2 20l1.3-3.6a7 7 0 0 1-2-4.8c0-4.1 3.8-7.4 8.5-7.4s8.4 3.3 8.4 7.4Z" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.2" y="4.6" width="17.6" height="14.8" rx="2.4" />
      <circle cx="8.6" cy="9.6" r="1.7" />
      <path d="m4.4 17 4.6-4.6 3.4 3.2 3-2.7 4.2 4.1" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5.4v13.2M5.4 12h13.2" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.6l2.9 5.87 6.48.95-4.69 4.57 1.11 6.45L12 17.4l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.95z" />
    </svg>
  )
}

function PersonIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8.6" r="3.9" />
      <path d="M12 13.9c-4 0-7.2 2.4-7.2 5.4V21h14.4v-1.7c0-3-3.2-5.4-7.2-5.4Z" />
    </svg>
  )
}

const initialsOf = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

const formatCount = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1).replace('.0', '')}k` : `${value}`

const readFile = (file, done) => {
  const reader = new FileReader()
  reader.onload = () => done(String(reader.result))
  reader.readAsDataURL(file)
}

export default function UserProfile({
  account,
  posts,
  onUpdateAccount,
  onUpdatePosts,
  onBack,
}) {
  const { t } = usePreferences()
  const [tab, setTab] = useState('post')
  const [activePostId, setActivePostId] = useState(null)
  const [pulseId, setPulseId] = useState(null)

  const [showNewPost, setShowNewPost] = useState(false)
  const [draftImage, setDraftImage] = useState(null)
  const [draftCaption, setDraftCaption] = useState('')

  const [showEdit, setShowEdit] = useState(false)
  const [editName, setEditName] = useState(account.name)
  const [editBio, setEditBio] = useState(account.bio)
  const [editAvatar, setEditAvatar] = useState(account.avatar)

  const newPostFile = useRef(null)
  const avatarFile = useRef(null)

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

  const toggleComments = (postId) => {
    setActivePostId(postId)
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

  const pickPostPhoto = (event) => {
    const file = event.target.files?.[0]
    if (file) readFile(file, setDraftImage)
    event.target.value = ''
  }

  const sharePost = (event) => {
    event.preventDefault()
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

  const pickAvatar = (event) => {
    const file = event.target.files?.[0]
    if (file) readFile(file, setEditAvatar)
    event.target.value = ''
  }

  const saveProfile = (event) => {
    event.preventDefault()
    onUpdateAccount({
      ...account,
      name: editName.trim() || account.name,
      bio: editBio.trim(),
      avatar: editAvatar,
    })
    setShowEdit(false)
  }

  /* Sheets lock the page behind them while open. */
  useEffect(() => {
    if (!showNewPost && !showEdit) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowNewPost(false)
        setShowEdit(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showNewPost, showEdit])

  const canShare = Boolean(draftImage) || draftCaption.trim().length > 0
  const activePost = posts.find((post) => post.id === activePostId) ?? null

  return (
    <div className="userp" id="userp-screen">
      <header className="userp-header">
        <button
          type="button"
          className="userp-back"
          id="userp-back"
          aria-label="Back to settings"
          onClick={onBack}
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="userp-title">{t('Profile')}</h1>
      </header>

      <main className="userp-scroll">
        <section className="userp-head">
          <span className="userp-avatar">
            {account.avatar ? (
              <img src={account.avatar} alt={account.name} />
            ) : (
              <PersonIcon />
            )}
          </span>

          <div className="userp-stats">
            <div className="userp-stat">
              <strong>{formatCount(posts.length)}</strong>
              <span>{t('Posts')}</span>
            </div>
            <div className="userp-stat">
              <strong>{formatCount(account.followers)}</strong>
              <span>{t('Followers')}</span>
            </div>
            <div className="userp-stat">
              <strong>{formatCount(account.following)}</strong>
              <span>{t('Following')}</span>
            </div>
          </div>
        </section>

        <section className="userp-identity">
          <h2 className="userp-name">{account.name}</h2>
          <p className="userp-bio">{account.bio}</p>
        </section>

        <div className="userp-actions">
          <button
            type="button"
            className="userp-btn is-ghost"
            id="userp-edit-profile"
            onClick={openEdit}
          >
            {t('Edit Profile')}
          </button>
          <button
            type="button"
            className="userp-btn is-solid"
            id="userp-new-post"
            onClick={() => setShowNewPost(true)}
          >
            <PlusIcon />
            {t('New Post')}
          </button>
        </div>

        <div className="userp-tabs" role="tablist" aria-label="Profile content">
          <button
            type="button"
            role="tab"
            id="userp-tab-post"
            aria-selected={tab === 'post'}
            className={`userp-tab${tab === 'post' ? ' is-active' : ''}`}
            onClick={() => setTab('post')}
          >
            {t('Post')} <span className="userp-tab-count">{posts.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            id="userp-tab-review"
            aria-selected={tab === 'review'}
            className={`userp-tab${tab === 'review' ? ' is-active' : ''}`}
            onClick={() => setTab('review')}
          >
            {t('Review')} <span className="userp-tab-count">{myReviews.length}</span>
          </button>
        </div>

        {tab === 'post' ? (
          <div className="userp-feed">
            {posts.length === 0 && (
              <p className="userp-feed-empty">
                {t('No posts yet. Share your first trip photo.')}
              </p>
            )}

            {posts.map((post) => (
              <article className="userp-post" key={post.id} id={`userp-${post.id}`}>
                <div className="userp-post-head">
                  <span className="userp-post-avatar">
                    {account.avatar ? (
                      <img src={account.avatar} alt="" />
                    ) : (
                      initialsOf(account.name)
                    )}
                  </span>
                  <div className="userp-post-who">
                    <strong>{account.name}</strong>
                    <span>{t(post.time)}</span>
                  </div>
                </div>

                {post.image && (
                  <button
                    type="button"
                    className="userp-post-media"
                    id={`userp-open-${post.id}`}
                    aria-label="Open post and comments"
                    onClick={() => setActivePostId(post.id)}
                  >
                    <img
                      className="userp-post-image"
                      src={post.image}
                      alt={post.caption || t('Post photo')}
                      loading="lazy"
                    />
                  </button>
                )}

                <div className="userp-post-tools">
                  <button
                    type="button"
                    className={`userp-post-action${post.liked ? ' is-liked' : ''}`}
                    id={`userp-like-${post.id}`}
                    aria-pressed={post.liked}
                    aria-label={post.liked ? 'Unlike post' : 'Like post'}
                    onClick={() => {
                      toggleLike(post.id)
                      setPulseId(post.id)
                    }}
                  >
                    <span
                      className={`userp-like-icon${pulseId === post.id ? ' is-pulsing' : ''}`}
                      onAnimationEnd={() => setPulseId(null)}
                    >
                      <HeartIcon filled={post.liked} />
                    </span>
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    className="userp-post-action"
                    id={`userp-comment-${post.id}`}
                    aria-label="View comments"
                    onClick={() => toggleComments(post.id)}
                  >
                    <CommentIcon />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                {(post.caption || post.comments.length > 0) && (
                  <button
                    type="button"
                    className="userp-post-caption"
                    onClick={() => setActivePostId(post.id)}
                  >
                    {post.caption && (
                      <>
                        <strong>{account.name}</strong> {post.caption}
                      </>
                    )}
                    {post.comments.length > 0 && (
                      <span className="userp-post-more">
                        {t('View all {count} comments', {
                          count: post.comments.length,
                        })}
                      </span>
                    )}
                  </button>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="userp-feed">
            {myReviews.map((review) => {
              const service = getService(review.serviceId)
              return (
                <article className="userp-review" key={review.id}>
                  <img
                    className="userp-review-thumb"
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                  />
                  <div className="userp-review-body">
                    <div className="userp-review-top">
                      <strong>{service.name}</strong>
                      <span className="userp-review-rating">
                        <StarIcon />
                        {review.rating}
                      </span>
                    </div>
                    <p className="userp-review-text">{review.text}</p>
                    <span className="userp-review-date">{review.date}</span>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      {showNewPost && (
        <div className="userp-modal" role="dialog" aria-modal="true" aria-label="New post">
          <button
            type="button"
            className="userp-modal-backdrop"
            aria-label="Close"
            onClick={closeNewPost}
          />

          <form className="userp-sheet" onSubmit={sharePost}>
            <span className="userp-sheet-grabber" aria-hidden="true" />

            <div className="userp-sheet-head">
              <h2 className="userp-sheet-title">{t('New Post')}</h2>
              <button
                type="button"
                className="userp-sheet-close"
                aria-label="Close"
                onClick={closeNewPost}
              >
                <CloseIcon />
              </button>
            </div>

            {draftImage ? (
              <button
                type="button"
                className="userp-photo is-filled"
                onClick={() => newPostFile.current?.click()}
                aria-label="Change photo"
              >
                <img src={draftImage} alt={t('Selected')} />
                <span className="userp-photo-change">{t('Change photo')}</span>
              </button>
            ) : (
              <button
                type="button"
                className="userp-photo"
                onClick={() => newPostFile.current?.click()}
              >
                <ImageIcon />
                <span>{t('Add a photo')}</span>
              </button>
            )}

            <input
              ref={newPostFile}
              type="file"
              accept="image/*"
              className="userp-file"
              id="userp-post-file"
              onChange={pickPostPhoto}
            />

            <textarea
              className="userp-caption"
              id="userp-post-caption"
              placeholder={t('Write a caption about your trip...')}
              maxLength={240}
              value={draftCaption}
              onChange={(event) => setDraftCaption(event.target.value)}
            />

            <div className="userp-sheet-foot">
              <span className="userp-counter">{draftCaption.length}/240</span>
              <button
                type="submit"
                className="userp-btn is-solid is-share"
                id="userp-share"
                disabled={!canShare}
              >
                {t('Share')}
              </button>
            </div>
          </form>
        </div>
      )}

      {showEdit && (
        <div className="userp-modal" role="dialog" aria-modal="true" aria-label="Edit profile">
          <button
            type="button"
            className="userp-modal-backdrop"
            aria-label="Close"
            onClick={() => setShowEdit(false)}
          />

          <form className="userp-sheet" onSubmit={saveProfile}>
            <span className="userp-sheet-grabber" aria-hidden="true" />

            <div className="userp-sheet-head">
              <h2 className="userp-sheet-title">{t('Edit Profile')}</h2>
              <button
                type="button"
                className="userp-sheet-close"
                aria-label="Close"
                onClick={() => setShowEdit(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="userp-edit-avatar">
              <span className="userp-avatar is-small">
                {editAvatar ? (
                  <img src={editAvatar} alt="Profile" />
                ) : (
                  <PersonIcon size={30} />
                )}
              </span>
              <button
                type="button"
                className="userp-btn is-ghost is-compact"
                onClick={() => avatarFile.current?.click()}
              >
                {t('Change photo')}
              </button>
              <input
                ref={avatarFile}
                type="file"
                accept="image/*"
                className="userp-file"
                id="userp-avatar-file"
                onChange={pickAvatar}
              />
            </div>

            <label className="userp-field">
              <span>{t('Name')}</span>
              <input
                type="text"
                id="userp-edit-name"
                value={editName}
                maxLength={40}
                onChange={(event) => setEditName(event.target.value)}
              />
            </label>

            <label className="userp-field">
              <span>{t('Bio')}</span>
              <textarea
                id="userp-edit-bio"
                rows={3}
                maxLength={120}
                value={editBio}
                onChange={(event) => setEditBio(event.target.value)}
              />
            </label>

            <button type="submit" className="userp-btn is-solid is-share" id="userp-save">
              {t('Save')}
            </button>
          </form>
        </div>
      )}

      {activePost && (
        <PostDetail
          post={activePost}
          account={account}
          onBack={() => setActivePostId(null)}
          onToggleLike={toggleLike}
          onToggleCommentLike={toggleCommentLike}
          onAddComment={addComment}
        />
      )}
    </div>
  )
}
