export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		},
	},
	scales: {
		x: {
			grid: {
				color: '#000000',
			},
			border: {
				dash: [2, 4],
			},
			ticks: {
				font: {
					size: 16,
					family: "Poppins"
				}
			}
		},
		y: {
			position: ("right" as any),
			grid: {
				color: '#737373',
			},
			ticks: {
				font: {
					size: 14,
					family: "Poppins"
				}
			}
		},
	}
};

export const scrollHandler = (href: string) => {
	const hashVal = href.split("/").join("")
	// @ts-ignore
	window.history.pushState(null, null, `${hashVal}`)
	document.querySelector(hashVal)?.scrollIntoView({
		behavior: 'smooth'
	});
}

export const calculatePayoff = (contracts: contractType2[], underlyingPrice: number) => {
	return contracts.reduce((total, contract) => {
		const { type, strike, price, quantity } = contract;
		let payoff = 0;

		if (type === 'call') {
			payoff = Math.max(0, underlyingPrice - strike) - price;
		} else if (type === 'put') {
			payoff = Math.max(0, strike - underlyingPrice) - price;
		}

		return total + (payoff * quantity);
	}, 0);
};

export const getBreakEvenPoints = (contracts: contractType2[]) => {
	const points = contracts.map((contract: contractType2) => {
		const { type, strike, price } = contract;
		if (type === 'call') {
			return strike + price;
		} else if (type === 'put') {
			return strike - price;
		} else {
			return 0;
		}
	});

	const uniquePoints = Array.from(new Set(points));
	return uniquePoints.sort((a, b) => a - b);
};

export const getMaxProfit = (contracts: contractType2[]) => {
	return 'Unlimited'; // Simplified assumption for demonstration
};

export const getMaxLoss = (contracts: contractType2[]) => {
	return contracts.reduce((total, contract) => total + (contract.price * contract.quantity), 0);
};
