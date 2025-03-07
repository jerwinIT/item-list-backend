create table items(
item_id primary key,
item_name varchar(255) not null,
description text,
quantity INT not null default 1
)
