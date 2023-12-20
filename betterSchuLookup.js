let betterData = []

let countrySelect = document.getElementById('countries')
let characterSelect = document.getElementById('characters')

let countryRankings = [];
countriesObjects.map((c) => countryRankings[c.in] = [])

data.map((index, i) => {
    betterData.push({
        ranking: i,
        tag: index[0],
        rating: index[1],
        character: characterObjects.find((character) => character.in == index[2]),
        country: countriesObjects.find((country) => country.in == index[3]),
    })

    countryRankings[index[3]].push(i)
})
delete data

countriesObjects.sort((a, b) => (a.out > b.out) ? 1 : ((b.out > a.out) ? -1 : 0))
countriesObjects.map((c) => countrySelect.innerHTML += `<option value='${c.in}'>${c.out}</option>`)

characterObjects.sort((a, b) => (a.out > b.out) ? 1 : ((b.out > a.out) ? -1 : 0))
characterObjects.map((c) => characterSelect.innerHTML += `<option value='${c.in}'>${c.out}</option>`)

let sample = [...betterData]

let table = document.getElementById('rankings')
function updateTable() {
    sample = betterData.filter((index) => {
        var countryCheck = countrySelect.value != '-' ? index.country.in == countrySelect.value : true
        var characterCheck = characterSelect.value != '-' ? index.character.in == characterSelect.value : true

        return countryCheck && characterCheck
    })
    
    var html = `
        <tr>
            <th>Ranking</th>
            <th>Tag</th>
            <th>Character</th>
            <th>Country</th>
            <th>Ranking in Country</th>
            <th>Rating</th>
        </tr>
    `

    sample.map((index) => html += `
        <tr>
            <td>${index.ranking + 1}</td>
            <td>${index.tag}</td>
            <td>${index.character.out}</td>
            <td>${index.country.out}</td>
            <td>${countryRankings[index.country.in].indexOf(index.ranking) + 1}</td>
            <td>${index.rating.toFixed(0)}</td>
        </tr>
    `)

    table.innerHTML = html
}

updateTable()