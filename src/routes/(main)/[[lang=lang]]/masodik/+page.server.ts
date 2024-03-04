import { error } from '@sveltejs/kit';
import { db } from '$db';
import { users, type NewUser, newUserSchema } from '$db/schema/public/users';
import type { PageServerLoad } from './$types';
import { safeParse } from 'valibot';

export const load: PageServerLoad = async ({ params, url }) => {
	// const result = await db.select().from(users);
	// console.log(result);

	return {};
	/*const newUserParams = safeParse(newUserSchema, {
		name: url.searchParams.get('name')
	});

	if (!newUserParams.success) {
		return {
			message: 'Invalid user data'
		};
	} else {
		const insertUser: NewUser[] = await db
			.insert(users)
			.values(newUserParams.output)
			.onConflictDoNothing()
			.returning();

		const result = await db.select().from(users);
		console.log(result);

		return {
			insertUser
		};
	}*/
};
