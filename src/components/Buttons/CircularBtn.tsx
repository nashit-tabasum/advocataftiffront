export default function CircularButton() {
  return (
    <button className="inline-flex items-center justify-center bg-brand-1-900 text-brand-white rounded-full p-2.5 shadow-sm hover:bg-brand-1-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 6.45837V10.8334"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5667 7.14999V12.85C17.5667 13.7833 17.0667 14.65 16.2584 15.125L11.3083 17.9833C10.5 18.45 9.5 18.45 8.68333 17.9833L3.73333 15.125C2.92499 14.6583 2.42499 13.7916 2.42499 12.85V7.14999C2.42499 6.21665 2.92499 5.34995 3.73333 4.87495L8.68333 2.01663C9.49166 1.54996 10.4917 1.54996 11.3083 2.01663L16.2584 4.87495C17.0667 5.34995 17.5667 6.20832 17.5667 7.14999Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 13.5V13.5833"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
