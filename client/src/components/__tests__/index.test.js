/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import PizzaList from '../Pizza/PizzaList';
import ToppingsList from '../Toppings/ToppingsList';

// Mock Topping Data
const toppings = [
    {
        _id: "65c33c6f2a8f66db8dee049e",
        name: "Pepperoni",
        pizzas: [
            "Test"
        ]
    },
    {
        _id: "65c33c762a8f66db8dee04a2",
        name: "Olives",
        pizzas: [
            "Test"
        ]
    },
    {
        _id: "65c33c812a8f66db8dee04a9",
        name: "Sausage",
        pizzas: [
            "Sausage",
            "Test"
        ]
    }
];


// Mock Pizza Data
const pizzas = [
    {
        _id: "65c33c882a8f66db8dee04af",
        name: "Sausage",
        toppings: [
            {
                _id: "65c33c812a8f66db8dee04a9",
                name: "Sausage",
            }
        ],
    },
    {
        _id: "65c33c932a8f66db8dee04b7",
        name: "Supreme",
        toppings: [
            {
                _id: "65c33c6f2a8f66db8dee049e",
                name: "Pepperoni",
            },
            {
                _id: "65c33c762a8f66db8dee04a2",
                name: "Olives",
            },
            {
                _id: "65c33c812a8f66db8dee04a9",
                name: "Sausage",
            }
        ],
    },
    {
        _id: "65c33c882a8f66db8dee04cd",
        name: "Plain Cheese",
        toppings: [],
    }
];

// We declare an empty container that will be the target for all our components during testing
let container = null;

// We want to render our React tree to a DOM element that is attached so that we can watch events
beforeEach(() => {
    // Setup a DOM element as the target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // Cleanup on exiting to prevent this test from altering the results of future tests
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('PizzaList Renders with or without pizzas', () => {
    act(() => {
        render(<PizzaList toppings={toppings} pizzas={pizzas} />, container);
    });
    // Check if the pizzas are rendered
    expect(container.querySelectorAll('.MuiCard-root')).toHaveLength(pizzas.length);

    // Check if the placeholder message is displayed when there are pizzas but no toppings
    act(() => {
        render(<PizzaList toppings={toppings} pizzas={pizzas} />, container);
    });
    expect(container.textContent).toContain('No Toppings');

    // Check if the placeholder message is displayed when there are no pizzas
    act(() => {
        render(<PizzaList pizzas={[]} />, container);
    });
    expect(container.textContent).toContain('No pizzas yet!');
});

it('ToppingsList Renders with or without toppings', () => {
    act(() => {
        render(<ToppingsList toppings={toppings} />, container);
    });
    act(() => {
        render(<ToppingsList toppings={[]}/>, container);
    });
    expect(container.textContent).toContain('No toppings yet!')
});
