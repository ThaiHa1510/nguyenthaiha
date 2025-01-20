
/*
Calculates the sum of all integers from 1 to a given number n using a simple loop
Time Complexity: O(n), because the function runs a loop from 1 to n.
Space Complexity: O(1), since no additional space is used apart from the variable sum.
*/
export function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/*
Calculates the sum of all integers from 1 to a given number n using recursion.
Time Complexity: O(n), as the function calls itself n times.
Space Complexity: O(n), due to the recursive call stack.
*/
export function sum_to_n_b(n: number): number {
    if (n === 1) return 1;
    return n + sum_to_n_b(n - 1);
}
/*
Calculates the sum of all integers from 1 to a given number n using the formula for the sum of an arithmetic series
Time Complexity: O(1), because it computes the result using a constant-time formula.
Space Complexity: O(1), since it only requires a constant amount of space.
*/

export function sum_to_n_c(n: number): number {
    return (n * (n + 1)) / 2;
}
