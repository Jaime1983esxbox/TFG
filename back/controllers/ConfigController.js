// const { rawListeners } = require('../models/config');
var Config = require('../models/config');
var fs = require('fs');
var path = require('path');

const actualizar_config_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'Admin') {

            let data = req.body;

            // Obtenemos nombre de la imagen y su extensión
            if(req.files){
                console.log("Si hay imagen");
                var img_path = req.files.logo.path;
                var name = img_path.split('\\');
                var logo_name = name[2];
                
                // Actualización dle documento con su logo y nombre
                let reg = await Config.findByIdAndUpdate({_id:req._id},{
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo,
                });

                // ELiminamos la imagen anterior
                fs.stat('./uploads/configuraciones/'+ reg.logo, function(err){
                    if(!err){
                        fs.unlink('./uploads/configuraciones/'+ reg.logo, (err)=>{
                            if(err) throw err;
                        });
                    }
                })
                res.status(200).send({data:reg});
            }else{
                console.log("No hay imagen");
                let reg = await Config.findByIdAndUpdate({_id:"615c9331c6e43a6d6c9bfe9d"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });
                res.status(200).send({data:reg});
            }
        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const obtener_config_admin = async function(req, res){
    if (req.user) {
        if (req.user.role == 'Admin') {

            let reg = await Config.findById({_id:"615c9331c6e43a6d6c9bfe9d"});
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'Acceso no permitido'});
        }
    }else{
        res.status(500).send({message:'Acceso no permitido'});
    }
}

const obtener_logo = async function(req,res){
    var img = req.params['img'];
    console.log(img);

    fs.stat('./uploads/configuraciones/' + img , function(err){
        if (!err) {
            let path_img = './uploads/configuraciones/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

const obtener_config_publico = async function(req,res){
    let reg = await Config.findById({_id: "615c9331c6e43a6d6c9bfe9d" });
    res.status(200).send({data:reg});
}

module.exports = {
    actualizar_config_admin,
    obtener_config_admin,
    obtener_logo,
    obtener_config_publico
}