type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}

DATABASE_URL="postgresql://myuser:password@localhost:5432/crafting_table"
