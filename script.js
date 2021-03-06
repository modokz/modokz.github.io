const schoolCardTemplate = document.querySelector("[data-school-template]")
const schoolCardContainer = document.querySelector("[data-school-cards-container]")
const searchInput = document.querySelector("[data-search]")

let schools = []

function removeElem(arr, value) {
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

function isContains(words, keys) {
  initialLength = words.length
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (words[j].includes(keys[i])) {
        words = removeElem(words, words[j])
        break
      }
    }
  }
  return initialLength - keys.length == words.length
}

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  schools.forEach(school => {
    const isVisible =
      isContains(school.school_name.trim().toLowerCase().split(" "), value.trim().toLowerCase().split(" ")) ||
      school.bin.startsWith(value)
    school.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://modokz.github.io/data.json")
  .then(res => res.json())
  .then(data => {
    schools = data.map(school => {
      const card = schoolCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const flow = card.querySelector("[data-flow]")
      const body = card.querySelector("[data-body]")
      header.textContent = `${school.day} апреля`
      flow.textContent = `поток ${school.number_of_flow}, ${school.students_in_flow} уч.`
      body.textContent = `${school.school_name}, БИН ${school.bin}, ${school.region}, ${school.district}, ${school.locality}`
      schoolCardContainer.append(card)
      return {
        school_name: school.school_name,
        bin: school.bin,
        region: school.region,
        district: school.district,
        locality: school.locality,
        studentsTotal: school.studentsTotal,
        students4g: school.students4g,
        students9g: school.students9g,
        day: school.day,
        number_of_flow: school.number_of_flow,
        students_in_flow: school.students_in_flow,
        element: card
      }
    })
  })
