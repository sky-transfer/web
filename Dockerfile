FROM node:20.2.0

WORKDIR /skytransfer

# Install pnpm
RUN npm install -g pnpm

# Copy everything over
COPY . .

# Install all production dependencies
RUN pnpm -r i -P --frozen-lockfile

# Build the application
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]