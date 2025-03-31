export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
