export const theme = {
    colors: {
      primary: '#0054a6', // Cushon blue
      secondary: '#87ceeb', // Light blue
      accent: '#ff6b6b', // Accent color
      background: '#f8f9fa', // Light background
      card: '#ffffff', // Card background
      text: '#333333', // Main text color
      textSecondary: '#666666', // Secondary text color
      border: '#dddddd', // Border color
      success: '#28a745', // Success color
      error: '#dc3545', // Error color
      warning: '#ffc107', // Warning color
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    },
    fontSizes: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
    breakpoints: {
      mobile: '480px',
      tablet: '768px',
      desktop: '1024px',
      wide: '1280px',
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      round: '50%',
    },
    boxShadow: {
      small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      medium: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
      large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
    },
  };
  
  export type Theme = typeof theme;