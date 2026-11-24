import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/client.js';

const app = express();

app.use(express.json());
app.use(cors());


const prisma = new PrismaClient();



app.get('/usuarios', async (req, res) => {
    

    const users = await prisma.user.findMany()

    res.status(200).json(users);
  


});

app.post('/usuarios', async (req, res) => {
        
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        },
    })

    res.status(201).json({ message: 'Usuário criado com sucesso' });

})

app.put('/usuarios/:id', async (req, res) => {
        
    await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        },
    })
    
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
})

app.delete('/usuarios/:id', async (req, res) => {
        
        await prisma.user.delete({
            where: {
                id: req.params.id,
            },
        })
        
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

/*
mongodb
usuario: brunogobbi_db_user
senha: 8oVOHAZGKTRaHv7M
 */