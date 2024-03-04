import  { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar, serial, pgSchema } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-valibot';

export const logSchema = pgSchema("log")

export const log = logSchema.table('log', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  });