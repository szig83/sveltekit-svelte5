import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	throw new Error('No database connnection url');
}

export default {
	schema: './src/lib/server/db/schema/**/*.ts',
	out: './src/lib/server/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: DATABASE_URL
	},
	schemaFilter: ['public', 'log'],
	verbose: true,
	strict: true
} satisfies Config;
