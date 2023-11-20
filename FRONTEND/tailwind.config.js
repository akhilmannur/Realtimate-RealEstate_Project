const defaultTailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

const materialTailwindConfig = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// Merge the configurations
const mergedConfig = {
  content: [...new Set([...defaultTailwindConfig.content, ...materialTailwindConfig.content])],
  theme: {
    extend: { ...defaultTailwindConfig.theme, ...materialTailwindConfig.theme },
  },
  plugins: [...new Set([...defaultTailwindConfig.plugins, ...materialTailwindConfig.plugins])],
};
export default mergedConfig;
