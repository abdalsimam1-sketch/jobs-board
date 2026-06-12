create type job_type as enum('fulltime','part-time','contract','remote');

create table jobs (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    company_name text,
    type job_type,
    description text,
    location text,
    min_salary int,
    max_salary int ,
    created_at timestamp default now(),
    poster_id uuid references users(id)
);
