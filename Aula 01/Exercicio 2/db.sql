drop table if exists usuarios;

create table usuarios(
    id serial primary key,
    nome text not null,
    email text unique,
    senha text not null
)