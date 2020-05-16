'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório'],

    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],

    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória'],

    },
    regras:[{
        type: String,
        required: true,
        enum:['user', 'admin'],
        default: 'user'
    }],
});

module.exports = mongoose.model('Customer', schema);
