import { useRouteError } from "react-router-dom";

interface ErrorStatus {
  statusText: string;
}

export default function ErrorPage() {
  const error = useRouteError() as Error | ErrorStatus;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{"statusText" in error ? error.statusText : error.message}</i>
      </p>
    </div>
  );
}
