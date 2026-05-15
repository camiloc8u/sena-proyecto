import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";



const menuItems = [
  {
    category: "Shakes de Proteína",
    categoryStyle: "font-serif italic",
    items: [
      {
        type: "CLÁSICO",
        image: "https://images.unsplash.com/photo-1675897275724-202ce4be4f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        description: "Batido en agua con 18 gr de proteína, vitaminas y minerales. Bajo en calorías, sin azúcares artificiales y sin gluten.",
        subtitle: "Elige tu sabor ideal",
        flavors: [
          ["Caffe Latte", "Chocoavellana"],
          ["Cookies and Cream", "Banana Caramelo"],
          ["Vainilla", "Canela y especias"]
        ],
        tagline: "Ideal para desayunar, cenar o un snack.",
        price: 7500, 
      },
      {
        type: "ESPECIAL",
        image: "https://images.unsplash.com/photo-1675897275724-202ce4be4f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        description: "Batido en agua con 27 gr de proteína. Incluye dos toppings, sabores y crema de chantilly.",
        subtitle: "Elige tu sabor ideal",
        flavors: [
          ["Nevado de Café", "Explosión de Chocolate"],
          ["Arequipe Latte", "Red Velvet Cake"],
          ["Blueberry", "Cookies and Cream"]
        ],
        tagline: "Parece FAT, pero es FIT.",
        price: 9000,
      }
    ]
  },
  {
    category: "Bebidas Frías",
    categoryStyle: "font-serif italic",
    items: [
      {
        type: "Ice Drink",
        subType: "Frutos Rojos",
        image: "https://images.unsplash.com/photo-1717456182579-faa4a7dc84f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        description: "Bebida sin azúcar, baja en calorías con una base de colágeno hidrolizado, biotina, extracto de Guaraná, té verde, jugo de proteína y aloe.",
        tagline: "Perfecto para un día soleado.",
        price: 9000,
      },
      {
        type: "Golden Cúrcuma",
        image: "/goldencurcuma.png",
        description: "Bebida anti-inflamatoria refrescante a base de cúrcuma, con sabor a piña, limón y jengibre.",
        price: 9000
      }
    ]
  },
  {
    category: "Tu Mejor Elección",
    categoryStyle: "font-serif italic",
    items: [
      {
        type: "WAFFLES DE PROTEÍNA",
        image: "/sandwich.png",
        description: "Nuestra receta de Waffle es la mejor opción saludable a base de proteína vegetal (27 gr). Libre de gluten y harina.",
        options: ["Waffle Bono", "Waffle Sándwich", "Waffle de Frutas"],
        optionPrices: [8000, 9000, 9000]
      },
      {
        type: "BROWNIE FIT",
        image: "/brownie.png",
        description: "Delicioso brownie de chocolate bajo en azúcar y alto en proteína. El postre perfecto sin culpa.",
        tagline: "Parece FAT, pero es FIT.",
        price: 7000
      },
      {
        type: "PAN PROTEICO",
        image: "/pan.png",
        description: "Pan artesanal con chips de chocolate, alto en proteína y bajo en carbohidratos. Perfecto para cualquier momento del día.",
        price: 7000
      }
    ]
  },
  {
    category: "Bowl Proteico",
    categoryStyle: "font-serif italic",
    items: [
      {
        type: "BOWL PROTEICO",
        image: "https://images.unsplash.com/photo-1709139068234-f83a548f3bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FpJTIwYm93bCUyMGhlYWx0aHl8ZW58MXx8fHwxNzY0NzgxNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Rico batido a base de fresas, arándanos, banano, coco y granola.",
        tagline: "Ideal para desayunar.",
        price: 10000
      }
    ]
  },
  {
    category: "Bebidas Calientes",
    categoryStyle: "font-serif italic",
    items: [
      {
        type: "TÉ",
        image: "https://images.unsplash.com/photo-1642188540851-83cdff044c10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjB0ZWElMjBiZXZlcmFnZXxlbnwxfHx8fDE3NjQ3ODE0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Bebida a base de té negro, té verde antioxidante, aloe, fibra digestiva. Con nuestra ENERGY activa tus niveles de energía, y con nuestro MENTA RELAX relaja tu cuerpo y promueve un sueño reparador.",
        options: ["Digestivo Te", "Energy Te", "Menta Relax"],
        optionPrices: [7500, 7500, 7000]
      },
      {
        type: "LATTE",
        image: "https://images.unsplash.com/photo-1643316408393-9328a1e973ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGNvZmZlZSUyMGRyaW5rfGVufDF8fHx8MTc2NDc4MTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Bebida nutricional caliente sin lactosa, a base de proteína vegetal.",
        price: 9000
      }
    ]
  },
{
  category: "Combos",
  categoryStyle: "font-serif italic",
  items: [
    {
      type: "Shake o Ice Drink + Waffle",
      image: "https://thumbs.dreamstime.com/b/iced-caramel-latte-coffee-tall-glass-syrup-226273976.jpg",
      description: "Combina tu bebida favorita con un delicioso waffle",
      price: 17000
    },
    {
      type: "Bebida Caliente + Waffle",
      image: "https://th.bing.com/th/id/R.920d70f721ddb3873bc2be4fe68820b3?rik=%2fzKqeouVJR9sMg&riu=http%3a%2f%2fnorai.blog%2fwp-content%2fuploads%2f2025%2f04%2f31977889_s-e1744359813944.jpg&ehk=x1mnnJeonbDUtDYp2bBawwxErluZRzgPfiy4itz34kQ%3d&risl=&pid=ImgRaw&r=0",
      description: "El combo perfecto para empezar el día",
      price: 17000
    }
  ]
},
  {
    category: "Planes: Tu Mejor Versión",
    categoryStyle: "font-serif italic",
    items: [
      {
        type: "PERDIDA DE PESO",
        image: "https://img.freepik.com/fotos-gratis/bebida-de-saude-de-aloe-vera_75924-1681.jpg?size=626&ext=jpg",
        subtitle: "Básico",
        description: "Batido de 18 gr de proteína + bebida antioxidante con Aloe Vera",
        price: 9000
      },
      {
        type: "PERDIDA DE PESO",
        image: "https://content.elmueble.com/medio/2023/06/13/batido-detox-de-frutas-datiles-y-espinacas_00000000_230711103050_1200x1537.jpg",
        subtitle: "Avanzado",
        description: "Batido de 18 gr de proteína + Bebida detox",
        price: 10500
      },
      {
        type: "AUMENTO DE MASA MUSCULAR",
        image:"https://mejorconsalud.as.com/wp-content/uploads/2021/09/batidos-proteina-caseros-768x432.jpg?auto=format%2Ccompress&quality=75&width=1920&height=1080&fit=cover&gravity=center&sharp=true&progressive=true",
        subtitle: "Básico",
        description: "Batido de 18 gr de proteína",
        price: 7500
      },
      {
        type: "AUMENTO DE MASA MUSCULAR",
        image:"https://s2.abcstatics.com/media/gurme/2023/10/10/s/batido-proteinas-casero-chocolate-platano.jpg-kYWD--940x529@abc.jpg",
        subtitle: "Avanzado",
        description: "Batido de 27 gr de proteína",
        price: 8500
      },
      {
        type: "Recuperador Muscular",
        image:"https://www.bikingpoint.es/blog/wp-content/uploads/2023/08/ImgSite_Ambiente_MuscleRecovery_1.jpg",
        description: "Ayuda a la recuperación post-entrenamiento",
        price: 10000
      },
      {
        type: "Botella Detox",
        image:"https://perfect-home.mx/wp-content/uploads/154350_OMB1.jpg",
        description: "Limpia tu organismo naturalmente",
        price: "$9.000 COP"
      }
    ]
  }
];



export default function Menu({ onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  return (
    <section id="menu" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-10 text-center">Menú de Productos</h2>

        {menuItems.map((section) => (
          <div key={section.category} className="mb-12">
            <h3 className={`text-2xl mb-6 ${section.categoryStyle}`}>
              {section.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.items.map((item, idx) => {
                const selectedOption = selectedOptions[idx] || "";
                const selectedPrice =
                  item.options && selectedOption
                    ? item.optionPrices[item.options.indexOf(selectedOption)]
                    : item.price;

                return (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-gray-700 p-6 text-center"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.type}
                        className="w-full h-40 object-cover mb-4"
                      />
                    )}

                    <h4 className="text-xl mb-2">{item.type}</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      {item.description}
                    </p>

                    {item.options && (
                      <select
                        className="form-select mb-4 text-black"
                        value={selectedOption}
                        onChange={(e) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [idx]: e.target.value,
                          })
                        }
                      >
                        <option value="">Selecciona tu opción</option>
                        {item.options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt} - ${item.optionPrices[i].toLocaleString("es-CO")} COP
                          </option>
                        ))}
                      </select>
                    )}

                    {selectedPrice !== undefined && (
                      <p className="text-lime-400 font-bold mb-4">
                        ${selectedPrice.toLocaleString("es-CO")} COP
                      </p>
                    )}

                    <button
                      onClick={() =>
                      onAddToCart({
                      id: `${item.type}-${selectedOption || "default"}`, // id único
                      name: selectedOption ? `${item.type} - ${selectedOption}` : item.type,
                      price: selectedPrice,
                      image: item.image,
                      })
                      }
  className="flex items-center gap-2 bg-lime-400 text-black px-4 py-2 hover:bg-lime-500 transition"
  disabled={item.options && !selectedOption}
>
  <ShoppingCart className="w-5 h-5" />
  Añadir al carrito
</button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
