const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)
    const data = await response.json()
    return data
}

const create = async newObject => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)

    })

    const data = await response.json()
    return data

}

const update = async (id, newObject) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)

    })

    const data = await response.json()

    return data

}

export default { getAll, create, update }
