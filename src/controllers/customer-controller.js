'use strict'

const ValidationContract = require ('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')
const mongoose = require('mongoose')
const md5 = require('md5')
const emailService = require('../services/email-service')
const authService = require('../services/auth-service')

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get()
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: 'Falha ao processar a requisicao get all'
        })
    }
}


exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicao',
        })
    }
}


exports.post = async(req, res, next) => {
   // let contract = new ValidationContract();
    //contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres')
   // contract.isEmail(req.body.email,'E-mail inválido')
    //contract.hasMinLen(req.body.senha, 6, 'A senha deve conter pelo menos 3 caracteres')
    try {
        await repository.create({
            nome: req.body.nome,
            email: req.body.email,
            senha:md5(req.body.senha + global.SALT_KEY),
            regras:["user"]
        })

           emailService.send(
            req.body.email,
            'Bem vindo', + req.body.nome , + 'esta fazendo certo',
            global.EMAIL_TMPL.replace('{0}', req.body.nome)
        )

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o cliente', e
        })
    }
}

// Gera a porra do token
,exports.authenticate = async(req, res, next) => {
    try{
        const customer = await repository.authenticate({
            email:req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        })

         if (!customer){
             res.status(404).send ({
                message: 'usuario ou senha invalidos'
             })
            // returns
         }

         //GERA O TOKEN
        const token = await authService.generateToken({
             id: customer._id,
             email: customer.email,
             nome:  customer.nome,
             regras: customer.regras
            })
            console.log(customer)
            res.status(201).send({
                token: token,
                data: {
                    email: customer.email,
                    nome: customer.nome,
                    regras: customer.regras
                }
            })
    }  catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o token', e
        })
    }
}


// Gera um novo token valido a partir do token existente já expirado
exports.refreshToken = async(req, res, next) => {
    try{

        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-acess-token']

        //decodifica o token
        const data = await authService.decodeToken(token)


        const customer = await repository.getById(data.id)

         if (!customer){
             res.status(404).send ({
                message: 'Cliente não encontrado'
             })
            // returns
         }

         //GERA O TOKEN
        const tokenData = await authService.generateToken({
             id: customer._id,
             email: customer.email,
             nome:  customer.nome,
             regras: customer.regras
            })
            console.log(customer)
            res.status(201).send({
                token: token,
                data: {
                    email: customer.email,
                    nome: customer.nome,
                    regras: customer.regras
                }
            })
    }  catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o token', e
        })
    }
}