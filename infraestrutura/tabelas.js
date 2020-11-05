class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarDepartamentos();
        this.criarAreas();
        this.criarCargos();
        this.criarUsuarios();
        this.criarSetor();
        this.criarEquipamentos();
        this.criarControle();
       
        this.inserirDepartamento();
        this.inserirArea();
        this.inserirCargos();
        this.inserirUsuarios();
        this.inserirSetor();
        this.inserirEquipamentos();
       
        
        
    }

    criarDepartamentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS departamentos (id int NOT NULL AUTO_INCREMENT, sigla VARCHAR(4), descricao VARCHAR(50), PRIMARY KEY(id))';

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela departamento criada com sucesso')
            }
        })
    }

    criarAreas() {
        const sql = 'CREATE TABLE IF NOT EXISTS areas (id int NOT NULL AUTO_INCREMENT, departamento_fk INT, descricao VARCHAR(50), PRIMARY KEY(id), foreign key(DEPARTAMENTO_FK) references DEPARTAMENTOS(id))';

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela area criada com sucesso')
            }
        })

    }

    criarCargos() {
        const sql = 'CREATE TABLE IF NOT EXISTS cargos (id int NOT NULL AUTO_INCREMENT, descricao varchar(100) NOT NULL, PRIMARY KEY(id))';

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Cargos criada com sucesso')
            }
        })
    }



    criarUsuarios() {
        const sql = 'CREATE TABLE IF NOT EXISTS usuarios(id int NOT NULL AUTO_INCREMENT, nome varchar(100), matricula varchar(9) UNIQUE, login varchar(20) UNIQUE, senha varchar(20), PRIMARY KEY(id), privilegio VARCHAR(5), cargo_fk int, foreign key(cargo_fk) references cargos(id))';

        this.conexao.query(sql, erro => {
            if(erro) { 
                console.log(erro)
            } else {
                console.log('Tabela Usuários criada com sucesso')
            }
        })
    }


    criarSetor() {
        const sql = 'CREATE TABLE IF NOT EXISTS setores (id int NOT NULL AUTO_INCREMENT,  usuario_fk int, area_fk int, PRIMARY KEY(id), foreign key(area_fk) references AREAS(id), foreign key(usuario_fk) references usuarios(id))';

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela setor criada com sucesso')
            }
        })

    }


    criarEquipamentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS equipamentos (id int NOT NULL AUTO_INCREMENT, descricao varchar(50) NOT NULL, fabricante varchar(50), modelo varchar(50) NOT NULL, codigoCPTM varchar(20) NOT NULL UNIQUE, PRIMARY KEY(id), status VARCHAR(20))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Equipamentos criada com sucesso')
            }
        })
    }




    

    inserirCargos() {
        const sql = ` INSERT INTO cargos (
            descricao
        ) SELECT 'Técnico em manutencao projeto e obras' WHERE NOT EXISTS (SELECT * FROM cargos WHERE descricao = 'Técnico em manutencao projeto e obras')
        `;
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Cargo inserido com sucesso')
            }
        })
    }

    inserirUsuarios() {
        const sql = 
            `
            INSERT INTO usuarios (
                nome, 
                matricula,
                login, 
                senha,
                privilegio,
                cargo_fk
            ) SELECT 'Fabio Julio', '9200297-0', 'fabiolu', '12345', 'admin', 1 WHERE NOT EXISTS (SELECT * FROM usuarios WHERE login = 'fabiolu')
            `;
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Usuário inserido com sucesso')
            }
        })
    }


    inserirEquipamentos() {
        const sql = 
            `
            INSERT INTO EQUIPAMENTOS (
                DESCRICAO, 
                MODELO,
                CODIGOCPTM, 
                FABRICANTE,
                STATUS
            ) SELECT 'MULTIMETRO', 'mx-10', '0678784', 'minipa', 'Disponivel' WHERE NOT EXISTS (SELECT * FROM EQUIPAMENTOS WHERE DESCRICAO = 'MULTRIMETRO')
            `;
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Usuário inserido com sucesso')
            }
        })
    }


    criarControle() {
        const sql = 'CREATE TABLE IF NOT EXISTS controles (id int NOT NULL AUTO_INCREMENT,USUARIO_FK int, EQUIPAMENTO_FK int, data_entrega datetime, data_retirada datetime  , PRIMARY KEY(id), foreign key(usuario_fk) references usuarios(id), foreign key(equipamento_fk) references equipamentos(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela controleEquipamentos criada com sucesso')
            }
        })
    }


    
    inserirDepartamento() {
        const sql = 
            `
            INSERT INTO DEPARTAMENTOS (
                SIGLA,
                DESCRICAO
            ) SELECT 'DORO', 'DEPARTAMENTO DORO'  WHERE NOT EXISTS (SELECT * FROM DEPARTAMENTOS WHERE SIGLA = 'DORO')
            `;
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Departamento inserido com sucesso')
            }
        })
    }

    inserirArea() {
        const sql = 
            `
            INSERT INTO AREAS (
                DESCRICAO
            ) SELECT 'LABORATORIO DE SISTEMAS ELETRONICOS' WHERE NOT EXISTS (SELECT * FROM AREAS WHERE DESCRICAO = 'LABORATORIO DE SISTEMAS ELETRONICOS')
            `;
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Area inserida com sucesso')
            }
        })
    }

    inserirSetor() {
        const sql = `INSERT INTO SETORES ( USUARIO_FK,  AREA_FK
            ) SELECT 1, 1 WHERE NOT EXISTS (SELECT * FROM SETORES WHERE USUARIO_FK = 1 AND AREA_FK = 1)`;
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('SETOR inserido com sucesso')
            }
        })
    }


    



}

module.exports = new Tabelas