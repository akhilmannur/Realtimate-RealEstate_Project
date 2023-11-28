/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import lineClamp from '@tailwindcss/line-clamp';

const defaultTailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#123456',
        secondary: '#789abc',
      },
    },
  },
    plugins: [
    lineClamp,
    
  ],
};

const materialTailwindConfig = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Different theme extension in materialTailwindConfig
      fonts: {
        custom: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

// Merge the configurations
const mergedConfig = {
  content: [
    ...new Set([...defaultTailwindConfig.content, ...materialTailwindConfig.content]),
  ],
  theme: {
    extend: {
      ...defaultTailwindConfig.theme.extend,
      ...materialTailwindConfig.theme.extend,
    },
  },
  plugins: [
    ...new Set([...defaultTailwindConfig.plugins, ...materialTailwindConfig.plugins]),
  ],
};

// Apply withMT function to the merged configuration
const finalConfig = withMT(mergedConfig);
export default finalConfig;
