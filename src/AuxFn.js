export const returnCombinations = tickets => {
    const factorial = n => {
        return n === 1 ? n : n * factorial(--n);
    };

    const combinations = (n, r) => {
        if (n === r) return 1;
        else return factorial(n) / (factorial(r) * factorial(n - r));
    };

    let result = 0;
    tickets.forEach(ticket => {
        if (ticket.left.length >= 4 && ticket.right.length >= 4) {
            result =
                result +
                combinations(ticket.left.length, 4) *
                combinations(ticket.right.length, 4);
        }
    });
    return result;
};

export const checkTickets = tickets => {
    let result = 0;
    tickets.forEach(ticket => {
        if (ticket.left.length >= 4 && ticket.right.length >= 4) {
            result = result + 1;
        }
    });
    return result;
};
