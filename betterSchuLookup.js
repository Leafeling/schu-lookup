let betterData = []

let countrySelect = document.getElementById('countries')
let characterSelect = document.getElementById('characters')

let countryRankings = []
countriesObjects.map((c) => countryRankings[c.in] = [])

let characterRankings = []
characterObjects.map((c) => characterRankings[c.in] = [])

data.map((index, i) => {
    betterData.push({
        ranking: i,
        tag: index[0],
        rating: index[1],
        character: characterObjects.find((character) => character.in == index[2]),
        country: countriesObjects.find((country) => country.in == index[3]),
    })

    characterRankings[index[2]].push(i)
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
            <th class='ranking'>Ranking</th>
            <th class='tag'>Tag</th>
            <th class='character'>Character</th>
            <th class='country'>Country</th>
            <th class='rating'>Rating</th>
            <th class='space'></th>
            ${countrySelect.value != '-' ? `<th class='countryRank'>Ranking in ${countriesObjects.find((x) => x.in == countrySelect.value).out}</th>` : ''}
            ${characterSelect.value != '-' ? `<th class='characterRank'>Ranking as ${characterObjects.find((x) => x.in == characterSelect.value).out}</th>` : ''}
        </tr>
    `

    sample.map((index) => html += `
        <tr>
            <td class='ranking'>${index.ranking + 1}</td>
            <td class='tag'>${index.tag}</td>
            <td class='character'>${index.character.out}</td>
            <td class='country'>${index.country.out}</td>
            <td class='rating'>${index.rating.toFixed(0)}</td>
            <td class='space'></td>
            ${countrySelect.value != '-' ? `<td class='countryRank'>${countryRankings[index.country.in].indexOf(index.ranking) + 1}</td>` : ''}
            ${characterSelect.value != '-' ? `<td class='characterRank'>${characterRankings[index.character.in].indexOf(index.ranking) + 1}</td>` : ''}
        </tr>
    `)

    table.innerHTML = html
}

updateTable()