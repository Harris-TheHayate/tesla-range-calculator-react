import { counterDefaultValue } from '../constants/counterDefaultValue';

export const speedUp = value => {
	return {
		type: 'SPEED_UP',
		value,
		step: counterDefaultValue.speed.step,
		maxValue: counterDefaultValue.speed.max,
	};
};

export const speedDown = value => {
	return {
		type: 'SPEED_DOWN',
		value,
		step: counterDefaultValue.speed.step,
		minValue: counterDefaultValue.speed.min,
	};
};

export const temperatureUp = value => {
	return {
		type: 'TEMPERATURE_UP',
		value,
		step: counterDefaultValue.temperature.step,
		maxValue: counterDefaultValue.temperature.max,
	};
};

export const temperatureDown = value => {
	return {
		type: 'TEMPERATURE_DOWN',
		value,
		step: counterDefaultValue.temperature.step,
		minValue: counterDefaultValue.temperature.min,
	};
};

export const changeClimate = () => {
	return {
		type: 'CHANGE_CLIMATE',
	};
};

export const changeWheel = value => {
	return {
		type: 'CHANGE_WHEEL',
		value,
	};
};

export const updateStats = () => {
	return {
		type: 'UPDATE_STATS',
	};
};
