FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

EXPOSE 8000

ENV PORT=8000

CMD ["bun", "x", "vite", "preview", "--port", "8000", "--host"]

