var Cupon = require('../models/cupon');

const registro_cupon_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){

            let data = req.body;

            let reg = await Cupon.create(data);

            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const listar_cupones_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){
            var filtro = req.params['filtro'];

            let reg = await Cupon.find({codigo: new RegExp(filtro, 'i')}).sort({createdAt:-1});
            res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const obtener_cupon_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){

            var id = req.params['id'];

            try {
                var reg = await Cupon.findById({_id:id});
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

const actualizar_cupon_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){

            var data = req.body;

            var id = req.params['id'];

            let reg = await Cupon.findByIdAndUpdate({_id:id},{
                codigo: data.codigo,
                tipo: data.tipo,
                valor: data.valor,
                limite: data.limite
            });

            res.status(200).send({data:reg});


        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

const eliminar_cupon_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'Admin'){

            var id = req.params['id'];

            let reg = await Cupon.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }  
}

module.exports = {
    registro_cupon_admin,
    listar_cupones_admin,
    obtener_cupon_admin,
    actualizar_cupon_admin,
    eliminar_cupon_admin
}