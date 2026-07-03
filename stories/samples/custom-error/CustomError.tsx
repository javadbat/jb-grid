import { JBButton } from "jb-button/react";

type Props = {
    onRetry?: () => unknown
}

function CustomError(props: Props) {
  return (
    <section className="custom-error-modal" role="alert" aria-live="polite">
      <div className="custom-error-image" aria-hidden="true">
        <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="24" width="124" height="78" rx="10" />
          <path d="M42 48h76M42 66h52M42 84h28" />
          <circle cx="118" cy="84" r="18" />
          <path d="M118 74v13M118 94h.01" />
        </svg>
      </div>
      <div className="custom-error-title">Unable to load grid data</div>
      <p className="custom-error-message">
        The table request failed. Check your connection or try refreshing the data.
      </p>
      <JBButton color="danger" onClick={props.onRetry}>Try again</JBButton>
    </section>
  );
}

export default CustomError;
