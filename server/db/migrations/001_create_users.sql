create type user_role as enum ('seeker','poster');


create table users (
    id uuid primary key default gen_random_uuid() ,
    username text not null unique,
    email text not null unique,
    password text not null,
    role user_role not null,
    created_at timestamp default now()
);

