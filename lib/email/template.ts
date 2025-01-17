export function verficationEmailTemplate(verificationLink: string) {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
    <title>UI PDF Compressor - Verify your email</title>
    <link rel="stylesheet" href="styles.css" />
    <style>
      body {
        margin: 0;
        font-family: 'Manrope', sans-serif;
        background-color: #f9fafb; /* Gray-50 */
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .card {
        max-width: 24rem; /* 384px */
        margin: auto;
        background-color: #ffffff; /* White */
        border-radius: 0.5rem; /* Rounded-lg */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow-md */
        padding: 2rem; /* Padding-8 */
        text-align: center;
      }

      .title {
        font-size: 1.875rem; /* Text-3xl */
        font-weight: 600; /* Font-semibold */
        color: #1f2937; /* Gray-900 */
        margin-bottom: 1rem; /* Margin-Bottom-4 */
      }

      .message {
        font-size: 1.125rem; /* Text-lg */
        color: #374151; /* Gray-700 */
        margin-bottom: 1.5rem; /* Margin-Bottom-6 */
      }

      .note-1 {
        color: #6b7280; /* Gray-500 */
        margin-bottom: 1rem; /* Margin-Bottom-4 */
      }

      .note-2 {
        color: #6b7280; /* Gray-500 */
        margin-top: 1rem; /* Margin-Bottom-4 */
      }

      .btn {
        display: inline-block;
        background-color: #f97316; /* Orange-500 */
        color: #ffffff; /* White */
        padding: 0.5rem 1rem; /* Py-2 Px-4 */
        border-radius: 0.375rem; /* Rounded-md */
        text-decoration: none;
        transition: background-color 0.2s ease; /* Transition Duration-200 */
      }

      .btn:hover {
        background-color: #ea580c; /* Orange-600 */
      }
    </style>
  </head>
  <body>
    <main class="container">
      <div class="card">
        <h1 class="title">Verify your Email</h1>
        <p class="message">Thank you for Signing up!</p>
        <p class="note-1">
          To complete your registration, please click the button below to verify your email address.
        </p>
        <a href=${verificationLink} class="btn">Verify Email</a>
        <p class="note-2">
          This link will expire in 30 minutes
        </p>
      </div>
    </main>
  </body>
</html>
  `;
}
