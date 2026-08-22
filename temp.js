const inheritcard = () => {

    fetch("./product.json", 'utf8')

        .then(response => {

            return response.json();
        })

        .then(data => {

            productlist = data;

            console.log("Products:", productlist);

            // showCard();
        })

        .catch(error => {

            console.error("Error:", error);

        });

};

console.log(inheritcard())