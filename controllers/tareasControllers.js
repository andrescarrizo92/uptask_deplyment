const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async (req,res, next) => {
    // obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({
        where : {
            url: req.params.url
        }
    })
    // leer el valor del input
    const {tarea} = req.body;
    
    // estado 0 = incompleto y ID del proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    // insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId });
    if(!resultado){
        return next();
    }

    // redireccionar
    res.redirect(`/proyectos/${req.params.url }`);
}

exports.cambiarEstadoTarea = async (req, res, next) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({
        where : {
            id
        }
    })
    // cambiar estado
    let estado = 0;
    if (tarea.estado === estado){
        tarea.estado = 1;
    } else 
    tarea.estado = estado; 
    console.log(tarea.estado);

    const resultado = await tarea.save();
    if (!resultado) return next();
    
    res.status(200).send('todo piola');
}

exports.eliminarTarea = async (req, res, next) => {

    const { id }= req.params;

    // eliminar tarea 
    const resultado = await Tareas.destroy({ where : { id }});

    if (!resultado) return next();

    res.status(200).send('Tarea Eliminada Correctamente');

}