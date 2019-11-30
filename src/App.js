import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createSelector } from 'reselect';

const shopItemsSelector = state => state.shop.items;
const taxPercentSelector = state => state.shop.taxPercent;

const subtotalSelector = createSelector(
	shopItemsSelector,
	items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
	subtotalSelector,
	taxPercentSelector,
	(subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

const totalSelector = createSelector(
	subtotalSelector,
	taxSelector,
	(subtotal, tax) => ({ total: subtotal + tax })
)

let data = {
	shop: {
		taxPercent: 8,
		items: [
			{ name: 'meat', value: 1.20 },
			{ name: 'fish', value: 0.95 },
			{ name: 'chicken', value: 1.55 },
		]
	}
}
window.onload = function(){
	let obj = JSON.stringify(totalSelector(data));
	let obj2 = JSON.parse(obj);

	document.getElementById("sub").innerHTML = subtotalSelector(data);
	document.getElementById("tax").innerHTML = taxSelector(data).toFixed(2);
	document.getElementById("total").innerHTML = obj2.total.toFixed(2);
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<section className="content">
				<div id="sub"></div>
				<div id="tax"></div>
				<div id="total"></div>
			</section>
			<footer className="App-footer">
				(c) Copyright - Mike Ludemann
			</footer>
		</div>
	);
}

export default App;
