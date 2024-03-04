import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';

export const users = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 256 }).unique().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const userSchema = createSelectSchema(users);
export const newUserSchema = createInsertSchema(users);
