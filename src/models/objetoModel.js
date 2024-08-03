import conn from "../config/conn.js";

// 1:N
const tableObjeto = /*sql*/ `
    create table if not exists objetos(
        objeto_id varchar(60) primary key,
        nome varchar(255) not null,
        peso varchar(255) not null,
        cor varchar(255) not null,
        descricao TEXT,
        disponivel boolean,

        usuario_id varchar(60),
        foreign key (usuario_id) references usuarios(usuario_id),

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tableObjeto, (err)=>{
    if(err){
        console.error(err)
        return

    }

    console.log( "tabela de [objetos] criada com sucesso")
})