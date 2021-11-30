'use strict'

var Cliente = require('../models/cliente');
var Contacto = require('../models/contacto');
var Venta = require('../models/venta');
var Dventa = require('../models/dventa');
var Review = require('../models/review');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
const cliente = require('../models/cliente');

var direccion = require('../models/direccion');

const registro_cliente = async function(req, res){
    // Los datos que enviamos estarán en el cuerpo del request
    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length == 0){
        if(data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash){
                if(hash){
                    data.password = hash;
                    // Registro de usuario
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'Error server', data:undefined});
                }
            })
        }else{
            res.status(200).send({message:'No hay contraseña', data:undefined});
        }
    }else{
        res.status(200).send({message:'Correo existente en la BBDD', data:undefined});
    }
}

const login_cliente = async function(req, res){
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message:'email no encontrado', data:undefined});
    }else{
        // Login
        let user = cliente_arr[0];

        bcrypt.compare(data.password, user.password, async function(error, check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message:'La contraseña no coincide', data:undefined});
            }
        });

    }
}

const listar_clientes_filtro_admin = async function(req, res){
    console.log(req.user);
    if(req.user){
        if(req.user.role == 'Admin'){
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];

            if(tipo == null || tipo == 'null'){
                let reg = await Cliente.find();
                res.status(200).send({data:reg});
            }else{
                if(tipo == 'apellidos'){
                    let reg = await Cliente.find({apellidos: new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }else if(tipo == 'email'){
                    let reg = await Cliente.find({email: new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }
            }
        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const registro_cliente_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){
            var data = req.body;

            bcrypt.hash('12345678', null, null, async function(err, hash){
                if(hash){
                    data.password = hash;
                    let reg = await cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'Error en el servidor', data:undefined});
                }
            })
        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const obtener_cliente_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){

            var id = req.params['id'];

            try {
                var reg = await cliente.findById({_id:id});
                res.status(200).send({data:reg});
            } catch (error) {
                res.status(200).send({data:undefined});
            }

        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const actualizar_cliente_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){

            var id = req.params['id'];
            var data = req.body;

            var reg = await cliente.findByIdAndUpdate({_id:id}, {
                nombre: data.nombre,
                apellidos: data.apellidos,
                email: data.email,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero: data.genero
            })
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const eliminar_cliente_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){

            var id = req.params['id'];

            let reg = await cliente.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const obtener_cliente_guest = async function(req, res){
    if(req.user){

        var id = req.params['id'];

        try {
            var reg = await cliente.findById({_id:id});
            res.status(200).send({data:reg});
        } catch (error) {
            res.status(200).send({data:undefined});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const actualizar_perfil_cliente_guest = async function(req, res){
    if(req.user){

        var id = req.params['id'];
        var data = req.body;

        console.log(data.password);

        if(data.password){
            console.log('Con contraseña');
            bcrypt.hash(data.password, null, null, async function(err, hash){
                var reg = await Cliente.findByIdAndUpdate({_id:id},{
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    f_nacimiento: data.f_nacimiento,
                    dni: data.dni,
                    genero: data.genero,
                    pais: data.pais,
                    password: hash
                });
                res.status(200).send({data: reg});
            });
        }else{
            console.log('Sin contraseña');
            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombre: data.nombre,
                apellidos: data.apellidos,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero: data.genero,
                pais: data.pais
            });
            res.status(200).send({data: reg});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

/*********** Direcciones **********************/ 

const registro_direccion_cliente = async function(req, res){
    if (req.user) {
        var data = req.body;

        if(data.principal){
            let direcciones = await direccion.find({cliente:data.cliente});

            direcciones.forEach(async element=>{
                await direccion.findByIdAndUpdate({_id:element._id},{principal:false});
            });
        }
        

        var reg = await direccion.create(data);
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const obtener_direccion_todos_cliente = async function(req, res){
    if (req.user) {
        var id = req.params['id'];

        let direcciones = await direccion.find({cliente:id}).populate('cliente').sort({createdAt:-1});
        res.status(200).send({data:direcciones});
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const cambiar_direccion_principal_cliente = async function(req, res){
    if (req.user) {
        var id = req.params['id'];
        var cliente = req.params['cliente'];
        let direcciones = await direccion.find({cliente:cliente});

        direcciones.forEach(async element=>{
            await direccion.findByIdAndUpdate({_id:element._id},{principal:false});
        });

        await direccion.findByIdAndUpdate({_id:id},{principal:true});

        res.status(200).send({data:true});
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const obtener_direccion_principal_cliente = async function(req, res){
    if (req.user) {
        var id = req.params['id'];
        var direccion_principal = undefined;

        direccion_principal = await direccion.findOne({cliente:id, principal:true});

        if(direccion_principal == undefined){
            res.status(200).send({data:undefined});
        }else{
            res.status(200).send({data:direccion_principal});
        }
        
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

/********** Contacto ***************/

const enviar_mensaje_contacto = async function(req, res){
    let data = req.body;

    data.estado = 'Abierto';
    let reg = await Contacto.create(data);
    res.status(200).send({data:reg});
}

/*********** Órdenes ******************/

const obtener_ordenes_cliente = async function(req, res){
    if (req.user) {
        var id = req.params['id'];

        let reg = await Venta.find({cliente:id}).sort({createdAt:-1});

        if(reg.length >= 1){
            res.status(200).send({data:reg});
        }else if(reg.length == 0){
            res.status(200).send({data:undefined});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const obtener_detalles_ordenes_cliente = async function(req, res){
    if (req.user) {
        var id = req.params['id'];

        try {
            let venta = await Venta.findById({_id:id}).populate('direccion').populate('cliente');
            let detalles = await Dventa.find({venta:id}).populate('producto');
            res.status(200).send({data:venta, detalles:detalles});
        } catch (error) {
            res.status(200).send({data:undefined});
        }

    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

/******** Reviews **********/

const emitir_review_producto_cliente = async function(req, res){
    if (req.user) {
        let data = req.body;
        let reg = await Review.create(data);
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const obtener_review_producto_cliente = async function(req, res){
    let id = req.params['id'];
    let reg = await Review.find({producto:id}).sort({createdAt:-1});
    res.status(200).send({data:reg});
}

const obtener_reviews_cliente = async function(req, res){
    if (req.user) {
        let id = req.params['id'];
        let reg = await Review.find({cliente:id}).populate('cliente');
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin,
    obtener_cliente_guest,
    actualizar_perfil_cliente_guest,
    registro_direccion_cliente,
    obtener_direccion_todos_cliente,
    cambiar_direccion_principal_cliente,
    obtener_direccion_principal_cliente,
    enviar_mensaje_contacto,
    obtener_ordenes_cliente,
    obtener_detalles_ordenes_cliente,
    emitir_review_producto_cliente,
    obtener_review_producto_cliente,
    obtener_reviews_cliente
}