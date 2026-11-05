import { useCallback, useEffect, useRef, useState } from 'react'
import './PostDetail.css'
import { usePreferences } from '../i18n/context'

/* ---- Icons ---- */

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m14.6 5.2-6.9 6.8 6.9 6.8" />
    </svg>
  )
}

function HeartIcon({ filled = false, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.3s-7.6-4.6-9.1-9A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 9.1 4.3c-1.5 4.4-9.1 9-9.1 9Z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.4 11.6c0 4.1-3.8 7.4-8.4 7.4a9.7 9.7 0 0 1-2.7-.4L4.2 20l1.3-3.6a7 7 0 0 1-2-4.8c0-4.1 3.8-7.4 8.5-7.4s8.4 3.3 8.4 7.4Z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.6 3.4 3.8 10.2l6.4 2.4 2.4 6.4 8-15.6Z" />
      <path d="m10.2 12.6 4.6-4.6" />
    </svg>
  )
}

function PersonIcon({ size = 30 }) {
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

/* Comments live only on this screen, never inside the profile feed. */
export default function PostDetail({
  post,
  account,
  onBack,
  onToggleLike,
  onToggleCommentLike,
  onAddComment,
}) {
  const { t } = usePreferences()
  const [draft, setDraft] = useState('')
  const [pulse, setPulse] = useState(null)
  const [closing, setClosing] = useState(false)
  const scrollRef = useRef(null)

  // Play the reverse slide before the parent unmounts this screen.
  const requestClose = useCallback(() => setClosing(true), [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [requestClose])

  // Fallback for reduced motion / missed animationend events.
  useEffect(() => {
    if (!closing) return undefined
    const timer = setTimeout(onBack, 280)
    return () => clearTimeout(timer)
  }, [closing, onBack])

  const handleAnimationEnd = (event) => {
    if (closing && event.target === event.currentTarget) onBack()
  }

  const submit = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    onAddComment(post.id, text)
    setDraft('')
    // Keep the newest comment in view.
    requestAnimationFrame(() => {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  return (
    <div
      className={`postd${closing ? ' is-closing' : ''}`}
      id="postd-screen"
      onAnimationEnd={handleAnimationEnd}
    >
      <header className="postd-header">
        <button
          type="button"
          className="postd-back"
          id="postd-back"
          aria-label="Back to profile"
          onClick={requestClose}
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="postd-title">{t('Post')}</h1>
      </header>

      <main className="postd-scroll" ref={scrollRef}>
        <article className="postd-post">
          <div className="postd-head">
            <span className="postd-avatar">
              {account.avatar ? (
                <img src={account.avatar} alt="" />
              ) : (
                <PersonIcon />
              )}
            </span>
            <div className="postd-who">
              <strong>{account.name}</strong>
              <span>{t(post.time)}</span>
            </div>
          </div>

          {post.image && (
            <img
              className="postd-image"
              src={post.image}
              alt={post.caption || t('Post photo')}
            />
          )}

          <div className="postd-tools">
            <button
              type="button"
              className={`postd-action${post.liked ? ' is-liked' : ''}`}
              id={`postd-like-${post.id}`}
              aria-pressed={post.liked}
              aria-label={post.liked ? 'Unlike post' : 'Like post'}
              onClick={() => {
                onToggleLike(post.id)
                setPulse(post.id)
              }}
            >
              <span
                className={`postd-like-icon${pulse === post.id ? ' is-pulsing' : ''}`}
                onAnimationEnd={() => setPulse(null)}
              >
                <HeartIcon filled={post.liked} />
              </span>
              <span>{post.likes}</span>
            </button>

            <span className="postd-action is-static" aria-label={`${post.comments.length} comments`}>
              <CommentIcon />
              <span>{post.comments.length}</span>
            </span>
          </div>

          {post.caption && (
            <p className="postd-caption">
              <strong>{account.name}</strong> {post.caption}
            </p>
          )}
        </article>

        <section className="postd-comments">
          <h2 className="postd-comments-title">
            {t('Comments')} <span className="postd-comments-count">{post.comments.length}</span>
          </h2>

          {post.comments.length === 0 ? (
            <p className="postd-comments-empty">
              {t('No comments yet. Say something nice.')}
            </p>
          ) : (
            <ul className="postd-list">
              {post.comments.map((comment) => (
                <li className="postd-comment" key={comment.id}>
                  <span className="postd-comment-avatar" aria-hidden="true">
                    {initialsOf(comment.author)}
                  </span>
                  <div className="postd-comment-body">
                    <div className="postd-comment-top">
                      <strong className="postd-comment-author">{comment.author}</strong>
                      <button
                        type="button"
                        className={`postd-comment-like${comment.liked ? ' is-liked' : ''}`}
                        id={`postd-clike-${comment.id}`}
                        aria-pressed={Boolean(comment.liked)}
                        aria-label={
                          comment.liked
                            ? 'Unlike this comment'
                            : 'Like this comment'
                        }
                        onClick={() => {
                          onToggleCommentLike(post.id, comment.id)
                          setPulse(comment.id)
                        }}
                      >
                        <span
                          className={`postd-like-icon${pulse === comment.id ? ' is-pulsing' : ''}`}
                          onAnimationEnd={() => setPulse(null)}
                        >
                          <HeartIcon filled={comment.liked} size={13} />
                        </span>
                        <span>{comment.likes ?? 0}</span>
                      </button>
                    </div>
                    <p className="postd-comment-text">{comment.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <form className="postd-composer" onSubmit={submit}>
        <span className="postd-composer-avatar" aria-hidden="true">
          {account.avatar ? <img src={account.avatar} alt="" /> : initialsOf(account.name)}
        </span>
        <input
          type="text"
          className="postd-input"
          id="postd-input"
          placeholder={t('Add a comment...')}
          aria-label="Add a comment"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          type="submit"
          className="postd-send"
          id="postd-send"
          aria-label="Send comment"
          disabled={!draft.trim()}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  )
}
