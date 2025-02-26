import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: 15 },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: 12 }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        if (!addedToCart[plant.name]) {
            dispatch(addItem({ ...plant, quantity: 1 })); // Ensure initial quantity
            setAddedToCart((prevState) => ({
                ...prevState,
                [plant.name]: true,
            }));
        }
    };

    return (
        <div>
            <div className="navbar">
                <h3>🌿 Paradise Nursery</h3>
                <button onClick={() => setShowCart(true)}>🛒 Cart</button>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category) => (
                        <div key={category.category}>
                            <h2>{category.category}</h2>
                            <div className="plant-list">
                                {category.plants.map((plant) => (
                                    <div className="plant-card" key={plant.name}>
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p>${plant.cost}</p>
                                        <button 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "✅ Added" : "🛒 Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
