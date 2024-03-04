FROM oven/bun AS builder
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN bun i
RUN bun run build

#FROM oven/bun

WORKDIR /app/build

#COPY --from=builder /app/build .

#COPY .env .


#CMD ["bun", "run", "start"]