document.getElementById("search-button").addEventListener('click', () => {
    loadDataByName(document.getElementById('search-field').value);
    document.getElementById('search-field').value = '';
})
const loadDataByName = async name => {
    // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    //     .then(res => res.json())
    //     .then(data => loadData(data))

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await res.json();
    loadData(data);
}

const loadDetail = async id => {
    // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         window.location.href = `${data.meals[0].strSource}`;
    //         // console.log(data.meals[0].strSource)
    //     })

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();

    gotoSource(data.meals[0].strSource)
}
const gotoSource = link => {
    window.location.href = `${link}`;

}
const loadData = data => {
    function removePreviousData(parent) {
        parent.innerHTML = '';

    }
    if (data.meals == null) {
        console.log("Search not found");
        removePreviousData(document.getElementById('all-meals-section'));
        document.getElementById('not-found').style.display = 'block';
    } else {


        document.getElementById('not-found').style.display = 'none';


        removePreviousData(document.getElementById('all-meals-section'));
        const parentDiv = document.getElementById('all-meals-section');

        data.meals.forEach(element => {
            const { strMeal, strMealThumb, strCategory, strArea, strTags, strInstructions } = element;
            // console.log(strTags);
            const innerTemplate = `
            <div class="card h-100">
                            <img src="${strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <div>
                                    <h5 class="card-title">${strMeal}</h5>
                                    <p>category: <span class="badge bg-primary">${strCategory}</span></p>
                                </div>
                                <div>
                                
                                
                                </div>
                                <p>${strInstructions.slice(0, 100)}</p>
                                <p>Origin: <span>${strArea}</span></p>
                                <div class="text-end">
                                    <button onclick="loadDetail(${element.idMeal})" class="btn btn-primary">Details</button>
                                </div>
                            </div>
                        </div>
            `;



            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = innerTemplate;
            parentDiv.append(col);

        });

    }


}