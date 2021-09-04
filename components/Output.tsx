const Output = ({
  longLink,
  shortLink,
}: {
  longLink: string
  shortLink: string
}) => {
  return (
    <>
      <span>{longLink}</span>

      <a href={'https://' + shortLink} target='_blank' rel='noopener'>
        {shortLink}
      </a>

      <button
        onClick={() => {
          navigator.clipboard.writeText(shortLink)
        }}
      >
        Copy
      </button>
    </>
  )
}

export default Output
