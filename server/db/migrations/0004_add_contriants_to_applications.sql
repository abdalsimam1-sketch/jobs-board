alter table applications alter column status set not null;
alter table applications after column status set default 'pending';
alter table  applications alter column seeker_id set not null;
alter table applications alter column job_id set not null;