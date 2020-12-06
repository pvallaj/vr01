interface obraEscrita {
    seccion:string;
    descripcion:string;
    autor:string;
    children?: obraEscrita[];
}

const DATOS:obraEscrita[]=[
    {
        seccion:'Tomo 1',
        descripcion:'Presentaciones.',
        autor:'',
        children:[
            {
                seccion:'',
                descripcion:'Introducción',
                autor:'',
                children:null
            },
        ]
    },
    {
        seccion:'Tomo 2',
        descripcion:' Materialidades y soportes. el libro y la imprenta.',
        autor:'',
        children:[
            {
                seccion:'1',
                descripcion:'Imprenta y libro antiguo. Consideraciones para el estudio material de la literatura novohispana.',
                autor:'Marina Garone Gravier',
                children:null
            },
            {
                seccion:'2',
                descripcion:' Mercaderes de libros en la Nueva España. Comercio, censura y privilegio en el siglo XVI',
                autor:'Olivia Moreno Gamboa',
                children:null
            }
        ]
    }
]