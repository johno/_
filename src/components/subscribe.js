const Subscribe = ({ formId = '1167756', skipDescription, ...props }) => (
  <div>
    <form
      sx={{ p: 4, border: '2px solid', borderColor: 'text' }}
      action={`https://app.convertkit.com/forms/${formId}/subscriptions`}
      method="post"
    >
      <h2
        sx={{
          m: 0,
          lineHeight: 1,
          pb: skipDescription ? 4 : null
        }}
      >
        {props.children}
      </h2>
      {skipDescription ? null : (
        <div>
          <p>
            If you want early access to what I'm researching, writing, and
            building, you should subscribe to my newsletter.
          </p>
          <p>
            <em>No spam, ever. You can unsubscribe at any time.</em>
          </p>
        </div>
      )}
      <label htmlFor="first_name">Your first name</label>
      <input
        aria-label="Your first name"
        name="fields[first_name]"
        id="first_name"
        placeholder="First name"
        type="text"
      />
      <label sx={{ mt: 2 }} htmlFor="email_address">
        Your email address
      </label>
      <input
        required
        aria-label="Your email address"
        name="email_address"
        id="email_address"
        placeholder="Email address"
        type="email"
      />
      <button sx={{ mt: 3 }}>Join Now</button>
    </form>
  </div>
)

export default Subscribe
