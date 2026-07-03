import { JBButton } from "jb-button/react";

type Props = {
    onRetry?: () => unknown
}

function CustomError(props: Props) {
  return (
    <section className="custom-error-modal" role="alert" aria-live="polite">
      <div className="custom-error-visual" aria-hidden="true">
        <svg viewBox="0 0 220 164" xmlns="http://www.w3.org/2000/svg">
        <title>Custom Error Message</title>
          <path className="custom-error-blob" d="M34 91C22 55 48 20 86 21c24 1 34 15 55 17 24 3 47-7 62 12 18 23 3 65-24 83-31 20-74 15-102 8-21-5-36-20-43-50Z" />
          <rect className="custom-error-window" x="45" y="37" width="130" height="88" rx="12" />
          <path className="custom-error-window-top" d="M45 58h130" />
          <circle className="custom-error-dot custom-error-dot-danger" cx="62" cy="48" r="4" />
          <circle className="custom-error-dot" cx="76" cy="48" r="4" />
          <circle className="custom-error-dot" cx="90" cy="48" r="4" />
          <path className="custom-error-line" d="M68 78h48M68 94h32M68 110h58" />
          <circle className="custom-error-alert" cx="152" cy="110" r="24" />
          <path className="custom-error-alert-mark" d="M152 96v16M152 122h.01" />
        </svg>
      </div>
      <span className="custom-error-kicker">Request failed</span>
      <div className="custom-error-title">We could not load this table</div>
      <p className="custom-error-message">
        It's Just a Custom Error Message Example to Show You How Can You Create it.
      </p>
      <div className="custom-error-actions">
        <JBButton color="danger" variant="solid" size="md" onClick={props.onRetry}>Try again</JBButton>
      </div>
    </section>
  );
}

export default CustomError;
