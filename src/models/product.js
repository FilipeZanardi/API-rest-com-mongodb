'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'O titulo é obrigatório'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'] ,
        index: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true,
    },
    ativo:{
        type: Boolean,
        required: true,
        default: true
    },
    tags:[{
        type: String,
        required: true
    }],

    imagem: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Product', schema);