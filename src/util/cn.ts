function cn(...classnames: (string | void)[]) {
	return classnames.filter(Boolean).join(' ');
}

export default cn;