'use strict'

const mongoose = require('mongoose');
//
//const repository = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage')
const guid = require('guid')
var config = require('../config')

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get()
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: 'Falha ao processar a requisicao'
        })
    }
}

// get somente pelo slug ex: products/cadeira-gamer
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requesicao'
        })
    }
}


// get pelo Id
exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requesicao'
        })
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag)
        res.status.send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requesicao'
        })
    }
}

//cadastra produto no banco
exports.post = async (req, res, next) => {
    // let contract = new ValidationContract();
    //contract.hasMinLen(req.body.title,3, 'O título deve conter pelo menos 3 caracteres')
    //contract.hasMinLen(req.body.slug,3, 'O slug deve conter pelo menos 3 caracteres')
    //contract.hasMinLen(req.body.descricao,3, 'A descricao deve conter pelo menos 3 caracteres')

    //Se os dados forem invalidos
    //if(!contract.isValid()){
    //    res.status(400).send(contract.erros()).end() ;
    //return;
    // }
    try {

        //cria o blob service
    const blobSvc = azure.createBlobService(config.containerConnectionString)

    let filename = guid.raw().toString() + '.jpg'  //Gera um random de 32 caracteres concatenado com o jpg
    let rawdata = req.body.imagem;   // data imagem convertida em base 64 recebe o req.body.id
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) //remove o cabeçalho da imagem base64
    let type = matches[1] // pega o tipo da imagem, faz um split em 2 casos o tipo é o 1 e os dados ficam no 2
    let buffer = new Buffer(matches[2], 'base64') //cria um novo buffer da imagem para enviar

    //Salva a imagem
    await blobSvc.createBlockBlobFromText('product-images', filename, buffer, { //cria um arquivo baseado no texto(base 64) no produc imagens com o nome(filename), usando o buffer
        contentType: type
    }, function(error, result, response) {
        if (error) {
            filename = 'default-product.png'
        }
    })

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            descricao: req.body.descricao,
            preco: req.body.preco,
            ativo: req.body.ativo,
            tags: req.body.tags,
            imagem: 'https://nodestr2.blob.core.windows.net/product-images/' + filename
        })
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requesicao'
        })
    }
}

// Altera os campos do produto passando o ID
exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requesicao'
        })
    }
}
exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto deletado com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requesicao'
        })
    }
}
