const bebidas = {

    carajillo: {
        nombre: 'Carajillo',
        categoria: 'CON CAFÉ',
        descripcion:
            'Una combinación elegante de café espresso y Licor 43. Intenso, aromático y perfecto para disfrutar después de una comida.',
        tiempo: '5 min',
        dificultad: 'Fácil',
        porcion: '1 porción',
        imagen: require('../assets/bebidas/carajillo.png'),

        ingredientes: [
            {
                nombre: 'Licor 43',
                cantidad: '50 ml'
            },
            {
                nombre: 'Café espresso',
                cantidad: '1 espresso'
            },
            {
                nombre: 'Hielo',
                cantidad: 'Al gusto'
            }
        ],

        pasos: [
            {
                titulo: 'Prepara el café',
                descripcion:
                    'Prepara un espresso y déjalo reposar unos segundos.'
            },
            {
                titulo: 'Agrega hielo',
                descripcion:
                    'Llena un vaso mezclador o shaker con suficiente hielo.'
            },
            {
                titulo: 'Añade los ingredientes',
                descripcion:
                    'Agrega el Licor 43 y posteriormente el café espresso.'
            },
            {
                titulo: 'Mezcla',
                descripcion:
                    'Agita hasta conseguir una mezcla fría y una ligera capa de espuma.'
            }
        ]
    },


    michelada: {
        nombre: 'Michelada',
        categoria: 'REFRESCANTE',
        descripcion:
            'Una bebida mexicana refrescante que combina cerveza, limón, salsas y un toque de sal.',
        tiempo: '5 min',
        dificultad: 'Fácil',
        porcion: '1 porción',
        imagen: require('../assets/bebidas/michelada.png'),

        ingredientes: [
            {
                nombre: 'Cerveza clara',
                cantidad: '355 ml'
            },
            {
                nombre: 'Jugo de limón',
                cantidad: '30 ml'
            },
            {
                nombre: 'Salsa inglesa',
                cantidad: 'Al gusto'
            },
            {
                nombre: 'Salsa picante',
                cantidad: 'Al gusto'
            },
            {
                nombre: 'Sal',
                cantidad: 'Para escarchar'
            },
            {
                nombre: 'Hielo',
                cantidad: 'Opcional'
            }
        ],

        pasos: [
            {
                titulo: 'Escarcha el vaso',
                descripcion:
                    'Humedece el borde del vaso con limón y pásalo por sal.'
            },
            {
                titulo: 'Agrega el limón',
                descripcion:
                    'Vierte el jugo de limón en el vaso.'
            },
            {
                titulo: 'Añade las salsas',
                descripcion:
                    'Agrega salsa inglesa y salsa picante al gusto.'
            },
            {
                titulo: 'Sirve la cerveza',
                descripcion:
                    'Vierte lentamente la cerveza y mezcla suavemente.'
            }
        ]
    },


    pinaColada: {
        nombre: 'Piña Colada',
        categoria: 'TROPICAL',
        descripcion:
            'Una bebida tropical cremosa y refrescante con piña, coco y ron.',
        tiempo: '7 min',
        dificultad: 'Fácil',
        porcion: '1 porción',
        imagen: require('../assets/bebidas/pina-colada.png'),

        ingredientes: [
            {
                nombre: 'Ron blanco',
                cantidad: '50 ml'
            },
            {
                nombre: 'Jugo de piña',
                cantidad: '90 ml'
            },
            {
                nombre: 'Crema de coco',
                cantidad: '30 ml'
            },
            {
                nombre: 'Hielo',
                cantidad: '1 taza'
            }
        ],

        pasos: [
            {
                titulo: 'Prepara los ingredientes',
                descripcion:
                    'Mide el ron, el jugo de piña y la crema de coco.'
            },
            {
                titulo: 'Agrega el hielo',
                descripcion:
                    'Coloca suficiente hielo en la licuadora.'
            },
            {
                titulo: 'Licúa',
                descripcion:
                    'Licúa todos los ingredientes hasta obtener una mezcla cremosa.'
            },
            {
                titulo: 'Sirve',
                descripcion:
                    'Vierte la mezcla en un vaso frío y sirve inmediatamente.'
            }
        ]
    },


    margarita: {
        nombre: 'Margarita',
        categoria: 'CLÁSICO',
        descripcion:
            'Un clásico preparado con tequila, cítricos y un característico borde de sal.',
        tiempo: '5 min',
        dificultad: 'Fácil',
        porcion: '1 porción',
        imagen: require('../assets/bebidas/margarita.png'),

        ingredientes: [
            {
                nombre: 'Tequila',
                cantidad: '50 ml'
            },
            {
                nombre: 'Licor de naranja',
                cantidad: '25 ml'
            },
            {
                nombre: 'Jugo de limón',
                cantidad: '25 ml'
            },
            {
                nombre: 'Sal',
                cantidad: 'Para escarchar'
            },
            {
                nombre: 'Hielo',
                cantidad: 'Al gusto'
            }
        ],

        pasos: [
            {
                titulo: 'Escarcha la copa',
                descripcion:
                    'Humedece el borde de la copa con limón y pásalo por sal.'
            },
            {
                titulo: 'Agrega los ingredientes',
                descripcion:
                    'Coloca tequila, licor de naranja, jugo de limón y hielo en un shaker.'
            },
            {
                titulo: 'Agita',
                descripcion:
                    'Agita enérgicamente hasta enfriar la mezcla.'
            },
            {
                titulo: 'Sirve',
                descripcion:
                    'Cuela la mezcla y sírvela en la copa preparada.'
            }
        ]
    },


    paloma: {
        nombre: 'Paloma',
        categoria: 'MEXICANO',
        descripcion:
            'Una combinación fresca de tequila, toronja y limón con un perfil cítrico y refrescante.',
        tiempo: '5 min',
        dificultad: 'Fácil',
        porcion: '1 porción',
        imagen: require('../assets/bebidas/paloma.png'),

        ingredientes: [
            {
                nombre: 'Tequila',
                cantidad: '50 ml'
            },
            {
                nombre: 'Refresco de toronja',
                cantidad: '120 ml'
            },
            {
                nombre: 'Jugo de limón',
                cantidad: '15 ml'
            },
            {
                nombre: 'Sal',
                cantidad: 'Al gusto'
            },
            {
                nombre: 'Hielo',
                cantidad: 'Al gusto'
            }
        ],

        pasos: [
            {
                titulo: 'Prepara el vaso',
                descripcion:
                    'Agrega hielo a un vaso alto.'
            },
            {
                titulo: 'Añade el tequila',
                descripcion:
                    'Vierte el tequila sobre el hielo.'
            },
            {
                titulo: 'Agrega los cítricos',
                descripcion:
                    'Añade el jugo de limón y el refresco de toronja.'
            },
            {
                titulo: 'Mezcla',
                descripcion:
                    'Mezcla suavemente y agrega una pizca de sal si lo deseas.'
            }
        ]
    },


    mojito: {
        nombre: 'Mojito',
        categoria: 'FRESCO',
        descripcion:
            'Una bebida fresca y aromática preparada con ron, limón y hierbabuena.',
        tiempo: '7 min',
        dificultad: 'Fácil',
        porcion: '1 porción',
        imagen: require('../assets/bebidas/mojito.png'),

        ingredientes: [
            {
                nombre: 'Ron blanco',
                cantidad: '50 ml'
            },
            {
                nombre: 'Jugo de limón',
                cantidad: '25 ml'
            },
            {
                nombre: 'Hierbabuena',
                cantidad: '8 hojas'
            },
            {
                nombre: 'Azúcar',
                cantidad: '2 cucharaditas'
            },
            {
                nombre: 'Agua mineral',
                cantidad: 'Al gusto'
            },
            {
                nombre: 'Hielo',
                cantidad: 'Al gusto'
            }
        ],

        pasos: [
            {
                titulo: 'Prepara la hierbabuena',
                descripcion:
                    'Coloca la hierbabuena, azúcar y jugo de limón en el vaso.'
            },
            {
                titulo: 'Machaca suavemente',
                descripcion:
                    'Presiona ligeramente la hierbabuena para liberar su aroma.'
            },
            {
                titulo: 'Agrega ron y hielo',
                descripcion:
                    'Añade el ron blanco y llena el vaso con hielo.'
            },
            {
                titulo: 'Termina la bebida',
                descripcion:
                    'Completa con agua mineral y mezcla suavemente.'
            }
        ]
    },


    clericot: {
        nombre: 'Clericot',
        categoria: 'FRUTAL',
        descripcion:
            'Una bebida fresca y frutal que combina vino con diferentes frutas.',
        tiempo: '10 min',
        dificultad: 'Fácil',
        porcion: '1 jarra',
        imagen: require('../assets/bebidas/clericot.png'),

        ingredientes: [
            {
                nombre: 'Vino tinto',
                cantidad: '750 ml'
            },
            {
                nombre: 'Manzana',
                cantidad: '1 pieza'
            },
            {
                nombre: 'Naranja',
                cantidad: '1 pieza'
            },
            {
                nombre: 'Fresas',
                cantidad: '6 piezas'
            },
            {
                nombre: 'Refresco de limón',
                cantidad: '250 ml'
            },
            {
                nombre: 'Hielo',
                cantidad: 'Al gusto'
            }
        ],

        pasos: [
            {
                titulo: 'Corta la fruta',
                descripcion:
                    'Lava y corta las frutas en pequeños trozos.'
            },
            {
                titulo: 'Agrega el vino',
                descripcion:
                    'Coloca las frutas en una jarra y añade el vino.'
            },
            {
                titulo: 'Añade el refresco',
                descripcion:
                    'Agrega el refresco de limón y mezcla suavemente.'
            },
            {
                titulo: 'Enfría y sirve',
                descripcion:
                    'Agrega hielo y sirve bien frío.'
            }
        ]
    },


    parisDeNoche: {
        nombre: 'París de Noche',
        categoria: 'LOS ROBLES',
        descripcion:
            'Una preparación cremosa con el carácter del brandy Torres 10 y un acabado elegante.',
        tiempo: '5 min',
        dificultad: 'Fácil',
        porcion: '1 porción',
        imagen: require('../assets/bebidas/paris-de-noche.png'),

        ingredientes: [
            {
                nombre: 'Torres 10',
                cantidad: '45 ml'
            },
            {
                nombre: 'Leche evaporada',
                cantidad: '60 ml'
            },
            {
                nombre: 'Jarabe natural',
                cantidad: '15 ml'
            },
            {
                nombre: 'Hielo',
                cantidad: 'Al gusto'
            },
            {
                nombre: 'Canela',
                cantidad: 'Para decorar'
            }
        ],

        pasos: [
            {
                titulo: 'Agrega el hielo',
                descripcion:
                    'Coloca suficiente hielo en un shaker.'
            },
            {
                titulo: 'Añade Torres 10',
                descripcion:
                    'Vierte el brandy Torres 10 sobre el hielo.'
            },
            {
                titulo: 'Completa la mezcla',
                descripcion:
                    'Agrega la leche evaporada y el jarabe natural.'
            },
            {
                titulo: 'Agita y sirve',
                descripcion:
                    'Agita hasta enfriar, sirve y termina con un toque de canela.'
            }
        ]
    }

};

export default bebidas;