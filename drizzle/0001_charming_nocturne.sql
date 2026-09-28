CREATE TABLE `enrolments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`course_code` text NOT NULL,
	`session` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
