const { where } = require('sequelize');
const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false,
  });
};


exports.postAddProduct = (req,res)=>{
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  }).then(result=>{
    console.log('created Product');
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  })
}

exports.getProducts = (req, res) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>console.log(err));
};

exports.getEditProduct = (req,res)=>{
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  req.user.getProducts({where:{id : prodId}})
  .then(products=>{
    const product = products[0];
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product',{
      pageTitle: 'Edit Product',
      path : '/admin/add-product',
      editing : 'editMode',
      product: product
    })
  })
  .catch(err=>{
    console.log(err);
  });
}









exports.postEditProduct =(req,res)=>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findByPk(prodId)
  .then(product=>{
    console.log(product);
    product.title = updatedTitle;
    product.imageUrl = updatedUrl;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.save();
  }).then(result=>{
    console.log('UPDATED PRODUCT');
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  })
}


exports.postDeleteProduct = (req,res)=>{
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product=>{
    product.destroy();
  }).then(result=>{
    console.log('DELETED PRODUCT');
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  })
}