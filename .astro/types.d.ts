declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
};
"contact": {
"2-linkedin.md": {
	id: "2-linkedin.md";
  slug: "2-linkedin";
  body: string;
  collection: "contact";
  data: any
} & { render(): Render[".md"] };
"4-resume.md": {
	id: "4-resume.md";
  slug: "4-resume";
  body: string;
  collection: "contact";
  data: any
} & { render(): Render[".md"] };
"5-email.md": {
	id: "5-email.md";
  slug: "5-email";
  body: string;
  collection: "contact";
  data: any
} & { render(): Render[".md"] };
};
"education": {
"education-1-sjsu.md": {
	id: "education-1-sjsu.md";
  slug: "education-1-sjsu";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".md"] };
};
"jobs": {
"job-1-maxar.md": {
	id: "job-1-maxar.md";
  slug: "job-1-maxar";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"job-1.5-maxar.md": {
	id: "job-1.5-maxar.md";
  slug: "job-15-maxar";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"job-armada.md": {
	id: "job-armada.md";
  slug: "job-armada";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
};
"projects": {
"project-1-UCLA.md": {
	id: "project-1-UCLA.md";
  slug: "project-1-ucla";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-10-Dental.md": {
	id: "project-10-Dental.md";
  slug: "project-10-dental";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-11-Applied.md": {
	id: "project-11-Applied.md";
  slug: "project-11-applied";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-12-IndyCar.md": {
	id: "project-12-IndyCar.md";
  slug: "project-12-indycar";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-13-CubeSat.md": {
	id: "project-13-CubeSat.md";
  slug: "project-13-cubesat";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-14-Savannah.md": {
	id: "project-14-Savannah.md";
  slug: "project-14-savannah";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-15-Aerospace_PM.md": {
	id: "project-15-Aerospace_PM.md";
  slug: "project-15-aerospace_pm";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-16-Sanmina.md": {
	id: "project-16-Sanmina.md";
  slug: "project-16-sanmina";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-17-Nexus.md": {
	id: "project-17-Nexus.md";
  slug: "project-17-nexus";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-2-Undergraduate_Research.md": {
	id: "project-2-Undergraduate_Research.md";
  slug: "project-2-undergraduate_research";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-3-NASA.md": {
	id: "project-3-NASA.md";
  slug: "project-3-nasa";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-4-drone_racing.md": {
	id: "project-4-drone_racing.md";
  slug: "project-4-drone_racing";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-5-Face_Shield.md": {
	id: "project-5-Face_Shield.md";
  slug: "project-5-face_shield";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-6-NASA_Eval.md": {
	id: "project-6-NASA_Eval.md";
  slug: "project-6-nasa_eval";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-7-HeroX.md": {
	id: "project-7-HeroX.md";
  slug: "project-7-herox";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-8-Beehive.md": {
	id: "project-8-Beehive.md";
  slug: "project-8-beehive";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-9-ARES.md": {
	id: "project-9-ARES.md";
  slug: "project-9-ares";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};
"skills": {
"skills.md": {
	id: "skills.md";
  slug: "skills";
  body: string;
  collection: "skills";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
