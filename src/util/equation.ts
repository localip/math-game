const types = {
	subtraction: '-',
	division: '/',
	addition: '+',
	multiplication: '*'
} as const;

export function generate() {
	const first = Math.round(Math.random() * 11) + 1;
	const second = Math.round(Math.random() * 11) + 1;

	const methods = Object.keys(types);
	const method = methods[Math.floor(Math.random() * methods.length)] as keyof typeof types;

	const formula = [first, types[method as unknown as keyof typeof types], second].join(' ');
	const result = eval(formula);

	/**
	 * Ensure the equation matches the following criteria:
	 *
	 * - Answer should be an even number
	 * - Only numbers 1-12 should be used
	 * - If using division or multiplication, none of the numbers should be 1
	 */
	if (result <= 0 || result % 2 !== 0 || (~['division', 'multiplication'].indexOf(method) && (first === 1 || second === 1))) {
		return generate();
	}

	return {
		formula,
		result,
		method,
		second,
		first
	};
}