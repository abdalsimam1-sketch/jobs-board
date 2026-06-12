create type application_status as enum('pending','interview','rejected');

create table applications (
    id uuid primary key  default gen_random_uuid(),
    cover_letter text,
    status application_status,
    seeker_id uuid references users(id),
    job_id uuid references jobs(id),
    created_at timestamp default now()
);