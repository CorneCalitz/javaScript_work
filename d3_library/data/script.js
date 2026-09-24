
d3
.select("body")
.insert("h1", "svg")
.text("Hello, D3!");

let numbers = [3, 2, 1];

function update(data) {
    d3
    .select("svg")
    .selectAll('circle')
    .data(data, d=> d)
    .join(
        enter => enter
            .append("circle")
            .attr("cx", (d, i) => (i + 1) * 50)
            .attr("cy", 50)
            .transition()
            .duration(500)
            .attr("r", (d, i) => d * 5),
        update => update
            .transition()
            .duration(500)
            .attr("cx", (d, i) => (i + 1) * 50),
        exit => exit
            .transition()
            .duration(500)
            .attr("r", 0)
            .remove()
        ); 
}

update(numbers);

function getRandomNum() {
    return 1 + Math.random() * 3;
}

d3.select("#append").on("click", () => {
    numbers.push(getRandomNum());
    update(numbers);
});

d3.select("#prepend").on("click", () => {
    numbers.unshift(getRandomNum());
    update(numbers);
});
d3.select("#drop").on("click", () => {
    numbers.pop();
    update(numbers);
});