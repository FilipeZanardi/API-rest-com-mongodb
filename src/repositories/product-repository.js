'use strict'

const mongoose = require ('mongoose');
const Product = mongoose.model ('Product')

//get sem async
/*exports.get= () => {
    return Product.find ({ active: true}, 'title preco slug')
}*/

exports.get = async() => {
   const res = await Product.find({
       ativo: true
   }, 'title preco slug imagem')
   return res
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        slug: slug,
        ativo : true
    }, 'title descricao preco slug tags')
    return res;
}

exports.getById = async(id) => {
    const res = await Product.findById(id)
    return res
}

exports.getByTag = async(tag) => {
    const res = await Product
    .find({
        tags: tag,
        ativo : true
    },  'title descricao preco slug tags')
    return res
}

exports.create = async(data) => {  // Assim ele puxa todos os atributos no body
    var product = new Product(data);
    await product.save();
    
}

exports.update = async(id, data) => {
    await  Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data .title,
                descricao:data.descricao,
                preco: data.preco,
                slug:data.slug
            }
        })
}

exports.delete = async(id) => {
    await Product.findOneAndRemove(id)
}
