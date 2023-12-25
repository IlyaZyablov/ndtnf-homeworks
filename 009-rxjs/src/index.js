"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// const o = range(0, 10)
// o.subscribe({
//   next: (value: any) => console.log('Next:', value),
//   complete: () => console.log('Complete!'),
//   error: (error) => console.log('Error!', error)
// })
// task 1
// const fetchingFunc = (observer) => {
//   fetch('https://api.github.com/search/repositories?q=netology-code')
//     .then(res => res.json())
//     .then(value => observer.next(value));
// }
// const o2 = new Observable(fetchingFunc).pipe(first());
// o2.subscribe({
//   next: (value: any) => console.log('Next:', value),
//   complete: () => console.log('Complete!'),
//   error: (error) => console.log('Error!', error)
// })
// task 2
const fetchingFunc2 = (observer) => {
    fetch('https://gitlab.com/api/v4/projects?search=netology-code')
        .then(res => res.json())
        .then(value => observer.next(value));
};
const o3 = new rxjs_1.Observable(fetchingFunc2).pipe(operators_1.first());
o3.subscribe({
    next: (value) => console.log('Next:', value),
    complete: () => console.log('Complete!'),
    error: (error) => console.log('Error!', error)
});
//# sourceMappingURL=index.js.map