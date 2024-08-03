import conn from "../config/conn.js";

const tabelaObjetoImagens = /*sql*/`
    create table if not exists objeto_images(
        image_id varchar(60) primary key,
        image_path varchar(255) not null,
        objeto_id varchar(60),

        foreign key (objeto_id) references objetos(objeto_id),

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`;


conn.query(tabelaObjetoImagens, (err)=>{
    if(err){
    console.error(err)
    return   
    }
    console.log("Tabela [objeto_images] criada com sucesso") 
})